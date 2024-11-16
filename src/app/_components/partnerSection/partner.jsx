import styles from './partner.module.css';
import Image from 'next/image';
import design from '@/../../public/group-1.svg';
import l2 from '@/../../public/l2.svg';
import { partner } from './partnerData';

export default function Partner() {
    return (
        <div className={styles.partner}>
            <Image
                src={l2}
                alt="design"
                width={400}
                height={400}
                className={styles.l2}
            />
            <div className={styles.head}>
                <h1>ScaleUp Partners</h1>
                <Image
                    src={design}
                    alt="design"
                    width={400}
                    height={400}
                />
            </div>

            <div className={styles.list}>
                {Object.entries(partner).map(([tier, partners]) => (
                    <div key={tier} className={styles.tierSection}>
                        <h2 className={styles.tierTitle}>{tier} Partners</h2>
                        <div className={styles.cardContainer}>
                            {partners.map((partner, index) => (
                                <div className={styles.card} key={index}>
                                    <Image
                                        src={partner.img}
                                        alt={`${tier} partner image`}
                                        width={1000}
                                        height={1000}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}