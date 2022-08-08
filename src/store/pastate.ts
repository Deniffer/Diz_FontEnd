import {CourceStoreProxy, Course} from "@/store/course_list";

export class PaStateProxy{
    addcnt(){
        this.state.cnt++;
    }
    get cnt(){
        return this.state.cnt
    }
    set cnt(cnt){}
    courseProxy(){
        return new CourceStoreProxy(this.state)
    }
    constructor(private state:PaState) {
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