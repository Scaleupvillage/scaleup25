'use client'

import { useState } from 'react';
import Image from 'next/image';
import styles from './faq.module.css';
import design from '@/../../public/group-1.svg';

import l3 from '@/../../public/l3.svg'
import l4 from '@/../../public/l4.svg'
import l7 from '@/../../public/l7.svg'

const questions = [
    {
        question: 'What is the purpose of the business conclave?',
        answer: 'The business conclave aims to provide a platform for entrepreneurs, investors, business students, and enthusiasts to share insights, learn from industry leaders, and network with like-minded professionals.',
    },
    {
        question: 'Who can attend the business conclave?',
        answer: ' The event is open to entrepreneurs, investors, business professionals, students, and anyone interested in the business ecosystem.',
    },
    {
        question: 'What types of sessions or activities can participants expect?',
        answer: 'Participants can expect keynote speeches, panel discussions, workshops, pitch competitions, networking sessions, and showcases of new-age technologies and solutions.',
    },
    {
        question: 'How can startups benefit from participating in the conclave?',
        answer: 'Startups can gain valuable mentorship, present their ideas to potential investors, receive feedback, and build connections that could lead to funding and collaborations.',
    },
    {
        question: 'Is there a registration fee for attending the conclave?',
        answer: 'There is no registration fee for general attendants. The Platinum membership fee is five thousand rupees. Kindly refer to the platinum section to know more details.',
    },
    {
        question: 'Will there be opportunities to network with investors and industry leaders?',
        answer: 'Yes, the conclave is designed to foster networking, providing ample opportunities to connect with investors, mentors, and other key industry players.',
    }
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(0);

    const handleToggle = (index) => {
        setOpenIndex(prevIndex => prevIndex === index ? null : index);
    };

    return (
        <div className={styles.faq}>
            <Image
                src={l3}
                alt='design'
                width={800}
                height={800}
                className={styles.l3}
            />

            <div className={styles.content}>
                <Image
                    src={l4}
                    alt='design'
                    width={800}
                    height={800}
                    className={styles.l4}
                />
                <Image
                    src={l7}
                    alt='design'
                    width={800}
                    height={800}
                    className={styles.l7}
                />
                <div className={styles.head}>
                    <h1>Scaleup FAQs</h1>
                    <Image
                        src={design}
                        alt="design"
                        width={400}
                        height={400}
                    />
                </div>
                <div className={styles.faqSection}>
                    <div className={styles.column}>
                        {questions.slice(0, 3).map((question, index) => (
                            <div
                                key={index}
                                className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
                            >
                                <div
                                    className={styles.faqSummary}
                                    onClick={() => handleToggle(index)}
                                >
                                    <span className={styles.faqIcon}>
                                        {openIndex === index ? '−' : '+'}
                                    </span>
                                    <strong>{question.question}</strong>
                                </div>
                                {openIndex === index && (
                                    <div className={styles.faqAnswer}>{question.answer}</div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className={styles.column}>
                        {questions.slice(3, 6).map((question, index) => (
                            <div
                                key={index + 3}
                                className={`${styles.faqItem} ${openIndex === index + 3 ? styles.open : ''}`}
                            >
                                <div
                                    className={styles.faqSummary}
                                    onClick={() => handleToggle(index + 3)}
                                >
                                    <span className={styles.faqIcon}>
                                        {openIndex === index + 3 ? '−' : '+'}
                                    </span>
                                    <strong>{question.question}</strong>
                                </div>
                                {openIndex === index + 3 && (
                                    <div className={styles.faqAnswer}>{question.answer}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}