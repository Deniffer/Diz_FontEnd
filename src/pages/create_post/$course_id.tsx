import React, {Component} from 'react';
import {Box} from "@mui/joy";
import index_styles from "@/pages/index.less";
import Headline from "@/layouts/headline/headline";
import {store} from "@/store/store";
import {Provider} from "react-redux";
import {baseUrl, Course} from "@/store/course_list";
import CourseBar from "@/layouts/course_bar/course_bar";
import {curstyle} from "@/theme/curtheme";
import PostForm from "@/layouts/post_form/post_form";
import axios from "axios";

class $CourseId extends Component {
    state = {
        cur_course: {},
        course_id: Number(window.location.pathname.replace("/create_post/", "")),
        open: true
    }

    componentDidMount() {
        this.fetchCurCourse()
    }

    fetchCurCourse = () => {
        let course_id = this.state.course_id
        axios.post(baseUrl + "/get_course_detail?mock_login=123", {
            "course_id": course_id
        }).then(res => {
            this.setState({
                cur_course: res.data.course
            })
        })
    }

    handlePublishPostClick = () => {
        const post = this.refs.post_form.state.new_post
        post.course_id = this.state.course_id
        axios.post(baseUrl + "/post?mock_login=123", post).then(
            res => {
                alert(res.data.meta.msg)
            }
        )
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
                    <CourseBar handlePublishPostClick={this.handlePublishPostClick} cur_course={this.state.cur_course}
                               width={main_container_width}/>
                    <PostForm fetchCurCourse={this.fetchCurCourse} ref='post_form' cur_course={this.state.cur_course}
                              width={main_container_width}/>
                </Box>
            </Provider>

        );
    }
}

export default $CourseId;