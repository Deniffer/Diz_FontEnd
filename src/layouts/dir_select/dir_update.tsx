import React, {Component} from 'react';
import {Box, Button, List} from "@mui/joy";
import {Modal} from "antd";
import DirAdd from "@/layouts/dir_select/dir_add";
import {api_dirs_create} from "@/store/apis/dirs";
import DirAddSvg from "@/layouts/dir_select/dir_add_svg";
import {PaStateMan} from "@/utills/pa_state_man";
import DirectoryButton from "@/layouts/dir_select/directory_button";
import {Course} from "@/store/models/course";
import {api_post_create, api_post_dir_rel_create} from "@/store/apis/post_create";

class DirUpdate extends Component {
    state = {
        dialogVisible: false,
        new_dirs: [],
        post_id: this.props.post_id,
        dirs: []
    }

    handleOnClick = () => {
        this.setState({
            dialogVisible: true
        })
    }

    handleSubmit() {
        // 创建新的课程分组
        const new_dirs = this.state.new_dirs
        let course_id = PaStateMan.getstate().courseProxy().getCurCourse().course_id
        for (let i = 0; i < new_dirs.length; i++) {
            new_dirs[i].course_id = course_id
        }
        console.log(new_dirs)
        if (new_dirs.length > 0) {
            api_dirs_create(new_dirs).then(res => {
                if (res) {
                    if (res.meta.code != 0) {
                        alert(res.meta.msg)
                        return
                    }
                    let dirs = res.directories ? res.directories : []
                    let directory_ids = []
                    for (let i = 0; i < dirs.length; i++) {
                        directory_ids.push(dirs[i].directory_id)
                    }
                    let req = {
                        directory_ids: directory_ids,
                        post_id: this.state.post_id,
                        course_id: course_id
                    }
                    api_post_dir_rel_create(req).then(
                        res => {
                            if (res.meta.code !== 0) {
                                alert("创建分组与帖子的关系失败了呜呜呜", res.meta.code)
                            }
                        }
                    )
                    window.location.reload()
                }
            })
        }
    }

    handle_dir_click = (e) => {
        let dirs = this.state.dirs
        for (let i = 0; i < dirs.length; i++) {
            console.log(dirs[i].directory_id, e.dir_id)
            if (dirs[i].directory_id === e.dir_id) {
                dirs[i].clicked = e.clicked
            }
        }
        this.setState({
            dirs: dirs
        })
    }

    checkAndSet = () => {
        const cur_course = PaStateMan.getstate().courseProxy().getCurCourse()
        if (cur_course.course_id > 0 && this.state.post_id !== this.props.post_id) {
            const all_dirs = PaStateMan.getstate().courseProxy().getCurCourse().directories
            let dirs = []
            for (let i = 0; i < all_dirs.length; i++) {
                let clicked = false
                for (let j = 0; j < this.props.dirs.length; j++) {
                    if (all_dirs[i].directory_id === this.props.dirs[j].directory_id) {
                        clicked = true
                    }
                }
                dirs.push({
                    directory_id: all_dirs[i].directory_id,
                    name: all_dirs[i].name,
                    clicked: clicked
                })

            }
            this.setState({
                new_dirs: [],
                post_id: this.props.post_id,
                dirs: dirs
            })
        }
    }

    handle_new_dir_change = (dirs) => {
        this.setState({
            new_dirs: dirs
        })
    }

    render() {
        this.checkAndSet()
        let dirs = this.state.dirs
        return (
            <React.Fragment>
                <Box onClick={this.handleOnClick} sx={{
                    cursor: "pointer"
                }}>
                    <DirAddSvg>
                    </DirAddSvg>
                </Box>

                <Modal title="编辑帖子分组" visible={this.state.dialogVisible}
                       onCancel={() => {
                           this.setState({
                               dialogVisible: false
                           })
                       }}
                       footer={[
                           <Button onClick={() => {
                               this.handleSubmit()
                           }}>
                               保存
                           </Button>
                       ]}
                >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: this.props.gap,
                        flexWrap: "wrap",
                    }}>
                        {
                            dirs.map(dir => {
                                let dir_id = dir.directory_id
                                return (
                                    <Box key={dir_id}>
                                        <DirectoryButton
                                            clicked={dir.clicked}
                                            dir_id={dir_id}
                                            name={dir.name}

                                            handleOnChange={(dir_id, clicked) => {
                                                this.handle_dir_click(dir_id, clicked)
                                            }}
                                        >
                                        </DirectoryButton>
                                    </Box>
                                )
                            })
                        }
                        <DirAdd handleOnChange={this.handle_new_dir_change} ref={"new_dirs"}/>
                    </Box>
                </Modal>
            </React.Fragment>
        );
    }
}

export default DirUpdate;