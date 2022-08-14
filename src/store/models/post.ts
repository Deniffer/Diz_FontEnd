import {Member} from "@/store/models/member";
import {DirectoryVo} from "@/store/models/directory";

export class Post {
    constructor(
        public content: string,
        public post_id: number,
        public title: string,
        public directories: DirectoryVo[],
        public last_replied_at: string,
        public updated_at: string,
        public repliers: Member[],
        public creator: Member,
        public solved: boolean,
        public abstract: string,
    ) {
    }
}