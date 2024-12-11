"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ticket from "@/../../public/ticket.png";
import l4 from "@/../../public/l4.svg";
import group from "@/../../public/group-2.svg";
import { AiOutlineClose, AiOutlineArrowLeft } from "react-icons/ai";
import styles from "./form.module.css";
import RealForm from "./realForm";

export default function Form({ onClose }) {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const formRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    console.log(selectedTicket);

    const handleCardSelect = (ticketType) => {
        setSelectedTicket(ticketType);
    };

    const handleBack = () => {
        setSelectedTicket(null);
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.content} ref={formRef}>
                <button
                    className={styles.closeButton}
                    onClick={selectedTicket ? handleBack : onClose}
                >
                    {selectedTicket ? (
                        <AiOutlineArrowLeft size={24} />
                    ) : (
                        <AiOutlineClose size={24} />
                    )}
                </button>
                <Image
                    src={l4}
                    alt="design"
                    width={400}
                    height={400}
                    className={styles.design}
                />

                <div
                    className={styles.group}
                    style={{
                        bottom: !selectedTicket ? "1.5rem" : "-1.5rem",
                    }}
                >
                    <Image
                        src={group}
                        alt="design"
                        width={400}
                        height={400}
                        className={styles.groupImage}
                    />

                    <p className={styles.poweredBy}>
                        Form Powered by{" "}
                        <a
                            href="https://makemypass.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            MakeMyPass
                        </a>
                    </p>
                </div>

                {!selectedTicket ? (
                    <div className={styles.box}>
                        <div className={styles.head}>
                            <h1>Select Tickets</h1>
                        </div>
                        <div className={styles.list}>
                            <div
                                className={styles.card}
                                onClick={() => handleCardSelect("General Ticket")}
                            >
                                <Image
                                    src={ticket}
                                    alt="design"
                                    width={1000}
                                    height={1000}
                                    className={styles.ticket}
                                />
                                <div className={styles.cardContent}>
                                    <div className={styles.desc}>
                                        <h1>General Ticket</h1>
                                        <ul>
                                            <li>Access to mainstage</li>
                                            <li>Access to exhibitions</li>
                                            <li>Access to workshops</li>
                                            <li>Networking opportunities</li>
                                        </ul>
                                    </div>
                                    <div className={styles.reg}>
                                        <p>
                                            <span>Price:</span> Free
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={styles.card}
                                onClick={() => handleCardSelect("VIP Ticket")}
                            >
                                <Image
                                    src={ticket}
                                    alt="design"
                                    width={1000}
                                    height={1000}
                                    className={styles.ticket}
                                />
                                <div className={styles.cardContent}>
                                    <div className={styles.desc}>
                                        <h1>VIP Ticket</h1>
                                        <ul>
                                            <li>Reserved seat</li>
                                            <li>Car parking slot</li>
                                            <li>ScaleUp souvenir kit</li>
                                            <li>Family pass for culturals</li>
                                            <li>VIP Lunch</li>
                                        </ul>
                                    </div>
                                    <div className={styles.reg}>
                                        <p>
                                            <span>Price:</span> ₹10,000
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={styles.card}
                                onClick={() => handleCardSelect("Stalls")}
                            >
                                <Image
                                    src={ticket}
                                    alt="design"
                                    width={1000}
                                    height={1000}
                                    className={styles.ticket}
                                />
                                <div className={styles.cardContent}>
                                    <div className={styles.desc}>
                                        <h1>Stalls</h1>
                                        <ul>
                                            <li>Air conditioned stalls</li>
                                            <li>Available for 2 days</li>
                                            <li>10,000 visitors</li>
                                            <li>One VIP ticket</li>
                                        </ul>
                                    </div>
                                    <div className={styles.reg}>
                                        <p>
                                            <span>Starting from:</span> ₹60,000
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <RealForm selectedTicket={selectedTicket} />
                )}
            </div>
        </div>
    );
}
