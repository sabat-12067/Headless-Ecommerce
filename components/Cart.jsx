import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineDelete } from 'react-icons/md';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { cartActions } from '../store/cartSlice';
import { useRouter } from 'next/router';
import { formatPrice } from './HorLine';
import { ImCross } from 'react-icons/im';
import Link from 'next/link';
import { useState } from 'react';
import Alert from './Auth/Alert';

//THIS component is for the cart section and displaying the cart after clicking the cart icon

const Cart = () => {
  const showCart = useSelector((state) => state.cart.showCart);
  return showCart && <Carts />;
};

const Carts = () => {
  /*I used cartItems from the redux store instead of local Storage because... 
  
  I wanted to access the updated state of the cartItems array whenever a customer deletes an item from the cart or increaments/decrements the quantity of an item in the cart. */

  /* Alternatively, 
   const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
      setCartItems(JSON.parse(localStorage.getItem('cartItems')));
    }, [cartItems]);

  Problem? It results into an infinite loop
  
  NOTE: // The following code helped to update the redux store each time cartItems in local storage was updated.  
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    dispatch(cartActions.setCartItems(cartItems));
  });

  */

  const cartItems = useSelector((state) => state.cart.cartItems);

  const numberOfCartItems = cartItems.length;
  //console.log('cartItems', cartItems);

  return (
    <>
      {numberOfCartItems <= 0 ? (
        <Emptycart />
      ) : (
        <CartWithItems
          numberOfCartItems={numberOfCartItems}
          cartItems={cartItems}
        />
      )}
    </>
  );
};

const CartWithItems = ({ cartItems }) => {
    const [alert, setAlert] = useState({
      type: '',
      show: false,
      msg: '',
    });

  const dispatch = useDispatch();
  const router = useRouter();

  const handleIncrement = (id) => {
    dispatch(cartActions.incrementCartQuantity(id));
      setAlert({
        type: 'success',
        show: true,
        msg: 'Item updated successfully!',
      });
  };

  const handleDecrement = (id) => {
    dispatch(cartActions.decrementCartQuantity(id));
      setAlert({
        type: 'success',
        show: true,
        msg: 'Item updated updated successfully!',
      });
  };

  const removeItem = (id) => {
    dispatch(cartActions.removeItem(id));
    setAlert({
      type: 'success',
      show: true,
      msg: 'Item removed successfully!',
    });
  };

  let totalPriceOfAllItems = 0;

  cartItems.map((item) => {
    totalPriceOfAllItems += item.totalPrice;
  });

  const formattedTotalPriceOfAllItems = formatPrice(totalPriceOfAllItems);

  const setIsAddToCartBtnClicked = () => {
   // dispatch(cartActions.setIsAddToCartBtnClicked(true));
    localStorage.setItem('isAddToCartBtnClicked', true);
    router.push('/checkout/address');
  };

  let totalNumberOfItems = 0;
  cartItems.map((item) => {
    totalNumberOfItems += item.quantity;
  });

  //console.log('totalNumberOfItems', totalNumberOfItems);

  return (
    <section className='flex flex-col items-center justify-center shadow-lg shadow-primary-8 p-4 m-2 fixed z-20 top-13 bg-[white] sm:right-2 rounded-sm'>
      <h3 className='self-start pb-3'>cart summary</h3>
      <div className='w-full left-0 absolute top-0 z-40'>
        {alert.show && <Alert alert={alert} setAlert={setAlert} />}
      </div>
      <div className='flex w-full justify-between font-bold border-b-[1px]'>
        <p>
          {totalNumberOfItems} Item{totalNumberOfItems > 1 ? 's' : null} added
        </p>
        <p className='text-secondary-7'>USD {formattedTotalPriceOfAllItems}</p>
      </div>
      <div className='w-full'>
        {cartItems.map((item, index) => {
          const {
            id,
            name,
            price,
            quantity,
            imageUrl,
            discountPrice,
            discountPercentage,
            totalPrice,
          } = item;

          const formatedTotalPrice = formatPrice(totalPrice);
          return (
            <div className='p-2 border-b-[1px] b-primary-10 w-full' key={index}>
              <div className='flex text-xs sm:text-sm font-medium'>
                <img
                  src={imageUrl}
                  alt={`thumbnail image of ${name}`}
                  className='mr-2 sm:mr-6 w-20 h-20'
                />
                <div>
                  <p className='text-base font-bold'>{name}</p>
                  <p className='text-sm font-medium'>
                    USD {/*Add a coma (,) every after 3 digits*/}
                    {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </p>
                  <div className='flex'>
                    <p className='line-through mr-2'>USD {discountPrice}</p>
                    <p className='font-bold bg-secondary-3 px-2 rounded-sm text-secondary-7 w-[fit-content] '>
                      - {discountPercentage}%
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex w-full text-xs sm:text-sm justify-between font-bold py-2'>
                <p>Total Amount:</p>
                <p>
                  USD {/*Add a coma (,) every after 3 digits*/}
                  {formatedTotalPrice}
                </p>
              </div>
              <div className='flex w-full justify-between pt-3'>
                <div
                  className='flex text-red lg:cursor-pointer'
                  onClick={() => removeItem(id)}>
                  <MdOutlineDelete className='w-5 h-5 font-bold mr-2' />
                  <p className='text-xs sm:text-sm'>REMOVE</p>
                </div>
                <div className='flex'>
                  <BiMinus
                    className={`w-5 h-5 font-bold lg:cursor-pointer bg-secondary-7 text-[white] rounded-sm px-0.5 ${
                      quantity <= 1 ? 'opacity-30' : 'opacity-100'
                    }`}
                    onClick={() => handleDecrement(id)}
                  />
                  <p className='mx-3 text-sm sm:text-base font-bold'>
                    {quantity}
                  </p>
                  <BiPlus
                    className='w-5 h-5 font-bold lg:cursor-pointer bg-secondary-7 text-[white] rounded-sm px-0.5'
                    onClick={() => handleIncrement(id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className='w-full uppercase bg-primary-10 rounded-none text-lg sm:text-xl mt-4'
        onClick={setIsAddToCartBtnClicked}>
        checkout{' '}
        <span className='text-secondary-7'>
          (USD {formattedTotalPriceOfAllItems})
        </span>
      </button>
      <p
        className='pt-2 underline'
        onClick={() => dispatch(cartActions.setShowCart())}>
        <Link href='/'>Continue Shopping</Link>{' '}
      </p>
    </section>
  );
};

const Emptycart = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(cartActions.setShowCart());
  };

  return (
    <section className='shadow-lg shadow-primary-8 p-4 m-2 z-30 top-14 bg-white h-80 w-[90%] ml-[5%] md:w-[500px] md:h-[300px] md:right-3 absolute'>
      <div className='border-b-2 py-2 flex  w-full justify-between items-center'>
        <h3 className='text-left'>Cart Summary</h3>
        <ImCross onClick={handleClick} className='lg:cursor-pointer' />
      </div>
      <div className='absolute top-1/2 left-1/3'>
        <p className='font-bold'>Your cart is empty!</p>
      </div>
    </section>
  );
};

export default Cart;
