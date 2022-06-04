import { useEffect, useState } from 'react';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cartSlice';
import { useRouter } from 'next/router';

export default function MainNavigation() {
  const dispatch = useDispatch();
  const router = useRouter();

   useEffect(() => {
     // Store the cart items in local storage to a cartItems array of the redux store so that we access 'quantity' state each time is updates in our redux store.
     const cartItems = JSON.parse(localStorage.getItem('cartItems'));
     dispatch(cartActions.setCartItems(cartItems));
   }, []);

   
   let cartItems = useSelector(state => state.cart.cartItems);
   
//set cartItems to empty array if it is null or undefined to avoid error that could crash server and when on the last - thankyou - page. 
  if(!cartItems || router.pathname === '/thankyou') {
    cartItems = [];
  }

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
    <nav className='absolute z-30'>
      <DesktopNavigation
        totalQuantity={totalQuantity}
        toggleCart={toggleCart}
      />
      <MobileNavigation totalQuantity={totalQuantity} toggleCart={toggleCart} />
    </nav>
  );
}
