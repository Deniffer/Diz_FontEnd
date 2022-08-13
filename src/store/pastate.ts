import {Course} from "@/store/models/course";
import {DirectoryVo} from "@/store/models/directory";
// import {PostsViewProxy} from "@/store/proxy_postview";
import {CourceStoreProxy} from "@/store/proxy_course";
import {RouteControl} from "@/store/route_control";

export class PaStateProxy{
    addcnt(){
        this.state.cnt++;
    }
    get cnt(){
        return this.state.cnt
    }
    set cnt(cnt){}

    //文章类别选择
    course_dir_select(dirid:number){
        RouteControl.replace_dirid_in_route(dirid)
        this.state.course_dir_id_selected=dirid
    }
    course_dir_id_selected_get(){
        return this.state.course_dir_id_selected
    }
    //返回是否有变化
    postid_selected_set(pid:number, routejump:boolean):boolean{
        if(pid==this.state.post_id_selected){
            return false
        }
        if(routejump){
            RouteControl.push_post(
                this.state.course_cur.course_id,
                pid)
        }
        this.state.post_id_selected=pid

        return true
    }
    postid_selected_get():number{
        return this.state.post_id_selected
    }

    private coursep;
    courseProxy(){//课程相关的全局状态的操作逻辑
        return this.coursep
    }
    constructor(private state:PaState) {
        this.coursep=new CourceStoreProxy(this.state)
        // this.post_view_proxy=new PostsViewProxy(this.state)
    }
}
export class PaState{
    cnt=0;
    ///根节点 控制
    course_dir_id_selected=-1//当前选择的分类id,-1代表全部
    post_id_selected=-1
    ///course proxy 控制
    course_list:Course[]=[];//最新拉取的课程列表
    course_cur:Course//当前选择的课程

    constructor() {
        this.course_cur=Course.pre();
        this.course_list.push(this.course_cur)
    }
}