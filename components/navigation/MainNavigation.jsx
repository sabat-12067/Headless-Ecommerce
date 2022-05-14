import { useEffect, useState } from 'react';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cartSlice';

export default function MainNavigation() {

   const dispatch = useDispatch();

   //hide and show the cart section when the cart icon is clicked
   const toggleCart = () => {
     dispatch(cartActions.setShowCart());
   };
     
    const cartItems = useSelector((state) => state.cart.cartItemsList);

  let totalQuantity = 0;

  cartItems.map(cartItem => {
    totalQuantity += cartItem.quantity;
  })

  return (
    <nav className='relative z-30'>
      <DesktopNavigation
        totalQuantity={totalQuantity}
        toggleCart={toggleCart}
      />
      <MobileNavigation totalQuantity={totalQuantity} toggleCart={toggleCart} />
    </nav>
  );
}
