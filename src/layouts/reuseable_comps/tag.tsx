// @ts-ignore
import {curstyle} from "@/theme/curtheme";
import {PureComponent} from "react";
import styled from "@emotion/styled";
// import reuse from '@/assets/reuseable.less'
// import Icon from 'supercons'


interface Prop {
    children: any,
    color: string,
}

export class Tag extends PureComponent<Prop> {
    //background: ${props => props.primary ? "palevioletred" : "white"};
    //color: ${props => props.primary ? "white" : "palevioletred"};
    constructor(props: any) {
        super(props);
    }

    prop = {
        children: undefined,
        color: ""
    }

    render() {
        const _Tag = styled.div`
          cursor: pointer;
          /* Adapt the colors based on primary prop */
          // &:hover {
          //   background: ${curstyle().colors.gray_common}; // <Thing> when hovered
          // }
          // &:active{
          //   background: ${curstyle().colors.main_l};
          //   color: ${curstyle().colors.main_s};
          // }
          //font-size: 1em;
          // margin-right: ${curstyle().gap.common};
          //margin-left: ${curstyle().gap.common};
          //text-align: left;
          padding: ${curstyle().gap.ss + " " + curstyle().gap.s};
          font-size: ${curstyle().fontsize.ss};
          border-radius: ${curstyle().radius.common};
          background: ${this.props.color};
          width: 52px;
          height: 25px;
          text-align: center;
          font-weight: 400;
          font-size: 14px;
        `;
        return (
            <_Tag>
                {this.props.children}
            </_Tag>
        )
    }
}