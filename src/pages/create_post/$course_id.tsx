import React, {Component, Fragment} from 'react';
import {Box} from "@mui/joy";
import index_styles from "@/pages/index.less";
import Headline from "@/layouts/headline/headline";
// import {Provider} from "react-redux";
import CourseBar from "@/layouts/course_bar/course_bar";
import {curstyle} from "@/theme/curtheme";
import PostForm from "@/layouts/post_form/post_form";
import axios from "axios";
import {api_post_create} from "@/store/apis/post_create";
import {RouteControl} from "@/store/route_control";
import {baseUrl} from "@/store/apis/baseurl";
import {api_dirs_create} from "@/store/apis/dirs";

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
        let create_post = (post: any) => {
            api_post_create(post).then((res) => {
                if (res) {
                    alert(res.meta.msg)
                    RouteControl.back()
                }
            })
        }

        const post = this.refs.post_form.state.new_post
        const new_dirs = this.refs.post_form.state.new_dirs
        post.course_id = this.state.course_id
        for (let i = 0; i < new_dirs.length; i++) {
            new_dirs[i].course_id = this.state.course_id
        }

        if (new_dirs.length > 0) {
            api_dirs_create(new_dirs).then(res => {
                if (res?.meta.code === 0) {
                    let new_dirs = res.directories
                    if (new_dirs) {
                        for (let i = 0; i < new_dirs.length; i++) {
                            post.directory_ids.push(new_dirs[i].directory_id)
                        }
                    }
                    create_post(post)
                } else {
                    alert(res?.meta.msg)
                    return
                }
            })
        } else {
            create_post(post)
        }
    }

    render() {
        const main_container_width = "866px"
        return (
            <Fragment>
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
                    <CourseBar handlePublishPostClick={this.handlePublishPostClick.bind(this)}
                               cur_course={this.state.cur_course}
                               width={main_container_width}/>
                    <PostForm fetchCurCourse={this.fetchCurCourse} ref='post_form' cur_course={this.state.cur_course}
                              width={main_container_width}/>
                </Box>
            </Fragment>

        );
    }
}

export default $CourseId;