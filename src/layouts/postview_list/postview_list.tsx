// @ts-ignore
import styled from "styled-components";
import {curstyle} from "@/theme/curtheme";
import {PostViewBar} from "@/layouts/postview_list/postview_bar";
import {Fragment} from "react";
import {Box} from "@mui/joy";
// import reuse from '@/assets/reuseable.less'
// import Icon from 'supercons'
export function PostViewBarWrap(){

}
export function PostViewList() {
    let arr=[]
    const PostViewBarWrap=styled.div`
      border-bottom: 1px solid ${curstyle().colors.gray_d};
    `
    const Wrap=styled.div`
      //padding-top: ${curstyle().gap.common};
      padding-left: ${curstyle().gap.xxl};
      padding-right: ${curstyle().gap.xxl};
      //height: 100%;
    `
    const Space=styled.div`
      height: ${curstyle().gap.common};
    `
    for(let i=0;i<9;i++){
        arr.push(
            <PostViewBarWrap
            key={i}
            >
                <PostViewBar></PostViewBar>
            </PostViewBarWrap>
        )
    }
    return (
        <Fragment>
            <Wrap>
                <Space/>
                {arr}
                <Space/>
            </Wrap>
        </Fragment>
    )
}