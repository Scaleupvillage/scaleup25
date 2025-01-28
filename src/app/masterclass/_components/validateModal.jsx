"use client";

import React, { useState } from "react";
import styles from "./validateModal.module.css";

export default function ValidateModal() {
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);

    const handleSendOtp = () => {
        if (emailOrPhone) {
            setIsOtpSent(true);
            alert("OTP sent to " + emailOrPhone);
        }
    };

    const handleVerifyOtp = () => {
        if (otp) {
            alert("OTP verified successfully!");
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.form}>
                    <p className={styles.validationHeader}>Validate Information</p>
                    <p className={styles.validationSubText}>
                        Kindly make sure you have registered for the main event.
                    </p>
                    {!isOtpSent ? (
                        <>
                            <input
                                type="text"
                                placeholder="Enter your email or phone number"
                                value={emailOrPhone}
                                onChange={(e) => setEmailOrPhone(e.target.value)}
                            />
                            <button onClick={handleSendOtp}>Send OTP</button>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                placeholder="Enter the OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <button onClick={handleVerifyOtp}>Verify OTP</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
