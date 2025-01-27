'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './speaker.module.css';
import Image from 'next/image';
import design from '@/../../public/group-1.svg';
import l2 from '@/../../public/l2.svg';

const URL = "https://opensheet.elk.sh/1WH_gkK8SWklkOubxKQ1S1JKEgBurqHLEGgcDuNi3C8I/Sheet1";

export default function Speaker() {
    const [speakers, setSpeakers] = useState([]);
    const listRef = useRef(null);

    useEffect(() => {
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                const updatedSpeakers = data
                    .filter((speaker) => speaker.Pic)
                    .map((speaker) => {
                        const driveId = speaker.Pic.split('/')[5];
                        const imageUrl = `https://drive.google.com/uc?id=${driveId}`;
                        return { imageUrl, loaded: false };
                    });
                setSpeakers(updatedSpeakers);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const handleImageLoad = (index) => {
        setSpeakers((prevSpeakers) =>
            prevSpeakers.map((speaker, i) =>
                i === index ? { ...speaker, loaded: true } : speaker
            )
        );
    };

    return (
        <div className={styles.speaker} id="speakers">
            <div className={styles.head}>
                <h1>ScaleUp <br /> Speakers</h1>
                <Image
                    src={design}
                    alt="design"
                    width={400}
                    height={400}
                />
            </div>
            <div className={styles.list} ref={listRef}>
                <Image
                    src={l2}
                    alt="design"
                    width={400}
                    height={400}
                    className={styles.l2}
                />
                {speakers.map((speaker, index) => (
                    <div className={styles.card} key={index}>
                        <div
                            className={`${styles.imageWrapper} ${
                                speaker.loaded ? styles.loaded : ''
                            }`}
                        >
                            <Image
                                src={speaker.imageUrl}
                                alt="speaker"
                                width={400}
                                height={400}
                                className={styles.speakerPic}
                                onLoad={() => handleImageLoad(index)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}