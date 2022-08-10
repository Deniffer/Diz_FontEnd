import React, {Component} from 'react';
import {Button} from "@mui/joy";

class DirectoryButton extends Component {
    state = {
        clicked: this.props.clicked
    }

    render() {
        let clicked = this.state.clicked
        return (
            <Button color={clicked ? "success" : "neutral"}
                    variant={clicked ? "solid" : "soft"}
                    onClick={() => {
                        let new_clicked = !this.state.clicked
                        this.setState({
                            clicked: new_clicked
                        })
                        this.props.handleOnChange({
                            dir_id: this.props.dir_id,
                            clicked: new_clicked
                        })
                    }}

            >
                {this.props.name}
            </Button>
        );
    }
}

export default DirectoryButton;