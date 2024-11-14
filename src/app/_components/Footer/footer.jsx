import styles from './footer.module.css'
import Image from 'next/image';
import Link from 'next/link';
import design from '@/../../public/group-3.svg'
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FaLinkedin, FaThreads } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import Gallery from './gallery';

const map = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15667.232757242782!2d76.246182!3d10.977846!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7cda1960f1e95%3A0x971882d6dc32948e!2sShifa%20Convention%20Center!5e0!3m2!1sen!2sin!4v1731414712454!5m2!1sen!2sin'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.blocks}>
                    <div className={styles.contact}>
                        <h1>Contact Us</h1>
                        <div className={styles.divide}>
                            <Image
                                src={design}
                                alt='design'
                                width={400}
                                height={400}
                                className={styles.design}
                            />
                            <div>
                                <p>Get in touch to join the ScaleUp <br /> Business Conclave 2025!</p>
                                <div className={styles.icon}>
                                    <Link href='https://www.facebook.com/people/ScaleUp-Conclave/61554188141132/' target='_blank' className={styles.con}><FaFacebookF /></Link>
                                    <Link href='https://x.com/Scaleup2024' target='_blank' className={styles.con}><FaTwitter /></Link>
                                    <Link href='https://www.linkedin.com/company/scaleupvillage/posts/?feedView=all' target='_blank' className={styles.con}><FaLinkedin /></Link>
                                    <Link href='https://www.threads.net/@scaleup_village' target='_blank' className={styles.con}><FaThreads /></Link>
                                    <Link href='https://www.instagram.com/scaleup_village' target='_blank' className={styles.con}><AiFillInstagram /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.contact}>
                        <h2>Instagram</h2>
                        <Gallery />
                        <Link href='https://www.instagram.com/scaleup_village' target='_blank' style={{ color: '#000', textDecoration: 'none' }}><b>Visit Us Now</b></Link>
                    </div>
                    <div className={styles.contact}>
                        <b className={styles.text}>Location: Shifa Convention Center, Perintalmana</b>
                        <iframe
                            src={map}
                            width="600"
                            height="450"
                            loading="lazy"
                        />
                    </div>
                </div>
                <p className={styles.copy}>Copyright ©2024 Hoomans Project Private Limited All rights reserved </p>
            </div>
        </footer>
    )
}