import Link from 'next/link';

export default function FeaturedCollection({ products }) {
  //console.log(products);

  return (
    <section className='mt-5 md:relative'>
      <h2>Top Deals</h2>
      <div className='md:absolute top-6 flex items-center justify-center left-0 w-full'>
        <hr className='w-28 md:w-44 m-8' />
      </div>
      <div className=' text-[white] grid grid-cols-autofill-sm md:grid-cols-autofill-lg max-w-6xl md:my-12 my-2 mx-auto p-1 bg-secondary-6'>
        {products.map((product, index) => {
          const item = product.attributes;
          const { name, image, price, discountPrice, discountPercentage } =
            item;

          //get url of the first images
          const imageUrl = image.data[0].attributes.url;
          const id = product.id;

          return (
            <SingleProduct
              key={id}
              name={name}
              imageUrl={imageUrl}
              price={price}
              discountPrice={discountPrice}
              discountPercentage={discountPercentage}
              productId={id}
            />
          );
        })}
      </div>
    </section>
  );
}

const SingleProduct = ({
  name,
  price,
  discountPercentage,
  discountPrice,
  imageUrl,
  productId
}) => {
  return (
    <article className='font-medium relative text-sm md:text-lg text-primary-8 bg-[white] m-1 rounded-md  p-3 shadow-lg'>
      <Link href={`/${productId}`} passHref>
        <div className='flex flex-col items-center'>
          <img src={imageUrl} alt={name} className='whitespace-nowrap' />
          <h3 className='p-3 text-sm md:text-lg'>{name}</h3>
          <p className='font-bold '>{price}</p>
          <p className='line-through text-secondary-8'>{discountPrice}</p>
          <p className='bg-secondary-4 rounded-xl px-3 py-1 outline-none font-bold text-primary-8 absolute top-[12px] text-base animate-wiggle'>
            - {discountPercentage}
          </p>
        </div>
      </Link>
    </article>
  );
};
