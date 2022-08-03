import { AiOutlineInstagram } from 'react-icons/ai';
import { RiFacebookCircleLine } from 'react-icons/ri';
import { RiTwitterLine } from 'react-icons/ri';
import Link from 'next/link';

function Footer() {

  const listItems = [
    { text: 'home', path: '/' },
    { text: 'headsets', path: '/products/category/3' },
    { text: 'speakers', path: '/products/category/1' },
    { text: 'home theaters', path: '/products/category/2' },
    { text: 'headphones', path: '/products/category/4' },
  ];

  return (
    <footer className='bg-primary-11 border text-white py-12 w-screen'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex items-center md:items-end flex-col md:flex-row md:justify-between md:px-6'>
          <h3 className='text-3xl font-extrabold'>asuman sounds</h3>
          <div className='mt-6 md:mt-0 md:flex items-center'>
            {listItems.map((listItem, index) => {
              const { text, path } = listItem;
              return (
                <h4
                  className='uppercase text-center py-3 md:py-0 md:px-4 text-sm cursor-pointer hover:text-secondary-7 duration-300 ease-in'
                  key={index}>
                  <Link href={path}>{text}</Link>
                </h4>
              );
            })}
          </div>
        </div>
        <div className='md:flex items-center justify-between'>
          <div className='md:w-[50%]'>
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
      </div>
      <Link href='https://www.linkedin.com/in/ssendegeya-asuman' passHref>
        <h3 className="text-base lg:cursor-pointer font-bold text-primary-13 font-['Dancing_Script']">
          Developed by{' '}
          <span className='text-secondary-7'>Asuman Ssendegeya</span>
        </h3>
      </Link>
    </footer>
  );
}

export default Footer;
