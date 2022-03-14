import { baseUrl, liveUrl } from "./server";
const axios = require('axios');
export const request = (link, params) => {
    // console.log({params});
    const headers = {
        // 'Content-type': 'application/json; charset=UTF-8',
        
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Headers": "Content-Type, Authorization",
        // "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        // "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        // "Authorization": `Bearer ${getCookie('token', document?.cookie)}`,
    }
    params?.header && (headers["Content-type"] = params.header);
    // let token: any = null;
    // if (localStorage?.getItem("access_token")) {
    //     token = localStorage.getItem("access_token");
    //     // console.log("======================token applied from client/browser local storage=============", token);
    // } 
    // else if (typeof document !== "undefined" && typeof document.cookie !== "undefined" && getCookie("token", document.cookie)) {
        //     token = getCookie("token", document.cookie);
        //     // console.log("======================token applied from client/browser cookie=============", token);
        // } 
        // else{
            //     console.log("======================empty token =============");
            // }
            // token && (headers = { ...headers, ...{ Authorization: `Bearer ${token}` } });
    const url = (liveUrl || baseUrl) + link;
    let fetchConfig = {
        method: (params && params?.method) || "get",
        url: url,
        // baseURL: server,
        // params: (params && params.params) || "",
        // body: (params && params.body) || "",
        headers: headers,
    };
    
    params?.body && (fetchConfig = {
        ...fetchConfig,
        data: params?.body,
    });
    // params?.method === 'post' && ( fetchConfig.headers);
    console.log({fetchConfig});
    
    // console.log({url});
    
    return axios(fetchConfig)
        .then(response => {
            const { data } = response;
            return data || {status: false, messages: "No data found"};
        })
        .catch(error => {
            // console.log({error});
            return error;
        });
    
}