import React, {Component} from 'react';
import {Box} from "@mui/joy";
import index_styles from "@/pages/index.less";
import {curstyle} from "@/theme/curtheme";
import Headline from "@/layouts/headline/headline";
import PostsPanel from "@/layouts/posts_panel/posts_panel";
import PostView from "@/layouts/post_view/post_view";
import axios from "axios";
import {api_get_posts} from "@/store/apis/get_posts";
import {Post as PostStruct} from "@/store/models/post";
import {PaStateMan} from "@/utills/pa_state_man";
import {RouteControl} from "@/store/route_control";
import {baseUrl} from "@/store/apis/baseurl";
import {Course} from "@/store/models/course";

function getQueryString(name: string) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}

class Post extends Component {
    state = {
        post: {},
    }
    course_id=0

    fetchPost(){
        const curpid=PaStateMan.getstate().postid_selected_get()
        axios.post(baseUrl + '/get_post_detail?mock_login=123', {
            post_id: curpid
        }).then(res => {
            if (res.data.meta.code !== 0) {
                alert(res.data.meta.msg)
                return
            }
            this.setState({
                post: res.data.post_detail,
            })
        })
    }
    on_route_change(){//路由跳转后，将路由中的信息同步到内存，并拉去新的
        const pids=getQueryString("post_id");
        if(pids&&this){//撤回后可能当前页面没了
            const pid=parseInt(pids)
            //根据当前路径更新全局post选择变量，不跳转
            if(PaStateMan.getstate().postid_selected_set(
                pid,false)){
                //post号变换，拉取
                this.fetchPost()
            }
        }
    }
    componentDidMount() {
        // const pvproxy=PaStateMan.getstate().postViewProxy();
        // pvproxy.on_postview_mount()
        const pid=Number(getQueryString("post_id"))
        const cid=RouteControl.get_curcouseid_in_route()
        if(cid==undefined){
            RouteControl.back();
            return;
        }
        //1.根据路由courseid和state比对判断状态是否保留
        const coursep=PaStateMan.getstate().courseProxy();
        //不一致，说明状态没有保留，需要重新拉取
        if(coursep.getCurCourse().course_id!=cid){
            //加载课程细节以获取课程列表
            PaStateMan.getstate().courseProxy().fetchCourceDetailAndSetCur(
                {course_id:cid} as Course
            )
        }
        //2.路由pid判断，若不同，则更新内存，但不跳转
        if(PaStateMan.getstate().postid_selected_get()!=pid){
            PaStateMan.getstate().postid_selected_set(pid)
        }
        // PaStateMan.getstate().postViewProxy().
        //初次加载，需要拉取文章内容
        this.fetchPost()

        //页面切换，监听跳转路由
        window.addEventListener("popstate",
            this.on_route_change.bind(this));
    }
    componentWillUnmount() {
        //页面切换，取消监听跳转路由
        window.removeEventListener("popstate",
            this.on_route_change.bind(this));
    }

    render() {
        const content_height = "calc(100vh - 1px - " + curstyle().headlineheight + ")"
        return (
            <React.Fragment>
                <Box className={index_styles.headline}
                     sx={{
                         height: curstyle().headlineheight
                     }}
                >
                    <Headline/>
                </Box>
                <Box sx={{
                    display: "flex",
                    direction: "row"
                }}>
                    <Box sx={{
                        width: "38vw",
                        height: content_height,
                        borderWidth: "0px 1px",
                        borderStyle: "solid",
                        borderColor: curstyle().colors.gray_d
                    }}>
                        <PostsPanel
                            fetchPostDetail={()=>{
                                this.fetchPost()
                            }}
                        >
                        </PostsPanel>
                    </Box>
                    <Box sx={{
                        width: "72vw",
                        height: content_height
                    }}>
                        <PostView post={this.state.post}/>
                    </Box>
                </Box>
            </React.Fragment>
        );
    }
}

export default Post;