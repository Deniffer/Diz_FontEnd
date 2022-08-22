import React, {PureComponent} from 'react';
import {Box, Button, Typography} from "@mui/joy";
import reuse from "@/assets/reuseable.less";
import {curstyle} from "@/theme/curtheme";
import Arrow from "@/layouts/reuseable_comps/arrow";
import $course_id_styles from "@/pages/create_post/$course_id.less";
import cp from "@/layouts/control_panel/control_panel.less";

interface Prop {
    handlePublishPostClick: any
}

class CourseBar extends PureComponent<Prop> {
    render() {
        return (
            <React.Fragment>
                <Box
                    className={reuse.row_flex2side_container}
                    sx={{
                        alignItems: "center"
                    }}>
                    <Box className={reuse.row_flex2side_container}
                         sx={{
                             alignItems: "center",
                             gap: curstyle().gap.common
                         }}
                    >
                        <Box onClick={() => window.history.back()}
                             sx={{
                                 cursor: "pointer"
                             }}>
                            <Arrow/>
                        </Box>
                        <svg width="37" height="37" viewBox="0 0 60 60" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <rect width="60" height="60" rx="8" fill="#FBC0D5"/>
                            <path
                                d="M19.0352 39.2958H45.4225V14.6479C45.4225 12.706 43.8433 11.1267 41.9014 11.1267H19.0141C16.8908 11.1267 13.7324 12.5334 13.7324 16.4084V41.0563C13.7324 44.9313 16.8908 46.338 19.0141 46.338H45.4225V42.8169H19.0352C18.2218 42.7958 17.2535 42.4753 17.2535 41.0563C17.2535 40.8785 17.2693 40.7201 17.2957 40.5757C17.4929 39.5616 18.3239 39.3134 19.0352 39.2958ZM23.676 21.0598C24.4088 20.3364 25.3971 19.9307 26.4269 19.9307C27.4567 19.9307 28.445 20.3364 29.1778 21.0598L29.5721 21.4454L29.9648 21.0598C30.6979 20.3363 31.6865 19.9305 32.7165 19.9305C33.7466 19.9305 34.7352 20.3363 35.4683 21.0598C35.8319 21.4096 36.1212 21.8291 36.3188 22.2933C36.5164 22.7576 36.6183 23.2569 36.6183 23.7614C36.6183 24.266 36.5164 24.7653 36.3188 25.2295C36.1212 25.6937 35.8319 26.1133 35.4683 26.463L29.5739 32.2535L23.6778 26.463C23.3138 26.1135 23.0242 25.6941 22.8263 25.2299C22.6284 24.7658 22.5263 24.2664 22.5261 23.7618C22.5259 23.2572 22.6277 22.7578 22.8253 22.2935C23.0229 21.8292 23.3123 21.4096 23.676 21.0598Z"
                                fill="#F22D74"/>
                        </svg>
                        <Typography className={cp.listitem} level="h6">
                            {this.props.cur_course.name}
                        </Typography>
                    </Box>
                    <Button variant="solid" color="primary"
                            sx={{
                                background: curstyle().colors.main_s
                            }}
                            onClick={this.props.handlePublishPostClick}
                    >
                        发布
                    </Button>

                    <Box sx={{
                        top: "132px",
                        width: this.props.width,
                    }}
                         className={$course_id_styles.gray_outline}>
                    </Box>
                </Box>
            </React.Fragment>
        );
    }
}

export default CourseBar;