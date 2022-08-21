import React, {Component} from 'react';
import {Box, Button, TextField, Typography} from "@mui/joy";
import BraftEditor, {EditorState} from "braft-editor";
import 'braft-editor/dist/output.css'
import {Tag} from "@/layouts/reuseable_comps/tag";
import {get_dir_color} from "@/utills/computils";
import DirUpdate from "@/layouts/dir_select/dir_update";
import BraftEditorCustom from "@/layouts/braft_editor_custom/braft_editor_custom";
import 'braft-editor/dist/index.css';
import {curstyle} from "@/theme/curtheme";
import {api_post_create, api_post_update} from "@/store/apis/post_create";

function edit_svg() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M18.988 2.01199L21.988 5.01199L19.701 7.29999L16.701 4.29999L18.988 2.01199ZM8 16H11L18.287 8.71299L15.287 5.71299L8 13V16Z"
                fill="#96979C"/>
            <path
                d="M19 19H8.158C8.132 19 8.105 19.01 8.079 19.01C8.046 19.01 8.013 19.001 7.979 19H5V5H11.847L13.847 3H5C3.897 3 3 3.896 3 5V19C3 20.104 3.897 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V10.332L19 12.332V19Z"
                fill="#96979C"/>
        </svg>
    )
}


class PostView extends Component {
    state = {
        editing: false,
        content: this.props.post.content,
        title: this.props.post.title,
        post_id: this.props.post.post_id
    }
    edit_width = "45vw"
    title_viewing = () => {
        return (
            <Typography sx={{
                left: 0,
            }} level="h4">
                {this.props.post ? this.props.post.title : "胡乱写写"}
            </Typography>
        )
    }

    title_editing = () => {
        return (
            <Box sx={{
                width: this.edit_width,
                marginLeft: "32px",
            }}>
                <TextField fullWidth
                           defaultValue={this.props.post.title}
                           value={this.state.title}
                           onChange={this.handleTitleOnChange}
                           sz="lg"/>
            </Box>
        )
    }

    handleEditorChange = (editorState: EditorState) => {
        this.setState({
            content: editorState.toRAW()
        })
    }

    handleTitleOnChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    content_viewing = () => {
        const content = BraftEditor.createEditorState(this.props.post.content)
        return (
            <Box sx={{
                marginTop: "20px",
            }} className="braft-output-content"
                 dangerouslySetInnerHTML={{__html: content.toHTML()}}>
            </Box>
        )
    }

    handleSubmit = () => {
        api_post_update({
            post_id: this.props.post.post_id,
            content: this.state.content,
            title: this.state.title
        }).then(res => {
            if (res.meta.code === 0) {
                window.location.reload()
            }
        })
    }

    content_editing = () => {
        return (
            <React.Fragment>
                <Box className="editor-wrapper" sx={{
                    width: this.edit_width,
                    marginTop: "20px",
                    marginLeft: "32px",
                    marginBottom: "60px",
                }}>
                    <BraftEditorCustom placeholder={this.state.placeholder}
                                       handleEditorChange={this.handleEditorChange}
                                       defaultValue={this.props.post.content}
                                       height={"50vh"}
                    >
                    </BraftEditorCustom>
                </Box>
                <Box sx={{
                    border: "1px solid rgba(68, 183, 94, 0.2)",
                }}>

                </Box>
                <Button sx={{
                    marginTop: "12px",
                    marginBottom: "12px",
                    marginLeft: "calc(45vw - 32px)"
                }} onClick={() => {
                    this.handleSubmit()
                }}>
                    保存
                </Button>
            </React.Fragment>
        )
    }

    render() {
        if (this.props.post.post_id !== this.state.post_id) {
            this.setState({
                post_id: this.props.post.post_id,
                content: this.props.post.content,
                title: this.props.post.title,
                editing: false
            })
        }
        let post = this.props.post
        const dirs = post.directories ? post.directories : []
        let color_idx = 0
        return (
            <React.Fragment>
                <Box sx={{
                    width: "50vw",
                    marginTop: "45px",
                    marginLeft: "45px",
                }}>
                    {/* 文章显示/编辑区域 */}
                    <Box sx={{
                        border: !this.state.editing ? "" : "3px solid rgba(68, 183, 94, 0.2)",
                        borderRadius: "15px"
                    }}>
                        <Box sx={{
                            display: "flex",
                            direction: "row",
                            marginTop: "32px"
                        }}>
                            {!this.state.editing ? this.title_viewing() : this.title_editing()}
                            <Box sx={{
                                right: 0,
                                margin: "auto",
                                marginRight: "0",
                                cursor: "pointer"
                            }} onClick={() => {
                                this.setState({
                                    editing: true
                                })
                            }}>
                                {!this.state.editing ? edit_svg() : null}
                            </Box>
                        </Box>
                        {/* 文章正文内容 */}
                        {!this.state.editing ?
                            this.content_viewing() :
                            this.content_editing()
                        }
                    </Box>

                    {/* 帖子分组 */}
                    <Box sx={{
                        display: "flex",
                        direction: "row",
                        justifyContent: "space-between",
                        marginTop: "30px",
                        flexWrap: "warp",
                        marginBottom: "30px"
                    }}>
                        <Box sx={{
                            display: "flex",
                            direction: "row",
                            gap: 1,
                            flexWrap: "warp",
                        }}>
                            {
                                dirs.map(dir => {
                                    let idx = color_idx
                                    color_idx++
                                    console.log("key:", dir.directory_id)
                                    return (
                                        <Tag cursor="pointer"
                                             key={dir.directory_id}
                                             color={get_dir_color(idx)}
                                        >
                                            {dir.name}
                                        </Tag>
                                    )
                                })
                            }
                            <Box sx={{
                                cursor: "pointer"
                            }}>
                                <DirUpdate post_id={post.post_id}
                                           gap={1}
                                           dirs={dirs}>
                                </DirUpdate>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                color: curstyle().colors.font_second,
                                paddingTop: curstyle().gap.s,
                            }}
                        >
                            {post.updated_at ? "最新编辑: " + post.updated_at : ""}
                        </Box>
                    </Box>
                </Box>
            </React.Fragment>
        )
    }
}

export default PostView;