import { ADMIN_API } from "../constants/api.constant";
import AXIOS_INSTANCE from "../utils/api";

const getDoctorStatusCounts = async () => {
    try {
        const response = await AXIOS_INSTANCE.get(`${ADMIN_API}/doctor-stats`);
        return response.data.result;
    } catch (error) {
        throw error;
    }
}

const updateDoctorStatus = async (id, status) => {
    try {
        const response = await AXIOS_INSTANCE.patch(`${ADMIN_API}/doctor-status/${id}`, status);
        return response.data.result;
    } catch (error) {
        throw error;
    }
}

const getAllUsers = async (filters) => {
    try {
        const response = await AXIOS_INSTANCE.get(`${ADMIN_API}/users`, {params : filters});
        return response.data.result;
    } catch (error) {
        throw error;
    }
}

const createUserByAdmin = async (payload) => {
    try {
        const response = await AXIOS_INSTANCE.post(`${ADMIN_API}/users`, payload);
        return response.data.result;
    } catch (error) {
        throw error;
    }
}

const updateUserByAdmin = async (id, payload) => {
    try {
        const response = await AXIOS_INSTANCE.put(`${ADMIN_API}/users/${id}`, payload);
        return response.data.result;
    } catch (error) {
        throw error;
    }
}

const deleteUserByAdmin = async (id) => {
    try {
        const response = await AXIOS_INSTANCE.delete(`${ADMIN_API}/users/${id}`);
        return response.data.result;
    } catch (error) {
        throw error;
    }
}

const adminService = {
    updateDoctorStatus,
    getDoctorStatusCounts,
    getAllUsers,
    createUserByAdmin,
    updateUserByAdmin,
    deleteUserByAdmin
}

export default adminService;