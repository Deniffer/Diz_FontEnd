import React, {Component} from 'react';
import {Box, List, RadioGroup, Sheet, TextField, Typography} from "@mui/joy";
import $course_id_styles from "@/pages/create_post/$course_id.less";
import reuse from "@/assets/reuseable.less";
import Radio from '@mui/joy/Radio';
import BraftEditor, {EditorState} from 'braft-editor';
import 'braft-editor/dist/index.css'
import DirSelect from "@/layouts/dir_select/dir_select";


class PostForm extends Component {
    state = {
        new_post: {
            type: "post",
            course_id: 0,
            content: "",
            title: "",
            directory_ids: [],
        },
    }

    handleEditorChange = (editorState: EditorState) => {
        let new_post = this.state.new_post
        new_post.content = editorState.toHTML()
        this.setState({
            new_post: new_post
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
                new_arr.push(e)
            }
        }
        return new_arr
    }

    handleDirOnChange = (e: any) => {
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

    render() {
        const marginLeft = "20px"
        return (
            <React.Fragment>
                <Box sx={{
                    top: "205px",
                    width: this.props.width,
                }}
                     className={$course_id_styles.gray_outline
                     }>
                </Box>
                <Box className={reuse.row_flex2side_container}
                     sx={{
                         marginTop: "40px",
                         marginLeft: marginLeft,
                     }}
                >
                    <RadioGroup
                        defaultValue="post"
                        name="controlled-radio-buttons-group"
                    >
                        <List row={true} sx={{
                            gap: 5
                        }}>
                            <Radio onChange={this.handleTypeOnChange} variant="soft" color="success" value="post"
                                   label="帖子"/>
                            <Radio onChange={this.handleTypeOnChange} variant="soft" color="success"
                                   value="question"
                                   label="提问"/>
                        </List>
                    </RadioGroup>
                </Box>

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
                        <div className="editor-wrapper">
                            <BraftEditor
                                // value={""}
                                onChange={this.handleEditorChange}
                                placeholder="请输入正文..."
                                contentStyle={{height: 110}}
                            />
                        </div>
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
                            <DirSelect
                                fetchCurCourse={this.props.fetchCurCourse}
                                cur_course={this.props.cur_course}
                                handleDirOnChange={this.handleDirOnChange}/>
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