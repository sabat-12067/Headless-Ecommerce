import { useEffect, useState } from 'react';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cartSlice';
import { useRouter } from 'next/router';

export default function MainNavigation() {
  const dispatch = useDispatch();

   useEffect(() => {
     // Store the cart items in local storage to a cartItems array of the redux store so that we access 'quantity' state each time is updates in our redux store.
     const cartItems = JSON.parse(localStorage.getItem('cartItems'));
     dispatch(cartActions.setCartItems(cartItems));
   }, []);

  const cartItems = useSelector(state => state.cart.cartItems);
  //console.log('cartItems', cartItems);

   //hide and show the cart section when the cart icon is clicked
   const toggleCart = () => {
     dispatch(cartActions.setShowCart());
   };
     
  let totalQuantity = 0;

  cartItems.map(cartItem => {
    totalQuantity += cartItem.quantity;
  })

  //console.log('totalQuantity', totalQuantity);

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
