import Class from './_components/class'
import Head from './_components/head'
import styles from './page.module.css'

export default function page() {
    return (
        <div className={styles.masterClass}>
            <Head />
            <Class />
        </div>
    )
}