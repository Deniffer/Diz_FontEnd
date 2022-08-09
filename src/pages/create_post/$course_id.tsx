import React, {Component} from 'react';
import {Box, Button} from "@mui/joy";
import index_styles from "@/pages/index.less";
import Headline from "@/layouts/headline/headline";
import {store} from "@/store/store";
import {Provider} from "react-redux";
import $course_id_styles from "./$course_id.less";
import Arrow from "@/layouts/reuseable_comps/arrow";

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

                <Button sx={{
                    left: "328px",
                    top: "26px"
                }}>
                    <Arrow/>
                </Button>

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