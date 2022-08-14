import {Member} from "@/store/models/member";
import {DirectoryVo} from "@/store/models/directory";

export class CourseProxy{
    find_dir(dirid:number):undefined|DirectoryVo{
        for(let i=0;i<this.inside.directories.length;i++){
            const dir=this.inside.directories[i]
            if(dir.directory_id==dirid){
                return dir
            }
        }
    }
    constructor(public inside:Course) {
    }
}
export class Course {
    constructor(
        public course_id: number,
        public name: string,
        public begin_at: string,
        public duration:number,
        public invite_code:string,
        public created_at:string,
        public members:Member[],
        public directories:DirectoryVo[]
    ) {
    }

    static pre() {
        return new Course(-1,
            "啥也不是",
            "",0,"","",[],[])
    }
    //制作一个course数据的proxy，可以携带函数
    static make_proxy(c:Course):CourseProxy{
        return new CourseProxy(c)
    }
}
