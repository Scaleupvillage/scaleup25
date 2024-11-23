'use client';

import styles from './pre.module.css';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

export default function Slider({ img }) {
    const images = Array.isArray(img) ? img : [img];

    return (
        <div className={styles.cardBody}>
            <PhotoProvider>
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
                            <PhotoView src={typeof image === 'object' ? image.src : image}>
                                <Image
                                    src={image}
                                    alt={`highlight-${index}`}
                                    className={styles.eventPic}
                                    width={400}
                                    height={400}
                                    loading='lazy'
                                />
                            </PhotoView>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </PhotoProvider>
        </div>
    );
}