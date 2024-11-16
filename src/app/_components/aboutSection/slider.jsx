'use client'

import styles from './about.module.css';
import Image from 'next/image';

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

export default function Slider({ img }) {
    const images = Array.isArray(img) ? img : [img];
    const randomDelay = Math.floor(Math.random() * (5000 - 2500 + 1)) + 2500;

    return (
        <div className={styles.sliderContainer}>
            <PhotoProvider>
                <Swiper
                    spaceBetween={30}
                    effect={"fade"}
                    fadeEffect={{ crossFade: true }}
                    navigation={false}
                    loop={true}
                    autoplay={{
                        delay: randomDelay,
                        disableOnInteraction: false,
                    }}
                    pagination={false}
                    modules={[Autoplay, EffectFade, Navigation, Pagination]}
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <PhotoView src={typeof image === 'object' ? image.src : image}>
                                <Image
                                    src={image}
                                    alt={`highlight-${index}`}
                                    className={styles.highlightImage}
                                    width={400}
                                    height={400}
                                />
                            </PhotoView>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </PhotoProvider>
        </div>
    );
}
