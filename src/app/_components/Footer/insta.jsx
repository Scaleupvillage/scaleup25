"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./footer.module.css";

const InstaFeed = () => {
    const [instagramFeed, setInstagramFeed] = useState(null);
    const [after, setAfter] = useState(null);
    const [error, setError] = useState(null);

    const fetchFeed = async (after = null) => {
        try {
            let url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp,permalink&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN}`;
            if (after) {
                url += `&after=${after}`;
            }
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Failed to fetch Instagram feed");
            }

            const feed = await response.json();
            setInstagramFeed(feed);
            setAfter(feed.paging?.cursors.after);
        } catch (err) {
            console.error("Error fetching Instagram feed:", err.message);
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchFeed();
    }, []);

    return (
        <>
            {error && <p className={styles.error}>{error}</p>}
            
            {instagramFeed && (
                <div className={styles.feedGrid}>
                    {instagramFeed.data.map((post) => (
                        <Link
                            key={post.id}
                            href={post.permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.postLink}
                        >
                            {post.media_type === "VIDEO" ? (
                                <video
                                    src={post.media_url}
                                    controls={false}
                                    className={styles.postMedia}
                                />
                            ) : (
                                <Image
                                    src={post.media_url}
                                    alt={post.caption || ""}
                                    className={styles.postMedia}
                                    width={300}
                                    height={300}
                                />
                            )}
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
};

export default InstaFeed;