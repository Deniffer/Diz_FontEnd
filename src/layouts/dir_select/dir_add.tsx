import React, {Component} from 'react';
import {Box} from "@mui/joy";
import DirAddSvg from "@/layouts/dir_select/dir_add_svg";
import LittleInput from "@/layouts/dir_select/childs/little_input";
import {Tag} from "@/layouts/reuseable_comps/tag";
import {curstyle} from "@/theme/curtheme";

function get_cancel_svg() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L4 12" stroke="#96979C" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 4L12 12" stroke="#96979C" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

class DirAdd extends Component {
    state = {
        new_dirs: []
    }

    componentDidMount() {
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.code === 'Enter') {
                for (let i = 0; i < this.state.new_dirs.length; i++) {
                    if (this.state.new_dirs[i].focused) {
                        this.onBlur(i)
                    }
                }
            }
        })
    }

    handleOnClick = () => {
        let new_dirs = this.state.new_dirs
        new_dirs.push({
            idx: this.state.new_dirs.length,
            name: "",
            focused: true
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

    handleDirNameOnChange = (value, idx) => {
        let dirs = this.state.new_dirs
        for (let i = 0; i < dirs.length; i++) {
            if (dirs[i].idx === idx) {
                dirs[i].name = value
            }
        }
        this.setState({
            new_dirs: dirs
        })
    }

    onBlur = (idx: Number) => {
        let dirs = this.state.new_dirs
        let new_dirs = []
        for (let i = 0; i < dirs.length; i++) {
            if (dirs[i].idx === idx) {
                dirs[i].focused = false
                if (dirs[i].name !== "") {
                    new_dirs.push(dirs[i])
                }
            } else {
                new_dirs.push(dirs[i])
            }
        }
        this.setState({
            new_dirs: new_dirs
        })
    }
    onFocus = (idx: Number) => {
        let dirs = this.state.new_dirs
        for (let i = 0; i < dirs.length; i++) {
            if (dirs[i].idx === idx) {
                dirs[i].focused = true
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
                            new_dir.focused ?
                                <Box>
                                    <LittleInput key={new_dir.idx} placeholder={"课程资料"}
                                                 onChange={(e) => {
                                                     this.handleDirNameOnChange(e.target.value, new_dir.idx)
                                                 }}
                                                 value={new_dir.name}
                                                 onBlur={() => {
                                                     this.onBlur(new_dir.idx)
                                                 }}
                                    >
                                    </LittleInput>
                                </Box> :
                                <Box>
                                    <Tag cursor=""
                                         color={curstyle().colors.main_l}>
                                        <Box sx={{
                                            display: "flex",
                                            direction: "row",
                                        }}>
                                            <Box sx={{
                                                cursor: "pointer"
                                            }} onClick={() => {
                                                this.onFocus(new_dir.idx)
                                            }}>
                                                {new_dir.name}
                                            </Box>
                                            <Box sx={{
                                                marginTop: "3px",
                                                marginLeft: "10px",
                                                cursor: "pointer"
                                            }} onClick={() => {
                                                this.handleOnClickDeleteChip(new_dir.idx)
                                            }}>
                                                {get_cancel_svg()}
                                            </Box>
                                        </Box>
                                    </Tag>
                                </Box>
                        )
                    })
                }
                <Box onClick={this.handleOnClick}>
                    <DirAddSvg>
                    </DirAddSvg>
                </Box>
            </React.Fragment>
        );
    }
}

export default DirAdd;