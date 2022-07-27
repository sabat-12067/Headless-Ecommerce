import { useEffect, useState } from 'react';
import heroItems from './heroItems';
import {FiArrowDownCircle} from 'react-icons/fi';
import headPhoneImage from '../../public/images/headphones-two.png';
import { Link } from 'react-scroll';

export default function Hero() {
const [currentSlide, setCurrentSlide] = useState(0);

useEffect(() => {
const slideInterval = setInterval(() => {
setCurrentSlide(currentSlide < 2 ? currentSlide + 1 : 0);
}, 5000);
//clearInterval(slideInterval);
return () => clearInterval(slideInterval);
});

return (
<section className='w-screen h-screen relative overflow-hidden'>
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
    </section>

);
}