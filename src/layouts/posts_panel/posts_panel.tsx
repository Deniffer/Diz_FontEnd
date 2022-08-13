import React, {Component} from 'react';
import {Box} from "@mui/joy";
import {Post as PostStruct} from "@/store/models/post";
import {api_get_posts} from "@/store/apis/get_posts";
import {PaStateMan} from "@/utills/pa_state_man";

//post页面 列表
class PostsPanel extends Component {
    state={
        posts:[] as PostStruct[]
    }
    componentDidMount() {
        PaStateMan.regist_comp(this, (registval, state) => {
            registval(state.course_cur.course_id,()=>{
                this.fetchPosts()
            });
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
        return (
            <React.Fragment>
                {this.state.posts.map((v)=>{
                    return <Box
                        key={v.post_id}
                    >{v.title}</Box>
                })}
            </React.Fragment>
        );
    }
}

export default PostsPanel;