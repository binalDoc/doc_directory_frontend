import { PHARMA_API } from "../constants/api.constant";
import AXIOS_INSTANCE from "../utils/api";

const getPharmaprofile = async() => {
    try {
        const response = await AXIOS_INSTANCE.get(`${PHARMA_API}/profile`);
        return response.data.result;
    } catch (error) {
        throw error;
    }
}

const updatePharmaProfile = async(payload) => {
     try {
        const response = await AXIOS_INSTANCE.patch(`${PHARMA_API}/profile`, payload);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const pharmaService = {
    getPharmaprofile,
    updatePharmaProfile
}

export default pharmaService;