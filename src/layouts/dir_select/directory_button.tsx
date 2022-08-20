import React, {Component} from 'react';
import {Box, Button} from "@mui/joy";
import {Tag} from "@/layouts/reuseable_comps/tag";
import {curstyle} from "@/theme/curtheme";

class DirectoryButton extends Component {
    render() {
        let clicked = this.props.clicked
        return (
            <Box onClick={() => {
                let new_clicked = !this.props.clicked
                this.props.handleOnChange({
                    dir_id: this.props.dir_id,
                    clicked: new_clicked
                })
            }}>
                <Tag cursor={"pointer"} color={clicked ? curstyle().colors.main_l : curstyle().colors.gray_common}>
                    {this.props.name}
                </Tag>
            </Box>
        );
    }
}

export default DirectoryButton;