"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import white from "@/../public/logo.webp";
import { useRouter, usePathname } from "next/navigation";
import Form from "./_components/form";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [activeLink, setActiveLink] = useState(""); // Manage active link based on the current path and hash

    const pathname = usePathname(); // Current path from Next.js
    const router = useRouter();
    const formRef = useRef(null);

    const handleNavigation = (id) => {
        router.push(`/#${id}`);
        setActiveLink(`#${id}`);
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 50;
            setIsScrolled(scrolled);
        };

        const urlParams = new URLSearchParams(window.location.search);
        const type = urlParams.get("type");

        if (type === "stalls") {
            setIsFormOpen(true);
            setSelectedTicket("Stalls");
        } else if (type === "register") {
            setIsFormOpen(true);
            setSelectedTicket(null);
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);

        // Automatically set the active link based on pathname or hash
        if (pathname === "/") {
            setActiveLink(window.location.hash || "#hero"); // Default to #hero if no hash
        } else {
            setActiveLink(pathname); // For other pages like /masterclass
        }
    }, [pathname]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef?.current && !formRef?.current.contains(event.target)) {
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

                    <Link
                        href="/"
                        aria-label="logo"
                        className={styles.color}
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavigation("hero");
                        }}
                    >
                        <Image
                            className={styles.logo}
                            src={white}
                            alt="logo"
                            width={200}
                            height={200}
                            loading="eager"
                        />
                    </Link>

                    <div
                        className={`${styles.links} ${isMobileMenuOpen ? styles.open : ""} 
                        ${isScrolled ? styles.scrolled : ""}`}
                    >
                        <Link
                            href="/"
                            aria-label="logo"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavigation("hero");
                            }}
                        >
                            <Image
                                className={styles.logo_Mobile}
                                src={white}
                                alt="logo"
                                width={200}
                                height={200}
                                loading="eager"
                            />
                        </Link>

                        <div className={styles.linkBlocks}>
                            <Link
                                href="#hero"
                                className={`${styles.link} ${
                                    activeLink === "#hero" ? styles.active : ""
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavigation("hero");
                                }}
                            >
                                Home
                            </Link>
                            <Link
                                href="#speakers"
                                className={`${styles.link} ${
                                    activeLink === "#speakers" ? styles.active : ""
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavigation("speakers");
                                }}
                            >
                                Speakers
                            </Link>
                            <Link
                                href="#events"
                                className={`${styles.link} ${
                                    activeLink === "#events" ? styles.active : ""
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavigation("events");
                                }}
                            >
                                Events
                            </Link>
                            <Link
                                href="/masterclass"
                                className={`${styles.link} ${
                                    pathname === "/masterclass" ? styles.active : ""
                                }`}
                            >
                                Masterclass
                            </Link>
                            <Link
                                href="#contact"
                                className={`${styles.link} ${
                                    activeLink === "#contact" ? styles.active : ""
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavigation("contact");
                                }}
                            >
                                Contact Us
                            </Link>
                            <span>
                                <Link
                                    href="https://2024.scaleupconclave.com/"
                                    target="_blank"
                                    className={styles.contact}
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
                                        window.fbq("track", "StartTrial", {
                                            content_name: "Register",
                                        });
                                    }}
                                >
                                    Register Now
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
            {isFormOpen ? (
                <Form
                    onClose={() => setIsFormOpen(false)}
                    selectedTicket={selectedTicket}
                    setSelectedTicket={setSelectedTicket}
                />
            ) : null}
        </>
    );
}
