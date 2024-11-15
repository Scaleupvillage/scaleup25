import styles from './speaker.module.css'
import Image from 'next/image'
import design from '@/../../public/group-1.svg'
import wave from '@/../../public/wave.svg'
import arrow from '@/../../public/arrow.svg'
import l2 from '@/../../public/l2.svg'
import { speakers } from './speakersData'

export default function Speaker() {
    return (
        <div className={styles.speaker} id='speakers'>
            <div className={styles.head}>
                <h1>Scaleup <br /> Speakers?</h1>
                <Image
                    src={design}
                    alt="design"
                    width={400}
                    height={400}
                />
            </div>
            <div className={styles.list}>
                <Image
                    src={l2}
                    alt="design"
                    width={400}
                    height={400}
                    className={styles.l2}
                />
                {
                    speakers.map((speaker, index) => (
                        <div className={styles.card} key={index}>
                            <div className={styles.cardHead}>
                                <span>
                                    <h1>{speaker.name}</h1>
                                    <p>{speaker.position}</p>
                                </span>
                                <Image
                                    src={design}
                                    alt="design"
                                    width={400}
                                    height={400}
                                />
                            </div>
                            <Image
                                src={wave}
                                alt="design"
                                width={400}
                                height={400}
                                className={styles.wave}
                            />
                            <div className={styles.cardBody}>
                                <span></span>
                                <Image
                                    src={speaker.img}
                                    alt="design"
                                    width={1000}
                                    height={1000}
                                    className={styles.speakerPic}
                                />
                                <Image
                                    src={arrow}
                                    alt="design"
                                    width={400}
                                    height={400}
                                    className={styles.arrow}
                                />
                                <Image
                                    src={speaker.vector}
                                    alt="design"
                                    width={400}
                                    height={400}
                                    className={styles.v1}
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}