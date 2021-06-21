import {url_api, createInit} from "../constants";

const url_api_user = `${url_api}/account`;

export const getProfile = async (data) => {
    const response = await fetch(`${url_api_user}/get-profile`, createInit("GET", data));
    return response;
}

export const signUp = async (data) => {
    const response = await fetch(`${url_api_user}/signup`, createInit("POST", data));
    return response;
}

export const verifyAccount = async (data) => {
    const response = await fetch(`${url_api_user}/verify-account`, createInit("PUT", data));
    return response;
}

export const signIn = async (data) => {
    const response = await fetch(`${url_api_user}/signin`, createInit("POST", data));
    return response;
}

export const requestNewPassword = async (data) => {
    const response = await fetch(`${url_api_user}/request-new-password`, createInit("POST", data));
    return response;
}

export const changePassword = async (data) => {
    const response = await fetch(`${url_api_user}/change-password`, createInit("PUT", data));
    return response;
}

export const changePasswordForgotten = async (data) => {
    const response = await fetch(`${url_api_user}/change-password-forgotten`, createInit("PUT", data));
    return response;
}