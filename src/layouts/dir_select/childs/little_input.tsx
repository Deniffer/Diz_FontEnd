import React, {Component} from 'react';
import {Box} from "@mui/joy";
import li from "./little_input.less"

class LittleInput extends Component {
    componentDidMount() {
        this.refs.input.focus()
    }

    render() {
        return (
            <Box sx={{
                display: this.props.display
            }} onKeyDown={(e) => {
                if (e.code === 'Enter') {
                    this.props.onBlur()
                }
            }}>
                <input className={li.little_input} placeholder={this.props.placeholder}
                       onChange={this.props.onChange} value={this.props.value}
                       defaultValue={this.props.defaultValue}
                       onBlur={this.props.onBlur}
                       ref={"input"}
                >
                </input>
            </Box>
        );
    }
}

export default LittleInput;