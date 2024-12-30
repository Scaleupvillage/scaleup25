"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ticket from "@/../../public/ticket.png";
import vipticket from "@/../../public/vipticket.png";
import stall from "@/../../public/stall.png";
import l4 from "@/../../public/l4.svg";
import group from "@/../../public/group-2.svg";
import { AiOutlineClose, AiOutlineArrowLeft } from "react-icons/ai";
import styles from "./form.module.css";
import RealForm from "./realForm";

export default function Form({ onClose, selectedTicket, setSelectedTicket }) {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const formRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 400);
        };

        // Initial check
        handleResize();

        // Add event listener for resize
        window.addEventListener("resize", handleResize);

        // Cleanup on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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
                <Image src={l4} alt="design" width={400} height={400} className={styles.design} />

                <div className={styles.group}>
                    <Image
                        src={group}
                        alt="design"
                        width={400}
                        height={400}
                        className={styles.groupImage}
                    />
                </div>

                <p className={styles.poweredBy}>
                    Form Powered
                    {isSmallScreen && <br />} by{" "}
                    <a href="https://makemypass.com" target="_blank" rel="noreferrer">
                        MakeMyPass
                    </a>
                </p>

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
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={ticket}
                                        alt="design"
                                        width={1000}
                                        height={1000}
                                        className={styles.ticket}
                                    />
                                </div>
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
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={vipticket}
                                        alt="design"
                                        width={600}
                                        height={600}
                                        className={styles.ticket}
                                    />
                                </div>
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

                            <div className={styles.card} onClick={() => handleCardSelect("Stalls")}>
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={stall}
                                        alt="design"
                                        width={600}
                                        height={600}
                                        className={styles.ticket}
                                    />
                                </div>
                                <div className={styles.cardContent}>
                                    <div className={styles.desc}>
                                        <h1>Book Your Stall</h1>
                                        <ul>
                                            <li>Air conditioned stalls</li>
                                            <li>Available for 2 days</li>
                                            <li>10,000 visitors</li>
                                            <li>One VIP ticket</li>
                                        </ul>
                                    </div>
                                    <div className={styles.reg}>
                                        <p>
                                            <span>Starting from:</span> ₹1,00,000
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className={styles.helperText}>Select any one of the above tickets.</p>
                    </div>
                ) : (
                    <RealForm selectedTicket={selectedTicket} />
                )}
            </div>
        </div>
    );
}
