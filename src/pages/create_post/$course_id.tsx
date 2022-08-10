import React, {Component} from 'react';
import {Box, Button} from "@mui/joy";
import index_styles from "@/pages/index.less";
import Headline from "@/layouts/headline/headline";
import {GlobalStoreState, store} from "@/store/store";
import {connect, Provider} from "react-redux";
import $course_id_styles from "./$course_id.less";
import Arrow from "@/layouts/reuseable_comps/arrow";
import {Course} from "@/store/course_list";
import CourseBar from "@/layouts/course_bar/course_bar";
import {curstyle} from "@/theme/curtheme";
import reuse from "@/assets/reuseable.less"
import {PaStateMan} from "@/utills/pa_state_man";
import PostForm from "@/layouts/post_form/post_form";

class $CourseId extends Component {

    render() {
        const main_container_width = "866px"
        return (
            <Provider store={store}>
                {/* nav bar */}
                <Box className={index_styles.headline}
                     sx={{
                         height: curstyle().headlineheight
                     }}
                >
                    <Headline/>
                </Box>
                <Box
                    sx={{
                        width: main_container_width,
                        margin: "20px auto",
                    }}>
                    <CourseBar width={main_container_width}/>

                    <PostForm width={main_container_width}/>
                </Box>
            </Provider>
        );
    }
}

export default $CourseId;