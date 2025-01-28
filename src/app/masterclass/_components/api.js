import toast from "react-hot-toast";

const { default: axios } = require("axios");

export const login = async (emailPhone, otp, setAccessToken) => {
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
