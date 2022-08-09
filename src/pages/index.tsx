import yayJpg from '../assets/yay.jpg';
import index_styles from './index.less';
import reuse_styles from '../assets/reuseable.less'
import Headline from "@/layouts/headline/headline";
import ControlPanel from "@/layouts/control_panel/control_panel";
import {Box, CssVarsProvider} from "@mui/joy";
import {GlobalStyles} from '@mui/system';
import type {Theme} from '@mui/joy/styles';
// import  from "@mui/joy/styles/defaultTheme";
import {get_default_theme, bind_style_2_window} from "@/theme/default_theme";
import ClassList from "@/layouts/class_list/class_list";
import CourseList from "@/layouts/course_list/course_list";
import {PostViewList} from "@/layouts/postview_list/postview_list";
import {store} from "@/store/store";
import { Provider } from 'react-redux'
import React, {Component} from 'react';
import {curstyle} from "@/theme/curtheme";

class Index extends Component {
    // shouldComponentUpdate(nextProps: any, nextState: Readonly<{}>, nextContext: any): boolean {
    //     return true;
    // }

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
                            {/*<div className={index_styles.sidebar}>*/}
                            {/*    <ClassList></ClassList>*/}
                            {/*</div>*/}
                            <div className={index_styles.sidebar}>
                                <CourseList/>
                            </div>
                            <div className={index_styles.control_panel}>
                                <ControlPanel></ControlPanel>
                            </div>
                            <Box className={
                                reuse_styles.fillleft_flex
                            }
                                 sx={{
                                     height: "100%",
                                     overflowY: "scroll",
                                 }}
                            >
                                <PostViewList/>
                            </Box>
                        </Box>
                    </div>

        );
    }
}

export default Index;