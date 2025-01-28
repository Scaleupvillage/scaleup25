"use client";

import styles from "./common.module.css";
import Image from "next/image";
import group2 from "@/../../public/group-2.svg";
import dummy from "@/../../public/dummy.png";

import { useState } from "react";
import ValidateModal from "./validateModal";
import { submitForm } from "./api";
import { BeatLoader } from "react-spinners";
import RegistrationConfirmationPopup from "./registrationConfirmationPopup";

export default function Class({ content }) {
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [showRegistrationConfimration, setShowRegistrationConfimration] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    return (
        <>
            {showVerifyModal && (
                <ValidateModal
                    setShowVerifyModal={setShowVerifyModal}
                    content={content}
                    setIsRegistering={setIsRegistering}
                    setShowRegistrationConfimration={setShowRegistrationConfimration}
                />
            )}

            {showRegistrationConfimration && (
                <RegistrationConfirmationPopup
                    onClose={() => setShowRegistrationConfimration(false)}
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
                        <p
                            className={styles.registerButton}
                            onClick={() => {
                                const accessToken = sessionStorage.getItem("accessToken");
                                if (!accessToken) setShowVerifyModal(true);
                                else {
                                    submitForm(
                                        content.mmp_submission_link,
                                        content.mmp_tickets,
                                        accessToken,
                                        setIsRegistering,
                                        setShowRegistrationConfimration
                                    );
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
                            ) : (
                                "Register"
                            )}
                        </p>
                    </div>
                    <Image src={dummy} alt="symbol" width={400} height={400} />
                </div>
            </div>
        </>
    );
}
