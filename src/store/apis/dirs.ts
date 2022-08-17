import axios from "axios";
import {baseUrl} from "@/store/apis/baseurl";
import {DirectoryVo} from "@/store/models/directory";
import {ApiMeta} from "@/store/apis/apimeta";

interface Responce {
    meta: ApiMeta
}

export function api_dirs_create(dirs: DirectoryVo[]): Promise<undefined | Responce> {
    return axios.post(baseUrl + "/course/directories?mock_login=123", {
        directories: dirs
    }).then((res) => {
        if (res.status == 200) {
            return res.data
        } else {
            return undefined
        }
    }).catch((e) => {
        console.warn(e)
        return undefined
    })
}

export function api_dir_delete(dirid: Number, doFunc) {
    axios.delete(baseUrl + "/course/directory?mock_login=123", {
        data: {
            directory_id: dirid
        }
    }).then(res => {
        if (res.data.meta.code != 0) {
            console.log(res.data.meta.msg)
            alert("删除分组失败！")
        } else {
            doFunc()
        }
    })
}