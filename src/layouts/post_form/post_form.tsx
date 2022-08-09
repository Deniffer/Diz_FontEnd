import React, {Component} from 'react';
import {Box, List, RadioGroup, Sheet, Typography} from "@mui/joy";
import $course_id_styles from "@/pages/create_post/$course_id.less";
import reuse from "@/assets/reuseable.less";
import post_form_styles from "./post_form.less"
import {curstyle} from "@/theme/curtheme";
import Radio from '@mui/joy/Radio';


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
                         marginLeft: "50px",
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
            </React.Fragment>
        )
    }
}

export default PostForm;