import React, {Component} from 'react';
import {Box, TextField} from "@mui/joy";
import $course_id_styles from "@/pages/create_post/$course_id.less";
import {EditorState} from 'braft-editor';
import 'braft-editor/dist/index.css';
import DirSelect from "@/layouts/dir_select/dir_select";
import {CreatePostRequest} from "@/store/apis/post_create";
import BraftEditorCustom from "@/layouts/braft_editor_custom/braft_editor_custom";


class PostForm extends Component {
    state = {
        // new_post和new_dirs的状态会直接被上层调用
        new_post: new CreatePostRequest(
            "",
            "",
            [],
            "",
            0,
            "note"
        ),
        new_dirs: [],
        placeholder: "请输入正文..."
    }

    handleEditorChange = (editorState: EditorState) => {
        let new_post = this.state.new_post
        new_post.content = editorState.toRAW()
        new_post.abstract = editorState.toText().substring(0, 300)
        this.setState({
            new_post: new_post
        })
        this.setState({
            placeholder: ""
        })
    }

    handleTypeOnChange = (e: any) => {
        let new_post = this.state.new_post
        new_post.type = e.target.value
        this.setState({
            new_post: new_post
        })
    }

    handleTitleOnChange = (e: any) => {
        let new_post = this.state.new_post
        new_post.title = e.target.value
        this.setState({
            new_post: new_post
        })
    }

    arr_remove(arr: [], e: Number) {
        if (!arr) {
            return arr
        }
        let new_arr = []
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== e) {
                new_arr.push(arr[i])
            }
        }
        return new_arr
    }

    handleDirOnChange = (e: any) => {
        console.log(e)
        let dir_ids = this.state.new_post.directory_ids
        if (e.clicked) {
            if (dir_ids) {
                dir_ids.push(e.dir_id)
            } else {
                dir_ids = [e.dir_id]
            }
        } else {
            dir_ids = this.arr_remove(dir_ids, e.dir_id)
        }
        dir_ids.sort()
        this.state.new_post.directory_ids = dir_ids
        this.setState({
            new_post: this.state.new_post
        })
    }

    handleNewDirsOnChange = (new_dirs) => {
        this.setState({
            new_dirs: new_dirs
        })
    }

    render() {
        const marginLeft = "20px"
        return (
            <React.Fragment>
                {/*<Box sx={{*/}
                {/*    top: "205px",*/}
                {/*    width: this.props.width,*/}
                {/*}}*/}
                {/*     className={$course_id_styles.gray_outline*/}
                {/*     }>*/}
                {/*</Box>*/}
                {/*<Box className={reuse.row_flex2side_container}*/}
                {/*     sx={{*/}
                {/*         marginTop: "40px",*/}
                {/*         marginLeft: marginLeft,*/}
                {/*     }}*/}
                {/*>*/}
                {/*    <RadioGroup*/}
                {/*        defaultValue="post"*/}
                {/*        name="controlled-radio-buttons-group"*/}
                {/*    >*/}
                {/*        <List row={true} sx={{*/}
                {/*            gap: 5*/}
                {/*        }}>*/}
                {/*            <Radio onChange={this.handleTypeOnChange} variant="soft" color="success" value="post"*/}
                {/*                   label="帖子"/>*/}
                {/*            <Radio onChange={this.handleTypeOnChange} variant="soft" color="success"*/}
                {/*                   value="question"*/}
                {/*                   label="提问"/>*/}
                {/*        </List>*/}
                {/*    </RadioGroup>*/}
                {/*</Box>*/}

                <Box sx={{
                    width: '100%',
                    marginTop: "55px",
                    height: "720px",
                }}>
                    <TextField onChange={this.handleTitleOnChange} sx={{}} size="lg" placeholder="请输入标题"
                               variant="plain"/>
                    <Box sx={{
                        marginTop: "20px"
                    }}>
                        <BraftEditorCustom placeholder={this.state.placeholder}
                                           handleEditorChange={this.handleEditorChange}>
                        </BraftEditorCustom>
                    </Box>
                    <Box sx={{
                        width: this.props.width,
                        marginTop: "40px",
                    }}>
                        <Box sx={{
                            width: this.props.width,
                        }}
                             className={$course_id_styles.gray_outline}>
                        </Box>
                        <Box sx={{
                            marginLeft: marginLeft,
                            paddingTop: "25px",
                            marginBottom: "25px",
                        }}>
                            <DirSelect dirs={this.state.new_post.directory_ids}
                                fetchCurCourse={this.props.fetchCurCourse}
                                cur_course={this.props.cur_course}
                                handleDirOnChange={this.handleDirOnChange}
                                handleNewDirsOnChange={this.handleNewDirsOnChange}
                            />
                        </Box>
                        <Box sx={{
                            width: this.props.width,
                        }}
                             className={$course_id_styles.gray_outline}>
                        </Box>
                    </Box>
                </Box>
            </React.Fragment>
        )
    }
}

export default PostForm;