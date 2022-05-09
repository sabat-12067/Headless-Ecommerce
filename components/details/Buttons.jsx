import { BiPlus, BiMinus } from 'react-icons/bi';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import { quantityActions } from '../../store/quantitySlice';
import { cartActions } from '../../store/cartSlice';

//This component is for the 'edit quantity',  'add to cart' and the 'buy now' buttons of the product details screen/page.

export default function Buttons({ singleProduct, productId }) {
  const quantity = useSelector((state) => state.quantityValue.quantity);

  const dispatch = useDispatch();

  const { price, name, image, discountPrice, discountPercentage } =
    singleProduct;
    
    //grab thumbnail - of the first image - of the product
    const imageThumbnail = image.data[0].attributes.formats.thumbnail.url
    
    //change the price to a number
    const productPriceNumber = price.replace(/\D/g, '');

  const addToCart = () => {
  
    dispatch(
      cartActions.addToCart({
        id: productId,
        name,
        price: productPriceNumber,
        image: imageThumbnail,
        discountPrice,
        discountPercentage,
        quantity
      })
    );
  };

  const handleIncrement = () => {
    dispatch(quantityActions.increment());
  };

  const handleDecrement = () => {
    dispatch(quantityActions.decrement());
  };

  return (
    <section className='px-4'>
      <div>
        <p className='text-base pb-1'>Quantity</p>
        <div className='flex items-center border-[1px] justify-between px-2 py-2.5 w-40'>
          <BiMinus
            className='w-6 h-6 font-bold lg:cursor-pointer'
            onClick={handleDecrement}
          />
          <p className='self-center h-full font-extrabold text-[1rem] mb-0 border-0 text-lg'>
            {quantity}
          </p>
          <BiPlus
            className='w-6 h-6 font-bold lg:cursor-pointer'
            onClick={handleIncrement}
          />
        </div>
      </div>
      <div className='relative'>
        <button
          className='text-center w-full bg-secondary-1 mt-6 mb-4 text-2xl text-primary-10 flex flex-row items-center justify-center border-[1px] border-primary-10 outline-none rounded-none uppercase'
          onClick={addToCart}>
          <HiOutlineShoppingCart className='absolute left-8 sm:left-20' />
          Add to cart
        </button>
        <button className='text-center w-full bg-primary-10 mb-12 text-2xl text-white flex flex-row items-center justify-center border-0 outline-none rounded-none uppercase'>
          Buy it now
        </button>
      </div>
    </section>
  );
}
