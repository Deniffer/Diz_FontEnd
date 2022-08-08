import {bind_style_2_window, MyGlobalStyle} from "@/theme/default_theme";

export function curstyle():MyGlobalStyle{
    if (!('global_style' in window) ){
        bind_style_2_window();
    }
    // @ts-ignore
    return window['global_style'] as MyGlobalStyle
}