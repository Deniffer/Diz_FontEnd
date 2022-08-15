// @ts-ignore
import styled from "styled-components";
import {curstyle} from "@/theme/curtheme";
import React, {Component, Fragment} from "react";
import {PaStateMan} from "@/utills/pa_state_man";
import axios from "axios";
import {baseUrl} from "@/store/apis/baseurl";
import {PostViewBar} from "@/layouts/post_view_list/postview_bar";
import {Box} from "@mui/joy";
import {history} from "umi";
import {api_get_posts} from "@/store/apis/get_posts";
import {Post} from "@/store/models/post";

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


interface State{
    posts:Post[],
    limit:number,
}
interface Prop{

}
class PostViewList extends Component<Prop,State> {
    state = {
        posts: [] as Post[],
        limit: 20,
    }
    //life
    componentDidMount() {
        PaStateMan.regist_comp(this, (registval, state) => {
            registval(state.course_cur.course_id,()=>{
                this.fetchPosts()
            });
            registval(state.course_dir_id_selected, ()=>{
                this.fetchPosts()
            })
        })
        this.fetchPosts()
    }

    componentWillUnmount() {
        PaStateMan.unregist_comp(this)
    }

    fetchPosts = () => {
        api_get_posts().then(res => {
            if(res){
                this.setState({
                    posts: res.posts
                })
            }
        })
    }

    render() {
        const course_id = PaStateMan.getstate().courseProxy().getCurCourse().course_id

        return (
            <Fragment>
                <Wrap>
                    <Space/>
                    {
                        this.state.posts.map(post => {
                            return (
                                    <PostViewBarWrap
                                        key={post.post_id}
                                    >
                                        <PostViewBar course_id={course_id} key={post.post_id} post={post}/>
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