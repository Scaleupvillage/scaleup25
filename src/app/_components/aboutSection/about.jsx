import styles from './about.module.css'
import Image from 'next/image'
import design from '@/../../public/l6.svg'
import group from '@/../../public/group-1.svg'
import l1 from '@/../../public/l1.svg'
import s1 from '@/../../public/s1.png'
import s2 from '@/../../public/s2.png'
import s3 from '@/../../public/s3.png'

const Highlight = [
    {
        img: s1,
        title: 'Lorem ipsum',
        desc: "Lorem ipsum dolor sit amet consectetur. Nulla fermentum ipsum mattis quisque platea id. Amet gravida placerat nulla tristique placerat risus risus."
    },
    {
        img: s2,
        title: 'Lorem ipsum',
        desc: "Lorem ipsum dolor sit amet consectetur. Nulla fermentum ipsum mattis quisque platea id. Amet gravida placerat nulla tristique placerat risus risus."
    },
    {
        img: s3,
        title: 'Lorem ipsum',
        desc: "Lorem ipsum dolor sit amet consectetur. Nulla fermentum ipsum mattis quisque platea id. Amet gravida placerat nulla tristique placerat risus risus."
    },
    {
        img: s1,
        title: 'Lorem ipsum',
        desc: "Lorem ipsum dolor sit amet consectetur. Nulla fermentum ipsum mattis quisque platea id. Amet gravida placerat nulla tristique placerat risus risus."
    },
]

const Scale = [
    {
        img: s1,
        title: 'Lorem ipsum',
        desc: "Lorem ipsum dolor sit amet consectetur. Nulla fermentum ipsum mattis quisque platea id. Amet gravida placerat nulla tristique placerat risus risus."
    },
    {
        img: s2,
        title: 'Lorem ipsum',
        desc: "Lorem ipsum dolor sit amet consectetur. Nulla fermentum ipsum mattis quisque platea id. Amet gravida placerat nulla tristique placerat risus risus."
    },
    {
        img: s3,
        title: 'Lorem ipsum',
        desc: "Lorem ipsum dolor sit amet consectetur. Nulla fermentum ipsum mattis quisque platea id. Amet gravida placerat nulla tristique placerat risus risus."
    },
    {
        img: s1,
        title: 'Lorem ipsum',
        desc: "Lorem ipsum dolor sit amet consectetur. Nulla fermentum ipsum mattis quisque platea id. Amet gravida placerat nulla tristique placerat risus risus."
    },
]

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
                        Lorem ipsum dolor sit amet consectetur. Nulla fermentum ipsum mattis quisque platea id.
                        Amet gravida placerat nulla tristique placerat risus risus. Turpis nunc cras eu mi
                        quam nisl faucibus. Sem scelerisque arcu interdum ultrices faucibus eu quam nunc.
                        Rhoncus sagittis molestie scelerisque vitae eget vestibulum bibendum. Tortor lacus
                        hendrerit leo interdum integer egestas mattis id.
                        <br /> <br />
                        Lorem ipsum dolor sit amet consectetur. Nulla fermentum ipsum mattis quisque
                        platea id. Amet gravida placerat nulla tristique placerat risus risus.
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
