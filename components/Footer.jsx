import React from 'react';
import { AiOutlineInstagram } from 'react-icons/ai';
import { RiFacebookCircleLine } from 'react-icons/ri';
import { RiTwitterLine } from 'react-icons/ri';
import HorLine from './HorLine';

function Footer() {
  return (
    <footer className='bg-primary-11 border text-white pt-12 w-screen'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex items-center md:items-end flex-col md:flex-row md:justify-between md:px-6'>
          <h3 className='text-3xl font-extrabold'>asuman sounds</h3>
          <div className='mt-6 md:mt-0 md:flex items-center'>
            <h4 className='uppercase text-center py-3 md:py-0 md:px-12 text-sm cursor-pointer hover:text-secondary-7 duration-300 ease-in'>
              home
            </h4>
            <h4 className='uppercase text-center text-sm cursor-pointer hover:text-secondary-7 duration-300 ease-in'>
              headphones
            </h4>
            <h4 className='uppercase text-center py-3 md:py-0 md:px-12 text-sm cursor-pointer hover:text-secondary-7 duration-300 ease-in'>
              speakers
            </h4>
            <h4 className='uppercase text-center text-sm cursor-pointer hover:text-secondary-7 duration-300 ease-in'>
              home theaters
            </h4>
            <h4 className='uppercase text-center py-3 md:py-0 md:pl-12 text-sm cursor-pointer hover:text-secondary-7 duration-300 ease-in'>
              headsets
            </h4>
          </div>
        </div>
        <div className='md:flex items-center justify-between'>
          <div className='md:w-[60%]'>
            <p className='mt-8 text-center px-6 leading-8 md:text-left md:text-base'>
              Asuman sounds is an all in one stop to fulfill your audio needs.
              We are a small team of music lovers and sound specialists who are
              devoted to helping you get the most out of persnal audio. Come and
              visit our demo facility - we are open 7 days a week.
            </p>
            <div className='text-sm text-center my-8 md:text-left md:px-6'>
              Copyright © 2022 Asuman Sounds. All rights reserved.
            </div>
          </div>
          <div className='flex justify-center pb-8 pr-6'>
            <AiOutlineInstagram className='w-8 h-8 cursor-pointer hover:text-secondary-7 duration-300 ease-in' />
            <RiFacebookCircleLine className='mx-8 w-8 h-8 cursor-pointer hover:text-secondary-7 duration-300 ease-in' />
            <RiTwitterLine className='w-8 h-8 cursor-pointer hover:text-secondary-7 duration-300 ease-in' />
          </div>
        </div>
        {/* <p className="text-sm font-bold text-primary-13 font-['Dancing_Script']">
          Developed by{' '}
          <span className='text-secondary-7'>Asuman Ssendegeya</span>
        </p> */}
      </div>
    </footer>
  );
}

export default Footer;
