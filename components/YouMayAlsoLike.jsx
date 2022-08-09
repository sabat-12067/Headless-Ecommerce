import Image from 'next/image';
import Link from 'next/link';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { formatprice } from './HorLine';

const YouMayAlsoLike = ({ youMayAlsoLikeData }) => {
  function slideLeft() {
    let slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 300;
  }

  function slideRight() {
    let slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 300;
  }

  const youMayAlsoLikeProducts =
    youMayAlsoLikeData.attributes.audioproducts.data;
  console.log('You May Also Like Products', youMayAlsoLikeProducts);

  return (
    <section className='px-4 py-8 max-w-6xl mx-auto text-center mb-4'>
      <h2 className='py-5'>You may also like</h2>
      <div className='relative group'>
        <div
          id='slider'
          className='relative overflow-x-scroll scrollbar-hide whitespace-nowrap scroll-smooth h-full w-full space-x-3'>
          {youMayAlsoLikeProducts.map((item) => {
            const { id, attributes } = item;
            const { name, image, price, percentageDiscount } = attributes;
            const imageUrl = image.data[0].attributes.url;
            let originalPrice = (price * 100) / (100 - percentageDiscount);
            originalPrice = formatprice(originalPrice);
            return (
              <Link href={`/product/details/${id}`} key={id}>
                <div className='bg-white w-[230px] md:w-[300px] inline-block text-center cursor-pointer rounded relative group overflow-hidden shadow-xl'>
                  <div>
                    <Image
                      src={imageUrl}
                      alt={`image of ${name}`}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className='pb-4'>
                    <h3 className='font-bold tracking-wide md:hidden text-xs md:text-sm'>
                      {name.slice(0, 30)}...
                    </h3>
                    <h3 className='font-bold tracking-wide hidden md:block text-xs md:text-sm'>
                      {name.slice(0, 40)}...
                    </h3>
                  </div>
                  <div className='flex items-center pl-3 pb-5'>
                    <h3 className='font-bold tracking-wide text-base md:text-lg'>
                      {price}
                    </h3>
                    { percentageDiscount && (<h3 className='font-bold tracking-wide text-sm md:text-base line-through ml-4'>
                      {originalPrice}
                    </h3>)}
                    {percentageDiscount && (
                  <div className='absolute flex items-center justify-center top-5 left-5 text-primary-10 bg-primary-12 w-12 h-12 p-2 rounded-full font-bold'>
                    <p>-{percentageDiscount}%</p>
                  </div>)}
                  </div>
                </div>
              </Link>
            );
          })}
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
