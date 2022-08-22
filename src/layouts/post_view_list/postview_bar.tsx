// @ts-ignore
import styled from "styled-components";
import {curstyle} from "@/theme/curtheme";
import cp from "@/layouts/control_panel/control_panel.less";
import {Box, Typography} from "@mui/joy";
import {Component, Fragment} from "react";
import {Tag} from "@/layouts/reuseable_comps/tag";
import reuse from '@/assets/reuseable.less'
import {PaStateMan} from "@/utills/pa_state_man";
import {history} from "@@/core/history";
import {Post} from "@/store/models/post";
import {AvatarRepeat} from "@/layouts/reuseable_comps/avator";
import {get_dir_color} from "@/utills/computils";
import {RouteControl} from "@/store/route_control";

const TagWrap = styled.div`
  margin-right: ${curstyle().gap.common};
`;

interface Prop {
    post: Post,
    course_id: number
}

export class PostViewBar extends Component<Prop> {
    componentDidMount() {
        PaStateMan.regist_comp(this, (registval, state) => {
            registval(state.cnt);
        })
    }

    componentWillUnmount() {
        PaStateMan.unregist_comp(this)
    }

    shouldComponentUpdate(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): boolean {
        return false;
    }

    rendercnt = 0

    view_post = () => {
        RouteControl.push_post(
            this.props.course_id, this.props.post.post_id,
        )
    }

    render() {
        this.rendercnt++;
        const tags = [];
        const dirs = this.props.post.directories;
        for (let i = 0; i < Math.min(dirs.length, 6); i++) {
            // @ts-ignore
            tags.push(
                // <TagWrap key={i}>
                    <Tag
                        key={i}
                        cursor=""
                        color={get_dir_color(i)}>
                        {dirs[i].name}
                    </Tag>
                // </TagWrap>
            )
        }
        return (
            <Fragment>
                <Box sx={{
                    cursor: "pointer"
                }}>
                    <Typography
                        onClick={this.view_post}
                        className={cp.listitem} level="h5"
                        sx={{
                            fontWeight: curstyle().fontweight.bold,
                            paddingBottom: curstyle().gap.common,
                            paddingTop: curstyle().gap.common,

                        }}
                    >
                        {this.props.post.title}
                    </Typography>

                    <Box onClick={this.view_post}
                         dangerouslySetInnerHTML={{__html: this.props.post.abstract}}
                    >
                    </Box>
                </Box>
                <Box
                    className={reuse.row_flex2side_container}
                    sx={{
                        paddingBottom: curstyle().gap.xl,
                        paddingTop: curstyle().gap.common
                    }}
                >
                    <Box
                        sx={{gap:curstyle().gap.common}}
                        className={reuse.row_flexcontainer}
                    >
                        {tags}
                    </Box>
                    <Box>
                        <AvatarRepeat max={5} members={
                            this.props.post.repliers
                        }/>
                        <Box
                            sx={{
                                color: curstyle().colors.font_second
                            }}
                        >
                            最新编辑: {this.props.post.updated_at}
                        </Box>
                    </Box>
                </Box>
            </Fragment>
        )
    }
}