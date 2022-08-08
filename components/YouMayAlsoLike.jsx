import Image from 'next/image';
import Link from 'next/link';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

const YouMayAlsoLike = () => {
  function slideLeft() {
    let slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 300;
  }

  function slideRight() {
    let slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 300;
  }
  return (
    <section className='px-4 py-8 max-w-6xl mx-auto text-center mb-4'>
      <h2 className='py-5'>You may also like</h2>
      <div className='relative group'>
        <div
          id='slider'
          className='relative overflow-x-scroll scrollbar-hide whitespace-nowrap scroll-smooth h-full w-full space-x-3'>
          {/* {recommendedData.map((item) => (
            <Link href={item.path} key={item.name}>
              <div className='bg-white w-[200px] md:w-[300px] inline-block text-center cursor-pointer rounded relative group overflow-hidden shadow-xl'>
                <div>
                 <Zoom bottom>
                    <Image src={item.image} alt={item.name} objectFit='cover' />
                 </Zoom>        
                </div>
                <div className='p-5'>
                  <Slide left>
                  <p className='font-bold tracking-wide'>{item.name}</p>
                  </Slide>
                </div>
              </div>
            </Link>
          ))} */}
        </div>
        <div
          onClick={slideLeft}
          className='hidden absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 text-2xl bg-white/70 w-10 h-10 md:w-14 md:h-14 rounded-full lg:flex items-center justify-center cursor-pointer group-hover:bg-primary-1 hover:text-white'>
          <BsChevronCompactLeft />
        </div>
        <div
          onClick={slideRight}
          className='hidden absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 text-2xl bg-white/70 w-10 h-10 md:w-14 md:h-14 rounded-full lg:flex items-center justify-center cursor-pointer group-hover:bg-primary-1 hover:text-white'>
          <BsChevronCompactRight />
        </div>
      </div>
    </section>
  );
};

export default YouMayAlsoLike;
