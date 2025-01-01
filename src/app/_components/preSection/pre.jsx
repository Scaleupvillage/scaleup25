"use client";

import styles from "./pre.module.css";
import Image from "next/image";
import design from "@/../../public/group-1.svg";
import Slider from "./slider";

import { useEffect, useState } from "react";

export default function Pre() {
    const [preEvents, setPreEvents] = useState([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        fetch("https://opensheet.elk.sh/16fdd7ESplr4b_1ubkKiNChmJdnlBmrIflUcK2iM244w/sheet1")
            .then((response) => response.json())
            .then((data) => {
                let updatedEvents = data.map((event) => {
                    let imageKeys = Object.keys(event).filter((key) => key.startsWith("image"));
                    let image = imageKeys.map((key) => event[key]);

                    image = image.map((img) => {
                        let id = img.split("/")[5];
                        return `https://drive.usercontent.google.com/download?id=${id}`;
                    });

                    return { ...event, image };
                });

                setPreEvents(updatedEvents);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    if (!isMounted) return null;

    return (
        <div className={styles.pre}>
            <div className={styles.head}>
                <h1>ScaleUp Pre-Events</h1>
                <Image src={design} alt="design" width={400} height={400} />
            </div>

            <div className={styles.scroll}>
                <div className={styles.list}>
                    {preEvents.map((event, index) => (
                        <div className={styles.card} key={index}>
                            <Slider img={event.image} />
                            <div className={styles.cardContent}>
                                <div className={styles.desc}>
                                    <h1>{event.title}</h1>
                                    <p>{event.description}</p>
                                </div>
                                <div className={styles.reg}>
                                    <span>{event.date}</span>
                                    {event.link && event.link.length > 0 && (
                                        <a
                                            href={event.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Register Now
                                        </a>
                                    )}
                                </div>
                                {event.completed === "TRUE" && (
                                    <span className={styles.completedBadge}>Completed</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
