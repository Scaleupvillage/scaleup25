"use client";

import React, { useEffect, useState } from "react";
import styles from "./validateModal.module.css";
import countryCodes from "./countryCodes.json";
import { generateOTP, login } from "./api";
import { BeatLoader } from "react-spinners";
import { CgClose } from "react-icons/cg";

export default function ValidateModal({
    content,
    setIsRegistering,
    setShowRegistrationConfimration,
    onClose,
    setTriggerParticipatedAPI,
}) {
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [useEmail, setUseEmail] = useState(true);
    const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0].dial_code);
    const [accessToken, setAccessToken] = useState("");

    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);

    const [OTPError, setOTPError] = useState([]);
    const [emailError, setEmailError] = useState([]);
    const [resendOTP, setResendOTP] = useState(0);

    useEffect(() => {
        if (isOtpSent) {
            //set a timer of 15 seconds to resend OTP it should be first 15 seconds
            setResendOTP(15);
            const interval = setInterval(() => {
                setResendOTP((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isOtpSent]);

    useEffect(() => {
        setOtp("");
    }, [OTPError]);

    const handleSendOtp = () => {
        if (emailOrPhone) {
            generateOTP({
                emailPhone: useEmail ? emailOrPhone : `${selectedCountryCode}${emailOrPhone}`,
                setIsOtpSent: setIsOtpSent,
                setSendingOtp: setSendingOtp,
                setEmailError,
            });
        }
    };

    const handleVerifyOtp = () => {
        if (otp && otp.length > 0) {
            login(
                useEmail ? emailOrPhone : `${selectedCountryCode}${emailOrPhone}`,
                otp.trim(),
                setAccessToken,
                content.mmp_submission_link,
                content.mmp_tickets,
                setIsRegistering,
                setShowRegistrationConfimration,
                setVerifyingOtp,
                setOTPError,
                setTriggerParticipatedAPI
            );
        } else {
            setOTPError(["OTP is required"]);
        }
    };

    const toggleInputType = () => {
        setEmailError([]);
        setUseEmail(!useEmail);
        setEmailOrPhone("");
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.form}>
                    <div className={styles.modalHeader}>
                        <p className={styles.validationHeader}>Validate Information</p>

                        <CgClose
                            style={{ cursor: "pointer" }}
                            size={25}
                            onClick={() => {
                                onClose();
                            }}
                        />
                    </div>
                    <p className={styles.validationSubText}>
                        Kindly make sure you have registered for the main event.
                    </p>
                    {!isOtpSent ? (
                        <>
                            {useEmail ? (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Enter your email"
                                        value={emailOrPhone}
                                        onChange={(e) => setEmailOrPhone(e.target.value)}
                                    />
                                    {emailError.length > 0 && (
                                        <p className={styles.emailError}>
                                            It seems like you have not registered for ScaleUp
                                            Conclave 2025. Kindly register to continue.
                                        </p>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className={styles.phoneInputContainer}>
                                        <select
                                            value={selectedCountryCode}
                                            onChange={(e) => setSelectedCountryCode(e.target.value)}
                                        >
                                            {countryCodes.map((country) => (
                                                <option
                                                    key={country.code}
                                                    value={country.dial_code}
                                                >
                                                    {country.name}: {country.dial_code}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="Enter your phone number"
                                            value={emailOrPhone}
                                            onChange={(e) => setEmailOrPhone(e.target.value)}
                                        />
                                    </div>
                                    {emailError.length > 0 && (
                                        <p className={styles.emailError}>{emailError[0]}</p>
                                    )}
                                </>
                            )}
                            {!emailError || emailError?.length == 0 ? (
                                <button onClick={handleSendOtp}>
                                    {sendingOtp ? <BeatLoader color="#fff" size={8} /> : "Send OTP"}
                                </button>
                            ) : (
                                <a
                                    href="http://scaleupconclave.com/?type=register"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    <button
                                        style={{
                                            width: "100%",
                                        }}
                                    >
                                        {sendingOtp ? (
                                            <BeatLoader color="#fff" size={8} />
                                        ) : (
                                            "Register Now"
                                        )}
                                    </button>
                                </a>
                            )}
                            <button onClick={toggleInputType} className={styles.secondaryButton}>
                                {useEmail ? "Use Phone Number" : "Use Email"}
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                placeholder="Enter the OTP"
                                value={otp}
                                onChange={(e) => {
                                    if (OTPError.length > 0) setOTPError([]);
                                    setOtp(e.target.value);
                                }}
                            />
                            {OTPError.length > 0 && (
                                <p className={styles.otpError}>{OTPError[0]}</p>
                            )}
                            <button onClick={handleVerifyOtp}>
                                {verifyingOtp ? <BeatLoader color="#fff" size={8} /> : "Verify OTP"}
                            </button>

                            <button
                                className={
                                    resendOTP > 0 ? styles.disabledButton : styles.secondaryButton
                                }
                                disabled={resendOTP > 0}
                                onClick={() => {
                                    handleSendOtp();
                                    setResendOTP(0);
                                }}
                            >
                                Resend OTP {resendOTP > 0 ? `in ${resendOTP}s` : ""}
                            </button>
                        </>
                    )}
                    <p className={styles.poweredBy}>
                        Form Powered By{" "}
                        <a href="https://makemypass.com" target="_blank" rel="noreferrer">
                            MakeMyPass
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
