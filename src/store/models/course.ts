import {Member} from "@/store/models/member";
import {DirectoryVo} from "@/store/models/directory";

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
}
