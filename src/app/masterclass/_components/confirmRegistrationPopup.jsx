import React from "react";
import styles from "./registrationConfirmationPopup.module.css";
import { BeatLoader } from "react-spinners";

const ConfirmRegistrationPopup = ({ onClose, onConfirm, isRegistering }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.confirmationContent}>
                    <h1 className={styles.validationHeader}>Confirm Registration</h1>
                    <p className={styles.validationSubText}>
                        Since you have already verified your email/phone. Click submit to complete
                        your registration.
                    </p>
                    <div className={styles.buttonGroup}>
                        <button className={styles.secondaryButton} onClick={onClose}>
                            Close
                        </button>
                        <button className={styles.primaryButton} onClick={onConfirm}>
                            {isRegistering ? <BeatLoader size={8} color={"#fff"} /> : "Submit"}
                        </button>
                    </div>
                </div>
                <p className={styles.poweredBy}>
                    Powered by <a href="https://makemypass.com">makemypass.com</a>
                </p>
            </div>
        </div>
    );
};

export default ConfirmRegistrationPopup;
