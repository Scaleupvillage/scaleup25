'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { img } from './imgData';

const ImageGallery = () => {
    const [gridImages, setGridImages] = useState([]);

    // Initialize the grid with random images after the component has mounted
    useEffect(() => {
        const shuffledImages = [...img].sort(() => 0.5 - Math.random());
        setGridImages(shuffledImages.slice(0, 6)); // Select 6 unique images
    }, []);

    useEffect(() => {
        if (gridImages.length === 0) return; // Skip if images are not yet initialized

        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * 6); // Random grid position to change
            const remainingImages = img.filter(
                (image) => !gridImages.includes(image) // Exclude current images from selection
            );
            const newImage = remainingImages[Math.floor(Math.random() * remainingImages.length)];

            if (newImage) {
                // Animate and update the grid
                const currentElement = document.getElementById(`grid-item-${randomIndex}`);
                gsap.to(currentElement, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        const newGridImages = [...gridImages];
                        newGridImages[randomIndex] = newImage;
                        setGridImages(newGridImages);

                        // Animate fade-in
                        gsap.to(currentElement, { opacity: 1, duration: 0.5 });
                    },
                });
            }
        }, 3000); // Interval in milliseconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [gridImages]);

    return (
        <div style={styles.grid}>
            {gridImages.map((item, index) => (
                <div key={index} id={`grid-item-${index}`} style={styles.gridItem}>
                    <Image
                        src={item.img}
                        alt={`Image ${index + 1}`}
                        width={400}
                        height={400}
                        sizes='(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 10w'
                        loading='eager'
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            ))}
        </div>
    );
};

const styles = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        width: '100%',
        margin: '0 auto',
    },
    gridItem: {
        position: 'relative',
        width: '100%',
        paddingBottom: '100%', 
        overflow: 'hidden',
        borderRadius: '8px',
    },
};

export default ImageGallery;