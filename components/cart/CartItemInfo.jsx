import { useDispatch } from 'react-redux';
import { MdOutlineDelete } from 'react-icons/md';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { cartActions } from '../../store/cartSlice';
import { formatPrice } from '../HorLine';

const CartItemInfo = ({item, cartItems, setCartItems, setAlert}) => {
  const {
    id,
    name,
    price,
    quantity,
    imageUrl,
    discountPrice,
    percentageDiscount,
    totalPrice,
  } = item;
  const formatedTotalPrice = formatPrice(totalPrice);
  const dispatch = useDispatch();

   const handleIncrement = (id) => {
     // dispatch(cartActions.incrementCartQuantity(id));
     cartItems.map((item) => {
       if (item.id === id) {
         item.quantity = item.quantity + 1;
         item.totalPrice = item.quantity * item.price;
       }
     });
     setAlert({
       type: 'success',
       show: true,
       msg: 'Item updated successfully!',
     });
     localStorage.setItem('cartItems', JSON.stringify(cartItems));
     dispatch(cartActions.setCartItems(cartItems));
   };

   const handleDecrement = (id) => {
     //dispatch(cartActions.decrementCartQuantity(id));
     cartItems.map((cartItem) => {
       if (cartItem.id === id) {
         cartItem.quantity -= 1;
         if (cartItem.quantity <= 1) {
           cartItem.quantity = 1;
         }
         cartItem.totalPrice = cartItem.quantity * cartItem.price;
       }
     });
     setAlert({
       type: 'success',
       show: true,
       msg: 'Item updated updated successfully!',
     });
     // update the redux store and local storage after changes
     localStorage.setItem('cartItems', JSON.stringify(cartItems));
     dispatch(cartActions.setCartItems(cartItems));
   };

   const removeItem = (id) => {
     const remainingCartItems = cartItems.filter((item) => item.id !== id);
     setAlert({
       type: 'success',
       show: true,
       msg: 'Item removed successfully!',
     });
     localStorage.setItem('cartItems', JSON.stringify(remainingCartItems));
     dispatch(cartActions.setCartItems(cartItems));
     setCartItems(remainingCartItems);
   };

  return (
    <div className='py-2 border-b-[1px] b-primary-10 w-full'>
      <div className='flex text-xs sm:text-sm font-medium'>
        <img
          src={imageUrl}
          alt={`thumbnail image of ${name}`}
          className='mr-2 sm:mr-6 w-20 h-20'
        />
        <div>
          <p className='text-base font-bold'>{name}</p>
          <p className='text-sm font-medium'>{formatPrice(price)}</p>
          <div className='flex'>
            <p className='line-through mr-2'>USD {discountPrice}</p>
            <p className='font-bold bg-secondary-3 px-2 rounded-sm text-secondary-7 w-[fit-content] '>
              - {percentageDiscount}%
            </p>
          </div>
        </div>
      </div>
      <div className='flex w-full text-xs sm:text-sm justify-between font-bold py-2'>
        <p>Total Amount:</p>
        <p>
          USD {formatedTotalPrice}
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
          <p className='mx-3 text-sm sm:text-base font-bold'>{quantity}</p>
          <BiPlus
            className='w-5 h-5 font-bold lg:cursor-pointer bg-secondary-7 text-[white] rounded-sm px-0.5'
            onClick={() => handleIncrement(id)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItemInfo;
