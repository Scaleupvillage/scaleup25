import styles from './footer.module.css'
import Image from 'next/image';
import design from '@/../../public/group-3.svg'
import { FaPinterest, FaFacebookF, FaTwitter, FaDribbble } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import InstaFeed from './insta';

const map = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15667.232757242782!2d76.246182!3d10.977846!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7cda1960f1e95%3A0x971882d6dc32948e!2sShifa%20Convention%20Center!5e0!3m2!1sen!2sin!4v1731414712454!5m2!1sen!2sin'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.blocks}>
                    <div className={styles.contact}>
                        <h1>Contact Us.</h1>
                        <div className={styles.divide}>
                            <Image
                                src={design}
                                alt='design'
                                width={400}
                                height={400}
                            />
                            <span>
                                <p>We can place a message here for them to have an avenue to contact us..</p>
                                <div className={styles.icon}>
                                    <div className={styles.con}><FaPinterest /></div>
                                    <div className={styles.con}><FaFacebookF /></div>
                                    <div className={styles.con}><FaTwitter /></div>
                                    <div className={styles.con}><FaDribbble /></div>
                                    <div className={styles.con}><AiFillInstagram /></div>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className={styles.contact}>
                        <h2>Instagram</h2>
                        <InstaFeed />
                        <b>Visit Us Now</b>
                    </div>
                    <div className={styles.contact}>
                        <b className={styles.text}>Location: Al Shifa Convention Center, Perintalmana</b>
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