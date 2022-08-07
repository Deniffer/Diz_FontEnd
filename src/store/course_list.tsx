const InitialCourse = {
    course_id: 31,
    name: "操作系统",
    begin_at: ""
}
const InitialCourseListState = {
    cur_course: InitialCourse,
    course_list: [InitialCourse]
};
const InitialAction = {
    type: "",
    course_list: [InitialCourse],
    cur_course: InitialCourse,
}

export const course = (state = InitialCourseListState,
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