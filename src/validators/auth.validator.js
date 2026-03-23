export const registerDataValidation = (payload) => {
    let errors = {};

    if (!payload.name.trim()) {
        errors.name = "Name is required";
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

    if (!payload.confirmPassword) {
        errors.confirmPassword = "Confirm password is required";
    } else if (payload.password!=payload.confirmPassword) {
        errors.confirmPassword = "Password and Confirm Password do not match";
    }

    if(payload.role==="PHARMA" && !payload.verificationCode) errors.verificationCode = "Verification code is required"

    if(payload.role==="PHARMA" && !payload.company_name) errors.company_name = "Company name is required"

    return errors;
};

export const loginDataValidation = (payload) => {
    let errors = {};

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

    return errors;
};