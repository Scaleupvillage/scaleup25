import React from "react";
import styles from "./registrationConfirmationPopup.module.css";

const RegistrationConfirmationPopup = ({ onClose }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.confirmationContent}>
                    <h1 className={styles.validationHeader}>Registration Successful</h1>
                    <p className={styles.validationSubText}>
                        Thank you for registering! We have sent a confirmation email to your inbox.
                    </p>
                    <div className={styles.buttonGroup}>
                        <button className={styles.primaryButton} onClick={onClose}>
                            Close
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

export default RegistrationConfirmationPopup;
