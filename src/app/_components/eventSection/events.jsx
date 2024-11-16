'use client'

import { useState } from 'react'
import styles from './events.module.css'
import Image from 'next/image'
import Link from 'next/link'
import l3 from '@/../../public/l3.svg'
import { events } from './eventsData'

export default function Events() {

    const tabNames = Object.keys(events)
    const [activeTab, setActiveTab] = useState(tabNames[0])

    const currentEvents = events[activeTab]

    return (
        <div className={styles.events} id='events'>
            <div className={styles.head}>
                <h1>ScaleUp Event <br /> Roster</h1>
            </div>

            <Image
                src={l3}
                alt="design"
                width={400}
                height={400}
                className={styles.l3}
            />

            <div className={styles.eventList}>
                <div className={styles.eventName}>
                    {tabNames.map((tab, index) => (
                        <h1
                            key={index}
                            onClick={() => setActiveTab(tab)}
                            className={activeTab === tab ? styles.active : ''}
                        >
                            {tab}
                        </h1>
                    ))}
                </div>

                <div className={styles.list}>
                    {currentEvents.map((event, index) => (
                        <div className={styles.card} key={index}>
                            <div className={styles.cardHead}>
                                <span>
                                    <h1>{event.title}</h1>
                                    <p>{event.desc}</p>
                                </span>
                            </div>
                            <div className={styles.cardBody}>
                                <span></span>
                                <Image
                                    src={event.img}
                                    alt="event image"
                                    width={1000}
                                    height={1000}
                                    className={styles.eventPic}
                                />
                                <Image
                                    src={event.vector}
                                    alt="vector design"
                                    width={400}
                                    height={400}
                                    className={styles.v1}
                                />
                                <Link href={event.link} target='_blank'>Know More</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
