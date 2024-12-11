'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ticket from '@/../../public/ticket.png';
import l4 from '@/../../public/l4.svg';
import group from '@/../../public/group-2.svg';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './form.module.css';
import RealForm from './realForm';

export default function Form({ onClose }) {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const formRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    console.log(selectedTicket);

    const handleCardSelect = (ticketType) => {
        setSelectedTicket(ticketType);
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.content} ref={formRef}>
                <button className={styles.closeButton} onClick={onClose}>
                    <AiOutlineClose size={24} />
                </button>
                <Image
                    src={l4}
                    alt="design"
                    width={400}
                    height={400}
                    className={styles.design}
                />
                <Image
                    src={group}
                    alt="design"
                    width={400}
                    height={400}
                    className={styles.group}
                />
                {!selectedTicket ? (
                    <div className={styles.box}>
                        <div className={styles.head}>
                            <h1>Select Tickets</h1>
                            {/* <p>Select the ticket you would like to access</p> */}
                        </div>
                        <div className={styles.list}>
                            <div
                                className={styles.card}
                                onClick={() => handleCardSelect('General Pass')}
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
                                        <h1>General Pass</h1>
                                        <p>This is a Free pass it has access to the following:</p>
                                    </div>
                                    <div className={styles.reg}>
                                        <span>
                                            <input type="radio" name="ticket" id="" />
                                            <label htmlFor="ticket">Select</label>
                                        </span>
                                        <p>Price: Free</p>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={styles.card}
                                onClick={() => handleCardSelect('Premium Pass')}
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
                                        <h1>Premium Ticket</h1>
                                        <p>This is a Free pass it has access to the following:</p>
                                    </div>
                                    <div className={styles.reg}>
                                        <span>
                                            <input type="radio" name="ticket" id="" />
                                            <label htmlFor="ticket">Select</label>
                                        </span>
                                        <p>Price: 1500</p>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={styles.card}
                                onClick={() => handleCardSelect('Book Stall')}
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
                                        <h1>Book Stall</h1>
                                        <p>This is a Free pass it has access to the following:</p>
                                    </div>
                                    <div className={styles.reg}>
                                        <span>
                                            <input type="radio" name="ticket" id="" />
                                            <label htmlFor="ticket">Select</label>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.content}>
                        <RealForm selectedTicket={selectedTicket}/>
                    </div>
                )}
            </div>
        </div>
    );
}