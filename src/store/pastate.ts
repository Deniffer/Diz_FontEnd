import {CourceStoreProxy, Course} from "@/store/course_list";
import {DirectoryVo} from "@/store/models/directory";
import {PostsViewProxy} from "@/store/post_view_proxy";

export class PaStateProxy{
    addcnt(){
        this.state.cnt++;
    }
    get cnt(){
        return this.state.cnt
    }
    set cnt(cnt){}

    //文章类别选择
    course_dir_sel_set(dirid:number){
        return this.state.course_dir_id_selected=dirid
    }
    course_dir_sel_get(){
        return this.state.course_dir_id_selected
    }

    private post_view_proxy;
    postViewProxy():PostsViewProxy{//文章浏览页相关的全局状态操作逻辑
        return this.post_view_proxy
    }

    private coursep;
    courseProxy(){//课程相关的全局状态的操作逻辑
        return this.coursep
    }
    constructor(private state:PaState) {
        this.coursep=new CourceStoreProxy(this.state)
        this.post_view_proxy=new PostsViewProxy(this.state)
    }
}
export class PaState{
    cnt=0;
    //couse proxy
    course_list:Course[]=[];
    course_cur:Course

    //控制面板的分类选择
    course_dir_id_selected=-1

    //post浏览界面的一些参数
    postview_cur_pid=-1;//给postview监听当前文章编号
    constructor() {
        this.course_cur=Course.pre();
        this.course_list.push(this.course_cur)
    }
}