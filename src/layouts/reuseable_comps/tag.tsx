// @ts-ignore
import {curstyle} from "@/theme/curtheme";
import {PureComponent} from "react";
import styled from "@emotion/styled";
// import reuse from '@/assets/reuseable.less'
// import Icon from 'supercons'


interface Prop {
    children: any,
    color: string,
    cursor: string
}

export class Tag extends PureComponent<Prop> {
    //background: ${props => props.primary ? "palevioletred" : "white"};
    //color: ${props => props.primary ? "white" : "palevioletred"};
    constructor(props: any) {
        super(props);
    }

    prop = {
        children: undefined,
        color: "",
        cursor: undefined
    }

    render() {
        const _Tag = styled.div`
          user-select: none;
          cursor: ${this.props.cursor};
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
            // padding: ${curstyle().gap.ss + " " + curstyle().gap.s};
          font-size: ${curstyle().fontsize.s};
          border-radius: ${curstyle().radius.common};
          background: ${this.props.color};
          padding: 0.4em 0.7em;
          height: 32px;
          text-align: center;
          font-weight: 400;
        `;
        return (
            <_Tag>
                {this.props.children}
            </_Tag>
        )
    }
}