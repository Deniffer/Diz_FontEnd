import React, {Component} from 'react';
import {Box} from "@mui/joy";

export function add_dir_svg() {
    return (
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="25" rx="4" fill="#44B75E" fill-opacity="0.2"/>
            <path
                d="M11.4392 10.868V13.328H8.96719V14.456H11.4392V16.928H12.5672V14.456H15.0272V13.328H12.5672V10.868H11.4392Z"
                fill="#44B75E"/>
        </svg>
    )
}

class DirAddSvg extends Component {
    render() {
        return (
            <Box sx={{
                cursor: "pointer"
            }}>
                {add_dir_svg()}
            </Box>
        );
    }
}

export default DirAddSvg;