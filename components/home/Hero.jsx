import { useEffect, useState } from 'react';
import heroItems from './heroItems';
import {FiArrowDownCircle} from 'react-icons/fi';
import headPhoneImage from '../../public/images/headphones-two.png';
import { Link } from 'react-scroll';

import jblHeadphone from '../../public/images/jbl-3.png';

export default function Hero() {
return (
  <section className='flex items-center w-screen h-screen bg-primary-10'>
    <div className='flex justify-center items-center max-w-7xl mx-auto h-full'>
      <div className='absolute md:static text-white flex flex-col justify-center md:justify-start px-6 md:p-0 md:pl-12 md:w-[50%] md:mt-28 z-10'>
        <h5 className='uppercase tracking-widest text-center sm:text-left'>new product</h5>
        <h1 className='uppercase sm:text-left md:leading-[70px]'>
          700bt jbl wireless headphones
        </h1>
        <h4 className='normal-case text-xl tracking-wider text-center sm:text-left my-6 leading-10'>
          Experience natural life like audio and exceptional build quality made
          for the passionate music enthusiast
        </h4>
        <button className='bg-secondary-8 text-primary-3 uppercase tracking-wider sm:w-[300px] md:text-xl py-4 my-4'>
          see product
        </button>
      </div>
      <div className='absolute md:static md:mt-24'>
        <img
          src={jblHeadphone.src}
          alt='inage of jbl headphones'
          className='md:w-[450px]'
        />
      </div>
    </div>
  </section>
);
}
