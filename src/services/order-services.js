import {url_api, createInit} from "../constants";

const url_api_order = `${url_api}/order`;

export const create = async (data) => {
    const response = await fetch(`${url_api_order}/create-orders-with-xml`, createInit("POST", data, "form"));
    return response;
}

export const getPending = async (data) => {
    const response = await fetch(`${url_api_order}/pending?${data}`, createInit("GET", data));
    return response;
}