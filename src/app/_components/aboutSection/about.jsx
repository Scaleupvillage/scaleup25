'use client'

import React, { useState } from 'react';
import styles from './about.module.css'
import Image from 'next/image'
import Link from 'next/link'
import group from '@/../../public/group-1.svg'
import group2 from '@/../../public/group-2.svg'
import l1 from '@/../../public/l1.svg'
import l4 from '@/../../public/l4.svg'
import videoThumbnail from '@/../../public/thumbnail.webp'
import { FaPlay } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Highlight } from './data'
import { Scale } from './data'
import { YouTubeEmbed } from '@next/third-parties/google'

import ImageGallery from './gallery';
import Slider from './slider';

export default function About() {
    const [popup, setPopup] = useState(false);
    const [currentVideo, setCurrentVideo] = useState('');

    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = React.createRef();

    const handlePlayClick = () => {
        setIsPlaying(true);
        videoRef.current.play();
    };

    const openPopup = (videoId) => {
        setCurrentVideo(videoId);
        setPopup(true);
    };

    const closePopup = () => {
        setPopup(false);
        setCurrentVideo('');
    };

    return (
        <div className={styles.about}>
            <div className={styles.location}>
                <div className={styles.date}>
                    <div className={styles.days}>
                        <div>15 <span>th</span></div>
                        <p>&</p>
                        <div>16 <span>th</span></div>
                    </div>
                    <p>February</p>
                </div>
                <span>
                    <HiOutlineLocationMarker className={styles.icon} />
                    <p>Shifa Convention Center, <br /> Perinthalmanna , Malappuram</p>
                </span>
            </div>

            <Image
                src={l1}
                alt="group"
                className={styles.l1}
                width={400}
                height={400}
            />

            <div className={styles.content}>
                <div className={styles.aboutContent}>
                    <Image
                        src={group}
                        alt="group"
                        className={styles.design}
                        width={400}
                        height={400}
                    />
                    <h2>About ScaleUp</h2>
                    <p>
                        <b>ScaleUp Conclave 2025</b> hosted by <b>ScaleUp Village</b>, that brings together entrepreneurs, investors,
                        aspiring business leaders, and students on a shared platform. It's designed to spark meaningful
                        conversations, nurture fresh ideas, and create real opportunities for growth. With a focus on
                        startup investments, idea development, and professional connections, the conclave is
                        all about inspiring action, building relationships, and helping people take their business ambitions to the next level.
                    </p>
                    <p>
                        <b>ScaleUp Village</b> is a unique hub in India supporting startups and businesses. As an incubator and accelerator, it
                        offers tools, guidance, and connections to help entrepreneurs grow and succeed.
                    </p>
                    <span>
                        <Image
                            src={group2}
                            alt="group"
                            className={styles.group}
                            width={400}
                            height={400}
                        />
                        <Link href='#'>Download Brochure</Link>
                    </span>
                </div>
                <div className={styles.highlight}>
                    <h2>Pervious Edition (2024)</h2>
                    <div className={styles.scroll}>
                        {
                            Highlight.map((item, index) => {
                                return (
                                    <div className={styles.box} key={index}>
                                        <div
                                            className={styles.youtube}
                                            onClick={() => openPopup(item.link)}
                                        >
                                            {/* <Image
                                                src={item.img}
                                                alt='highlight'
                                                width={400}
                                                height={400}
                                            /> */}
                                            <Slider img={item.img} />
                                            <FaPlay className={styles.icon} />
                                        </div>
                                        <span>
                                            <h3>{item.title}</h3>
                                            <p>{item.desc}</p>
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.fade}></div>
                </div>
            </div>

            {popup && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <button
                            className={styles.closeButton}
                            onClick={closePopup}>
                            <IoIosCloseCircleOutline size={35} />
                        </button>
                        <YouTubeEmbed
                            videoid={currentVideo}
                            width={350}
                            className={styles.responsiveEmbed}
                        />
                    </div>
                </div>
            )}

            <div className={styles.content}>
                <div className={styles.aboutContent}>
                    <h2>About ScaleUp</h2>
                    {!isPlaying && (
                        <div className={styles.thumbnailContainer} onClick={handlePlayClick}>
                            <Image
                                src={videoThumbnail}
                                alt="Video Thumbnail"
                                fill
                            />
                            <FaPlay className={styles.icon} />
                        </div>
                    )}
                    <video
                        ref={videoRef}
                        src='https://www.youtube.com/watch?v=zYaQg8zxQpg'
                        poster='./thumbnail.webp'
                        controls
                        className={styles.video}
                        style={{ display: isPlaying ? 'block' : 'none' }}
                    >
                        Your browser does not support the video tag.
                    </video>
                    <p>
                        ScaleUp Village is a unique hub in India supporting startups and businesses.
                        As an incubatorand accelerator, it offers tools, guidance, and connections
                        to help entrepreneurs grow and succeed.
                    </p>
                    <p>
                        As an incubatorand accelerator, it offers tools, guidance.
                    </p>
                </div>
                <div className={styles.gallery}>
                    <ImageGallery />
                    <div className={styles.galleryLink}>
                        <Image
                            src={group}
                            alt="group"
                            className={styles.design}
                            width={400}
                            height={400}
                        />
                        <Link href='#'>View All</Link>
                    </div>
                </div>
            </div>

            <div className={styles.who}>
                <div className={styles.head}>
                    <h2>ScaleUp for Who?</h2>
                    <Image
                        src={group2}
                        alt="group"
                        width={400}
                        height={400}
                    />
                </div>
                <div className={styles.whoContent}>
                    {
                        Scale.map((item, index) => {
                            return (
                                <div className={styles.box} key={index}>
                                    <div className={styles.highlightImg}>
                                        <Image
                                            src={item.img}
                                            alt="highlight"
                                            width={400}
                                            height={400}
                                            loading='lazy'
                                        />
                                    </div>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            )
                        })
                    }
                </div>
                {/* <Image
                    src={l4}
                    alt="group"
                    className={styles.l4}
                    width={400}
                    height={400}
                /> */}
            </div>
        </div>
    )
}