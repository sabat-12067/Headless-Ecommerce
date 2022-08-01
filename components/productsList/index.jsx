import { formatprice } from '../HorLine';
import Link from 'next/link';

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
    <div className='mt-8 flex items-cente justify-center relative bg-white max-w-6xl mx-auto'>
      <div>
        <img
          src={imageUrl}
          alt={`Image of ${categoryName}`}
          className='w-[400px]'
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
    <div className='my-8 sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4 mx-4 max-w-6xl lg:mx-auto'>
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
              <img
                src={imageUrl}
                alt={`Image of ${name}`}
                className='rounded-md'
              />
              <div className='absolute flex items-center justify-center top-5 left-5 bg-secondary-6 w-16 h-16 rounded-full font-bold'>
                <p>-{percentageDiscount}%</p>
              </div>
            </div>
            <Link href={`/product/details/${productId}`}>
              <h3 className='pt-4 md:text-xl lg:cursor-pointer'>{name}</h3>
            </Link>
            <div className='flex justify-center py-4'>
              <p className='text-lg sm:text-2xl font-bold mr-4'>${price}</p>
              <p className='font-medium sm:text-xl text-base line-through'>
                {originalPrice}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;
