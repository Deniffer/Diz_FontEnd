// @ts-ignore
import styled from "styled-components";
import {curstyle} from "@/theme/curtheme";
import cp from "@/layouts/control_panel/control_panel.less";
import {Box, Typography} from "@mui/joy";
// import reuse from '@/assets/reuseable.less'
// import Icon from 'supercons'

export function PostViewBar() {
    //background: ${props => props.primary ? "palevioletred" : "white"};
    //color: ${props => props.primary ? "white" : "palevioletred"};
    const Title = styled.div`
        
    `;
    return (
        <div>
            <Typography className={cp.listitem} level="h5"
                        sx={{
                            fontWeight:curstyle().fontweight.bold,
                            paddingBottom:curstyle().gap.common,
                            paddingTop:curstyle().gap.common
                        }}
            >
                帖子
            </Typography>
            <Box>
                jiliguala jiliguala jiliguala jiliguala jiliguala jiliguala jiliguala jiliguala jiliguala jiliguala jiliguala jiliguala jiliguala jiliguala jiliguala jiliguala jiliguala jiliguala jiliguala jiliguala
            </Box>
        </div>
    )
}