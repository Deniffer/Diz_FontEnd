import React, {Component} from 'react';
import {Box, Button, Typography} from "@mui/joy";
import DirectoryButton from "@/layouts/dir_select/directory_button";

class DirSelect extends Component {
    render() {
        const dirs = this.props.cur_course.directories
        console.log(dirs)
        return (
            <React.Fragment>
                <Typography>
                    请选择帖子分组
                </Typography>
                <Box sx={{
                    marginTop: "15px",
                    display: "flex",
                    direction: "row",
                    gap: 1,
                }}>
                    {
                        dirs ? dirs.map(dir => {
                            let clicked = false
                            return (
                                <Box key={dir.directory_id}>
                                    <DirectoryButton name={dir.name} clicked={clicked}>
                                    </DirectoryButton>
                                </Box>
                            )
                        }) : null
                    }
                    <Button>
                        +
                    </Button>
                </Box>
            </React.Fragment>
        );
    }
}

export default DirSelect;