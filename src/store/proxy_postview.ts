import {PaState} from "@/store/pastate";
import {RouteControl} from "@/store/route_control";
import {PaStateMan} from "@/utills/pa_state_man";
import {Course} from "@/store/models/course";

// export class PostsViewProxy{
//     // page/post的加载
//     // on_postview_mount(){
//     //     // const pid=RouteControl.get_curpostid_in_route();
//     //
//     //     // PaStateMan.getstate().postViewProxy().select_cur_post(
//     //     //     pid,false)
//     // }
//     //与内存中的当前postid比对。若不同，则跳转
//
//     constructor(private state: PaState) {
//     }
// }