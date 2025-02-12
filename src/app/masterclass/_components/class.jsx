"use client";

import styles from "./main.module.css";
import Image from "next/image";
import group2 from "@/../../public/group-2.svg";
import dummy from "@/../../public/dummy.png";

import { useEffect, useState } from "react";
import ValidateModal from "./validateModal";
import { submitForm } from "./api";
import { BeatLoader } from "react-spinners";
import RegistrationConfirmationPopup from "./registrationConfirmationPopup";
import ConfirmRegistrationPopup from "./confirmRegistrationPopup";

export default function Class({
    content,
    setTriggerName,
    isRegistered,
    approvalStatus,
    setTriggerParticipatedAPI,
}) {
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [showRegistrationConfimration, setShowRegistrationConfimration] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [confirmRegistration, setConfirmRegistration] = useState(false);

    const [submitError, setSubmitError] = useState("");

    useEffect(() => {
        if (showRegistrationConfimration) {
            setShowVerifyModal(false);
            setTriggerName(false);
        }
    }, [showRegistrationConfimration]);

    return (
        <>
            {showVerifyModal && (
                <ValidateModal
                    content={content}
                    setIsRegistering={setIsRegistering}
                    setShowRegistrationConfimration={setShowRegistrationConfimration}
                    onClose={() => setShowVerifyModal(false)}
                />
            )}

            {showRegistrationConfimration && (
                <RegistrationConfirmationPopup
                    onClose={() => setShowRegistrationConfimration(false)}
                />
            )}

            {confirmRegistration && (
                <ConfirmRegistrationPopup
                    onClose={() => setConfirmRegistration(false)}
                    onConfirm={() => {
                        const accessToken = localStorage.getItem("accessToken");
                        if (accessToken)
                            submitForm({
                                link: content.mmp_submission_link,
                                data: content.mmp_tickets,
                                accessToken,
                                setIsRegistering,
                                setShowRegistrationConfimration,
                                setConfirmRegistration,
                                setSubmitError,
                                setTriggerName,
                                setTriggerParticipatedAPI,
                            });
                    }}
                    isRegistering={isRegistering}
                    submitError={submitError}
                />
            )}

            <div className={styles.class}>
                <div className={styles.left}>
                    <Image src={group2} alt="symbol" width={300} height={300} />
                    <h1>{content.event_title}</h1>
                    <p>{content.event_description}</p>
                    <h2>{content.topic_title}</h2>
                    <ul>
                        <li>{content.topic_point_1}</li>
                        <li>{content.topic_point_2}</li>
                        <li>{content.topic_point_3}</li>
                    </ul>
                    <h2>{content.speaker_title}</h2>
                    <p>{content.speaker_info}</p>
                </div>
                <div className={styles.right}>
                    <div className={styles.eventDetails}>
                        <div>
                            <div>
                                <b>{content.event_level}</b>
                                <p>{content.event_duration}</p>
                            </div>
                            <span className={styles.eventDetailsSpan}></span>
                            <div>
                                <b>{content.event_dates}</b>
                                <p>{content.event_time}</p>
                            </div>
                        </div>
                        <div>
                            <p
                                className={`${styles.registerButton} ${
                                    isRegistered ? styles.registeredButton : ""
                                }`}
                                onClick={() => {
                                    if (isRegistered) return;

                                    const accessToken = localStorage.getItem("accessToken");
                                    if (!accessToken) setShowVerifyModal(true);
                                    else {
                                        setConfirmRegistration(true);
                                    }
                                }}
                            >
                                {isRegistering ? (
                                    <BeatLoader
                                        color={"#7570fd"}
                                        size={10}
                                        style={{
                                            marginBottom: "-8px",
                                        }}
                                    />
                                ) : isRegistered ? (
                                    "Registered"
                                ) : (
                                    "Register"
                                )}
                            </p>
                            {approvalStatus && (
                                <p className={styles.approvalStatus}>
                                    {approvalStatus ? "Approved" : "Pending Approval"}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className={styles.imageContainer}>
                        {content.image[0].length > 0 ? (
                            <Image src={content.image[0]} alt="symbol" width={400} height={400} />
                        ) : (
                            <Image src={dummy} alt="symbol" width={400} height={400} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
