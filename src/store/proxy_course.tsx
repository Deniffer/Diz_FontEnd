import axios from "axios";
import {compare_one_layer} from "@/utills/tsutils";
import {PaState} from "@/store/pastate";
import {RouteControl} from "@/store/route_control";
import {Member} from "@/store/models/member";
import {DirectoryVo} from "@/store/models/directory";
import {api_dirs_create} from "@/store/apis/dirs";
import {Course} from "@/store/models/course";
import {baseUrl} from "@/store/apis/baseurl";
import {PaStateMan} from "@/utills/pa_state_man";





export class CourceStoreProxy {
    async fetchCourceDetailAndSetCur(course: Course,pushroute:boolean=true) {
        console.log("fetchCourceDetailAndSetCur", course.course_id)
        if (this.state.course_cur.course_id!=course.course_id){
            PaStateMan.getstate().course_dir_select(-1);
        }

        await axios.post(baseUrl + "/get_course_detail?mock_login=123", {
            "course_id": course.course_id
        }).then(res => {
            console.log(res)
            const cur_course: Course = res.data.course
            //课程选择变更
            console.log("course fetched",cur_course)
            this.state.course_cur = cur_course
            // if(!compare_one_layer( this.state.course_cur,cur_course)){
            // console.log("curcourse_change",this.state.course_cur,cur_course)
            // if(this.state.course_cur.course_id!=cur_course.course_id){
            //     console.log("reset dir_id")
            //     //需要复位选择栏为全部
            //     this.state.course_dir_id_selected = -1
            // }
            if(pushroute){
                RouteControl.push_cid_inroute(cur_course.course_id)
            }
            // }
            // this.reduxf_updateCurCourse(cur_course)
        })
    }

    updateCourseList() {
        axios.post(baseUrl + "/get_courses?mock_login=123", {}).then(res => {

            const course_list: Course[] = res.data.courses;
            const cidinpath = RouteControl.get_curcouseid_in_route()
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


//
// export type CourseAction = typeof InitialAction;
// const InitialCourse = Course.pre();
// const InitialCourseListState = CourseListState.pre();
// const InitialAction = {
//     type: "",
//     course_list: [InitialCourse],
//     cur_course: InitialCourse,
// }
//
//
// export const courseReducer = (state = InitialCourseListState,
//                               action = InitialAction) => {
//     switch (action.type) {
//         case "updateCourseList":
//             return {
//                 cur_course: state.cur_course,
//                 course_list: action.course_list
//             }
//         case "updateCurCourse":
//             return {
//                 cur_course: action.cur_course,
//                 course_list: state.course_list
//             }
//         default:
//             return state
//     }
// }