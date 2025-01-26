'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './partner.module.css';
import Image from 'next/image';
import design from '@/../../public/group-1.svg';
// import l2 from '@/../../public/l2.svg';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const PartnerURL = "https://opensheet.elk.sh/1iROX8lbSoKx0riimNSjAzbBT64zGBvWN9P3eDApcetw/Sheet1"

export default function Partner() {
    const [partners, setPartners] = useState([]);
    const listRef = useRef(null);

    useEffect(() => {
        fetch(PartnerURL)
            .then((response) => response.json())
            .then((data) => {
                const updatedPartners = data
                    .filter((partner) => partner.Pic)
                    .map((partner) => {
                        const driveId = partner.Pic.split('/')[5];
                        const imageUrl = `https://drive.google.com/uc?id=${driveId}`;
                        return {
                            imageUrl,
                        };
                    });
                setPartners(updatedPartners);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        if (partners.length > 0) {
            gsap.fromTo(
                listRef.current.querySelectorAll(`.${styles.card}`),
                { opacity: 0, scale: 0.5 },
                {
                    opacity: 1,
                    scale: 1,
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
    }, [partners]);

    return (
        <div className={styles.partner}>
            {/* <Image
                src={l2}
                alt="design"
                width={400}
                height={400}
                className={styles.l2}
            /> */}
            <div className={styles.head}>
                <h1>ScaleUp Partners</h1>
                <Image
                    src={design}
                    alt="design"
                    width={400}
                    height={400}
                />
            </div>

            <div className={styles.list} ref={listRef}>
                {
                    partners.map((partner, index) => (
                        <div className={styles.card} key={index}>
                            <Image
                                src={partner.imageUrl}
                                alt={`Partner ${index + 1}`}
                                width={200}
                                height={200}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}