import { formatprice } from '../HorLine';
import Link from 'next/link';
import Image from 'next/image';

const ProductsList = ({ productsData }) => {
  return (
    <section>
      <HeaderImage productsData={productsData} />
      <Productslist productsData={productsData} />
    </section>
  );
};

const HeaderImage = ({ productsData }) => {
  const categoryName = productsData.attributes.name;
  const imageUrl = productsData.attributes.image.data[0].attributes.url;
  return (
      <div className='md:mt-8 flex justify-center relative bg-white max-w-[1120px] mx-auto'>
        <div>
          {/* <img
          src={imageUrl}
          alt={`Image of ${categoryName}`}
          className='w-[400px]'
        /> */}
          <Image
            src={imageUrl}
            alt={`Image of ${categoryName}`}
            width={400}
            height={450}
          />
        </div>
        <h1 className='absolute text-6xl md:text-7xl left-5 top-16'>
          {categoryName}
        </h1>
      </div>
  );
};

const Productslist = ({ productsData }) => {
  const productsListData = productsData.attributes.audioproducts.data;
  return (
    <div className='my-8 sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 max-w-6xl lg:mx-auto'>
      {productsListData.map((product) => {
        const productId = product.id;
        const name = product.attributes.name;
        const price = product.attributes.price;
        const imageUrl = product.attributes.image.data[0].attributes.url;
        const percentageDiscount = product.attributes.percentageDiscount;
        let originalPrice = (price * 100) / (100 - percentageDiscount);
        originalPrice = formatprice(originalPrice);

        return (
          <div className='sm:mx-0' key={productId}>
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
            <Link href={`/product/details/${productId}`} passHref>
              <h3 className='pt-4 md:text-lg xl:text-xl tracking-wider lg:cursor-pointer'>
                {name}
              </h3>
            </Link>
            <div className='flex justify-center items-center py-4'>
              <p className='text-lg sm:text-2xl font-bold mr-4'>${price}</p>
              {percentageDiscount ? (
                <p className='font-medium sm:text-xl text-base line-through'>
                  {originalPrice}
                </p>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;
