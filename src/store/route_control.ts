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
            make+='&'
        }
        first=false;
        make+=key+'='+params[key]
    }
    return make
}
export namespace RouteControl{
    var push_post_cnt=0
    export function push_createpost(courseid:number){
        history.push("/create_post/" + courseid);
    }
    export function back2index(){
        if(window.location.pathname=='/post'){

            const params=getUrlParams(window.location.search)
            delete params.did
            history.push("/"+UrlParams2Suffix(params))
        }
    }
    export function back(){

        history.back();
    }
    export function push_post(course_id:number,
                              post_id:number,
                              ){
        let r="/post?post_id=" + post_id + "&cid=" + course_id;
        const params=getUrlParams(window.location.search)
        if(params.did){
            r+="&did="+params.did
        }
        history.push(r)
        push_post_cnt++;
    }
    export function replace_dirid_in_route(dirid:number){
        const params=getUrlParams(window.location.search)
        if(dirid==-1){
            delete params.did
        }else{
            params.did=dirid
        }
        history.replace({
            pathname:window.location.pathname+ UrlParams2Suffix(params),
        })
    }
    export function push_cid_inroute(courseid:number){
        const p=getUrlParams(window.location.search)
        p.cid=courseid
        p.did=-1
        // console.log("push before",window.location)
        history.push({
            pathname:window.location.pathname+ UrlParams2Suffix(p),
        })
        // history.go(0)
        // console.log("push after",window.location)
    }

    export function
    get_curcouseid_in_route():undefined|number{
        const params=getUrlParams(window.location.search)
        // console.log("get_curcouseid_in_route",window.location,params.cid,parseInt(params.cid))
        return parseInt(params.cid)
    }

    export function
    get_curpostid_in_route():undefined|number{
        const params=getUrlParams(window.location.search)
        if(params.post_id){
            return parseInt(params.post_id)
        }
        // console.log("get_curcouseid_in_route",window.location,params.cid,parseInt(params.cid))
        return undefined
    }
    export function
    get_dirid_in_route():undefined|number{
        const params=getUrlParams(window.location.search)
        if(params.did){
            return parseInt(params.did)
        }
        // console.log("get_curcouseid_in_route",window.location,params.cid,parseInt(params.cid))
        return undefined
    }
}