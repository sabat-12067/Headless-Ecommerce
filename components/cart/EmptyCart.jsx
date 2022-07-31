import { useDispatch } from 'react-redux';
import { ImCross } from 'react-icons/im';
import { cartActions } from '../../store/cartSlice';

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

export default Emptycart;
