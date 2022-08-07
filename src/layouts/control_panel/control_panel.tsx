import reuse from '@/assets/reuseable.less'
import cp from './control_panel.less'

import Button from '@mui/joy/Button';
import {Box, Typography} from "@mui/joy";
import {curstyle} from "@/theme/curtheme";
import {SetBar} from "@/layouts/control_panel/childs/setbar";
import styled from "styled-components";
import {Avator} from "@/layouts/reuseable_comps/avator";

export default function ControlPanel() {
    const arr=[]
    for(let i=0;i<5;i++){
        arr.push((<SetBar key={i}>
            hello
        </SetBar>))
    }
    //底部成员组件
    const MemberWidContain = styled.div`
      //cursor: pointer;
      margin: ${curstyle().gap.common};
      padding-bottom: ${curstyle().gap.m};
      padding-left: ${curstyle().gap.common};
    `;
    const userheads=[]
    for(let i=0;i<4;i++){
        userheads.push(
            <Box
                sx={{
                    marginRight:"-10px"
                }}
            >
                <Avator>
                    <Box
                        sx={{
                            width: curstyle().avatorsize.little,
                            height: curstyle().avatorsize.little,
                        }}
                        />
                </Avator>
            </Box>
        )
    }
    // @ts-ignore
    return (
        <div className={reuse.col_flex2side_container + " "
            + cp.cpcont
        }>
            {/*up*/}
            <Box
                sx={{

                    display: 'flex',
                    flexDirection: 'column',
                    // gap: curstyle().gap.common,
                    // alignItems: 'center',
                    // justifyContent: 'space-between',
                }}
            >
                <Box
                    sx={{
                        padding:curstyle().gap.common,
                        // paddingRight:curstyle().gap.common,
                        marginLeft: curstyle().gap.common,
                        marginRight: curstyle().gap.common,
                        marginBottom:curstyle().gap.common,
                        color:curstyle().colors.gray_d
                    }}
                >
                    <Typography className={cp.listitem} level="h6"
                                sx={{
                                    marginBottom:curstyle().gap.m
                                }}
                    >
                        课题
                    </Typography>
                    <Typography className={cp.listitem} level="h7"

                    >
                        第一周
                    </Typography>
                </Box>
                <Button
                    sx={{
                        marginLeft: curstyle().gap.common,
                        marginRight: curstyle().gap.common,
                        marginBottom:curstyle().gap.common,
                    }}
                    className={cp.listitem}
                    variant="solid" color="primary">
                    + 新建帖子
                </Button>
                {arr}
                {/*<Box className={*/}
                {/*    cp.listitem}*/}
                {/*     sx={{*/}
                {/*         marginLeft: curstyle().gap.common,*/}
                {/*         marginRight: curstyle().gap.common*/}
                {/*     }}*/}
                {/*>列表*/}
                {/*</Box>*/}
            </Box>
            <MemberWidContain
                className={reuse.row_flex2side_container}
            >
                <Box className={reuse.row_flexcontainer}
                >
                    {userheads}
                </Box>
                <Button>
                   邀请成员
                </Button>
            </MemberWidContain>
            {/*down*/}
            {/*<div>*/}
            {/*    <div>*/}
            {/*        <div className={*/}
            {/*            cp.item_pad}>成员*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}