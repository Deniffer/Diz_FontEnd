import React, {Component} from 'react';
import {Box, Button, TextField} from "@mui/joy";
import {Tag} from "@/layouts/reuseable_comps/tag";
import {curstyle} from "@/theme/curtheme";

class DirBtnEdit extends Component {
    state = {
        clicked: false,
        name: this.props.dir.name
    }

    handleOnChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    render() {
        return (
            <React.Fragment>
                <Box>
                    <Box onClick={() => {
                        this.setState({
                            clicked: true
                        })
                    }}
                         sx={{
                             display: this.state.clicked ? "none" : ""
                         }}>
                        <Tag color={curstyle().colors.gray_common}>
                            {this.props.dir.name}
                        </Tag>
                    </Box>

                    <TextField sx={{
                        display: this.state.clicked ? "" : "none",
                        height: "25px",
                        width: "87px"
                    }} size="sm" defaultValue={this.props.dir.name}
                               onChange={(e) => {
                                   this.handleOnChange(e)
                               }}>
                    </TextField>
                </Box>
            </React.Fragment>
        );
    }
}

export default DirBtnEdit;