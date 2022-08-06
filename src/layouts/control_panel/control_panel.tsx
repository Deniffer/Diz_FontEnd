import reuse from '@/assets/reuseable.less'
import cp from './control_panel.less'

import Button from '@mui/joy/Button';
import {Box, Typography} from "@mui/joy";

export default function ControlPanel() {

    return (
        <div className={reuse.col_flex2side_container + " "
            + cp.cpcont
        }>
            {/*up*/}
            <Box
                sx={{

                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    // alignItems: 'center',
                    // justifyContent: 'space-between',
                }}
            >
                <Typography className={cp.listitem} level="h5" >
                    课题
                </Typography>
                <Button
                    className={cp.listitem}
                    variant="solid" color="primary">
                    新建帖子
                </Button>
                <div className={
                    cp.listitem}>列表
                </div>
            </Box>

            {/*down*/}
            <div>
                <div >
                    <div className={
                        cp.item_pad}>成员
                    </div>
                </div>
            </div>
        </div>
    );
}