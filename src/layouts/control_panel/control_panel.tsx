import reuse from '@/assets/reuseable.less'
import cp from './control_panel.less'

import Button from '@mui/joy/Button';
import {Box, Typography} from "@mui/joy";
import {curstyle} from "@/theme/curtheme";
import {SetBar} from "@/layouts/control_panel/childs/setbar";

export default function ControlPanel() {
    const arr=[]
    for(let i=0;i<5;i++){
        arr.push((<SetBar>
            hello
        </SetBar>))
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
                    gap: curstyle().gap.common,
                    // alignItems: 'center',
                    // justifyContent: 'space-between',
                }}
            >
                <Typography className={cp.listitem} level="h6"
                            sx={{
                                padding:curstyle().gap.common,
                                // paddingRight:curstyle().gap.common,
                                marginLeft: curstyle().gap.common,
                                marginRight: curstyle().gap.common
                            }}
                >
                    课题
                </Typography>
                <Button
                    sx={{
                        marginLeft: curstyle().gap.common,
                        marginRight: curstyle().gap.common
                    }}
                    className={cp.listitem}
                    variant="solid" color="primary">
                    新建帖子
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

            {/*down*/}
            <div>
                <div>
                    <div className={
                        cp.item_pad}>成员
                    </div>
                </div>
            </div>
        </div>
    );
}