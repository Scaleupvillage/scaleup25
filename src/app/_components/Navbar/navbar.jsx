'use client';

import { useEffect, useState } from 'react';
import styles from './navbar.module.css';
import Link from 'next/link';
import Image from 'next/image';
import white from '@/../public/logo.webp';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 50;
            setIsScrolled(scrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={styles.nav}>
            <div className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${isMobileMenuOpen ? styles.open : ''}`}>
                <div className={`${styles.menuIcon} ${isMobileMenuOpen ? styles.open : ''}`} onClick={handleMobileMenuToggle}>
                    <div className={styles.bar} />
                    <div className={styles.bar} />
                    <div className={styles.bar} />
                </div>

                <Link href="/" aria-label='logo' className={styles.white}>
                    <Image
                        className={styles.logo}
                        src={white}
                        alt='logo'
                        width={1500}
                        height={1500}
                    />
                </Link>

                <Link href="/" aria-label='logo' className={styles.color}>
                    <Image
                        className={styles.color_logo}
                        src={white}
                        alt='logo'
                        width={1500}
                        height={1500}
                    />
                </Link>

                <div className={`${styles.links} ${isMobileMenuOpen ? styles.open : ''} ${isScrolled ? styles.scrolled : ''}`}>
                    <Link href="/" aria-label='logo'>
                        <Image
                            className={styles.logo_Mobile}
                            src={white}
                            alt='logo'
                            width={1500}
                            height={1500}
                        />
                    </Link>

                    <div className={styles.linkBlocks}>
                        <div className={styles.spaceFixer}>
                            <Link href="#hero" className={styles.link} onClick={handleLinkClick}>Home</Link>
                            <Link href="#speakers" className={styles.link} onClick={handleLinkClick}>Speakers</Link>
                            <Link href="#events" className={styles.link} onClick={handleLinkClick}>Events</Link>
                            <Link href="#contact" className={styles.link} onClick={handleLinkClick}>Contact Us</Link>
                        </div>
                        <span>
                            <Link href="https://www.scaleupconclave.com/" target='_blank' className={styles.contact} onClick={handleLinkClick}>Pervious Edition</Link>
                            <Link href="https://makemypass.com/scaleup-2025" className={styles.reg} onClick={handleLinkClick}>Register Now</Link>
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    );
}