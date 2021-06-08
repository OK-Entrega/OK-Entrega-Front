import jwt_decode from "jwt-decode";

export const url_api = "http://localhost:5000/api/v1";
export const jwt = localStorage.getItem("jwt");
export const discriminator = jwt !== null ? jwt_decode(jwt).discriminator : null;

const headersForm = {
    "authorization": `Bearer ${jwt !== null ? jwt : null}`
}

const headersJson = {
    "content-type": "application/json",
    "authorization": `Bearer ${jwt !== null ? jwt : null}`
}

export const createInit = (method, data, type = "json") => {
    return {
        method: method,
        body: method === "GET" ? null : type === "form" ? data : JSON.stringify(data),
        headers: type === "json" ? headersJson : headersForm
    }
}