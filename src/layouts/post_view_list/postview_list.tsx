// @ts-ignore
import styled from "styled-components";
import {curstyle} from "@/theme/curtheme";
import React, {Component, Fragment} from "react";
import {PaStateMan} from "@/utills/pa_state_man";
import axios from "axios";
import {baseUrl} from "@/store/course_list";
import {PostViewBar} from "@/layouts/post_view_list/postview_bar";
import {Box} from "@mui/joy";
import {history} from "umi";

const PostViewBarWrap = styled.div`
  border-bottom: 1px solid ${curstyle().colors.gray_d};
`
const Wrap = styled.div`
  padding-left: ${curstyle().gap.xxl};
  padding-right: ${curstyle().gap.xxl};
`
const Space = styled.div`
  height: ${curstyle().gap.common};
`

class PostViewList extends Component {
    state = {
        posts: [],
        limit: 20,
        course_id: PaStateMan.getstate().courseProxy().getCurCourse().course_id
    }

    //life
    componentDidMount() {
        PaStateMan.regist_comp(this, (registval, state) => {
            registval(state.course_cur);
        })
        this.fetchPosts()
    }

    componentWillUnmount() {
        PaStateMan.unregist_comp(this)
    }

    fetchPosts = () => {
        axios.post(baseUrl + "/get_posts?mock_login=123", {
            course_id: PaStateMan.getstate().courseProxy().getCurCourse().course_id,
            limit: 20
        }).then(res => {
            console.log(res.data)
            this.setState({
                posts: res.data.posts
            })
        })
    }

    render() {
        const course_id = PaStateMan.getstate().courseProxy().getCurCourse().course_id
        if (course_id !== this.state.course_id) {
            this.setState({
                course_id: course_id
            })
            this.fetchPosts()
        }
        return (
            <Fragment>
                <Wrap>
                    <Space/>
                    {
                        this.state.posts.map(post => {
                            return (
                                <Box>
                                    <PostViewBarWrap
                                        key={post.post_id}
                                    >
                                        <PostViewBar course_id={course_id} key={post.post_id} post={post}/>
                                    </PostViewBarWrap>
                                </Box>
                            )
                        })
                    }
                    <Space/>
                </Wrap>
            </Fragment>
        )
    }
}

export default PostViewList;