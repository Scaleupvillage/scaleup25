import styles from './pre.module.css'
import Image from 'next/image'
import Link from 'next/link'
import design from '@/../../public/group-1.svg';
import { events } from './preData'

export default function Pre() {
    return (
        <div className={styles.pre}>
            <div className={styles.head}>
                <h1>ScaleUp Pre-Events</h1>
                <Image
                    src={design}
                    alt="design"
                    width={400}
                    height={400}
                />
            </div>

            <div className={styles.scroll}>
                <div className={styles.list}>
                    {events.map((event, index) => (
                        <div className={styles.card} key={index}>
                            <div className={styles.cardBody}>
                                <Image
                                    src={event.img}
                                    alt="event image"
                                    width={1000}
                                    height={1000}
                                    className={styles.eventPic}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.desc}>
                                    <h1>{event.title}</h1>
                                    <p>{event.desc}</p>
                                </div>
                                <div className={styles.reg}>
                                    <span>Feb 1st, 10:00 AM</span>
                                    <Link href={event.link}>Register</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
