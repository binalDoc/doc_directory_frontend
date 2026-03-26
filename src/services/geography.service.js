import { GEOGRAPHY_API } from "../constants/api.constant";
import AXIOS_INSTANCE from "../utils/api";

const getCountries = async() => {
    try {
        const response = await AXIOS_INSTANCE.get(`${GEOGRAPHY_API}/countries`);
        return response.data.result;
    } catch (error) {
        throw error;
    }
}

const getStates = async(countryId) => {
    try {
        const response = await AXIOS_INSTANCE.get(`${GEOGRAPHY_API}/states/${countryId}`);
        return response.data.result;
    } catch (error) {
        throw error;
    }
}

const getCities = async(stateId) => {
    try {
        const response = await AXIOS_INSTANCE.get(`${GEOGRAPHY_API}/cities/${stateId}`);
        return response.data.result;
    } catch (error) {
        throw error;
    }
}

const geographyService = {
    getCountries,
    getStates,
    getCities
}

export default geographyService;