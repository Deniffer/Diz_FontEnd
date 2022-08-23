import {curstyle} from "@/theme/curtheme";

export function attch_prop2fakecomp<CompT>(comp: CompT, prop: any) {
    // @ts-ignore
    comp.prop = prop;
    return comp
}

export function get_dir_color(idx: Number): string {
    const colors = ['_1', '_2', '_3', '_4', '_5', '_6', 'main']
    return curstyle().colors[colors[idx % colors.length] + "_l"]
}

export function is_mobile(): boolean {
    return window.outerWidth < window.outerHeight
}