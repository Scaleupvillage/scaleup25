"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import ticket from "@/../../public/ticket.webp";
import vipticket from "@/../../public/vipticket.webp";
import stall from "@/../../public/stall.webp";
import l4 from "@/../../public/l4.svg";
import group from "@/../../public/group-2.svg";
import { AiOutlineClose, AiOutlineArrowLeft } from "react-icons/ai";
import styles from "./form.module.css";
import RealForm from "./realForm";

const tickets = [
    {
        type: "General Ticket",
        image: ticket,
        description: [
            "Access to mainstage",
            "Access to exhibitions",
            "Access to workshops",
            "Networking opportunities",
        ],
        price: "Free",
        gst: ''
    },
    {
        type: "VIP Ticket",
        image: vipticket,
        description: [
            "Reserved seat",
            "Car parking slot",
            "ScaleUp souvenir kit",
            "Family pass for culturals",
            "VIP Lunch",
        ],
        price: "₹10,000",
        gst: '(inc GST)'
    },
    {
        type: "Stalls",
        image: stall,
        description: [
            "Air conditioned stalls",
            "Available for 2 days",
            "10,000 visitors",
            "One VIP ticket",
        ],
        price: "₹1,00,000",
        gst: '(inc GST)'
    },
    {
        type: "Product Demo + Stall",
        image: stall,
        description: [
            "5 minutes presentation on main stage",
            "Air conditioned stall for 2 days",
            "Media coverage of presentation",
        ],
        price: "₹3,50,000",
        gst: '(inc GST)'
    },
];

export default function Form({ onClose, selectedTicket, setSelectedTicket }) {
    const formRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef?.current && !formRef?.current?.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    useEffect(() => {
        window.fbq("track", "ViewContent", {
            content_name: "Form Page",
        });

        document.documentElement.style.overflow = 'hidden';
        document.body.scroll = "no";
        return () => {
            document.documentElement.style.overflow = 'auto';
            document.body.scroll = "yes";
        };
    }, []);

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

                <div className={styles.formFooter}>
                    <Image
                        src={group}
                        alt="design"
                        width={400}
                        height={400}
                        className={styles.groupImage}
                    />
                    <p className={styles.poweredBy}>
                        Form Powered By{" "}
                        <a href="https://makemypass.com" target="_blank" rel="noreferrer">
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
                            {tickets.map((ticket) => (
                                <div
                                    key={ticket.type}
                                    className={styles.card}
                                    onClick={() => handleCardSelect(ticket.type)}
                                >
                                    <div className={styles.imageContainer}>
                                        <Image
                                            src={ticket.image}
                                            alt="ticket Image"
                                            width={800}
                                            height={800}
                                        />
                                    </div>
                                    <div className={styles.cardContent}>
                                        <div className={styles.desc}>
                                            <h1>{ticket.type}</h1>
                                            <ul>
                                                {ticket.description.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className={styles.reg}>
                                            <div>
                                                <p>
                                                    <span>Price:</span> {ticket.price}
                                                </p>
                                                {ticket.gst && <b>{ticket.gst}</b>}
                                            </div>
                                            <button>Select</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
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