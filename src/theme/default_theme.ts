// import { extendTheme } from '@mui/joy/styles';

import {extendTheme} from "@mui/joy";
import {curstyle} from "@/theme/curtheme";


export const default_global_style = {
    colors: {
        //_l light
        _1_l: "#FCDD96", // FCDD96
        _2_l: "#B7CBFF", // B7CBFF
        _3_l: "#D2C8F2", // D2C8F2
        _4_l: "#FABEAB", // FABEAB
        _5_l: "#FBC0D5", // FBC0D5
        _6_l: "#BEEDF3", // BEEDF3
        main_l: "#d9f0de",  // d9f0de
        main_ll: "#effff7", // effff7
        //_s solid
        _1_s: "#ffbe33", // ffbe33
        _2_s: "#326bff", // 326bff
        _3_s: "#5b2dff", // 5b2dff
        _4_s: "#ff6837", // ff6837
        _5_s: "#ff2f78", // ff2f78
        _6_s: "#3ce9ff", // 3ce9ff
        main_s: "#44b65e", // 44b65e
        main_sx: "#2fa44a", // 2fa44a
        main_sxx: "#20993b", // 20993b
        gray_common: "#f5f5f8", // f5f5f8
        gray_d: "#e0e0e0", // e0e0e0
        gray_dd: "#BDBDBD", // BDBDBD
        font_second: "#BDBDBD" // BDBDBD
    },
    gap: {
        common: "12px",
        l: "16px",
        xl: "20px",
        xxl: "24px",
        m: "8px",
        s: "4px",
        ss: "2px",
    },
    radius: {
        common: "5px"
    },
    fontweight: {
        common: 500,
        bold: 550,
    },
    avatorsize: {
        common: "40px",
        little: "34px"
    },
    headlineheight: "60px",
    fontsize: {
        s: "14px",
        ss: "12px",
    }
}
export type MyGlobalStyle = typeof default_global_style

export function bind_style_2_window() {
    // @ts-ignore
    window['global_style'] = default_global_style
}

export function get_default_theme() {
    return extendTheme({
        colorSchemes: {
            light: {
                palette: {
                    primary: {
                        solidBg: curstyle().colors.main_s,
                        solidHoverBg: curstyle().colors.main_sx,
                        solidActiveBg: curstyle().colors.main_sxx,
                    },
                    success: {
                        solidBg: '#2DA44E',
                        solidHoverBg: '#2C974B',
                        solidActiveBg: '#298E46',
                    },
                    neutral: {
                        outlinedBg: '#F6F8FA',
                        outlinedHoverBg: '#F3F4F6',
                        outlinedActiveBg: 'rgba(238, 239, 242, 1)',
                        outlinedBorder: 'rgba(27, 31, 36, 0.15)',
                    },
                    focusVisible: 'rgba(3, 102, 214, 0.3)',
                },
            },
        },
        focus: {
            default: {
                outlineWidth: '3px',
            },
        },
        fontFamily: {
            body: 'SF Pro Text, var(--gh-fontFamily-fallback)',
        },
        components: {
            JoyButton: {
                styleOverrides: {
                    root: ({ownerState}) => ({
                        borderRadius: curstyle().radius.common,
                        boxShadow: '0 1px 0 0 rgba(27, 31, 35, 0.04)',
                        transition: '80ms cubic-bezier(0.33, 1, 0.68, 1)',
                        transitionProperty: 'color,background-color,box-shadow,border-color',
                        ...(ownerState.size === 'md' && {
                            minHeight: '32px',
                            fontSize: '14px',
                            '--Button-paddingInline': '1rem',
                        }),
                        ...(ownerState.color === 'success' &&
                            ownerState.variant === 'solid' && {
                                '--gh-palette-focusVisible': 'rgba(46, 164, 79, 0.4)',
                                border: '1px solid rgba(27, 31, 36, 0.15)',
                                '&:active': {
                                    boxShadow: 'inset 0px 1px 0px rgba(20, 70, 32, 0.2)',
                                },
                            }),
                        ...(ownerState.color === 'neutral' &&
                            ownerState.variant === 'outlined' && {
                                '&:active': {
                                    boxShadow: 'none',
                                },
                            }),
                    }),
                },
            },
        },
    });
}