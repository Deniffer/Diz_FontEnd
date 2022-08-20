import React, {Component, PureComponent} from 'react';
import {Box} from "@mui/joy";
import {Post as PostStruct} from "@/store/models/post";
import {api_get_posts} from "@/store/apis/get_posts";
import {PaStateMan} from "@/utills/pa_state_man";
import styled from "@emotion/styled";
import {curstyle} from "@/theme/curtheme";
import reuse from "@/assets/reuseable.less"

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
            console.log("fetch posts!!")
            if(res){
                this.setState({
                    posts: res.posts
                })
            }
        })
    }

    render() {
        const gstate=PaStateMan.getstate()
        const Bar = styled.div`
          cursor: pointer;
          /* Adapt the colors based on primary prop */

          &:hover {
            background: ${curstyle().colors.gray_common};
          }

          user-select: none;
          font-size: 1em;
          margin-right: ${curstyle().gap.common};
          margin-left: ${curstyle().gap.common};
          text-align: left;
          padding: ${curstyle().gap.m};
          //margin: 1em;
          //padding: 0.25em 1em;
          border: 0px solid palevioletred;
          border-radius: ${curstyle().radius.common};
        `;
        const FocusBar = styled.div`
          cursor: pointer;
          /* Adapt the colors based on primary prop */

          &:hover {
            background: ${curstyle().colors.gray_common};
          }

          user-select: none;
          font-size: 1em;
          margin-right: ${curstyle().gap.common};
          margin-left: ${curstyle().gap.common};
          text-align: left;
          padding: ${curstyle().gap.m};
          color:${curstyle().colors.main_s};
          //margin: 1em;
          //padding: 0.25em 1em;
          border: 0px solid palevioletred;
          border-radius: ${curstyle().radius.common};
        `;
        return (
            <Box sx={{
                // height:"100%",
                padding:curstyle().gap.common,
            }}>
                {this.state.posts.map((v)=>{
                    const selected=v.post_id==gstate.postid_selected_get();
                    if(selected){
                        return <FocusBar
                            className={reuse.trans_color_common}
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
                            {v.title}</FocusBar>
                    }else{
                        return <Bar
                            className={reuse.trans_color_common}
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
                            {v.title}</Bar>
                    }
                })}
            </Box>
        );
    }
}

export default PostsPanel;