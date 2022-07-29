import React from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import headphone from '../../public/images/headphone.png';
import headsets from '../../public/images/headsets.png';
import hometheater from '../../public/images/hometheatre.png';
import speaker from '../../public/images/speaker.png';

const categories = [
  { name: 'Headphones', image: headphone },
  { name: 'Headsets', image: headsets },
  { name: 'Home Theaters', image: hometheater },
  { name: 'Speakers', image: speaker },
];

const Categories = () => {
  return (
    <section className='px-5 lg:px-0 max-w-6xl mx-auto pt-8'>
      <div className='sm:grid sm:grid-cols-2 gap-5'>
        {categories.map((category, index) => {
          const { name, image } = category;
          return (
            <div key={index} className=' bg-primary-14 mt-20 sm:mt-18 rounded-lg'>
              <div className='flex justify-center items-center mb-20 md:mb-28'>
                <img src={image.src} alt={name} className='w-40 md:w-48 absolute' />
              </div>
              <h3 className='uppercase  tracking-wider mt-3'>{name}</h3>
              <div className='py-5 flex justify-center items-center md:py-10'>
                <h3 className='uppercase mr-3 font-medium tracking-wider'>
                  shop
                </h3>
                <MdArrowForwardIos className='text-secondary-8 md:h-7 md:w-7' />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
