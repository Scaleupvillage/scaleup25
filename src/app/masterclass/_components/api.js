import toast from "react-hot-toast";

const { default: axios } = require("axios");

export const login = async (
    emailPhone,
    otp,
    setAccessToken,
    submissionLink,
    submissionPayload,
    setIsRegistering,
    setShowRegistrationConfimration
) => {
    axios
        .post(
            "https://api.buildnship.in/buildverse/login/",
            { email_or_phone: emailPhone, otp },
            {
                headers: {
                    "ngrok-skip-browser-warning": "69420",
                    "Content-Type": "application/json",
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    Product: "Makemypass",
                    "Accept-Language": navigator.language,
                },
            }
        )
        .then((response) => {
            console.log("Login successful:", response.data);
            getProfileInfo(response.data.response.access_token);
            submitForm(
                submissionLink,
                submissionPayload,
                response.data.response.access_token,
                setIsRegistering,
                setShowRegistrationConfimration
            );
            setAccessToken(response.data.response.access_token);
        })
        .catch((error) => {
            console.error("Error logging in:", error);
        });
};

export const generateOTP = async ({ emailPhone, setIsOtpSent }) => {
    console.log("Generating OTP for:", emailPhone);
    axios
        .post(
            "https://api.buildnship.in/buildverse/generate-otp/",
            {
                email_or_phone: emailPhone,
                type: "Login",
            },
            {
                headers: {
                    "ngrok-skip-browser-warning": "69420",
                    "Content-Type": "application/json",
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    Product: "Makemypass",
                    "Accept-Language": navigator.language,
                },
            }
        )
        .then((response) => {
            console.log("OTP generated successfully:", response.data);
            toast.success(response.data.message.general[0]);
            setIsOtpSent(true);
        })
        .catch((error) => {
            console.error("Error generating OTP:", error);
            setIsOtpSent(false);
        })
        .finally(() => {
            console.log("OTP generation process completed.");
        });
};

export const submitForm = async (
    link,
    data,
    accessToken,
    setIsRegistering,
    setShowRegistrationConfimration
) => {
    const backendFormData = new FormData();
    backendFormData.append("__tickets[]", data);

    if (setIsRegistering) setIsRegistering(true);

    axios
        .post(link, backendFormData, {
            headers: {
                "ngrok-skip-browser-warning": "69420",
                "Content-Type": "multipart/form-data",
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                Product: "Makemypass",
                "Accept-Language": navigator.language,
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((response) => {
            toast.success("Form submitted successfully. Please check your email for confirmation.");
            setShowRegistrationConfimration && setShowRegistrationConfimration(true);
            console.log("Hi");
        })
        .catch((error) => {
            toast.error("Error submitting form. Please try again.");
            console.log("Bye");
        })
        .finally(() => {
            if (setIsRegistering) setIsRegistering(false);
        });
};

export const getProfileInfo = async (accessToken) => {
    axios
        .get("https://api.buildnship.in/buildverse/profile-info/", {
            headers: {
                "ngrok-skip-browser-warning": "69420",
                "Content-Type": "application/json",
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                Product: "Makemypass",
                "Accept-Language": navigator.language,
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((response) => {
            // sessionStorage.setItem("profileInfo", JSON.stringify(response.data));
            // sessionStorage.setItem("accessToken", accessToken);
            return response.data;
        })
        .catch((error) => {
            console.error("Error retrieving profile info:", error);
            throw error;
        });
};
