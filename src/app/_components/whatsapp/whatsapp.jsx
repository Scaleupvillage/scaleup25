// 'use client';

// import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
// import { gsap } from 'gsap';
import styles from './whatsapp.module.css';

const regLink = 'https://makemypass.com/scaleup-2025';
const whatsappLink = 'https://wa.me/919999999999';

export default function Whatsapp() {
    // const regButtonRef = useRef(null);

    // useEffect(() => {
    //     const regButton = regButtonRef.current;

    //     const handleScroll = () => {
    //         const scrollY = window.scrollY;

    //         if (scrollY > 250) {
    //             gsap.to(regButton, {
    //                 opacity: 1,
    //                 y: 0,
    //                 duration: 0.5,
    //                 ease: 'power2.out',
    //                 onStart: () => {
    //                     regButton.style.pointerEvents = 'auto';
    //                 }
    //             });
    //         } else {
    //             gsap.to(regButton, {
    //                 opacity: 0,
    //                 y: -20,
    //                 duration: 0.5,
    //                 ease: 'power2.out',
    //                 onComplete: () => {
    //                     regButton.style.pointerEvents = 'none';
    //                 }
    //             });
    //         }
    //     };

    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    return (
        <div className={styles.pop}>
            <Link
                href={regLink}
                className={styles.reg}
                // ref={regButtonRef}
                aria-label="register"
            // style={{ opacity: 0, transform: 'translateY(-20px)' }}
            >
                Register Now
            </Link>
            <Link href="#" className={styles.whatsapp} aria-label="whatsapp">
                <FaWhatsapp className={styles.icon} />
            </Link>
        </div>
    );
}
