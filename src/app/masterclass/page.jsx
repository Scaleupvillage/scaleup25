"use client";

import { useEffect, useState } from "react";
import Class from "./_components/class";
import Head from "./_components/head";
import styles from "./page.module.css";
import { BeatLoader } from "react-spinners";
import axios from "axios";

export default function page() {
    const [masterClassContent, setMasterClassContent] = useState([]);
    const [participatedEvents, setParticipatedEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [triggerName, setTriggerName] = useState("");

    useEffect(() => {
        fetch("https://opensheet.elk.sh/16fdd7ESplr4b_1ubkKiNChmJdnlBmrIflUcK2iM244w/sheet2")
            .then((response) => response.json())
            .then((data) => {
                let updatedEvents = data.map((event) => {
                    let imageKeys = Object.keys(event).filter((key) => key.startsWith("image"));
                    let image = imageKeys.map((key) => event[key]);

                    image = image.map((img) => {
                        let id = img.split("/")[5];
                        return id ? `https://drive.usercontent.google.com/download?id=${id}` : "";
                    });

                    return { ...event, image };
                });
                setMasterClassContent(updatedEvents);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        const fetchParticipatedEvents = async () => {
            const accessToken = localStorage.getItem("accessToken");

            if (!accessToken) {
                console.error("No access token found");
                return;
            }

            axios
                .get(
                    "https://api.buildnship.in/makemypass/manage-user/95585c57-9c47-4808-a57b-b2867b89c1f4/user/participated-events/event-info/",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                )
                .then((response) => {
                    console.log("Participated events:", response.data.response.child_event_infos);
                    setParticipatedEvents(response.data.response.child_event_infos);
                })
                .catch((error) => {
                    console.error("Error fetching participated events:", error);
                });
        };

        fetchParticipatedEvents();
    }, []);

    useEffect(() => {
        if (masterClassContent.length > 0) {
            setIsLoading(false);
        }
    }, [masterClassContent]);

    return (
        <div className={styles.masterClass}>
            <Head triggerName={triggerName} setTriggerName={setTriggerName} />
            {isLoading ? (
                <div className={styles.loader}>
                    <BeatLoader
                        color={"#7570fd"}
                        size={10}
                        style={{
                            marginBottom: "-8px",
                        }}
                    />
                </div>
            ) : (
                masterClassContent
                    .filter((content) => content.display === "TRUE")
                    .map((content, index) => (
                        <Class
                            key={index}
                            content={content}
                            setTriggerName={setTriggerName}
                            isRegistered={participatedEvents
                                .map((event) => event.id)
                                .includes(content.event_id)}
                            approvalStatus={
                                participatedEvents
                                    .filter((event) => event.id === content.event_id)
                                    .map((event) => event.approval_status || "")[0]
                            }
                        />
                    ))
            )}
        </div>
    );
}
