export const userDataValidation = (payload) => {
    let errors = {};

    if (!payload.name) {
        errors.name = "Name is required";
    }

    if (!payload.country_id) {
        errors.country_id = "Country is required";
    }

    if (!payload.email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(payload.email)) {
        errors.email = "Invalid email format";
    }

    if (!payload.password) {
        errors.password = "Password is required";
    } else if (payload.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    if (payload.role === "DOCTOR") {
        if (!payload.specialty) errors.specialty = "Specialty is required";
        if (!payload.experience) errors.experience = "Experience is required";
        if (!payload.registration_number) errors.registration_number = "Registartion number is required";
        if (!payload.registration_year) errors.registration_year = "Registartion year is required";
        if (!payload.state_medical_council) errors.state_medical_council = "State medical council is required";
    }

    if (payload.role === "PHARMA") {
        if (!payload.company_name) errors.company_name = "Company name is required";
    }

    return errors;
};