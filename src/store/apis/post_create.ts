import axios from "axios";
import {ApiMeta} from "@/store/apis/apimeta";
import {baseUrl} from "@/store/apis/baseurl";
import {red} from "@mui/material/colors";


export class CreatePostRequest {
    constructor(
        public title: string,
        public abstract: string,//正文缩略
        public directory_ids: number[], // 关联分组
        public content: string, // 正文
        public course_id: number, // 隶属的课程号
        public type: "note" | "question" // 类型; 枚举值： "note"-文章/笔记；"question"-提问
    ) {
    }
}

export class CreatePostResponse {
    constructor(
        public meta: ApiMeta
    ) {
    }
}

export class UpdatePostDirRelRequest {

}

export class UpdatePostRequest {

}

export function api_post_create(req: CreatePostRequest): Promise<undefined> | Promise<CreatePostResponse> {
    return axios.post(baseUrl + "/post?mock_login=123", req).then(
        res => {
            return res.data
            // alert(res.data.meta.msg)
        }
    ).catch(() => {
        return undefined
    })
}

export function api_post_dir_rel_update(req: UpdatePostDirRelRequest) {
    return axios.patch(baseUrl + "/post_directory_relation?mock_login=123", req).then(
        res => {
            return res.data
        }
    ).catch(() => {

    })
}

export function api_post_update(req: UpdatePostRequest) {
    return axios.patch(baseUrl + "/post?mock_login=123", req).then(
        res => {
            return res.data
        }
    ).catch(() => {

    })
}