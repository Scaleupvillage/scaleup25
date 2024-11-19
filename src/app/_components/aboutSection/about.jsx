import styles from './about.module.css'
import Image from 'next/image'
import Link from 'next/link'
import design from '@/../../public/l6.svg'
import group from '@/../../public/group-1.svg'
import l1 from '@/../../public/l1.svg'
import l4 from '@/../../public/l4.svg'
import { Highlight } from './data'
import { Scale } from './data'

import Slider from './slider'

export default function About({ content }) {
    return (
        <div className={styles.about}>
            <div className={styles.title}>
                <h1>The Start To Something Amazing On! <span>Feb 8th, 9th 2025</span></h1>
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
                    <h2>About Us</h2>
                    {/* {
                        content.map((item, index) => (
                            <p key={index}>{item.Content}</p> 
                        ))
                    } */}
                    <p>
                        <b>ScaleUp Business Conclave 2.0</b> is the second edition of the business conclave hosted by <b>ScaleUp Village</b>.
                        This two-day event brings together entrepreneurs, investors, aspiring business leaders, and students
                        on a shared platform. It's designed to spark meaningful conversations, nurture fresh ideas, and
                        create real opportunities for growth. With a focus on startup investments, idea development, and
                        professional connections, the conclave is all about inspiring action, building relationships, and
                        helping people take their business ambitions to the next level.
                    </p>
                    <p>
                        <b>ScaleUp Village</b> is a unique hub in India supporting startups and businesses. As an incubator and accelerator, it offers
                        tools, guidance, and connections to help entrepreneurs grow and succeed.
                    </p>
                    <span>
                        <Image
                            src={group}
                            alt="group"
                            className={styles.group}
                            width={400}
                            height={400}
                        />
                        <Link href='#'>Download Brochure</Link>
                    </span>
                </div>
                <div className={styles.highlight}>
                    <h2>2024 - Highlights</h2>
                    <div className={styles.scroll}>
                        {
                            Highlight.map((item, index) => {
                                return (
                                    <div className={styles.box} key={index}>
                                        <Slider img={item.img} />
                                        <span>
                                            <h3>{item.title}</h3>
                                            <p>{item.desc}</p>
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.fade}></div>
                </div>
            </div>

            <div className={styles.who}>
                <div className={styles.head}>
                    <h2>ScaleUp for Who?</h2>
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
                                    <div className={styles.highlightImg}>
                                        <Image
                                            src={item.img}
                                            alt="highlight"
                                            width={400}
                                            height={400}
                                            loading='eager'
                                        />
                                    </div>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <Image
                    src={l4}
                    alt="group"
                    className={styles.l4}
                    width={400}
                    height={400}
                />
            </div>
        </div>
    )
}
