import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { API_BASE_URL } from "../constants/app.constant";
import { getAuthToken } from "./helper";

const AXIOS_INSTANCE = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

AXIOS_INSTANCE.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        // const decoded = jwtDecode(token);
        // if (decoded.exp * 1000 < Date.now()) {
        //     logoutUser();
        //     return Promise.reject("Token expired");
        // }
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default AXIOS_INSTANCE;