import React from 'react';
import { AiOutlineInstagram } from 'react-icons/ai';
import { RiFacebookCircleLine } from 'react-icons/ri';
import { RiTwitterLine } from 'react-icons/ri';
import HorLine from './HorLine';

function Footer() {
  return (
    <footer className='flex flex-col items-center justify-center bg-primary-10 text-white relative bottom-0 py-12 font-medium  w-screen pb-10  max-w-6xl mx-auto'>
      {/* <HorLine /> */}
      <div className='md:flex md:w-full md:px-6 md:justify-between'>
        <article className='text-center mb-4'>
          <h4 className=''>Company</h4>
          <p>About Us</p>
          <p>Return</p>
          <p>Help</p>
        </article>
        <article className='mb-4'>
          <h4>Visit</h4>
          <p>Store locator</p>
        </article>
        <article className='mb-4'>
          <h4>Connect</h4>
          <p>Contact Us</p>
        </article>
      </div>
      <article className='flex justify-center w-full md:text-[2rem] my-6'>
        <div className='flex'>
          <AiOutlineInstagram />
          <RiFacebookCircleLine className='mr-9 ml-9' />
          <RiTwitterLine />
        </div>
      </article>
      <p className="text-sm md:text-base font-bold text-primary-13 font-['Dancing_Script']">
        Developed by <span className='text-secondary-7'>Asuman Ssendegeya</span>
      </p>
    </footer>
  );
}

export default Footer;
