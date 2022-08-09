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

export const baseUrl = "https://www.asueeer.com"