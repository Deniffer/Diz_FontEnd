import React, {Component} from 'react';
import {Box, Button, Typography} from "@mui/joy";
import BraftEditor from "braft-editor";
import 'braft-editor/dist/output.css'
import {Tag} from "@/layouts/reuseable_comps/tag";
import {get_dir_color} from "@/utills/computils";

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
    render() {
        let post = this.props.post
        const content = BraftEditor.createEditorState(post.content)
        const dirs = post.directories ? post.directories : []
        let color_idx = 0
        return (
            <React.Fragment>
                <Box sx={{
                    width: "50vw",
                    marginTop: "45px",
                    marginLeft: "45px",
                }}>
                    <Box sx={{
                        display: "flex",
                        direction: "row",
                    }}>
                        <Typography sx={{
                            left: 0,
                        }} level="h4">
                            {this.props.post ? this.props.post.title : "胡乱写写"}
                        </Typography>
                        <Box sx={{
                            right: 0,
                            margin: "auto",
                            marginRight: "0"
                        }}>
                            {edit_svg()}
                        </Box>
                    </Box>
                    <Box sx={{
                        marginTop: "20px"
                    }}>
                        <Box className="braft-output-content"
                             dangerouslySetInnerHTML={{__html: content.toHTML()}}>
                        </Box>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        direction: "row",
                        gap: 1
                    }}>
                        {
                            dirs.map(dir => {
                                let idx = color_idx
                                color_idx++
                                return (
                                    <Tag key={dir.directory_id}
                                         color={get_dir_color(idx)}
                                    >
                                        {dir.name}
                                    </Tag>
                                )
                            })
                        }
                    </Box>
                </Box>


            </React.Fragment>
        );
    }
}

export default PostView;