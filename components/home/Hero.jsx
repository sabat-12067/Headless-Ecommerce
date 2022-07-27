import { useEffect, useState } from 'react';
import heroItems from './heroItems';
import {FiArrowDownCircle} from 'react-icons/fi';
import headPhoneImage from '../../public/images/headphones-two.png';
import { Link } from 'react-scroll';

import jblHeadphone from '../../public/images/jbl-3.png';

export default function Hero() {
// const [currentSlide, setCurrentSlide] = useState(0);

// useEffect(() => {
// const slideInterval = setInterval(() => {
// setCurrentSlide(currentSlide < 2 ? currentSlide + 1 : 0);
// }, 5000);
// //clearInterval(slideInterval);
// return () => clearInterval(slideInterval);
// });

return (
  <section className='w-screen h-screen bg-primary-10'>
    <div className='flex justify-center items-center max-w-5xl mx-auto'>
      <div className='text-white flex flex-col justify-center md:justify-start px-6 md:p-0 md:pl-12  md:w-[50%] absolute md:static top-[150px] md:mt-28 z-10'>
        <h1 className='uppercase sm:text-left'>
          700bt jbl wireless headphones
        </h1>
        <h4 className='normal-case text-lg md:text-3xl my-6 leading-12'>
          Experience natural life like audio and exceptional build quality made
          for the passionate music enthusiast
        </h4>
        <button className='bg-primary-4 text-primary-10 uppercase tracking-wider sm:w-[300px] md:text-xl py-4 my-4'>
          see product
        </button>
      </div>
      <div className='absolute top-[150px] md:static'>
        <img
          src={jblHeadphone.src}
          alt='inage of jbl headphones'
          className='w-full'
        />
      </div>
    </div>
  </section>
);
}



{/* <section className='w-screen h-screen relative overflow-hidden'>
 <div className='h-full flex w-[fit-content] '>
{heroItems.map((heroItem, index) => {
const { h3, h1, imageUrl } = heroItem;

          return (
            <section
              key={index}
              className={`absolute h-full w-screen duration-[1.5s] ease-in-out ${
                currentSlide == index ? 'opacity-1' : 'opacity-0'
              }`}>
              <div className='flex-col items-center justify-center flex absolute h-full w-full z-10 text-[white]'>
                <h3 className='uppercase px-4'>{h3}</h3>
                <h1 className='mt-8'>{h1}</h1>
                 <Link
            to='products'
            smooth={true}
            offset={0}
            duration={500}
            className='w-[80%] md:w-[50%]'>
            <button className='mt-32 rounded-none w-full mx-auto bg-primary-11 uppercase'>
              shop now
            </button>
          </Link>
              </div>
              <FiArrowDownCircle className='absolute top-[90%] right-6 text-secondary-8 z-100 w-8 h-8 animate-bounce' />
              <div className='h-full bg-[#374151] w-full'>
                <img
                  src={imageUrl}
                  alt='slide image'
                  className='h-full mix-blend-multiply w-full object-cover'
                />
              </div>
            </section>
          );
        })}
      </div> 
    </section> */}
