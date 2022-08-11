import index_styles from './index.less';
import reuse_styles from '../assets/reuseable.less'
import Headline from "@/layouts/headline/headline";
import ControlPanel from "@/layouts/control_panel/control_panel";
import {Box} from "@mui/joy";
import CourseList from "@/layouts/course_list/course_list";
import React, {Component} from 'react';
import {curstyle} from "@/theme/curtheme";
import PostViewList from "@/layouts/post_view_list/postview_list";

class Index extends Component {
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
                    <Box className={
                        reuse_styles.fillleft_flex
                    }
                         sx={{
                             height: "100%",
                             overflowY: "scroll",
                         }}
                    >
                       <PostViewList>
                       </PostViewList>
                    </Box>
                </Box>
            </div>
        );
    }
}

export default Index;