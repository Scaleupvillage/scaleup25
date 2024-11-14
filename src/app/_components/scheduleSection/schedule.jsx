'use client'

import { useState, useEffect } from 'react';
import styles from './schedule.module.css';
import Image from 'next/image';
import Link from 'next/link';
import l3 from '@/../../public/l3.svg';
import ss1 from '@/../../public/ss1.svg';
import { events } from './scheduleData';
import design from '@/../../public/group-3.svg';

export default function Schedule() {
    const [activeDay, setActiveDay] = useState('day1');
    const [activeEvent, setActiveEvent] = useState('Main Stage');

    const stages = Object.keys(events[activeDay]);

    useEffect(() => {
        if (!stages.includes(activeEvent)) {
            setActiveEvent(stages[0]);
        }
    }, [activeDay, stages, activeEvent]);

    const currentEvents = events[activeDay][activeEvent] || [];

    return (
        <div className={styles.events}>
            <div className={styles.content}>
                <span className={styles.fade}></span>
                <h1 className={styles.head}>Scaleup Schedule</h1>

                <Image
                    src={l3}
                    alt="design"
                    width={400}
                    height={400}
                    className={styles.l3}
                />

                <div className={styles.eventList}>
                    <div className={styles.eventHead}>
                        <Image
                            src={design}
                            alt="design"
                            width={400}
                            height={400}
                        />
                        <div className={`${styles.eventDay} ${styles.eventName}`}>
                            <button
                                onClick={() => setActiveDay('day1')}
                                className={activeDay === 'day1' ? styles.active : ''}
                            >
                                Day 1
                            </button>
                            <button
                                onClick={() => setActiveDay('day2')}
                                className={activeDay === 'day2' ? styles.active : ''}
                            >
                                Day 2
                            </button>
                        </div>
                        <div className={styles.eventName}>
                            {stages.map((stage) => (
                                <button
                                    key={stage}
                                    onClick={() => setActiveEvent(stage)}
                                    className={activeEvent === stage ? styles.activeEvent : ''}
                                >
                                    {stage}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.scroll}>
                        <div className={styles.list}>
                            {currentEvents.map((event, index) => (
                                <div className={styles.card} key={index}>
                                    <div className={styles.cardBody}>
                                        <Image
                                            src={event.img}
                                            alt="event image"
                                            width={1000}
                                            height={1000}
                                            className={styles.eventPic}
                                        />
                                        <Image
                                            src={ss1}
                                            alt="design"
                                            width={1000}
                                            height={1000}
                                            className={styles.ss1}
                                        />
                                    </div>
                                    <div className={styles.cardContent}>
                                        <div className={styles.desc}>
                                            <h1>{event.title}</h1>
                                            <p>{event.desc}</p>
                                        </div>
                                        <div className={styles.reg}>
                                            <span>Feb 1st, 10:00 AM</span>
                                            <Link href={event.link}>Register</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}