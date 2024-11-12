import styles from './about.module.css'
import Image from 'next/image'
import design from '@/../../public/l6.svg'
import group from '@/../../public/group-1.svg'
import l1 from '@/../../public/l1.svg'

import { Highlight } from './data'
import { Scale } from './data'

export default function About() {
    return (
        <div className={styles.about}>
            <div className={styles.title}>
                <h1>The Start to something amazing on! <span>Feb 1st,2nd 2025</span></h1>
                <Image
                    src={design}
                    alt="design"
                    className={styles.design}
                    width={400}
                    height={400}
                />
            </div>

            <Image
                src={l1}
                alt="group"
                className={styles.l1}
                width={400}
                height={400}
            />

            <div className={styles.content}>
                <div className={styles.aboutContent}>
                    <h2>About</h2>
                    <p>
                        <b>ScaleUp Business Conclave 2025</b> is the second business conclave organized by ScaleUp Village,
                        offering a vibrant platform for entrepreneurs, investors, business students, and enthusiasts.
                        This two-day event fosters business acumen, professionalism, and knowledge-sharing. It provides
                        opportunities for startup investments, refining ideas, and expanding professional networks.
                        <br /> <br />
                        <b>ScaleUp Village</b> is a first-of-its-kind dedicated hub focused on Direct-to-Consumer (D2C)
                        innovation in India. This unique space is designed to revolutionize the entrepreneurial
                        landscape by offering startups and businesses an environment optimized for success.
                    </p>
                    <span>
                        <Image
                            src={group}
                            alt="group"
                            className={styles.group}
                            width={400}
                            height={400}
                        />
                        <button>Register now</button>
                    </span>
                </div>
                <div className={styles.highlight}>
                    <h2>2024 - highlights</h2>
                    <div className={styles.scroll}>
                        {
                            Highlight.map((item, index) => {
                                return (
                                    <div className={styles.box} key={index}>
                                        <Image
                                            src={item.img}
                                            alt="highlight"
                                            className={styles.highlightImage}
                                            width={400}
                                            height={400}
                                        />
                                        <span>
                                            <h3>{item.title}</h3>
                                            <p>{item.desc}</p>
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div className={styles.who}>
                <div className={styles.head}>
                    <h2>Scaleup for who?</h2>
                    <Image
                        src={group}
                        alt="group"
                        width={400}
                        height={400}
                    />
                </div>
                <div className={styles.whoContent}>
                    {
                        Scale.map((item, index) => {
                            return (
                                <div className={styles.box} key={index}>
                                    <Image
                                        src={item.img}
                                        alt="highlight"
                                        className={styles.highlightImage}
                                        width={400}
                                        height={400}
                                    />
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
