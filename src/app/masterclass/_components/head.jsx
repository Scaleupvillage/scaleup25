"use client";

import { useEffect, useState } from "react";
import styles from "./main.module.css";
import Image from "next/image";
import group2 from "@/../../public/group-2.svg";

export default function Head() {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        // Only run this code on the client side
        const name = sessionStorage.getItem("userName");
        if (name) {
            setUserName(name);
        }
    }, []);

    return (
        <div className={styles.head}>
            {userName && (
                <p className={styles.hiNamePill}>👋 Hi, {userName ? userName : "there"}</p>
            )}
            <h1>
                Scaleup Conclave Parallel Track
                <Image src={group2} alt="symbol" width={300} height={300} />
            </h1>
            <div>
                <h2>MasterClass</h2>
                <p>
                    ScaleUp Conclave Masterclass features expert-led sessions on various topics,
                    offering deep insights and practical skills to enhance participants'
                    understanding and expertise in their respective fields.
                </p>
            </div>
        </div>
    );
}
