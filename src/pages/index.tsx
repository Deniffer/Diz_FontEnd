import index_styles from './index.less';
import reuse_styles from '../assets/reuseable.less'
import Headline from "@/layouts/headline/headline";
import ControlPanel from "@/layouts/control_panel/control_panel";
import {Box} from "@mui/joy";
import CourseList from "@/layouts/course_list/course_list";
import React, {Component} from 'react';
import {curstyle} from "@/theme/curtheme";
import PostViewList from "@/layouts/post_view_list/postview_list";
import {RouteControl} from "@/store/route_control";
import {PaStateMan} from "@/utills/pa_state_man";
import {Course} from "@/store/course_list";

class Index extends Component {
    on_route_change(){
        const cid=RouteControl.get_curcouseid_in_route()
        if(cid!=undefined){
            PaStateMan.getstate().courseProxy().fetchCourceDetailAndSetCur(
                {course_id:cid} as Course,false
            )
        }
    }
    componentDidMount() {

        //post部分发生路由跳转
        window.addEventListener("popstate",
            this.on_route_change.bind(this));

    }
    componentWillUnmount() {
        //post部分发生路由跳转
        window.addEventListener("popstate",
            this.on_route_change.bind(this));
    }

    render() {
        const headheight = curstyle().headlineheight
        const head = (<Box className={index_styles.headline}
                           sx={{
                               height: headheight
                           }}
        >
            <Headline></Headline>
        </Box>);

        return (
            <div className={index_styles.whole + " "
            + reuse_styles.col_flexcontainer}
            >
                {head}
                <Box className={reuse_styles.row_flexcontainer}
                     sx={{height: "calc(100vh - 1px - " + headheight + ")"}}
                >
                    <div className={index_styles.sidebar}>
                        <CourseList/>
                    </div>
                    <div className={index_styles.control_panel}>
                        <ControlPanel/>
                    </div>
                    <PostViewList>
                    </PostViewList>
                </Box>
            </div>
        );
    }
}

export default Index;