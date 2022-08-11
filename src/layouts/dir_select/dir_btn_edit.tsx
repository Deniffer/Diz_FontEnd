import React, {Component} from 'react';
import {Box, Button, TextField} from "@mui/joy";

class DirBtnEdit extends Component {
    state = {
        clicked: false
    }

    render() {
        return (
            <React.Fragment>
                <Box>
                    <Button color={"neutral"}
                            variant={"soft"}
                            onClick={() => {
                                this.setState({
                                    clicked: true
                                })
                            }}
                            sx={{
                                display: this.state.clicked ? "none" : ""
                            }}
                    >
                        {this.props.dir.name}
                    </Button>
                    <TextField sx={{
                        display: this.state.clicked ? "" : "none",
                        width: "100px"
                    }} size="sm" defaultValue={this.props.dir.name}>
                    </TextField>
                </Box>
            </React.Fragment>
        );
    }
}

export default DirBtnEdit;