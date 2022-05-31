import { useEffect, useState } from 'react';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cartSlice';

export default function MainNavigation() {

  // const [cartItems, setCartItems] = useState([]);

  // useEffect(() => {
  //   localStorage.getItem('cartItems') && setCartItems(JSON.parse(localStorage.getItem('cartItems')));
  // }, []);


  let cartItems = useSelector(state => state.cart.cartItems);

  if(!cartItems) {
    cartItems = [];
  }


  //console.log('cartItems', cartItems);

   const dispatch = useDispatch();

   //hide and show the cart section when the cart icon is clicked
   const toggleCart = () => {
     dispatch(cartActions.setShowCart());
   };
     

  let totalQuantity = 0;

  cartItems.map(cartItem => {
    totalQuantity += cartItem.quantity;
  })

  console.log('totalQuantity', totalQuantity);

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
