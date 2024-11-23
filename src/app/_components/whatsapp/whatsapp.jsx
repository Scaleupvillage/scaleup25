import Link from 'next/link'
import styles from './whatsapp.module.css'
import { FaWhatsapp } from "react-icons/fa";

export default function Whatsapp() {
    return (
        <Link href='' className={styles.whatsapp} aria-label='whatsapp'>
            <FaWhatsapp className={styles.icon} />
        </Link>
    )
}