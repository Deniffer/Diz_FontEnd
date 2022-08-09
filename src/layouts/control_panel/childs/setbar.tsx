// @ts-ignore
import styled from "styled-components";
import {curstyle} from "@/theme/curtheme";
import reuse from '@/assets/reuseable.less'
import Icon from 'supercons'
import {render} from "react-dom";
import {Component, PureComponent} from "react";
const Button = styled.div`
      cursor: pointer;
      /* Adapt the colors based on primary prop */
      &:hover {
        background: ${curstyle().colors.gray_common}; // <Thing> when hovered
      }
      &:active{
        background: ${curstyle().colors.main_l};
        color: ${curstyle().colors.main_s};
      }
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
export class SetBar extends PureComponent{
    constructor(props:any) {
        super(props)
    }
    //background: ${props => props.primary ? "palevioletred" : "white"};
    //color: ${props => props.primary ? "white" : "palevioletred"};
    // props={
    //     children:[]
    // }
    rendercnt=0;
    render(){
        this.rendercnt++;
        // (prop:{children:any})
        return (
            <Button className={
                reuse.trans_color_common+" "
                +reuse.row_flex2side_container
            }>
                {this.rendercnt}
                {this.props.children}
                <Icon glyph="more" size={23}/>
            </Button>
        )
    }

}