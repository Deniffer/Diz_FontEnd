import React, {Component} from 'react';
import {Box, Typography} from "@mui/joy";
import DirectoryButton from "@/layouts/dir_select/directory_button";
import 'antd/dist/antd.css';
import DirUpdate from "@/layouts/dir_select/dir_update";

class DirSelect extends Component {
    render() {
        let dirs = this.props.cur_course.directories
        dirs = dirs ? dirs : []
        const gap = 1
        return (
            <React.Fragment>
                <Typography>
                    请选择帖子分组
                </Typography>
                <Box sx={{
                    marginTop: "15px",
                    display: "flex",
                    direction: "row",
                    gap: gap,
                }}>
                    {
                        dirs ? dirs.map(dir => {
                            let clicked = false
                            return (
                                <Box key={dir.directory_id}>
                                    <DirectoryButton handleOnChange={this.props.handleDirOnChange} name={dir.name}
                                                     clicked={clicked} dir_id={dir.directory_id}>
                                    </DirectoryButton>
                                </Box>
                            )
                        }) : null
                    }
                    <DirUpdate fetchCurCourse={this.props.fetchCurCourse}
                               course_id={this.props.cur_course.course_id}
                               gap={gap}
                               dirs={dirs}>
                    </DirUpdate>
                </Box>
            </React.Fragment>
        );
    }
}

export default DirSelect;