import {url_api} from "../utils/constants";

export const signin = async (data) => {
    const response = await fetch(`${url_api}/account/signin`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json"
        }
    });

    return response;
}

export const signup = async (data) => {
    const response = await fetch(`${url_api}/account/signup`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json"
        }
    });

    return response;
}