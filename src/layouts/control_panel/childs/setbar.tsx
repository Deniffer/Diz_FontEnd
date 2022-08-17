// @ts-ignore
import {curstyle} from "@/theme/curtheme";
import reuse from '@/assets/reuseable.less'
import Icon from 'supercons'
import {PureComponent} from "react";
import styled from "@emotion/styled";
import {PaStateMan} from "@/utills/pa_state_man";
import {Box, MenuItem, MenuList, Typography} from "@mui/joy";
import {Dropdown, Menu} from "antd";
import {PaState} from "@/store/pastate";
import {Course} from "@/store/models/course";
import axios from "axios";
import {baseUrl} from "@/store/apis/baseurl";
import {api_dir_delete} from "@/store/apis/dirs";

interface Prop {
    dirid: number
    children: any
}

export class SetBar extends PureComponent<Prop> {
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

    rendercnt = 0;

    menu = () => {
        return (
            <Menu
                items={[
                    {
                        key: '1',
                        label: (
                            <Typography>
                                重命名
                            </Typography>
                        ),
                    },
                    {
                        key: '2',
                        label: (
                            <Typography onClick={() => {
                                const course_id = PaStateMan.getstate().courseProxy().getCurCourse().course_id
                                PaStateMan.getstate().course_dir_select(-1)
                                api_dir_delete(this.props.dirid, () => {
                                    PaStateMan.getstate().courseProxy().fetchCourceDetailAndSetCur({
                                        course_id: course_id
                                    } as Course)
                                })
                            }}>
                                删除
                            </Typography>
                        ),
                    },
                ]}
            />
        )
    }

    render() {
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
            <Box>
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
                }} onClick={() => {
                    console.log("hi")
                }}
                >
                    <Dropdown overlay={this.menu()} placement="bottom">
                        <Icon glyph="more" size={23}/>
                    </Dropdown>
                </div>
            </Box>
        )
    }
}