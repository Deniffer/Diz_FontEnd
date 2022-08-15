import React, {Component} from 'react';
import {Box} from "@mui/joy";
import li from "./little_input.less"

class LittleInput extends Component {
    render() {
        return (
            <Box sx={{
                display: this.props.display
            }}>
                <input className={li.little_input} placeholder={this.props.placeholder}
                       onChange={this.props.onChange} value={this.props.value}
                       defaultValue={this.props.defaultValue}
                       onBlur={this.props.onBlur}
                       autoFocus
                >
                </input>
            </Box>
        );
    }
}

export default LittleInput;