"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import white from "@/../public/logo.webp";
import { usePathname } from "next/navigation";
import Form from "./_components/form";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const pathname = usePathname();
    const formRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 50;
            setIsScrolled(scrolled);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setIsFormOpen(false);
            }
        };

        if (isFormOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isFormOpen]);

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <nav className={styles.nav}>
                <div
                    className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""} 
                    ${isMobileMenuOpen ? styles.open : ""}`}
                >
                    <div
                        className={`${styles.menuIcon} ${isMobileMenuOpen ? styles.open : ""}`}
                        onClick={handleMobileMenuToggle}
                    >
                        <div className={styles.bar} />
                        <div className={styles.bar} />
                        <div className={styles.bar} />
                    </div>

                    <Link href="/" aria-label="logo" className={styles.color}>
                        <Image
                            className={styles.logo}
                            src={white}
                            alt="logo"
                            width={800}
                            height={800}
                            loading="eager"
                        />
                    </Link>

                    <div
                        className={`${styles.links} ${isMobileMenuOpen ? styles.open : ""} 
                        ${isScrolled ? styles.scrolled : ""}`}
                    >
                        <Link href="/" aria-label="logo">
                            <Image
                                className={styles.logo_Mobile}
                                src={white}
                                alt="logo"
                                width={800}
                                height={800}
                                loading="eager"
                            />
                        </Link>

                        <div className={styles.linkBlocks}>
                            <Link href="#hero" className={styles.link} onClick={handleLinkClick}>
                                Home
                            </Link>
                            {/* <Link href="#speakers" className={styles.link} onClick={handleLinkClick}>
                                Speakers
                            </Link> */}
                            <Link href="#events" className={styles.link} onClick={handleLinkClick}>
                                Events
                            </Link>
                            <Link href="#contact" className={styles.link} onClick={handleLinkClick}>
                                Contact Us
                            </Link>
                            <span>
                                <Link
                                    href="https://2024.scaleupconclave.com/"
                                    target="_blank"
                                    className={styles.contact}
                                    onClick={handleLinkClick}
                                >
                                    Previous Edition
                                </Link>
                                <a
                                    href="#"
                                    className={styles.reg}
                                    onClick={() => {
                                        setIsFormOpen(true);
                                        setSelectedTicket("Stalls");
                                    }}
                                >
                                    Book Stalls
                                </a>
                                <a
                                    href="#"
                                    className={styles.reg}
                                    onClick={() => {
                                        setIsFormOpen(true);
                                        setSelectedTicket(null);
                                    }}
                                >
                                    Register Now
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </nav >
            {
                isFormOpen ? (
                    <Form
                        onClose={() => setIsFormOpen(false)
                        }
                        selectedTicket={selectedTicket}
                        setSelectedTicket={setSelectedTicket}
                    />
                ) : null}
        </>
    );
}
