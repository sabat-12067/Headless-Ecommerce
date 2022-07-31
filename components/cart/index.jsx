import Carts from './Carts';
import { useSelector } from 'react-redux';

//THIS component is for the cart section (the cart is displayed after clicking the cart icon)

const Cart = () => {
  const showCart = useSelector((state) => state.cart.showCart);
  return showCart && <Carts />;
};

export default Cart;
