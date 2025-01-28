import styles from "./common.module.css";
import Image from "next/image";
import group2 from "@/../../public/group-2.svg";

export default function Head() {
    const userName = sessionStorage.getItem("userName");
    return (
        <div className={styles.head}>
            {userName && (
                <p className={styles.hiNamePill}>👋 Hi, {userName ? userName : "there"}</p>
            )}
            <h1>
                Scaleup Conclave Parallel Track
                <Image src={group2} alt="symbol" width={300} height={300} />
            </h1>
            <div>
                <h2>MasterClass</h2>
                <p>
                    ScaleUp Conclave 2025 hosted by ScaleUp Village, that brings together
                    entrepreneurs, investors, aspiring business leaders, and students on a shared
                    platform. It designed to spark meaningful conversations, nurture fresh ideas,
                    and create real opportunities for growth.
                </p>
            </div>
        </div>
    );
}
