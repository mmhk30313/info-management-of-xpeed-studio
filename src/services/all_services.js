import { request } from "../utils/request";

export const get_all_info = () => {
    return request("/api/list.php", {
        method: "get",
        header: "text/html; charset=utf-8",
    });
}