import reuse from '@/assets/reuseable.less'
import cp from './control_panel.less'

import Button from '@mui/joy/Button';
import {Avatar, Box, Typography} from "@mui/joy";
import {curstyle} from "@/theme/curtheme";
import {SetBar} from "@/layouts/control_panel/childs/setbar";
import styled from "styled-components";

import React, {Component} from 'react';
import {PaStateMan} from "@/utills/pa_state_man";
import {history} from 'umi';
import {RouteCtrl} from "@/store/route_ctrl";
import {DirectoryVo} from "@/store/models/directory";

//底部成员组件
const MemberWidContain = styled.div`
  margin: ${curstyle().gap.common};
  padding-bottom: ${curstyle().gap.m};
  padding-left: ${curstyle().gap.common};
`;

class ControlPanel extends Component {
    state = {}

    //life
    componentDidMount() {
        PaStateMan.regist_comp(this, (registval, state) => {
            registval(state.course_cur);
        })
    }

    componentWillUnmount() {
        PaStateMan.unregist_comp(this)
    }

    render() {
        const state_course = PaStateMan.getstate().courseProxy()
        // @ts-ignore
        const dirs = state_course.getCurCourse().directories
        // @ts-ignore
        const members = state_course.getCurCourse().members
        return (
            <div className={reuse.col_flex2side_container + " "
            + cp.cpcont
            }>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: "100%"
                    }}
                >
                    <Box
                        sx={{
                            padding: curstyle().gap.common,
                            marginLeft: curstyle().gap.common,
                            marginRight: curstyle().gap.common,
                            marginBottom: curstyle().gap.common,
                        }}
                    >
                        <Typography className={cp.listitem} level="h6"
                                    sx={{
                                        marginBottom: curstyle().gap.m
                                    }}
                        >
                            {state_course.getCurCourse().name}
                        </Typography>
                        <Typography className={cp.listitem} level="h7"
                                    sx={{

                                        color: curstyle().colors.font_second
                                    }}
                        >
                            开始时间: {state_course.getCurCourse().begin_at}
                        </Typography>
                    </Box>
                    <Button onClick={e => {
                        RouteCtrl.push_createpost( state_course.getCurCourse().course_id)
                        // history.push("/create_post/" + state_course.getCurCourse().course_id);
                    }
                        // (window.location.href = "/create_post/" + this.props.cur_course.course_id)
                    }
                            sx={{
                                marginLeft: curstyle().gap.common,
                                marginRight: curstyle().gap.common,
                                marginBottom: curstyle().gap.common,
                                height: "36px"
                            }}
                            className={cp.listitem}
                            variant="solid" color="primary">
                        + 新建帖子
                    </Button>
                    <SetBar dirid={-1}>
                        全部
                    </SetBar>
                    {
                        dirs ? dirs.map((dir:DirectoryVo) => {
                            return (
                                <SetBar key={dir.directory_id} dirid={dir.directory_id}>
                                    {dir.name}
                                </SetBar>
                            )
                        }) : null
                    }
                </Box>
                <MemberWidContain
                    className={reuse.row_flex2side_container}
                >
                    <Box className={reuse.row_flexcontainer}
                    >
                        {members ? members.map((member) => {
                            return (
                                // <Box key={member.user_id}
                                //      sx={{
                                //          marginRight: "-10px"
                                //      }}
                                // >
                                    <Avatar
                                        key={member.user_id}

                                        src={member.avatar}
                                            sx={{
                                                width: curstyle().avatorsize.little,
                                                height: curstyle().avatorsize.little,
                                                cursor: "pointer",
                                                borderRadius: "50%",
                                                marginRight: "-10px"
                                            }}
                                    />
                                // </Box>
                            )
                        }) : null}
                    </Box>
                    <Button>
                        邀请成员
                    </Button>
                </MemberWidContain>
            </div>
        );
    }
}

export default ControlPanel;
