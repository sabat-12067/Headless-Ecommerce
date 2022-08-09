import { formatprice } from '../HorLine';
import Link from 'next/link';
import Image from 'next/image';

const Productslist = ({ products }) => {
  return (
    <div className='my-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {products.map((product) => {
        const {id, attributes} = product;
        const {name, price, percentageDiscount, image} = attributes;
        const imageUrl = image.data[0].attributes.url;
        let originalPrice = (price * 100) / (100 - percentageDiscount);
        originalPrice = formatprice(originalPrice);

        return (
          <Link href={`/product/details/${id}`} key={id} passHref>
            <div className='sm:mx-0 cursor-pointer'>
              <div className='relative rounded-md'>
                <Image
                  src={imageUrl}
                  alt={`Image of ${name}`}
                  width={450}
                  height={500}
                  className='rounded-md'
                />
                {percentageDiscount && (
                  <div className='absolute flex items-center justify-center top-5 left-5 text-primary-10 bg-primary-12 w-12 h-12 p-2 rounded-full font-bold'>
                    <p>-{percentageDiscount}%</p>
                  </div>
                )}
              </div>
              <h3 className='pt-4 text-xs sm:text-sm text-secondary-6 lg:text-base tracking-wider lg:cursor-pointer'>
                {name}
              </h3>
              <div className='flex justify-center text-secondary-10 items-center py-4'>
                <p className='text-lg sm:text-2xl font-bold mr-4'>${price}</p>
                {percentageDiscount && (
                  <p className='font-medium sm:text-xl text-base line-through'>
                    {originalPrice}
                  </p>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Productslist;
