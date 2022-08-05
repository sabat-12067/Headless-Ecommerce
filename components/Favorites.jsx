import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from  'next/image';

const Favorites = () => {

  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    const favoriteItems = JSON.parse(localStorage.getItem('favoriteItems'));
    setFavoriteItems(favoriteItems);
    // eslint-disable-next-line
  }, []);

  return (
    <div className='pt-24 lg:mb-20'>
      <h1 className='text-center uppercase'>Your favorite items</h1>
      {favoriteItems.length > 0 ? (
        <WithItems favoriteItems={favoriteItems} />
      ) : (
        <WithOutItems />
      )}
    </div>
  );
};

const WithItems = ({ favoriteItems }) => {
  return (
    <div>
      {favoriteItems.map((favoriteItem) => {
        const {
          id,
          name,
          price,
          imageUrl,
          discountPrice,
          percentageDiscount,
          isFavorite,
        } = favoriteItem;

        return (
          <article key={id}>
            <div className='relative rounded-md'>
              <Image
                src={imageUrl}
                alt={`Image of ${name}`}
                width={450}
                height={400}
              />
              {percentageDiscount ? (
                <div className='absolute flex items-center justify-center top-5 left-5 bg-secondary-6 w-16 h-16 rounded-full font-bold'>
                  <p>-{percentageDiscount}%</p>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <Link href={`/product/details/${id}`} passHref>
              <h3 className='pt-4 md:text-lg xl:text-xl tracking-wider lg:cursor-pointer'>
                {name}
              </h3>
            </Link>
            <div className='flex justify-center items-center py-4'>
              <p className='text-lg sm:text-2xl font-bold mr-4'>${price}</p>
              {percentageDiscount ? (
                <p className='font-medium sm:text-xl text-base line-through'>
                  {discountPrice}
                </p>
              ) : (
                <p></p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
};

const WithOutItems = () => {
  return (
    <div>
      <h3>You have no favorite items</h3>
    </div>
  );
};

export default Favorites;
