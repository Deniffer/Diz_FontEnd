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

class $CourseId extends Component {
    render() {
        return (
            <Provider store={store}>
                {/* nav bar */}
                <Box className={index_styles.headline}
                     sx={{
                         height: "60px"
                     }}
                >
                    <Headline/>
                </Box>

                <Button onClick={() => window.history.back()}
                        sx={{
                            left: "328px",
                            top: "26px"
                        }}>
                    <Arrow/>
                </Button>
                <Box sx={{

                }}>
                    <CourseBar/>
                </Box>

                <Box sx={{
                    top: "137px"
                }}
                     className={$course_id_styles.gray_outline
                     }>
                </Box>
            </Provider>
        );
    }
}

export default $CourseId;