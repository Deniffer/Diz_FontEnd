import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {CourseListState, courseReducer} from "@/store/course_list";


export type GlobalStoreState = {
    course: CourseListState
}
export const store = configureStore({
    reducer: combineReducers(
        {
            course: courseReducer,
        }
    )
})