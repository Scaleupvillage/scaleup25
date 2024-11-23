'use client';

import styles from './slider.module.css';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

export default function Slider({ img }) {
    const images = Array.isArray(img) ? img : [img];

    return (
        <div className={styles.cardBody}>
            <Swiper
                spaceBetween={30}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, EffectFade]}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            src={image}
                            alt={`highlight-${index}`}
                            className={styles.eventPic}
                            width={400}
                            height={400}
                            loading='eager'
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}