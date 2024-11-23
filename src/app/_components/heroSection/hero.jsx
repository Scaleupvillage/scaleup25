import styles from './hero.module.css'
import design from '@/../../public/group-1.svg'
import Image from 'next/image'
import { HiOutlineLocationMarker } from "react-icons/hi";

import { laptop, mobile } from './imgData'
import LaptopSlider from './heroSlider';
import Clock from './clock'

export default function Hero() {
    return (
        <div className={styles.hero} id='hero'>
            <div className={styles.head}>
                <h1>
                    ScaleUp <br />Conclave 2025
                    {/* <span>Second Edition</span> */}
                </h1>
                <div className={styles.location}>
                    <div className={styles.date}>
                        <div className={styles.days}>
                            <div>15 <span>th</span></div>
                            <p>&</p>
                            <div>16 <span>th</span></div>
                        </div>
                        <p>February</p>
                    </div>
                    <span>
                        <HiOutlineLocationMarker className={styles.icon} />
                        <p>Shifa Convention Center, <br /> Perinthalmanna , Malappuram</p>
                    </span>
                </div>
                <Image
                    src={design}
                    alt="design"
                    width={400}
                    height={400}
                    className={styles.design}
                />
            </div>
            <div className={styles.imgContainer}>
                <div className={styles.laptop}>
                    <LaptopSlider img={laptop} />
                </div>
                <div className={styles.mobile}>
                    <LaptopSlider img={mobile} />
                </div>
                <Clock />
            </div>
        </div>
    );
}