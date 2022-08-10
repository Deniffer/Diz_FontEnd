import React, {Component} from 'react';
import {Box, Button, Typography} from "@mui/joy";

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
                            return <Button sx={{
                                "borderRadius": "4px",
                            }} variant="soft" color="neutral" key={dir.directory_id}>
                                {dir.name}
                            </Button>
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