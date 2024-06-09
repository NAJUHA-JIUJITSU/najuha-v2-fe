//공통 캐러셀 래퍼 컴포넌트
import { EmblaOptionsType } from 'embla-carousel';
import { EmblaCarousel } from './EmblaCarousel';

const CarouselWrapper = () => {
  const OPTIONS: EmblaOptionsType = { align: 'center', loop: true };

  return (
    <section>
      <EmblaCarousel options={OPTIONS} />
    </section>
  );
};

export default CarouselWrapper;
