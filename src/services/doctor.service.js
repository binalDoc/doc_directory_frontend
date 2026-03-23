import { DOCTOR_API } from "../constants/api.constant";
import AXIOS_INSTANCE from "../utils/api";

const getDoctors = async (filters) => {
    try {
        const response = await AXIOS_INSTANCE.get(`${DOCTOR_API}/list`, { params: filters });
        return response.data.result;
    } catch (error) {
        throw error;
    }
}

const getDoctorProfile = async () => {
    try {
        const response = await AXIOS_INSTANCE.get(`${DOCTOR_API}/profile`);
        return response.data.result;
    } catch (error) {
        throw error;
    }
}

const getDoctorProfileById = async(id) => {
    try {
        const response = await AXIOS_INSTANCE.get(`${DOCTOR_API}/${id}`);
        return response.data.result;
    } catch (error) {
        throw error;
    }
}

const updateDoctorProfile = async (payload) => {
    try {
        const response = await AXIOS_INSTANCE.patch(`${DOCTOR_API}/profile`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const uploadDoctorImage = async (formData) => {
    const response = await AXIOS_INSTANCE.post(`${DOCTOR_API}/image`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data.result;
}

const doctorService = {
    getDoctors,
    getDoctorProfile,
    getDoctorProfileById,
    updateDoctorProfile,
    uploadDoctorImage
}

export default doctorService;