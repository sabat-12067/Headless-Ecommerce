import CartItemInfo from './CartItemInfo';
import CartHeader from './CartHeader';
import CartNavigation from './CartNavigation';
import { useState } from 'react';
import { formatPrice } from '../HorLine';

const CartWithItems = ({ cartItems, setCartItems }) => {
  const [alert, setAlert] = useState({
    type: '',
    show: false,
    msg: '',
  });

  let totalPriceOfAllItems = 0;

  cartItems.map((item) => {
    totalPriceOfAllItems += item.totalPrice;
  });

  let numberOfCartItems = 0;
  cartItems.map((item) => {
    numberOfCartItems += item.quantity;
  });

  const formattedTotalPriceOfAllItems = formatPrice(totalPriceOfAllItems);

  return (
    <section className='flex flex-col items-center justify-center shadow-lg shadow-primary-8 p-4 m-2 absolute z-40 top-13 bg-[white] sm:right-2 rounded-sm'>
      <CartHeader
        alert={alert}
        setAlert={setAlert}
        numberOfCartItems={numberOfCartItems}
        formattedTotalPriceOfAllItems={formattedTotalPriceOfAllItems}
      />
      <div className='w-full'>
        {cartItems.map((item, index) => {
          return (
            <CartItemInfo
              key={index}
              item={item}
              cartItems={cartItems}
              setCartItems={setCartItems}
              setAlert={setAlert}
            />
          );
        })}
      </div>
      <CartNavigation
        formattedTotalPriceOfAllItems={formattedTotalPriceOfAllItems}
      />
    </section>
  );
};

export default CartWithItems;
