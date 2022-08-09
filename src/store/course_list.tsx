
import axios from "axios";
import {compare_one_layer} from "@/utills/tsutils";
import {PaState} from "@/store/pastate";

export class Course {
    constructor(
        public course_id: number,
        public name: string,
        public begin_at: string
    ) {
    }

    static pre() {
        return new Course(31,
            "操作系统",
            "")
    }
}

export class CourseListState {
    static pre(){
        return new CourseListState(
            InitialCourse,
    [InitialCourse]
        )
    }
    constructor(
        public cur_course:Course,
        public course_list:Course[]
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
export class CourceStoreProxy{
    fetchCourceDetailAndSetCur(course:Course){
        axios.post(baseUrl + "/get_course_detail?mock_login=123", {
            "course_id": course.course_id
        }).then(res => {
            const cur_course = res.data.course
            // if(!compare_one_layer( this.state.course_cur,cur_course)){
                // console.log("curcourse_change",this.state.course_cur,cur_course)
                this.state.course_cur=cur_course
            // }
            // this.reduxf_updateCurCourse(cur_course)
        })
    }
    updateCourseList(){
        axios.post(baseUrl + "/get_courses?mock_login=123", {}).then(res => {
            const course_list = res.data.courses;
            this.state.course_list=course_list;
            this.fetchCourceDetailAndSetCur(course_list[0])
        })
    }
    getCourseList(){
        return this.state.course_list
    }
    getCurCourse(){
        return this.state.course_cur
    }
    constructor(private state:PaState) {
    }
}
export const baseUrl = "https://www.asueeer.com"