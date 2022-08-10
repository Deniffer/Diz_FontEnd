import reuse from '@/assets/reuseable.less'
import cp from './control_panel.less'

import Button from '@mui/joy/Button';
import {Avatar, Box, Typography} from "@mui/joy";
import {curstyle} from "@/theme/curtheme";
import {SetBar} from "@/layouts/control_panel/childs/setbar";
import styled from "styled-components";
import {connect} from "react-redux";

import React, {Component} from 'react';
import {PaStateMan} from "@/utills/pa_state_man";

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

        const arr = []
        for (let i = 0; i < 5; i++) {
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
        // @ts-ignore
        const dirs = state_course.getCurCourse().directories
        // @ts-ignore
        const members = state_course.getCurCourse().members
        return (
            <div className={reuse.col_flex2side_container + " "
            + cp.cpcont
            }>
                {/*up*/}
                <Box
                    sx={{

                        display: 'flex',
                        flexDirection: 'column',

                        height: "100%"
                        // gap: curstyle().gap.common,
                        // alignItems: 'center',
                        // justifyContent: 'space-between',
                    }}
                >
                    <Box
                        sx={{
                            padding: curstyle().gap.common,
                            // paddingRight:curstyle().gap.common,
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
                    <Button onClick={e => window.location.href = "/create_post/" + state_course.getCurCourse().course_id}
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
                    {/*{arr}*/}
                    {
                        dirs ? dirs.map((dir) => {
                            return (
                                <SetBar key={dir.directory_id}>
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
                                <Box key={member.user_id}
                                     sx={{
                                         marginRight: "-10px"
                                     }}
                                >
                                    <Avatar src={member.avatar}
                                            sx={{
                                                width: curstyle().avatorsize.little,
                                                height: curstyle().avatorsize.little,
                                                cursor: "pointer",
                                                borderRadius: "50%",
                                            }}
                                    />
                                </Box>
                            )
                        }) : null}
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
}


const mapStateToProps = (state, props) => {
    return {
        cur_course: state.course.cur_course,
    }
}

const mapDispatchToProps = {
    updateCurCourse: (course) => {
        return {
            type: "updateCurCourse",
            cur_course: course
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
