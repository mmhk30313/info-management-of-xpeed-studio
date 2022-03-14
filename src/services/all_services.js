import { request } from "../utils/request";

export const get_all_info = () => {
    return request("/api/list.php", {
        method: "get",
        header: "text/html; charset=utf-8",
    });
}

export const get_reorder_info_message = (data) => {
    return request("/api/reorder.php", {
        method: "post",
        // header: "text/html; charset=utf-8",
        body: data
    });
}

export const get_form_edit_data = (id) => {
    return request(`/api/get_form.php?id=${id}`, {
        method: "get",
        header: "text/html; charset=utf-8",
    });
}