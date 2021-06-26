import {url_api, createInit} from "../constants";

const url_api_company = `${url_api}/company`;

export const getMine = async () => {
    const response = await fetch(`${url_api_company}/get-mine`, createInit("GET", null));
    return response;
}

export const getDetails = async (data) => {
    const response = await fetch(`${url_api_company}/get-details?${data}`, createInit("GET", data));
    return response;
}

export const edit = async (data) => {
    const response = await fetch(`${url_api_company}/change-company`, createInit("PUT", data, "form"));
    return response;
}

export const deleteCompany = async (data) => {
    const response = await fetch(`${url_api_company}/delete-company`, createInit("DELETE", data));
    return response;
}

export const leaveFromCompany = async (data) => {
    const response = await fetch(`${url_api_company}/leave-from-company`, createInit("DELETE", data));
    return response;
}

export const create = async (data) => {
    const response = await fetch(`${url_api_company}/create-company`, createInit("POST", data, "form"));
    return response;
}

export const getShippers = async (data) => {
    const response = await fetch(`${url_api_company}/get-shippers?${data}`, createInit("GET", data));
    return response;
}

export const inviteShipper = async (data) => {
    const response = await fetch(`${url_api_company}/invite-shipper`, createInit("POST", data));
    return response;
}

export const removeShipper = async (data) => {
    const response = await fetch(`${url_api_company}/remove-shipper`, createInit("DELETE", data));
    return response;
}

export const join = async (data) => {
    const response = await fetch(`${url_api_company}/join-a-company/with-code`, createInit("PUT", data));
    return response;
}

export const getDashboardData = async (data) => {
    const response = await fetch(`${url_api_company}/get-dashboard-data?${data}`, createInit("GET", data));
    return response;
}

export const getFieldRecords = async (data) => {
    const response = await fetch(`${url_api_company}/get-field-records?${data}`, createInit("GET", data));
    return response;
}

export const getGeoreferencingData = async (data) => {
    const response = await fetch(`${url_api_company}/get-georeferencing-data?${data}`, createInit("GET", data));
    return response;
}

export const acceptInvite = async (data) => {
    const response = await fetch(`${url_api_company}/join-a-company/accept-invite`, createInit("PUT", data));
    return response;
}