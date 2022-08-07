// @ts-ignore
import styled from "styled-components";
import {curstyle} from "@/theme/curtheme";
// import reuse from '@/assets/reuseable.less'
// import Icon from 'supercons'

export function Avator(prop:{children:any}) {
    //background: ${props => props.primary ? "palevioletred" : "white"};
    //color: ${props => props.primary ? "white" : "palevioletred"};
    const _Avator = styled.div`
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
      //padding: ${curstyle().gap.common};
      border-radius: 50%;
      background: ${curstyle().colors.main_s};
    `;
    return (
        <_Avator>
            {prop.children}
        </_Avator>
    )
}