import { request } from "../utils/request";

// get data list
export const get_all_info = () => {
    return request("/api/list.php", {
        method: "get",
        header: "text/html; charset=utf-8",
    });
}

// reorder data
export const get_reorder_info_message = (data) => {
    return request("/api/reorder.php", {
        method: "post",
        body: data
    });
}

// get editable data
export const get_form_edit_data = (id) => {
    return request(`/api/get_form.php?id=${id}`, {
        method: "get",
        header: "text/html; charset=utf-8",
    });
}

export const get_add_form_fields = () => {
    return request(`/api/get_form.php`, {
        method: "get",
        header: "text/html; charset=utf-8",
    });
}

// update data
export const update_data = (data) => {
    return request("/api/submit_form.php", {
        method: "post",
        body: data
    });
}
