'use client';
import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './Carousel.module.scss';
import { useDotButton } from './EmblaCarouselDotButton';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

type PropType = {
  options?: EmblaOptionsType;
};

const slides = [
  { id: 1, img: '/images/sampleCarousel.png', alt: 'main-carousel', url: '/' },
  { id: 2, img: '/images/sampleCarousel.png', alt: 'main-carousel', url: '/' },
  { id: 3, img: '/images/sampleCarousel.png', alt: 'main-carousel', url: '/' },
  { id: 4, img: '/images/sampleCarousel.png', alt: 'main-carousel', url: '/' },
];

export const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ delay: 3000 })]);
  const { selectedIndex } = useDotButton(emblaApi);

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((slide, index) => (
            <div className={styles.embla__slide} key={index}>
              <Image
                className={styles.embla__slide__img}
                src={slide.img}
                alt={slide.alt}
                width={100}
                height={100}
                priority={true}
              />
            </div>
          ))}
        </div>
        <div className={styles.embla__controls}>
          <div className={styles.slideIndex}>
            <span>{selectedIndex + 1}</span> / {slides.length}
          </div>
        </div>
      </div>
    </div>
  );
};
