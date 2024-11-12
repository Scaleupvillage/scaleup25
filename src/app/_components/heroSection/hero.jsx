'use client'

import { useEffect, useState } from 'react'
import styles from './hero.module.css'
import hero from '@/../../public/hero.png'
import design from '@/../../public/l5.svg'
import Image from 'next/image'
import Countdown from 'react-countdown';

export default function Hero() {
    const [isClient, setIsClient] = useState(false);
    const [isWideScreen, setIsWideScreen] = useState(true);

    useEffect(() => {
        setIsClient(true);

        const handleResize = () => {
            setIsWideScreen(window.innerWidth > 820);
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
        <div className={styles.hero}>
            <h1>
                India's First Fusion Business
                {isWideScreen && <br />}
                Conclave Season II
            </h1>
            <div className={styles.imgContainer}>
                <Image
                    src={hero}
                    alt="heroImage"
                    width={1000}
                    height={1000}
                    className={styles.heroImage}
                />
                <Image
                    src={design}
                    alt="design"
                    width={1000}
                    height={1000}
                    className={styles.design}
                />
                {isClient && (
                    <div className={styles.clock}>
                        <Countdown
                            date={new Date("2025-02-10T00:00:00")}
                            renderer={renderer}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
