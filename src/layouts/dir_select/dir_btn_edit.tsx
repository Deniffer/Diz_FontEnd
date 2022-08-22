import React, {Component} from 'react';
import {Box} from "@mui/joy";
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

    componentDidMount() {
    }

    handleOnChange = (e) => {
        console.log(e.target.value)
        this.setState({
            name: e.target.value
        })
    }

    onBlur = () => {
        this.setState({
            changed: this.state.name !== this.state.origin_name,
            clicked: false,
            name: this.state.name
        })
    }

    render() {
        return (
            !this.state.clicked ?
                <Box onClick={() => {
                    this.setState({
                        clicked: true
                    })
                }}
                >
                    <Tag color={this.state.changed ? curstyle().colors.main_l : curstyle().colors.gray_common}
                         cursor={"pointer"}>
                        {this.state.name}
                    </Tag>
                </Box> :
                <LittleInput defaultValue={this.props.dir.name}
                             onChange={(e) => {
                                 this.handleOnChange(e)
                             }}
                             onBlur={this.onBlur}
                >
                </LittleInput>
        );
    }
}

export default DirBtnEdit;