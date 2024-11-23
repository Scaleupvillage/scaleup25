'use client'

import { useEffect, useState } from 'react'
import styles from './hero.module.css'
import Countdown from 'react-countdown';

export default function Clock() {
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
        <>
            {isClient && (
                <div className={styles.clock}>
                    <Countdown
                        date={new Date("2025-02-08T00:00:00")}
                        renderer={renderer}
                    />
                </div>
            )}
        </>
    )
}