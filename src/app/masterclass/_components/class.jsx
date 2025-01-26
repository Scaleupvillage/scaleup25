import styles from './common.module.css'
import Image from 'next/image'
import Link from 'next/link'
import group2 from "@/../../public/group-2.svg";
import dummy from "@/../../public/dummy.png";

export default function Class() {
    return (
        <div className={styles.class}>
            <div className={styles.left}>
                <Image
                    src={group2}
                    alt="symbol"
                    width={300}
                    height={300}
                />
                <h1>Event Roster Name, that is this long</h1>
                <p>ScaleUp Conclave 2025 hosted by ScaleUp Village, that brings together entrepreneurs, investors, aspiring business leaders, and students on a shared platform. Its designed to spark meaningful conversations, nurture fresh ideas, and create real opportunities for growth.</p>
                <h2>Topic comes here</h2>
                <ul>
                    <li>ScaleUp Conclave 2025 hosted by ScaleUp Village, that brings together entrepreneurs, investors, </li>
                    <li>aspiring business leaders, and students on a shared platform. Its designed to spark meaningful conversations,</li>
                    <li>nurture fresh ideas, and create real opportunities for growth. </li>
                </ul>
                <h2>Speaker Comes here</h2>
                <p>Speaker Name comes here, designation here</p>
            </div>
            <div className={styles.right}>
                <div className={styles.eventDetails}>
                    <div>
                        <div>
                            <b>Beginner Level</b>
                            <p>5 hours session</p>
                        </div>
                        <span></span>
                        <div>
                            <b>Feb 8th & 9th</b>
                            <p>10 am - 5 pm</p>
                        </div>
                    </div>
                    <Link href="">Register Now</Link>
                </div>
                <Image
                    src={dummy}
                    alt="symbol"
                    width={400}
                    height={400}
                />
            </div>
        </div>
    )
}
