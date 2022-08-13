import React, {Component, PureComponent} from 'react';
import {Box} from "@mui/joy";
import {Post as PostStruct} from "@/store/models/post";
import {api_get_posts} from "@/store/apis/get_posts";
import {PaStateMan} from "@/utills/pa_state_man";

interface Prop{
    fetchPostDetail:()=>void
}
//post页面 列表
class PostsPanel extends PureComponent<Prop> {
    state={
        posts:[] as PostStruct[]
    }
    componentDidMount() {
        PaStateMan.regist_comp(this, (registval, state) => {
            registval(state.course_cur.course_id,()=>{
                this.fetchPosts()
            });
            registval(state.postview_cur_pid)//切换文章需要重新渲染
        })
        this.fetchPosts()
    }
    componentWillUnmount() {
        PaStateMan.unregist_comp(this)
    }

    fetchPosts = () => {
        api_get_posts().then(res => {
            console.log(res)
            if(res){
                this.setState({
                    posts: res.posts
                })
            }
        })
    }

    render() {
        const postproxy=PaStateMan.getstate().postViewProxy()
        return (
            <React.Fragment>
                {this.state.posts.map((v)=>{
                    const selected=v.post_id==postproxy.cur_postid();
                    return <Box
                        key={v.post_id}
                        onClick={()=>{
                            if(postproxy.select_cur_post(
                                v.post_id,true
                            )){
                                this.props.fetchPostDetail()
                            }
                        }}
                    >
                        {selected?'_':''}
                        {v.title}</Box>
                })}
            </React.Fragment>
        );
    }
}

export default PostsPanel;