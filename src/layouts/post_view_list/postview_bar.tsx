// @ts-ignore
import styled from "styled-components";
import {curstyle} from "@/theme/curtheme";
import cp from "@/layouts/control_panel/control_panel.less";
import {Box, Typography} from "@mui/joy";
import {Component, Fragment} from "react";
import {Tag} from "@/layouts/reuseable_comps/tag";
import reuse from '@/assets/reuseable.less'
import {PaStateMan} from "@/utills/pa_state_man";

const TagWrap = styled.div`
  margin-right: ${curstyle().gap.common};
`;

export class PostViewBar extends Component {
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

    render() {
        this.rendercnt++;
        const tags = [];
        for (let i = 0; i < 8; i++) {
            tags.push(
                <TagWrap key={i}>
                    <Tag>
                        A{i}
                    </Tag>
                </TagWrap>
            )
        }
        return (
            <Fragment>
                <Typography className={cp.listitem} level="h5"
                            sx={{
                                fontWeight: curstyle().fontweight.bold,
                                paddingBottom: curstyle().gap.common,
                                paddingTop: curstyle().gap.common
                            }}
                            onClick={() => {
                                PaStateMan.getstate().addcnt();
                            }}
                >
                    {this.props.post.title}
                </Typography>
                <Box>
                    {this.props.post.content}
                </Box>
                <Box
                    className={reuse.row_flex2side_container}
                    sx={{
                        paddingBottom: curstyle().gap.xl,
                        paddingTop: curstyle().gap.common
                    }}
                >
                    <Box
                        className={reuse.row_flexcontainer}
                    >
                        {tags}
                    </Box>
                </Box>
            </Fragment>
        )
    }
}