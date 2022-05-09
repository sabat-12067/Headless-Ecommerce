import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Carousel({ singleProduct }) {
     
 const { image } = singleProduct;

  return (
    <section className='md:w-full'>
      <MySwiper image={image} />
     <Images image={image} />
    </section>
  );
}

//Swiper is only shown on small screens (screens below 768px)
//Swiper is a slider that can be used to display images, videos, or other content.
function MySwiper({ image }) {
  
  return (
    <div className='md:hidden'>    
    <Swiper
      // install Swiper modules
      className='bg-[white]'
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
    </div>
  );
};

//This component is for displaying images of the product on medium and large screens (screens above 768px)
const Images = ({ image }) => {

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  //set current slide index to the index of the image that is clicked
  const changeSlide = (index) => {
    setCurrentSlideIndex(index);
  }

  return (
    <section>
      {/*Container for slide images */}
      <div className='hidden md:block overflow-hidden'>
        <div className='flex'>
          {image.data.map((image, index) => {
            return (
              <article
                key={index}
                className={`absolute z-90 ${
                  currentSlideIndex === index ? 'opacity-100' : 'opacity-0'
                }`}>
                <img src={image.attributes.url} alt='slide image' className='rounded-xl mt-8 md:w-[350px] lg:w-[450px] '/>
              </article>
            );
          })}
        </div>
      </div>
      {/*Thumbnails Container*/}
      <div className='relative lg:top-[500px] md:top-[400px] hidden md:flex pl-2'>
        {image.data.map((image, index) => {
          return (
            <article key={index} className=''>
              <img
                src={image.attributes.formats.thumbnail.url}
                alt='slide image'
                className='mr-2 w-20 h-20 rounded-lg cursor-pointer'
                onClick={() => changeSlide(index)}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
