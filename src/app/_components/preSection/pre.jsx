import styles from './pre.module.css'
import Image from 'next/image'
import Link from 'next/link'
import design from '@/../../public/group-1.svg';
import Slider from './slider'
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
                            <Slider img={event.img} />
                            <div className={styles.cardContent}>
                                <div className={styles.desc}>
                                    <h1>{event.title}</h1>
                                    <p>{event.desc}</p>
                                </div>
                                <div className={styles.reg}>
                                    <span>{event.date}</span>
                                    <Link href={event.link}>Register Now</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
