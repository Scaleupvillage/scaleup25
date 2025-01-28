"use client";

import { useEffect, useState } from "react";
import Class from "./_components/class";
import Head from "./_components/head";
import styles from "./page.module.css";

export default function page() {
    const [masterClassContent, setMasterClassContent] = useState([]);

    useEffect(() => {
        fetch("https://opensheet.elk.sh/1BueE3vVtjJ3ME7lUFEuVO-ODbNiTEc-_kzaLj0kdeSg/events")
            .then((response) => response.json())
            .then((data) => {
                console.log("Masterclass content:", data);
                setMasterClassContent(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className={styles.masterClass}>
            <Head />
            {masterClassContent.map((content, index) => (
                <Class key={index} content={content} />
            ))}
        </div>
    );
}
