import * as React from 'react';
import InputUnstyled, {InputUnstyledProps} from '@mui/base/InputUnstyled';
// import { styled } from '@mui/system';
import reuse from "@/assets/reuseable.less"
import {curstyle} from "@/theme/curtheme";
import styled from '@emotion/styled'
import {ChangeEventHandler, Component, PureComponent} from "react";
import {Box} from "@mui/joy";

// const StyledInputElement = styled('input')(
//     ({ theme }) => `
//   width: 100%;
//   font-size: 0.875rem;
//   font-family: IBM Plex Sans, sans-serif;
//   font-weight: 400;
//   // line-height: 1.5;
//   color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
//   //background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
//   border: 0px solid #fff;
//   border-radius: ${curstyle().radius.common};
//   // padding: 12px 12px;
//
//   &:hover {
//     background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
//     border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
//   }
//
//   &:focus {
//     outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
//   }
// `,
// );


export function Input1(props:{
    placeholder: string,
    onChange?:any,
    onBlur?:any,
    onLoad?:any
}) {
    return (<Input
        bg={curstyle().colors.gray_common}
        focusbg={curstyle().colors.main_l}
        hoverbg={curstyle().colors.main_l}
        padding={curstyle().gap.common} radius={curstyle().radius.common}
        placeholder={props.placeholder}
        onChange={props.onChange}

        onBlur={props.onBlur}
        onLoad={props.onLoad}
        // vmodel={vmodel}
    />)
}

interface State {
    focused: boolean
}

interface InnerProp {
    focus: (focus: boolean) => void,
    placeholder?:string,
    // vmodel?:StringHolder
    onChange?:any
    onBlur?:any
    onLoad?:any
}

export class InputInner extends Component<Props & InnerProp> {
    componentDidMount() {
        this.props.onLoad?.(this.refs.dom_input)
    }

    shouldComponentUpdate(nextProps: Readonly<Props & InnerProp>, nextState: Readonly<State>, nextContext: any): boolean {
        return false;
    }

    render() {
        const Input = styled.input`
          background: transparent;
          border: 0px solid #fff;
            //padding: ${this.props.padding};
          min-width: 0;
          width: 100%;
          flex: 1;
            //margin-left: ${"-" + this.props.padding};
            //width:calc(100% - ${this.props.padding});
          // &:hover{
            //   background: ${this.props.hoverbg};
          // }
          &:focus {
              //background: ${this.props.focusbg};
            outline: 0px solid #fff;
          }

          &:before {
            content: '';
          }
        `
        return <Input
            ref={"dom_input"}
            placeholder={this.props.placeholder}
            onFocus={
                () => {
                    this.props.focus(true)
                }
            }
            onBlur={
                ()=>{
                    if(this.props.onBlur){
                        this.props.onBlur()
                    }
                    this.props.focus(false)
                }
            }
            onChange={this.props.onChange}
        />;
    }
}


interface Props {
    bg: string,
    focusbg: string,
    hoverbg: string,
    padding: string,
    radius: string,
    placeholder?:string,
    onChange?:any,
    onBlur?:any
    onLoad?:any
}
export class Input extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
    }

    state = {
        focused: false
    }

// padding: ${this.props.? };
    render() {

        return (<Box

                className={reuse.trans_color_common}
                sx={{
                    position: "relative",
                    padding: this.props.padding,
                    background: this.state.focused ?
                        this.props.focusbg : this.props.bg,
                    borderRadius: this.props.radius,
                    ":hover": {
                        background: this.props.hoverbg
                    },

                }}
            >
                <InputInner
                    bg={this.props.bg}
                    focusbg={this.props.focusbg}
                    hoverbg={this.props.hoverbg}
                    padding={this.props.padding}
                    radius={this.props.radius}
                    focus={(focused) => {
                        this.setState(
                            {
                                focused:focused
                            },()=>{}
                        )
                        // this.state.focused = focused
                    }}
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                    onBlur={this.props.onBlur}
                    onLoad={this.props.onLoad}
                />
            </Box>
        )
    }


}
