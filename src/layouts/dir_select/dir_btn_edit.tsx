import React, {Component} from 'react';
import {Box, Button, TextField} from "@mui/joy";
import {Tag} from "@/layouts/reuseable_comps/tag";
import {curstyle} from "@/theme/curtheme";
import LittleInput from "@/layouts/dir_select/childs/little_input";

class DirBtnEdit extends Component {
    state = {
        clicked: false,
        origin_name: this.props.dir.name,
        name: this.props.dir.name,
        changed: false
    }

    handleOnChange = (e) => {
        console.log(e.target.value)
        this.setState({
            name: e.target.value
        })
    }

    onBlur = () => {
        console.log("lose!", this.state.name)
        this.setState({
            changed: this.state.name !== this.state.origin_name,
            clicked: false,
            name: this.state.name
        })
    }

    render() {
        return (
            <React.Fragment>
                <Box onClick={() => {
                         this.setState({
                             clicked: true
                         })
                     }}
                >
                    <Box sx={{
                        display: this.state.clicked ? "none" : ""
                    }}>
                        <Tag color={this.state.changed ? curstyle().colors.main_l : curstyle().colors.gray_common} cursor={"pointer"}>
                            {this.state.name}
                        </Tag>
                    </Box>
                </Box>
                <LittleInput defaultValue={this.props.dir.name}
                             onChange={(e) => {
                                 this.handleOnChange(e)
                             }}
                             onBlur={this.onBlur}
                             display={this.state.clicked ? "" : "none"}
                >
                </LittleInput>
            </React.Fragment>
        );
    }
}

export default DirBtnEdit;