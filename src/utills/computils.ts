export function attch_prop2fakecomp<CompT>(comp:CompT,prop:any){
    // @ts-ignore
    comp.prop=prop;
    return comp
}