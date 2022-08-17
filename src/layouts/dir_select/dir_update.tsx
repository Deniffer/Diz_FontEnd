import React, {Component} from 'react';
import {Box, Button, List} from "@mui/joy";
import {Modal} from "antd";
import DirAdd from "@/layouts/dir_select/dir_add";
import DirBtnEdit from "@/layouts/dir_select/dir_btn_edit";
import axios from "axios";
import {baseUrl} from "@/store/apis/baseurl";
import {api_dirs_create} from "@/store/apis/dirs";
import DirAddSvg from "@/layouts/dir_select/dir_add_svg";

class DirUpdate extends Component {
    state = {
        dialogVisible: false
    }
    handleOnClick = () => {
        this.setState({
            dialogVisible: true
        })
    }

    handleSubmit(dirs) {
        // 修改课程分组的名字
        for (let i = 0; i < dirs.length; i++) {
            const name = this.refs["dir_" + dirs[i].directory_id].state.name
            if (name !== dirs[i].name) {
                console.log("todo: change", dirs[i].name, "to", name)
                this.refs["dir_" + dirs[i].directory_id].setState({
                    name: name,
                    clicked: false
                })
            }
        }
        // 创建新的课程分组
        const new_dirs = this.refs["new_dirs"].state.new_dirs
        for (let i = 0; i < new_dirs.length; i++) {
            if (!new_dirs[i].name) {
                alert("课程分组名字不能为空")
                return
            } else {
                new_dirs[i].course_id = this.props.course_id
            }
        }

        console.log(new_dirs)
        api_dirs_create(new_dirs).then(res=>{
            if(res){
                if (res.meta.code != 0) {
                    alert(res.meta.msg)
                    return
                }
                this.props.fetchCurCourse()
                this.setState({
                    dialogVisible: false
                })
                this.refs["new_dirs"].setState({
                    new_dirs: []
                })
            }
        })
    }

    render() {
        let dirs = this.props.dirs ? this.props.dirs : []
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
                               this.handleSubmit(dirs)
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
                                    <DirBtnEdit ref={"dir_" + dir_id} dir={dir} key={dir_id}>
                                    </DirBtnEdit>
                                )
                            })
                        }
                        <DirAdd ref={"new_dirs"}/>
                    </Box>
                </Modal>
            </React.Fragment>
        );
    }
}

export default DirUpdate;