// @ts-ignore
import styled from "styled-components";
import {curstyle} from "@/theme/curtheme";
import React, {Component, Fragment} from "react";
import {PaStateMan} from "@/utills/pa_state_man";
import axios from "axios";
import {baseUrl} from "@/store/course_list";

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
    }

    //life
    componentDidMount() {
        this.fetchPosts()
    }

    fetchPosts = () => {
        let course_id = PaStateMan.getstate().courseProxy().getCurCourse().course_id
        console.log("this.state.cur_course.course_id",course_id)
        axios.post(baseUrl + "/get_posts?mock_login=123", {
            course_id: course_id,
            limit: 20
        }).then(res => {
            console.log(res.data)
            this.setState({
                posts: res.data.posts
            })
        })
    }

    componentWillUnmount() {
        PaStateMan.unregist_comp(this)
    }


    render() {
        return (
            <Fragment>
                <Wrap>
                    <Space/>
                    {PaStateMan.getstate().courseProxy().getCurCourse().course_id}
                    {
                        this.state.posts.map(post => {
                            return (
                                <PostViewBarWrap
                                    key={post.post_id}
                                >
                                    {post.title}
                                </PostViewBarWrap>
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