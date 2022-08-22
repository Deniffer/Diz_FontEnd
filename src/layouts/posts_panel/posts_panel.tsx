import React, {Component} from 'react';
import {Box} from "@mui/joy";
import {Post as PostStruct} from "@/store/models/post";
import {api_get_posts} from "@/store/apis/get_posts";
import {PaStateMan} from "@/utills/pa_state_man";
import styled from "@emotion/styled";
import {curstyle} from "@/theme/curtheme";
import reuse from "@/assets/reuseable.less"
import InfiniteScroll from 'react-infinite-scroll-component';
import {antIcon} from "@/layouts/post_view_list/postview_list";
import {Spin} from "antd";

//post页面 列表

class PostsPanel extends Component {
    state = {
        posts: [] as PostStruct[],
        has_more: false,
    }

    componentDidMount() {
        PaStateMan.regist_comp(this, (registval, state) => {
            registval(state.course_cur.course_id, () => {
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
        api_get_posts(0).then(res => {
            if (res) {
                this.setState({
                    posts: res.posts,
                    has_more: res.has_more
                })
            }
        })
    }

    loadMoreData = () => {
        api_get_posts(this.state.posts.length).then(res => {
            if (res) {
                let posts = this.state.posts
                posts.push(...res.posts)
                this.setState({
                    posts: posts,
                    has_more: res.has_more
                })
            }
        })
    }

    render() {
        const gstate = PaStateMan.getstate()
        const Bar = styled.div`
          cursor: pointer;
          /* Adapt the colors based on primary prop */

          &:hover {
            background: ${curstyle().colors.gray_common};
          }

          user-select: none;
          font-size: 1em;
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
          text-align: left;
          padding: ${curstyle().gap.m};
          color: ${curstyle().colors.main_s};
          //margin: 1em;
          //padding: 0.25em 1em;
          border: 0px solid palevioletred;
          border-radius: ${curstyle().radius.common};
        `;
        return (
            <Box id="posts_panel"
                 sx={{
                     height: "100%",
                     padding: curstyle().gap.xxl,
                     overflowY: "auto"
                 }}>
                <InfiniteScroll scrollableTarget="posts_panel"
                                dataLength={this.state.posts.length}
                                hasMore={this.state.has_more}
                                next={this.loadMoreData}
                                loader={
                                    <Box sx={{
                                        margin: "0 auto",
                                        textAlign: "center",
                                    }}>
                                        <Spin indicator={antIcon}/>
                                    </Box>
                                }
                >
                    {this.state.posts.map((v) => {
                        const selected = v.post_id == gstate.postid_selected_get();
                        if (selected) {
                            return <FocusBar
                                className={reuse.trans_color_common}
                                key={v.post_id}
                                onClick={() => {
                                    if (gstate.postid_selected_set(
                                        v.post_id, true
                                    )) {
                                        //有变化，更新文章内容
                                        this.props.fetchPostDetail()
                                    }
                                }}
                            >
                                {v.title}</FocusBar>
                        } else {
                            return <Bar
                                className={reuse.trans_color_common}
                                key={v.post_id}
                                onClick={() => {
                                    if (gstate.postid_selected_set(
                                        v.post_id, true
                                    )) {
                                        //有变化，更新文章内容
                                        this.props.fetchPostDetail()
                                    }
                                }}
                            >
                                {v.title}</Bar>
                        }
                    })}
                </InfiniteScroll>
            </Box>
        );
    }
}

export default PostsPanel;