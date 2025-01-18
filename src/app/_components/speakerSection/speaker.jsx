'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './speaker.module.css'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import design from '@/../../public/group-1.svg'
import l2 from '@/../../public/l2.svg'

gsap.registerPlugin(ScrollTrigger);

const URL = "https://opensheet.elk.sh/1WH_gkK8SWklkOubxKQ1S1JKEgBurqHLEGgcDuNi3C8I/Sheet1"

export default function Speaker() {
    const [speakers, setSpeakers] = useState([]);
    const listRef = useRef(null);

    useEffect(() => {
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                const updatedSpeakers = data.map((speaker) => {
                    const driveId = speaker.Pic.split('/')[5];
                    const imageUrl = `https://drive.google.com/uc?id=${driveId}`;
                    return {
                        imageUrl,
                    };
                });
                setSpeakers(updatedSpeakers);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        if (speakers.length > 0) {
            const speakerCards = listRef.current.querySelectorAll(`.${styles.card}`);

            gsap.fromTo(
                speakerCards,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.2,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: listRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }
    }, [speakers]);

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
                {
                    speakers.map((speaker, index) => (
                        <div className={styles.card} key={index}>
                            <Image
                                src={speaker.imageUrl}
                                alt='speakers'
                                width={1000}
                                height={1000}
                                className={styles.speakerPic}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}