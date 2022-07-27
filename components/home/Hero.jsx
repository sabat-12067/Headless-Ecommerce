import { useEffect, useState } from 'react';
import heroItems from './heroItems';
import { FiArrowDownCircle } from 'react-icons/fi';
import { Link } from 'react-scroll';

import jblHeadphone from '../../public/images/jbl-2.png';

export default function Hero() {
  // const [currentSlide, setCurrentSlide] = useState(0);

  // useEffect(() => {
  //   const slideInterval = setInterval(() => {
  //     setCurrentSlide(currentSlide < 2 ? currentSlide + 1 : 0);
  //   }, 5000);
  //   //clearInterval(slideInterval);
  //   return () => clearInterval(slideInterval);
  // });

  return (
    <section className='w-screen h-screen flex items-center overflow-hidden'>
      <div className='flex flex-col justify-start pl-12  w-[60%]'>
        <h1 className='uppercase text-left'>700bt jbl wireless headphones</h1>
        <h4 className='normal-case text-3xl my-6 leading-12'>Experience natural life like audio and exceptional build quality made for the passionate music enthusiast</h4>
        <button className='bg-primary-10 uppercase tracking-wider w-[300px] text-xl py-4 my-4'>see product</button>
      </div>
      <div className='h-full flex w-[fit-content] '>
        <img src={jblHeadphone.src} alt='inage of jbl headphones' className='py-16'/>
      </div>
    </section>
  );
}
     
// {
//   heroItems.map((heroItem, index) => {
//     const { h3, h1, imageUrl } = heroItem;

//     return (
//       <section
//         key={index}
//         className={`absolute h-full w-screen duration-[1.5s] ease-in-out ${
//           currentSlide == index ? 'opacity-1' : 'opacity-0'
//         }`}>
//         <div className='flex-col items-center justify-center flex absolute h-full w-full z-10 text-[white]'>
//           <h3 className='uppercase px-4'>{h3}</h3>
//           <h1 className='mt-8'>{h1}</h1>
//           <Link
//             to='products'
//             smooth={true}
//             offset={0}
//             duration={500}
//             className='w-[80%] md:w-[50%]'>
//             <button className='mt-32 rounded-none w-full mx-auto bg-primary-11 uppercase'>
//               shop now
//             </button>
//           </Link>
//         </div>
//         <FiArrowDownCircle className='absolute top-[90%] right-6 text-secondary-8 z-100 w-8 h-8 animate-bounce' />
//         <div className='h-full bg-[#374151] w-full'>
//           <img
//             src={imageUrl}
//             alt='slide image'
//             className='h-full mix-blend-multiply w-full object-cover'
//           />
//         </div>
//       </section>
//     );
//   });
// }
