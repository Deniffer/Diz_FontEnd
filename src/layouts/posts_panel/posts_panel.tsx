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
            registval(state.post_id_selected)//切换文章需要重新渲染
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
        const gstate=PaStateMan.getstate()
        return (
            <React.Fragment>
                {this.state.posts.map((v)=>{
                    const selected=v.post_id==gstate.postid_selected_get();
                    return <Box
                        key={v.post_id}
                        onClick={()=>{
                            if(gstate.postid_selected_set(
                                v.post_id,true
                            )){
                                //有变化，更新文章内容
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