import axios from "axios";
import {baseUrl} from "@/store/course_list";
import {PaStateMan} from "@/utills/pa_state_man";
import {ApiMeta} from "@/store/apis/apimeta";
import {Post} from "@/store/models/post";

export class GetPostsRes{
    constructor(
       public has_more:boolean,
        public meta:ApiMeta,
        public posts:Post[]
    ) {
    }
}

export function api_get_posts():Promise<undefined|GetPostsRes>{
    return axios.post(baseUrl + "/get_posts?mock_login=123", {
        course_id: PaStateMan.getstate().courseProxy().getCurCourse().course_id,
        limit: 20
    }).then(res=>{
        console.log(res)
        if(res.status==200){
            // @ts-ignore
            return res.data as GetPostsRes
        }

        return undefined
    }).catch(e=>{
        console.log(e)
        //此处进行错误处理
        return undefined
    })
}