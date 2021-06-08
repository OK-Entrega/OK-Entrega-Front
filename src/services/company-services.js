import {url_api, createInit} from "../constants";

const url_api_company = `${url_api}/company`;

export const getMine = async () => {
    const response = await fetch(`${url_api_company}/get-mine`, createInit("GET", null));
    return response;
}

export const create = async (data) => {
    const response = await fetch(`${url_api_company}/create-company`, createInit("POST", data, "form"));
    return response;
}

export const join = async (data) => {
    const response = await fetch(`${url_api_company}/join-a-company/with-code`, createInit("PUT", data));
    return response;
}