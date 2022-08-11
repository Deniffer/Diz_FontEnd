import React, {Component} from 'react';
import {Box, Button, List} from "@mui/joy";
import {Modal} from "antd";
import DirAdd from "@/layouts/dir_select/dir_add";
import DirBtnEdit from "@/layouts/dir_select/dir_btn_edit";

class DirUpdate extends Component {
    state = {
        dialogVisible: false
    }
    handleOnClick = () => {
        this.setState({
            dialogVisible: true
        })
    }

    render() {
        let dirs = this.props.dirs ? this.props.dirs : []
        return (
            <React.Fragment>
                <Button onClick={this.handleOnClick} color={"success"} variant={"soft"}>
                    +
                </Button>
                <Modal title="编辑帖子分组" visible={this.state.dialogVisible}
                       onCancel={() => {
                           this.setState({
                               dialogVisible: false
                           })
                       }}
                       footer={[
                           <Button>
                               保存
                           </Button>
                       ]}
                >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: this.props.gap,
                    }}>
                        {
                            dirs.map(dir => {
                                return (
                                    <DirBtnEdit dir={dir} key={dir.directory_id}>
                                    </DirBtnEdit>
                                )
                            })
                        }
                        <DirAdd/>
                    </Box>
                </Modal>
            </React.Fragment>
        );
    }
}

export default DirUpdate;