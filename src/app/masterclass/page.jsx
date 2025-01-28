"use client";

import { useEffect, useState } from "react";
import Class from "./_components/class";
import Head from "./_components/head";
import styles from "./page.module.css";

export default function page() {
    const [masterClassContent, setMasterClassContent] = useState([]);

    useEffect(() => {
        fetch("https://opensheet.elk.sh/16fdd7ESplr4b_1ubkKiNChmJdnlBmrIflUcK2iM244w/sheet2")
            .then((response) => response.json())
            .then((data) => {
                let updatedEvents = data.map((event) => {
                    let imageKeys = Object.keys(event).filter((key) => key.startsWith("image"));
                    let image = imageKeys.map((key) => event[key]);

                    image = image.map((img) => {
                        let id = img.split("/")[5];
                        return `https://drive.usercontent.google.com/download?id=${id}`;
                    });

                    return { ...event, image };
                });
                setMasterClassContent(updatedEvents);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className={styles.masterClass}>
            <Head />
            {/* {masterClassContent.map((content, index) => (
                <Class key={index} content={content} />
            ))} */}
        </div>
    );
}
