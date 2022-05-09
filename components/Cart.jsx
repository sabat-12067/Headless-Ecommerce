import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineDelete } from 'react-icons/md';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { cartActions } from '../store/cartSlice';
import Link from 'next/link';

const Cart = () => {
  const showCart = useSelector((state) => state.cart.showCart);

  return showCart && <CartContainer />;
};


const CartContainer = () => {
  const dispatch = useDispatch();
  
  const cartItems = useSelector((state) => state.cart.cartItemsList);
  
  const numberOfCartItems = cartItems.length;
 
  const handleIncrement = (id) => {
    dispatch(cartActions.incrementCartQuantity(id));
  };
  
  const handleDecrement = (id) => {
    dispatch(cartActions.decrementCartQuantity(id));
  };

  const removeItem = (id) => {
    dispatch(cartActions.removeItem(id));
  }

  let totalPriceOfAllItems = 0;

  cartItems.map(item => {
    totalPriceOfAllItems += item.totalPrice;
  })

  return (
    <section
      className={`flex flex-col items-center justify-center shadow-lg shadow-primary-8 p-4 m-2 absolute z-20 top-13 bg-[white] sm:right-2 ${
        numberOfCartItems <= 0
          ? 'h-56 w-[90%] ml-[5%] md:w-[400px] md:right-2'
          : null
      }`}>
      <h3 className='self-start'>
        {' '}
        {numberOfCartItems <= 0 ? 'Your Cart Is Empty' : 'Your cart'}
      </h3>
      {numberOfCartItems <= 0 ? null : (
        <>
          <p className='font-bold self-start'>
            {numberOfCartItems} Item{numberOfCartItems > 1 ? 's' : null} added
          </p>
          <div className='w-full'>
            {cartItems.map((item) => {
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

              return (
                <div className='p-2 border-t-[1px] border-b-[1px] b-primary-10 w-full'>
                  <div className='flex text-xs sm:text-sm font-medium'>
                    <img
                      src={imageUrl}
                      alt={`thumbnail image of ${name}`}
                      className='mr-2 sm:mr-6 w-20 h-20'
                    />
                    <div>
                      <p className='text-base font-bold'>{name}</p>
                      <p className='text-sm font-medium'>
                        UGX {/*Add a coma (,) every after 3 digits*/}
                        {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </p>
                      <div className='flex'>
                        <p className='line-through mr-2'>{discountPrice}</p>
                        <p className='font-bold bg-secondary-3 px-2 rounded-sm text-secondary-7 w-[fit-content] '>
                          - {discountPercentage}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='flex w-full  justify-between font-bold py-2'>
                    <p>Total Amount:</p>
                    <p>
                      UGX {/*Add a coma (,) every after 3 digits*/}
                      {totalPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </p>
                  </div>
                  <div className='flex w-full justify-between pt-3'>
                    <div
                      className='flex text-secondary-7 lg:cursor-pointer'
                      onClick={() => removeItem(id)}>
                      <MdOutlineDelete className='w-6 h-6 font-bold mr-2' />
                      <p>REMOVE</p>
                    </div>
                    <div className='flex'>
                      <BiMinus
                        className={`w-6 h-6 font-bold lg:cursor-pointer bg-secondary-7 text-[white] rounded-sm px-0.5 ${
                          quantity <= 1 ? 'opacity-30' : 'opacity-100'
                        }`}
                        onClick={() => handleDecrement(id)}
                      />
                      <p className='mx-3 font-bold'>{quantity}</p>
                      <BiPlus
                        className='w-6 h-6 font-bold lg:cursor-pointer bg-secondary-7 text-[white] rounded-sm px-0.5'
                        onClick={() => handleIncrement(id)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='flex justify-between w-full font-bold font-["Arima_Madurai"] pt-4 text-secondary-10'>
            <p>Subtotal</p>
            <p>
              UGX{' '}
              {totalPriceOfAllItems
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </p>
          </div>
          <button className='w-full uppercase bg-primary-10 rounded-none text-lg sm:text-xl'>
            continue to checkout
          </button>{' '}
          <p className='pt-2 underline'>
            <Link href='./'>Continue Shopping</Link>{' '}
          </p>
        </>
      )}
    </section>
  );
};

export default Cart;
