"use client";

import styles from "./common.module.css";
import Image from "next/image";
import group2 from "@/../../public/group-2.svg";
import dummy from "@/../../public/dummy.png";

import { useState } from "react";
import ValidateModal from "./validateModal";

export default function Class({ content }) {
    const [showVerifyModal, setShowVerifyModal] = useState(false);

    console.log(content);

    return (
        <>
            {showVerifyModal && (
                <ValidateModal setShowVerifyModal={setShowVerifyModal} content={content} />
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
                            <span></span>
                            <div>
                                <b>{content.event_dates}</b>
                                <p>{content.event_time}</p>
                            </div>
                        </div>
                        <p
                            className={styles.registerButton}
                            onClick={() => {
                                setShowVerifyModal(true);
                            }}
                        >
                            Register Now
                        </p>
                    </div>
                    <Image src={dummy} alt="symbol" width={400} height={400} />
                </div>
            </div>
        </>
    );
}
