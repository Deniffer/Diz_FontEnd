import {configureStore} from '@reduxjs/toolkit'
import {course} from "@/store/course_list";

export const store = configureStore({
    reducer: {
        course: course
    },
})