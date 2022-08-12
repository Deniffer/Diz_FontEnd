import axios from "axios";
import {compare_one_layer} from "@/utills/tsutils";
import {PaState} from "@/store/pastate";
import {RouteCtrl} from "@/store/route_ctrl";
import {Member} from "@/store/models/member";
import {DirectoryVo} from "@/store/models/directory";
import {api_dirs_create} from "@/store/apis/dirs_create";

export class Course {
    constructor(
        public course_id: number,
        public name: string,
        public begin_at: string,
        public duration:number,
        public invite_code:string,
        public created_at:string,
        public members:Member[],
        public directories:DirectoryVo[]
    ) {
    }

    static pre() {
        return new Course(31,
            "啥也不是",
            "",0,"","",[],[])
    }
}

export class CourseListState {
    static pre() {
        return new CourseListState(
            InitialCourse,
            [InitialCourse]
        )
    }

    constructor(
        public cur_course: Course,
        public course_list: Course[]
    ) {
    }
}

export type CourseAction = typeof InitialAction;
const InitialCourse = Course.pre();
const InitialCourseListState = CourseListState.pre();
const InitialAction = {
    type: "",
    course_list: [InitialCourse],
    cur_course: InitialCourse,
}


export const courseReducer = (state = InitialCourseListState,
                              action = InitialAction) => {
    switch (action.type) {
        case "updateCourseList":
            return {
                cur_course: state.cur_course,
                course_list: action.course_list
            }
        case "updateCurCourse":
            return {
                cur_course: action.cur_course,
                course_list: state.course_list
            }
        default:
            return state
    }
}

export class CourceStoreProxy {
    fetchCourceDetailAndSetCur(course: Course) {
        console.log("fetchCourceDetailAndSetCur", course.course_id)
        axios.post(baseUrl + "/get_course_detail?mock_login=123", {
            "course_id": course.course_id
        }).then(res => {
            const cur_course: Course = res.data.course
            //课程选择变更
            this.state.course_cur = cur_course
            // if(!compare_one_layer( this.state.course_cur,cur_course)){
            // console.log("curcourse_change",this.state.course_cur,cur_course)
            if(this.state.course_cur.course_id!=cur_course.course_id){

                //需要复位选择栏为全部
                this.state.course_dir_id_selected=-1
            }
            RouteCtrl.push_cid_inroute(cur_course.course_id)
            // }
            // this.reduxf_updateCurCourse(cur_course)
        })
    }

    updateCourseList() {
        axios.post(baseUrl + "/get_courses?mock_login=123", {}).then(res => {

            const course_list: Course[] = res.data.courses;
            const cidinpath = RouteCtrl.get_curcouseid_in_route()
            let tarcid = this.state.course_cur.course_id
            console.log("tarcid in path", cidinpath)
            if (cidinpath != undefined && cidinpath != tarcid) {

                tarcid = cidinpath
            }
            // console.log("tarcid",tarcid)
            let find_cur_coursei = 0;
            for (let i = 0; i < course_list.length; i++) {
                if (course_list[i].course_id == tarcid) {
                    find_cur_coursei = i;
                    break;
                }
            }
            this.state.course_list = course_list;
            this.fetchCourceDetailAndSetCur(course_list[find_cur_coursei])


        })
    }

    getCourseList() {
        return this.state.course_list
    }

    getCurCourse() {
        return this.state.course_cur
    }

    curcourse_add_new_dirs(dirs:string[]):Promise<"exist"|"netfail"|"ok">{
        return new Promise(resolve => {
            for(const key in this.state.course_cur.directories){
                const v=this.state.course_cur.directories[key]
                for(const nk in dirs){
                    if(dirs[nk]==v.name){
                        //重名
                        resolve("exist")
                    }
                }
            }
            let dirs_:DirectoryVo[]=[]
            dirs.forEach((v)=>{
                dirs_.push(new DirectoryVo(
                    0,v,this.state.course_cur.course_id
                ))
            })
            api_dirs_create(dirs_).then(
                res=>{
                    if(res&&res.meta.code==0){
                        resolve("ok")
                    }
                    resolve("netfail")
                }
            )
        })
    }

    constructor(private state: PaState) {
    }
}

export const baseUrl = "https://www.asueeer.com"