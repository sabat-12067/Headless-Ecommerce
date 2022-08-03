import React from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import headphone from '../../public/images/headphone.png';
import headsets from '../../public/images/headsets.png';
import hometheater from '../../public/images/hometheatre.png';
import speaker from '../../public/images/speaker.png';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { name: 'Headphones', image: headphone, path: '/products/category/4' },
  { name: 'Headsets', image: headsets, path: '/products/category/3' },
  { name: 'Home Theaters', image: hometheater, path: '/products/category/2' },
  { name: 'Speakers', image: speaker, path: '/products/category/1' },
];

const Categories = () => {
  return (
    <section className='px-5 xl:px-0 max-w-6xl mx-auto pt-8'>
      <div className='sm:grid sm:grid-cols-2 gap-5'>
        {categories.map((category, index) => {
          const { name, image, path } = category;
          return (
            <div
              key={index}
              className=' bg-primary-14 mt-20 sm:mt-18 rounded-lg'>
              <div className='flex justify-center items-center mb-20 md:mb-28'>
                {/* <img
                  src={image.src}
                  alt={name}
                  className='w-40 md:w-48 absolute'
                /> */}
                <div className='absolute'>
                  <Image src={image} alt={name} width={160} height={160} />
                </div>
              </div>
              <h3 className='uppercase  tracking-wider mt-3'>{name}</h3>
              <Link href={`${path}`} passHref>
                <div className='py-5 flex justify-center items-center md:py-10'>
                  <h3 className='uppercase mr-3 font-medium tracking-wider lg:cursor-pointer hover:translate-x-2 duration-300 ease-out'>
                    shop
                  </h3>
                  <MdArrowForwardIos className='text-secondary-8 md:h-7 md:w-7' />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
