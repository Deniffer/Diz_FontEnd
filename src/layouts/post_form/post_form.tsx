import React, {Component} from 'react';
import {Box, List, RadioGroup, Sheet, TextField, Typography} from "@mui/joy";
import $course_id_styles from "@/pages/create_post/$course_id.less";
import reuse from "@/assets/reuseable.less";
import post_form_styles from "./post_form.less"
import {curstyle} from "@/theme/curtheme";
import Radio from '@mui/joy/Radio';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css'
import DirSelect from "@/layouts/dir_select/dir_select";


class PostForm extends Component {
    render() {
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
                         marginLeft: "20px",
                     }}
                >
                    <RadioGroup
                        defaultValue="post"
                        name="controlled-radio-buttons-group"
                    >
                        <List row={true} sx={{
                            gap: 5
                        }}>
                            <Radio variant="soft" color="success" value="post" label="帖子"/>
                            <Radio variant="soft" color="success" value="question" label="提问"/>
                        </List>
                    </RadioGroup>
                </Box>

                <Box sx={{
                    width: '100%',
                    marginTop: "55px",
                    height: "720px",
                }}>
                    <TextField sx={{}} size="lg" placeholder="请输入标题" variant="plain"/>
                    <Box sx={{
                        marginTop: "20px"
                    }}>
                        <div className="editor-wrapper">
                            <BraftEditor
                                // value={editorState}
                                // onChange={this.handleChange}
                                placeholder="请输入正文..."
                                contentStyle={{height: 110}}
                            />
                        </div>
                    </Box>
                    <Box sx={{
                        width: this.props.width,
                        marginTop: "40px"
                    }}>
                        <Box sx={{
                            width: this.props.width,
                        }}
                             className={$course_id_styles.gray_outline}>
                        </Box>
                        <DirSelect/>
                    </Box>
                </Box>
            </React.Fragment>
        )
    }
}

export default PostForm;