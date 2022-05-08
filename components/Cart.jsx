import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineDelete } from 'react-icons/md';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { quantityActions } from '../store/quantitySlice';

const Cart = () => {
  const showCart = useSelector((state) => state.cart.showCart);

  console.log(showCart);

  return showCart && <CartContainer />;
};


const CartContainer = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItemsList);
  const numberOfCartItems = cartItems.length;
  const handleIncrement = () => {
    dispatch(quantityActions.increment());
  };
  const handleDecrement = () => {
    dispatch(quantityActions.decrement());
  };

  return (
    <section
      className={`flex flex-col items-center justify-center shadow-lg shadow-primary-8 p-4 m-2 absolute z-20 top-13 bg-[white]  ${
        numberOfCartItems <= 0 ? 'h-56' : null
      }`}>
      <h3 className='self-start'>
        {' '}
        {numberOfCartItems <= 0 ? 'Your Cart Is Empty' : 'Your cart'}
      </h3>
      {numberOfCartItems <= 0 ? null : (
        <>
          <p className='font-bold self-start'>Item</p>
          <div>
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
              console.log(imageUrl);
              return (
                <div
                  key={id}
                  className='p-2 border-t-[1px] border-b-[1px] b-primary-10'>
                  <div className='flex text-sm font-medium'>
                    <img
                      src={imageUrl}
                      alt={`thumbnail image of ${name}`}
                      className='mr-6'
                    />
                    <div>
                      <p className='text-base font-bold'>{name}</p>
                      <p>UGX {price}</p>
                      <div className='flex'>
                        <p className='line-through mr-2'>{discountPrice}</p>
                        <p className='font-bold bg-secondary-3 px-2 rounded-sm text-secondary-7 w-[fit-content] '>
                          - {discountPercentage}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='flex w-full justify-between pt-3'>
                    <div className='flex text-secondary-7'>
                      <MdOutlineDelete className='w-6 h-6 font-bold lg:cursor-pointer mr-2' />
                      <p>REMOVE</p>
                    </div>
                    <div className='flex'>
                      <BiMinus
                        className={`w-6 h-6 font-bold lg:cursor-pointer bg-secondary-7 text-[white] rounded-sm px-0.5 ${
                          quantity <= 1 ? 'opacity-30' : 'opacity-100'
                        }`}
                        onClick={handleDecrement}
                      />
                      <p className='mx-3 font-bold'>{quantity}</p>
                      <BiPlus
                        className='w-6 h-6 font-bold lg:cursor-pointer bg-secondary-7 text-[white] rounded-sm px-0.5'
                        onClick={handleIncrement}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <div className='flex justify-between'>
            <p>Subtotal</p>
            <p>{totalPrice}</p>
          </div> */}
          <button className='w-full uppercase bg-primary-10 rounded-none mt-4'>
            continue to checkout
          </button>{' '}
        </>
      )}
    </section>
  );
};

export default Cart;
