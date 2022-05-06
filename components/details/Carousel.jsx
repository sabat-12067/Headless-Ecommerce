import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Carousel({ singleProduct }) {
     
 const { image } = singleProduct;

  return (
    <section className=''>
      <MySwiper image={image} />
    </section>
  );
}

function MySwiper({ image }) {
  
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      speed={700}
      autoplay={{ delay: 4000, disableOnInteraction: true }}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
    >
      {image.data.map((image, index) => {
        return (
          <SwiperSlide key={index}>
            <img
              key={index}
              src={image.attributes.url}
              alt='slide image'
            />
          </SwiperSlide>
        );
      })}
      {/* <SwiperSlide>Slide 1</SwiperSlide> */}
      ...
    </Swiper>
  );
};
