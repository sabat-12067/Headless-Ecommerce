import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

const CartNavigation = ({formattedTotalPriceOfAllItems}) => {
   const dispatch = useDispatch();
   const router = useRouter();

  const setIsAddToCartBtnClicked = () => {
    // dispatch(cartActions.setIsAddToCartBtnClicked(true));
    localStorage.setItem('isAddToCartBtnClicked', true);
    router.push('/checkout/address');
  };

  return (
    <div className='w-full'>
      <button
        className='w-full uppercase bg-primary-10 rounded-none text-lg sm:text-xl mt-4'
        onClick={setIsAddToCartBtnClicked}>
        checkout{' '}
        <span className='text-secondary-7'>
          (USD {formattedTotalPriceOfAllItems})
        </span>
      </button>
      <p
        className='pt-2 underline text-center'
        onClick={() => dispatch(cartActions.setShowCart())}>
        <Link href='/'>Continue Shopping</Link>{' '}
      </p>
    </div>
  );
};

export default CartNavigation;
