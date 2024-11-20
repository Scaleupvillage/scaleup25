'use client'

import { useEffect, useState } from 'react'
import styles from './hero.module.css'
import hero from '@/../../public/hero.webp'
import heroMobile from '@/../../public/hero-mobile.webp'
import design from '@/../../public/l5.svg'
import Image from 'next/image'
import Countdown from 'react-countdown';
import { IoLocationOutline } from "react-icons/io5";

export default function Hero() {
    const [isClient, setIsClient] = useState(false);
    const [isWideScreen, setIsWideScreen] = useState(true);

    useEffect(() => {
        setIsClient(true);

        const handleResize = () => {
            setIsWideScreen(window.innerWidth > 678);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const renderer = ({ days, hours, minutes, seconds }) => {
        const weeks = Math.floor(days / 7);
        const remainingDays = days % 7;

        const formatNumber = (num) => String(num).padStart(2, '0');

        return (
            <div className={styles.counter}>
                <div><span>{formatNumber(weeks)}</span> weeks</div>
                <div><span>{formatNumber(remainingDays)}</span> days</div>
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
                    ScaleUp Conclave <br />
                    2nd Edition
                </h1>
                <div className={styles.location}>
                    <span>
                        <IoLocationOutline />
                        <p>Shifa Convention Center, <br /> Perinthalmanna , Malappuram</p>
                    </span>
                </div>
            </div>
            <div className={styles.imgContainer}>
                {
                    isWideScreen ? (
                        <Image
                            src={hero}
                            alt="heroImage"
                            width={3000}
                            height={3000}
                            loading='eager'
                            className={styles.heroImage}
                        />
                    ) : (
                        <Image
                            src={heroMobile}
                            alt="heroImage"
                            width={3000}
                            height={3000}
                            loading='eager'
                            className={styles.heroImage}
                        />
                    )
                }
                {/* <Image
                    src={design}
                    alt="design"
                    width={1000}
                    height={1000}
                    className={styles.design}
                /> */}
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