"use client";

import { useEffect, useState } from "react";
import Class from "./_components/class";
import Head from "./_components/head";
import styles from "./page.module.css";
import { BeatLoader } from "react-spinners";

export default function page() {
    const [masterClassContent, setMasterClassContent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("https://opensheet.elk.sh/16fdd7ESplr4b_1ubkKiNChmJdnlBmrIflUcK2iM244w/sheet2")
            .then((response) => response.json())
            .then((data) => {
                let updatedEvents = data.map((event) => {
                    let imageKeys = Object.keys(event).filter((key) => key.startsWith("image"));
                    let image = imageKeys.map((key) => event[key]);

                    image = image.map((img) => {
                        let id = img.split("/")[5];
                        return id ? `https://drive.usercontent.google.com/download?id=${id}` : "";
                    });

                    return { ...event, image };
                });
                setMasterClassContent(updatedEvents);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        if (masterClassContent.length > 0) {
            setIsLoading(false);
        }
    }, [masterClassContent]);

    return (
        <div className={styles.masterClass}>
            <Head />
            {isLoading ? (
                <div className={styles.loader}>
                    <BeatLoader
                        color={"#7570fd"}
                        size={10}
                        style={{
                            marginBottom: "-8px",
                        }}
                    />
                </div>
            ) : (
                masterClassContent
                    .filter((content) => content.display === "TRUE")
                    .map((content, index) => <Class key={index} content={content} />)
            )}
        </div>
    );
}
