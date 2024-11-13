'use client';

import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import styles from './footer.module.css';
import Image from 'next/image';

import f1 from '@/../../public/f1.jpg';
import f2 from '@/../../public/f2.jpg';
import f3 from '@/../../public/f3.jpg';
import f4 from '@/../../public/f4.jpg';
import f5 from '@/../../public/f5.jpg';
import f6 from '@/../../public/f6.webp';

// Gallery images array
const gallery = [
    { img: f1, alt: "Image 1" },
    { img: f2, alt: "Image 2" },
    { img: f3, alt: "Image 3" },
    { img: f4, alt: "Image 4" },
    { img: f5, alt: "Image 5" },
    { img: f6, alt: "Image 6" },
];

export default function Gallery() {
    const visiblePhotos = gallery.length;
    return (
        <div className={styles.imgGallery}>
            <PhotoProvider>
                {gallery.slice(0, visiblePhotos).map((photo, index) => (
                    <PhotoView src={photo.img.src} key={index}>
                        <Image
                            src={photo.img}
                            alt='design'
                            width={400}
                            height={400}
                        />
                    </PhotoView>
                ))}
            </PhotoProvider>
        </div>
    );
}
