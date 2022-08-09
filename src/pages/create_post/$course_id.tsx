import React, {Component} from 'react';
import {Box, Button} from "@mui/joy";
import index_styles from "@/pages/index.less";
import Headline from "@/layouts/headline/headline";
import {GlobalStoreState, store} from "@/store/store";
import {connect, Provider} from "react-redux";
import $course_id_styles from "./$course_id.less";
import Arrow from "@/layouts/reuseable_comps/arrow";
import {Course} from "@/store/course_list";
import CourseBar from "@/layouts/course_bar/course_bar";
import {curstyle} from "@/theme/curtheme";
import reuse from "@/assets/reuseable.less"

class $CourseId extends Component {
    render() {
        return (
            <Provider store={store}>
                {/* nav bar */}
                <Box className={index_styles.headline}
                     sx={{
                         height: curstyle().headlineheight
                     }}
                >
                    <Headline/>
                </Box>
                <Box
                    sx={{
                        width:"800px",
                        margin:"auto",
                    }}>
                    <Box
                        className={reuse.row_flex2side_container}
                        sx={{
                            alignItems:"center"
                        }}>
                        <Box className={reuse.row_flex2side_container}
                             sx={{
                                 alignItems:"center",
                                 gap:curstyle().gap.common
                             }}
                        >
                            <Box onClick={() => window.history.back()}
                                 sx={{
                                     cursor:"pointer"
                                     // left: "328px",
                                     // top: "26px"
                                 }}>
                                <Arrow/>
                            </Box>
                            {/*<Box sx={{*/}

                            {/*}}>*/}
                            <CourseBar/>
                            {/*</Box>*/}
                        </Box>
                        <Button variant="solid" color="primary"
                                sx={{
                                    background:curstyle().colors.main_s
                                }}
                        >
                            发布
                        </Button>

                        {/*<Box sx={{*/}
                        {/*    top: "137px"*/}
                        {/*}}*/}
                        {/*     className={$course_id_styles.gray_outline*/}
                        {/*     }>*/}
                        {/*</Box>*/}
                    </Box>
                </Box>

            </Provider>
        );
    }
}

export default $CourseId;