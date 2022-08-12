import {CourceStoreProxy, Course} from "@/store/course_list";
import {DirectoryVo} from "@/store/models/directory";

export class PaStateProxy{
    addcnt(){
        this.state.cnt++;
    }
    get cnt(){
        return this.state.cnt
    }
    set cnt(cnt){}

    course_dir_sel_set(dirid:number){
        return this.state.course_dir_id_selected=dirid
    }
    course_dir_sel_get(){
        return this.state.course_dir_id_selected
    }

    private coursep;
    courseProxy(){
        return this.coursep
    }
    constructor(private state:PaState) {
        this.coursep=new CourceStoreProxy(this.state)
    }
}
export class PaState{
    cnt=0;

    course_list:Course[]=[];
    course_cur:Course

    course_dir_id_selected=-1

    constructor() {
        this.course_cur=Course.pre();
        this.course_list.push(this.course_cur)
    }
}