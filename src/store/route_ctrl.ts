import {history} from 'umi';

export namespace RouteCtrl{
    export function push_createpost(courseid:number){
        history.push("/create_post/" + courseid);
    }
    export function back(){
        history.back();
    }
}