import React, {Component} from 'react';
import {Box, Button} from "@mui/joy";
import index_styles from "@/pages/index.less";
import Headline from "@/layouts/headline/headline";
import {GlobalStoreState, store} from "@/store/store";
import {connect, Provider} from "react-redux";
import $course_id_styles from "./$course_id.less";
import Arrow from "@/layouts/reuseable_comps/arrow";
import {baseUrl, Course} from "@/store/course_list";
import CourseBar from "@/layouts/course_bar/course_bar";
import {curstyle} from "@/theme/curtheme";
import reuse from "@/assets/reuseable.less"
import {PaStateMan} from "@/utills/pa_state_man";
import PostForm from "@/layouts/post_form/post_form";
import axios from "axios";

class $CourseId extends Component {
    state = {
        cur_course: {},
    }

    componentDidMount() {
        let course_id = window.location.pathname.replace("/create_post/", "")
        axios.post(baseUrl + "/get_course_detail?mock_login=123", {
            "course_id": Number(course_id)
        }).then(res => {
            this.setState({
                cur_course: res.data.course
            })
        })
    }

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
                    <CourseBar cur_course={this.state.cur_course} width={main_container_width}/>
                    <PostForm cur_course={this.state.cur_course} width={main_container_width}/>
                </Box>
            </Provider>
        );
    }
}

export default $CourseId;