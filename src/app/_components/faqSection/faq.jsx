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
        question: 'What is the return policy?',
        answer: 'Our return policy allows you to return products within 30 days of purchase. Items must be unused, in their original packaging, and include the receipt for a full refund or exchange.',
    },
    {
        question: 'How can I track my order?',
        answer: 'Once your order ships, we\'ll send you a tracking number to monitor your package’s progress. You can use this number on the carrier\'s website to get real-time updates on your shipment.',
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit and debit cards, PayPal, and bank transfers.',
    },
    {
        question: 'Can I change my order after it has been placed?',
        answer: 'Once an order is placed, it cannot be modified. However, you can contact customer service if you need assistance.',
    },
    {
        question: 'Do you offer international shipping?',
        answer: 'Yes, we offer international shipping to various countries. Shipping fees and delivery times will vary based on location.',
    },
    {
        question: 'How do I contact customer support?',
        answer: 'You can reach customer support through our contact page or by emailing support@example.com.',
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