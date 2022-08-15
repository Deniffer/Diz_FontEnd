import React, {Component} from 'react';
import {Box} from "@mui/joy";

export function add_dir_svg() {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="4" fill="#44B75E" fillOpacity="0.2"/>
            <path d="M14.9922 20.3537V13.6321H16.3295V20.3537H14.9922ZM12.3026 17.6591V16.3217H19.0241V17.6591H12.3026Z" fill="#44B75E"/>
        </svg>
    )
}

class DirAddSvg extends Component {
    render() {
        return (
            <Box sx={{
                cursor: "pointer",
            }}>
                {add_dir_svg()}
            </Box>
        );
    }
}

export default DirAddSvg;