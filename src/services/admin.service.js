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
        const response = await AXIOS_INSTANCE.get(`${ADMIN_API}/users`, { params: filters });
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

const verifyDoctorOnNMC = async(id) => {
     try {
        const response = await AXIOS_INSTANCE.put(`${ADMIN_API}/nmc-verify-doctor/${id}`);
        return response.data;
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

const uploadBulkDoctors = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await AXIOS_INSTANCE.post(`${ADMIN_API}/bulk-doctors`, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const getProfileViewAnalyticsDashboard = async () => {
    try {
        const response = await AXIOS_INSTANCE.get(
            `${ADMIN_API}/profile-view-dashboard`
        );
        return response.data.result;
    } catch (error) {
        throw error;
    }
};

const importDoctorsFromNMC = async (filters) => {
    try {
        const response = await AXIOS_INSTANCE.get(
            `${ADMIN_API}/import-doctors`, {params : filters}
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getDoctorViewCount = async (doctorId) => {
    try {
        const response = await AXIOS_INSTANCE.get(
            `${ADMIN_API}/doctor/${doctorId}/views`
        );
        return response.data.result;
    } catch (error) {
        throw error;
    }
};

const getRecentViews = async (limit = 10) => {
    try {
        const response = await AXIOS_INSTANCE.get(
            `${ADMIN_API}/recent-views`,
            {
                params: { limit },
            }
        );
        return response.data.result;
    } catch (error) {
        throw error;
    }
};

const getMostViewedDoctors = async (limit = 10) => {
    try {
        const response = await AXIOS_INSTANCE.get(
            `${ADMIN_API}/top-doctors`,
            {
                params: { limit },
            }
        );
        return response.data.result;
    } catch (error) {
        throw error;
    }
};

const getViewsByDate = async () => {
    try {
        const response = await AXIOS_INSTANCE.get(
            `${ADMIN_API}/views-by-date`
        );
        return response.data.result;
    } catch (error) {
        throw error;
    }
};

const getSearchAnalyticsSummary = async () => {
    try {
        const response = await AXIOS_INSTANCE.get(
            `${ADMIN_API}/search-analytics/summary`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getTopSearchTerms = async (limit = 10) => {
    try {
        const response = await AXIOS_INSTANCE.get(
            `${ADMIN_API}/search-analytics/top-searches`,
            {
                params: { limit },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getRecentSearches = async (params) => {
    try {
        const response = await AXIOS_INSTANCE.get(
            `${ADMIN_API}/search-analytics/recent`,
            {params}
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getSearchesByDate = async (params) => {
    try {
        const response = await AXIOS_INSTANCE.get(
            `${ADMIN_API}/search-analytics/by-date`,
            {params}
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

const adminService = {
    // doctor
    updateDoctorStatus,
    getDoctorStatusCounts,

    // users
    getAllUsers,
    createUserByAdmin,
    updateUserByAdmin,
    deleteUserByAdmin,
    verifyDoctorOnNMC,

    // bulk
    uploadBulkDoctors,
    importDoctorsFromNMC,

    // analytics
    getProfileViewAnalyticsDashboard,
    getDoctorViewCount,
    getRecentViews,
    getMostViewedDoctors,
    getViewsByDate,

    //search-analytics
    getSearchAnalyticsSummary,
    getTopSearchTerms,
    getRecentSearches,
    getSearchesByDate
};

export default adminService;