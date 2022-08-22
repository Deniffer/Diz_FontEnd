// @ts-ignore
import {curstyle} from "@/theme/curtheme";
import reuse from '@/assets/reuseable.less'
import {Fragment, PureComponent} from "react";
import styled from "@emotion/styled";
import {PaStateMan} from "@/utills/pa_state_man";
import {Box, Button, List, Typography} from "@mui/joy";
import {Dropdown} from "antd";
import {Course} from "@/store/models/course";
import {api_dir_delete, api_dir_update} from "@/store/apis/dirs";
import {Input1} from "@/layouts/reuseable_comps/input";
import {Tag} from "@/layouts/reuseable_comps/tag";

interface Prop {
    dirid: number
    children: any,
}

export class SetBar extends PureComponent<Prop> {
    constructor(props: any) {
        super(props)
    }

    state = {
        editing: false,
        name: this.props.children
    }

    componentDidMount() {
        PaStateMan.regist_comp(this, (registval, state) => {
            registval(state.course_dir_id_selected)
        })
    }

    componentWillUnmount() {
        PaStateMan.unregist_comp(this)
    }

    rendercnt = 0;

    menu = () => {
        return (
            <List>
                {[
                    <Box onClick={() => {
                        this.setState({
                            editing: true
                        }, () => {
                            window.addEventListener('keydown', (e) => {
                                if (e.code === 'Enter') {
                                    this.submitChange()
                                }
                            })
                        })
                    }}>
                        <Tag color={curstyle().colors.gray_common} cursor={"pointer"}>
                            重命名
                        </Tag>
                    </Box>,
                    <Box onClick={() => {
                        const course_id = PaStateMan.getstate().courseProxy().getCurCourse().course_id
                        PaStateMan.getstate().course_dir_select(-1)
                        api_dir_delete(this.props.dirid, () => {
                            PaStateMan.getstate().courseProxy().fetchCourceDetailAndSetCur({
                                course_id: course_id
                            } as Course)
                        })
                    }}>
                        <Tag color={curstyle().colors.gray_common} cursor={"pointer"}>
                            删除
                        </Tag>
                    </Box>
                ]}
            </List>
        )
    }

    submitChange = () => {
        if (this.state.name !== this.props.children) {
            api_dir_update(this.props.dirid, this.state.name, (res) => {
                if (res.data.meta.code === 0) {
                    window.location.reload()
                }
            })
        }
        this.setState({
            editing: false
        })
    }

    viewing = () => {
        const seldir = PaStateMan.getstate().course_dir_id_selected_get()
        const Button = styled.div`
          cursor: pointer;
          /* Adapt the colors based on primary prop */

          &:hover {
            background: ${seldir == this.props.dirid ? curstyle().colors.main_l :
                    curstyle().colors.gray_common}; // <Thing> when hovered
          }

          &:active {
            background: ${curstyle().colors.main_l};
            color: ${curstyle().colors.main_s};
          }

          user-select: none;
          background: ${seldir == this.props.dirid ? curstyle().colors.main_l : ''};
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
        const handleClose = () => {

        }
        const handleListKeyDown = () => {

        }

        return (
            <Fragment>
                <Button className={
                    reuse.trans_color_common + " "
                    + reuse.row_flex2side_container
                }
                        onClick={() => {
                            PaStateMan.getstate().course_dir_select(this.props.dirid)
                        }}
                >
                    {this.props.children}
                </Button>
                <div style={{
                    display: this.props.dirid <= 0 ? "none" : "",
                    position: "relative",
                    top: "-75%",
                    cursor: "pointer",
                    left: "calc(100% - " + curstyle().gap.common + "*4)",
                    height: 0,
                    width: 0
                }}
                >
                    <Dropdown overlay={this.menu()} placement="bottom">
                        <Box sx={{
                            width: "16px",
                            height: "16px"
                        }}>
                            <svg width="16" height="4" viewBox="0 0 16 4" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0ZM14 0C12.9 0 12 0.9 12 2C12 3.1 12.9 4 14 4C15.1 4 16 3.1 16 2C16 0.9 15.1 0 14 0ZM2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0Z"
                                    fill="#58595C"/>
                            </svg>
                        </Box>
                    </Dropdown>
                </div>
            </Fragment>
        )
    }

    editing = () => {
        return (
            <Box sx={{
                marginRight: curstyle().gap.common,
                marginLeft: curstyle().gap.common,
            }}>
                <Input1
                    placeholder=""
                    onLoad={(v: { focus: () => void }) => {
                        v.focus()
                    }}
                    onChange={(e: any) => {
                        this.setState({
                            name: e.target.value
                        })
                    }}
                    onBlur={() => {
                        this.submitChange()
                    }}
                />
            </Box>
        )
    }

    render() {
        return (
            <Box>
                {!this.state.editing ? this.viewing() : this.editing()}
            </Box>
        )
    }
}