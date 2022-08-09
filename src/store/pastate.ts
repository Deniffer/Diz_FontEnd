import {CourceStoreProxy, Course} from "@/store/course_list";

export class PaStateProxy{
    addcnt(){
        this.state.cnt++;
    }
    get cnt(){
        return this.state.cnt
    }
    set cnt(cnt){}
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

    constructor() {
        this.course_cur=Course.pre();
        this.course_list.push(this.course_cur)
    }
}