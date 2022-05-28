import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { productIdActions } from '../../store/productIdSlice';
import { useRouter } from 'next/router';

export default function FeaturedCollection({ products }) {
  //console.log(products);

  return (
    <section className='mt-5 md:relative'>
      <h2 className='uppercase'>bringing you the <span className='text-secondary-7'>best</span> audio gear</h2>
      <div className='md:absolute top-6 flex items-center justify-center left-0 w-full'>
        <hr className='w-28 md:w-44 m-8' />
      </div>
      <div className=' text-white grid grid-cols-grid-sm md:grid-cols-autofill-lg max-w-6xl md:my-12 my-2 pt-6 mx-auto bg-white'>
        {products.map((product, index) => {
          const item = product.attributes;
          const { name, image, price, discountPercentage } = item;

          let discountPrice = (price * 100) / (100 - discountPercentage);

          //convert to two decimal places
          discountPrice = Math.round((discountPrice * 100) / 100).toFixed(2);

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

//Component for single product
const SingleProduct = ({
  name,
  price,
  discountPercentage,
  discountPrice,
  imageUrl,
  productId,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleClick = () => {
    dispatch(productIdActions.setProductId({ productId }));
    isLoggedIn ? router.push(`/product/${productId}`) : router.push('/auth/login');
  };

  return (
    <article className='font-medium relative text-sm md:text-base text-primary-11 bg-white mb-8 lg:cursor-pointer lg:hover:drop-shadow-md border- m-2 lg:hover:rounded-md'>
        <div
          className='flex flex-col items-center p-3 h-full'
          onClick={handleClick}>
          <img src={imageUrl} alt={name} className='' />
          <h3 className='p-3 text-sm'>{name}</h3>
          <p className='font-bold '>$ {price}</p>
          <p className='line-through text-secondary-8'>$ {discountPrice}</p>
          <p className='bg-primary-3 rounded-xl px-3 py-1 outline-none font-bold text-primary-11 absolute top-[12px] text-base animate-wiggle'>
            - {discountPercentage}%
          </p>
        </div>
    </article>
  );
};
