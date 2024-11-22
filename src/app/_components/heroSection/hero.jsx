'use client'

import { useEffect, useState } from 'react'
import styles from './hero.module.css'
import design from '@/../../public/group-1.svg'
import Image from 'next/image'
import Countdown from 'react-countdown';
import { HiOutlineLocationMarker } from "react-icons/hi";

export default function Hero() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const renderer = ({ days, hours, minutes, seconds }) => {
        const formatNumber = (num) => String(num).padStart(2, '0');
        return (
            <div className={styles.counter}>
                <div><span>{formatNumber(days)}</span> days</div>
                <div><span>{formatNumber(hours)}</span> hours</div>
                <div><span>{formatNumber(minutes)}</span> minutes</div>
                <div><span>{formatNumber(seconds)}</span> seconds</div>
            </div>
        );
    };

    return (
        <div className={styles.hero} id='hero'>
            <div className={styles.head}>
                <h1>
                    ScaleUp <br />Conclave 2025
                    {/* <span>Second Edition</span> */}
                </h1>
                <div className={styles.location}>
                    <div className={styles.date}>
                        <div className={styles.days}>
                            <div>15 <span>th</span></div>
                            <p>&</p>
                            <div>16 <span>th</span></div>
                        </div>
                        <p>February</p>
                    </div>
                    <span>
                        <HiOutlineLocationMarker className={styles.icon} />
                        <p>Shifa Convention Center, <br /> Perinthalmanna , Malappuram</p>
                    </span>
                </div>
                <Image
                    src={design}
                    alt="design"
                    width={400}
                    height={400}
                    className={styles.design}
                />
            </div>
            <div className={styles.imgContainer}>
                <div className={styles.heroImage}></div>
                {isClient && (
                    <div className={styles.clock}>
                        <Countdown
                            date={new Date("2025-02-08T00:00:00")}
                            renderer={renderer}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}