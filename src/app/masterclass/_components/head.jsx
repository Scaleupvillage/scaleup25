"use client";

import { useEffect, useState } from "react";
import styles from "./main.module.css";
import Image from "next/image";
import group2 from "@/../../public/group-2.svg";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

export default function Head({ triggerName, setTriggerName }) {
    const [userName, setUserName] = useState("");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        // Only run this code on the client side
        const name = localStorage.getItem("userName");
        if (name) {
            setUserName(name);
        }
    }, [triggerName]);

    const handleLogout = () => {
        setLoader(true);
        setTimeout(() => {
            localStorage.clear();
            setUserName("");
            setTriggerName(false);
            setLoader(false);
            toast.success("Kindly continue with the registration process.", {
                duration: 5000,
            });
        }, 1000);
    };

    return (
        <div className={styles.head}>
            {userName && userName.length > 0 && (
                <div className={styles.userSection}>
                    {!loader && (
                        <p className={styles.alertText}>
                            Verified as <span className={styles.userName}>{userName}</span>. Click{" "}
                            <span className={styles.logout} onClick={handleLogout}>
                                here
                            </span>{" "}
                            to register as a different user.
                        </p>
                    )}
                    {loader && <BeatLoader color={"#7570fd"} size={10} />}
                </div>
            )}
            <h1>
                Scaleup Conclave
                <Image src={group2} alt="symbol" width={300} height={300} />
            </h1>
            <div>
                <h2>MasterClass</h2>
                <p>Expert-led sessions offering deep insights and practical skills.</p>
            </div>
        </div>
    );
}
