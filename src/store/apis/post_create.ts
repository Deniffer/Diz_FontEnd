import axios from "axios";
import {ApiMeta} from "@/store/apis/apimeta";
import {baseUrl} from "@/store/apis/baseurl";


export class CreatePostRequest {
    constructor(
        public title: string,
        public abstract: string,//正文缩略
        public directory_ids: number[], // 关联分组
        public content: string, // 正文
        public course_id: number, // 隶属的课程号
        public type: "note"|"question" // 类型; 枚举值： "note"-文章/笔记；"question"-提问
    ) {
    }
}
export class CreatePostResponse{
    constructor(
        public meta:ApiMeta
    ) {
    }
}

export function api_post_create(req: CreatePostRequest) :Promise<undefined>|Promise<CreatePostResponse>{
    return axios.post(baseUrl + "/post?mock_login=123", req).then(
        res => {
            return res.data
            // alert(res.data.meta.msg)
        }
    ).catch(()=>{
        return undefined
    })
}