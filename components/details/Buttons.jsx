import { BiPlus, BiMinus } from 'react-icons/bi';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import { quantityActions } from '../../store/quantitySlice';
import { cartActions } from '../../store/cartSlice';
import Link from 'next/link';
import { formatprice } from '../HorLine';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

//This component is for the 'edit quantity',  'add to cart' and the 'buy now' buttons of the product details screen/page.

export default function Buttons({ singleProduct, productId }) {
  const quantity = useSelector((state) => state.quantityValue.quantity);

  const dispatch = useDispatch();

  const { price, name, image, discountPercentage } = singleProduct;

  let discountPrice = (price * 100) / (100 - discountPercentage);
  discountPrice = formatprice(discountPrice);

  //grab thumbnail - of the first image - of the product
  const imageThumbnail = image.data[0].attributes.formats.thumbnail.url;

  const cartItem = {
    id: productId,
    name,
    price: price,
    imageUrl: imageThumbnail,
    discountPrice,
    discountPercentage,
    quantity,
    totalPrice: price * quantity,
  };

  const addToCart = () => {
 // Store the cart items in local storage to a cartItems array
    const cartItems = localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [];

    // Check if the cartItems array already contains the item
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productId
    );

    // If the cartItems array already contains the item, increment the quantity amd update the totalPrice
    if (existingCartItem) {
      existingCartItem.quantity = cartItem.quantity;
      existingCartItem.totalPrice =
        existingCartItem.quantity * existingCartItem.price;
    } else {
      cartItems.push(cartItem);
    }

    // Update the cartItems array in local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update the cartItems array in the redux store
    dispatch(cartActions.setCartItems(cartItems));
  };

  useEffect(() => {
    // Store the cart items in local storage to a cartItems array of the redux store so that it can be accessed by the cart component even after the page reloads
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    dispatch(cartActions.setCartItems(cartItems));
  });

  const buyItNowItem = {
    name,
    price,
    imageThumbnail,
    discountPrice,
    discountPercentage,
    quantity,
  };

  const buyItNow = () => {
    localStorage.setItem('buyItNowItem', JSON.stringify(buyItNowItem));
    localStorage.setItem('isAddToCartBtnClicked', false);
  };

  const handleIncrement = () => {
    dispatch(quantityActions.increment());
  };

  const handleDecrement = () => {
    dispatch(quantityActions.decrement());
  };
  // console.log('is Add To Cart Button Clicked:', isAddToCartClicked);

  return (
    <section className='px-4'>
      <div>
        <p className='text-base pb-1'>Quantity</p>
        {/* Edit Quantity container */}
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
        {/*Add to cart button */}
        <button
          className='text-center w-full mt-6 mb-4 text-2xl text-primary-10 flex flex-row items-center justify-center border-[1px] border-primary-10 outline-none rounded-none uppercase'
          onClick={addToCart}>
          <HiOutlineShoppingCart className='absolute left-8 sm:left-20 md:left-12 lg:left-28' />
          Add to cart
        </button>
        {/*Buy It Now button */}
        <Link href='/information/address' passHref>
          <button
            className='text-center w-full bg-primary-11 mb-12 text-2xl text-white flex flex-row items-center justify-center border-0 outline-none rounded-none uppercase'
            onClick={buyItNow}>
            Buy it now
          </button>
        </Link>
      </div>
    </section>
  );
}
