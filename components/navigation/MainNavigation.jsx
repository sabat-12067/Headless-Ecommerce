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
    const numberOfCartItems = cartItems.length;

  const quantity = useSelector((state) => state.quantityValue.quantity);

  return (
    <nav className='relative z-30'>
      <DesktopNavigation
        numberOfCartItems={numberOfCartItems}
        toggleCart={toggleCart}
      />
      <MobileNavigation
        numberOfCartItems={numberOfCartItems}
        toggleCart={toggleCart}
      />
    </nav>
  );
}
