import React, {Component} from 'react';
import {Box, Button, Chip, ChipDelete, TextField, Typography} from "@mui/joy";

class DirAdd extends Component {
    state = {
        new_dirs: []
    }

    handleOnClick = () => {
        let new_dirs = this.state.new_dirs
        new_dirs.push({
            idx: this.state.new_dirs.length,
            name: "haha"
        })
        this.setState({
            new_dirs: this.state.new_dirs
        })
    }

    handleOnClickDeleteChip = (idx: Number) => {
        let dirs = []
        for (let i = 0; i < this.state.new_dirs.length; i++) {
            if (this.state.new_dirs[i].idx != idx) {
                dirs.push(this.state.new_dirs[i])
            }
        }
        this.setState({
            new_dirs: dirs
        })
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.new_dirs.map(new_dir => {
                        return (
                            <Box sx={{width: "120px"}}>
                                <TextField size="sm" key={new_dir.idx} placeholder={"课程资料"}
                                           endDecorator={
                                               <Chip sx={{
                                                   cursor: "pointer"
                                               }} onClick={() => {
                                                   this.handleOnClickDeleteChip(new_dir.idx)
                                               }} color="success" size="sm" variant="soft">
                                                   ×
                                               </Chip>
                                           }>
                                </TextField>
                            </Box>
                        )
                    })
                }
                <Button sx={{}} onClick={this.handleOnClick} color={"success"} variant={"soft"}>
                    +
                </Button>
            </React.Fragment>
        );
    }
}

export default DirAdd;