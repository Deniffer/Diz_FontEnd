// @ts-ignore
import {curstyle} from "@/theme/curtheme";
import reuse from '@/assets/reuseable.less'
import Icon from 'supercons'
import {render} from "react-dom";
import {ChangeEvent, Component, DOMElement, HTMLInputTypeAttribute, PureComponent} from "react";
import styled from "@emotion/styled";
import {PaStateMan} from "@/utills/pa_state_man";
import {Input1} from "@/layouts/reuseable_comps/input";
import {Box} from "@mui/joy";
import {api_dirs_create} from "@/store/apis/dirs_create";
import {DirectoryVo} from "@/store/models/directory";
import {message} from "antd";

interface Prop {
}

interface State {
    adding: boolean
}

export class SetBarAdd extends PureComponent<Prop, State> {
    constructor(props: any) {
        super(props)
    }

    componentDidMount() {
        PaStateMan.regist_comp(this, (registval, state) => {
            registval(state.course_dir_id_selected)
        })
    }

    componentWillUnmount() {
        PaStateMan.unregist_comp(this)
    }

    state = {
        adding: false
    }
    rendercnt = 0;
    newset_content = ""

    render() {
        const seldir = PaStateMan.getstate().course_dir_sel_get()
        const Button = styled.div`
          cursor: pointer;
          /* Adapt the colors based on primary prop */

          &:hover {
            background: ${curstyle().colors.gray_common}; // <Thing> when hovered
          }

          &:active {
            background: ${curstyle().colors.main_l};
            color: ${curstyle().colors.main_s};
          }

          user-select: none;
          color: ${curstyle().colors.font_second};
          font-size: 1em;
          margin-right: ${curstyle().gap.common};
          margin-left: ${curstyle().gap.common};
          text-align: left;
          padding: ${curstyle().gap.common};
          //margin: 1em;
          //padding: 0.25em 1em;
          border: 0px solid palevioletred;
          border-radius: ${curstyle().radius.common};
        `;

        this.rendercnt++;

        return (
            this.state.adding ?
                <Box
                    sx={{
                        marginRight: curstyle().gap.common,
                        marginLeft: curstyle().gap.common,
                    }}
                >

                    <Input1 placeholder={"输入新的分组名"}
                            onLoad={(v: { focus: () => void }) => {
                                v.focus()
                                console.log("onload", v)
                            }}
                            onChange={(e: any) => {
                                this.newset_content = e.target.value
                            }}
                            onBlur={() => {
                                if (this.newset_content != "") {
                                    PaStateMan.getstate().courseProxy().curcourse_add_new_dirs(
                                        [this.newset_content]
                                    ).then((res) => {
                                        console.log(res)
                                        if (res == "exist") {
                                            message.warning('该分组已经存在！');
                                        }
                                        this.setState({
                                            adding: false
                                        })
                                    })
                                } else {
                                    this.setState({
                                        adding: false
                                    })
                                }
                            }}
                    />
                </Box> :
                <Button className={
                    reuse.trans_color_common + " "
                    + reuse.row_flex2side_container
                }
                        onClick={() => {
                            this.setState({
                                adding: true
                            }, () => {
                            })
                        }}
                >
                    + 新分组
                </Button>
        )
    }
}