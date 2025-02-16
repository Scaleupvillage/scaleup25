"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./whatsapp.module.css";
import Form from "../Navbar/_components/form";

const whatsappLink = "https://chat.whatsapp.com/G5DfIgLs6Gq2L6Zas3NnVU";

export default function Whatsapp() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef?.current && !formRef?.current.contains(event.target)) {
                setIsFormOpen(false);
            }
        };

        if (isFormOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isFormOpen]);

    const handleButtonClick = () => {
        window.fbq("event", "StartTrial", { content_name: "Register" });
        setIsFormOpen(true);
        setSelectedTicket(null);
    };

    return (
        <>
            <div className={styles.pop}>
                {/* <button onClick={handleButtonClick} className={styles.reg} aria-label="register">
                    Register Now
                </button> */}
                <Link href={whatsappLink} className={styles.whatsapp} aria-label="whatsapp">
                    <FaWhatsapp className={styles.icon} />
                </Link>
            </div>
            {isFormOpen ? (
                <Form
                    onClose={() => setIsFormOpen(false)}
                    selectedTicket={selectedTicket}
                    setSelectedTicket={setSelectedTicket}
                />
            ) : null}
        </>
    );
}
