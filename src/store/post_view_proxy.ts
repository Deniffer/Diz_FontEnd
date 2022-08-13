import {PaState} from "@/store/pastate";
import {RouteCtrl} from "@/store/route_ctrl";

export class PostsViewProxy{
    select_cur_post(pid:number,routejump:boolean):boolean{
        if(pid==this.state.postview_cur_pid){
            return false
        }
        if(routejump){
            RouteCtrl.push_post(
                this.state.course_cur.course_id,
                pid)
        }
        this.state.postview_cur_pid=pid

        return true
    }
    cur_postid():number{
        return this.state.postview_cur_pid
    }
    constructor(private state: PaState) {
    }
}