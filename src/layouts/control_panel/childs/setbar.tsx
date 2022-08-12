// @ts-ignore
import {curstyle} from "@/theme/curtheme";
import reuse from '@/assets/reuseable.less'
import Icon from 'supercons'
import {render} from "react-dom";
import {Component, PureComponent} from "react";
import styled from "@emotion/styled";
import {PaStateMan} from "@/utills/pa_state_man";

interface Prop {
    dirid: number
    children: any
}

export class SetBar extends PureComponent<Prop> {
    constructor(props: any) {
        super(props)
    }
    componentDidMount() {
        PaStateMan.regist_comp(this,(registval,state)=>{
            registval(state.course_dir_id_selected)
        })
    }
    componentWillUnmount() {
        PaStateMan.unregist_comp(this)
    }

    rendercnt = 0;

    render() {
        const seldir=PaStateMan.getstate().course_dir_sel_get()
        const Button = styled.div`
          cursor: pointer;
          /* Adapt the colors based on primary prop */

          &:hover {
            background: ${seldir==this.props.dirid?curstyle().colors.main_l:
                    curstyle().colors.gray_common}; // <Thing> when hovered
          }

          &:active {
            background: ${curstyle().colors.main_l};
            color: ${curstyle().colors.main_s};
          }
          background: ${seldir==this.props.dirid?curstyle().colors.main_l:''};
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
            <Button className={
                reuse.trans_color_common + " "
                + reuse.row_flex2side_container
            }
                onClick={()=>{
                    PaStateMan.getstate().course_dir_sel_set(this.props.dirid)
                }}
            >
                {this.props.children}
                <Icon glyph="more" size={23}/>
            </Button>
        )
    }
}