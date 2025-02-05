import React from "react";
import styles from "./registrationConfirmationPopup.module.css";
import { BeatLoader } from "react-spinners";

const ConfirmRegistrationPopup = ({ onClose, onConfirm, isRegistering, submitError }) => {
    const userName = localStorage.getItem("userName");
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.confirmationContent}>
                    <h1 className={styles.validationHeader}>Confirm Registration</h1>
                    <p className={styles.validationSubText}>
                        Since you have already verified your email/phone. Click submit to complete
                        your registration.
                    </p>
                    {userName && (
                        <p className={styles.alertText}>
                            You will be registering as{" "}
                            <span className={styles.userName}>{userName}</span>.{" "}
                            <span
                                onClick={() => {
                                    localStorage.clear();
                                    window.location.reload();
                                }}
                            >
                                Click here
                            </span>{" "}
                            to register as a different user.
                        </p>
                    )}

                    <div className={styles.buttonGroup}>
                        <button className={styles.secondaryButton} onClick={onClose}>
                            Close
                        </button>
                        <button className={styles.primaryButton} onClick={onConfirm}>
                            {isRegistering ? <BeatLoader size={8} color={"#fff"} /> : "Submit"}
                        </button>
                    </div>

                    {submitError && (
                        <div className={styles.error}>
                            <p>{submitError}</p>
                        </div>
                    )}
                </div>
                <p className={styles.poweredBy}>
                    Powered by <a href="https://makemypass.com">makemypass.com</a>
                </p>
            </div>
        </div>
    );
};

export default ConfirmRegistrationPopup;
