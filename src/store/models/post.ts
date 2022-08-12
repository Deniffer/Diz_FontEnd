import {Member} from "@/store/models/member";

export class Post{
    constructor(
        public content:string,
        public post_id:number,
        public title:string,
        public directories:[],
        public last_replied_at:string,
        public updated_at:string,
        public repliers:Member[],
        public creator:Member,
        public solved:boolean,
    ) {
    }
}