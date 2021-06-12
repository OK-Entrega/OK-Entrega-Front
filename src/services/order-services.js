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

export const getFinished = async (data) => {
    const response = await fetch(`${url_api_order}/finished?${data}`, createInit("GET", data));
    return response;
}

export const print = async (data) => {
    const response = await fetch(`${url_api_order}/print-orders`, createInit("POST", data));
    return response;
}

export const deleteMany = async (data) => {
    const response = await fetch(`${url_api_order}/delete-orders`, createInit("DELETE", data));
    return response;
}
