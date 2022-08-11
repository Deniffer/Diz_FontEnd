import React, {Component} from 'react';
import {Box, Button, TextField} from "@mui/joy";

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