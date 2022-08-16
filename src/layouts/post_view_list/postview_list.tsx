// @ts-ignore
import styled from "styled-components";
import {curstyle} from "@/theme/curtheme";
import React, {Component, Fragment} from "react";
import {PaStateMan} from "@/utills/pa_state_man";
import {PostViewBar} from "@/layouts/post_view_list/postview_bar";
import {api_get_posts} from "@/store/apis/get_posts";
import {Post} from "@/store/models/post";
import {Box} from "@mui/joy";
import reuse_styles from "@/assets/reuseable.less";
import InfiniteScroll from 'react-infinite-scroll-component';
import {Spin} from "antd";
import {LoadingOutlined} from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{
    fontSize: 24,
    color: curstyle().colors.main_s
}} spin/>;

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


interface State {
    posts: Post[],
}

interface Prop {

}

class PostViewList extends Component<Prop, State> {
    state = {
        posts: [] as Post[],
        has_more: false
    }

    //life
    componentDidMount() {
        PaStateMan.regist_comp(this, (registval, state) => {
            registval(state.course_cur.course_id, () => {
                this.fetchPosts()
            });
            registval(state.course_dir_id_selected, () => {
                this.fetchPosts()
            })
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
                this.state.posts.push(...res.posts)
                this.setState({
                    posts: this.state.posts,
                    has_more: res.has_more
                })
            }
        })
    }

    render() {
        const course_id = PaStateMan.getstate().courseProxy().getCurCourse().course_id

        return (
            <div id="scrollableDiv"
                 className={reuse_styles.fillleft_flex}
                 style={{
                     height: "100%",
                     overflow: 'auto'
                 }}
            >
                <InfiniteScroll
                    scrollableTarget="scrollableDiv"
                    dataLength={this.state.posts.length}
                    hasMore={this.state.has_more}
                    next={this.loadMoreData}
                    loader={
                        <Box sx={{
                            margin: "50px auto",
                            textAlign: "center",
                        }}>
                            <Spin indicator={antIcon}/>
                        </Box>
                    }
                >
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
                </InfiniteScroll>
            </div>
        )
    }
}

export default PostViewList;