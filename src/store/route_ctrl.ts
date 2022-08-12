import {history} from 'umi';

function getUrlParams (query:string) {
    let urlParam:any = {};
    if(query){
        const paramArr = query.split('&');
        for(let i=0 ; i<paramArr.length ; i++ ){

            if(i == 0) paramArr[i] = paramArr[i].substr(1,paramArr[i].length);
            let arr = paramArr[i].split('=');
            urlParam[arr[0]] = arr[1];
        }
    }
    return urlParam;
}
function UrlParams2Suffix(params:any){
    if(Object.keys(params).length==0){
        return ""
    }
    let make="?"
    let first=true
    for (const key in params){
        if(!first){
            make+=','
        }
        first=false;
        make+=key+'='+params[key]
    }
    return make
}
export namespace RouteCtrl{
    export function push_createpost(courseid:number){
        history.push("/create_post/" + courseid);
    }
    export function back(){
        history.back();
    }
    export function replace_cid_inroute(courseid:number){
        const p=getUrlParams(history.location.search)
        p.cid=courseid
        history.replace({
            pathname:history.location.pathname+ UrlParams2Suffix(p),
        })
    }

    export function get_curcouseid_in_route():undefined|number{
        const params=getUrlParams(history.location.search)
        return parseInt(params.cid)
    }
}