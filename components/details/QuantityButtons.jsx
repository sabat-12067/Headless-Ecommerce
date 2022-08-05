import { BiPlus, BiMinus } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { quantityActions } from '../../store/quantitySlice';

const QuantityButtons = ({ singleProduct, productId, setAlert }) => {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.quantityValue.quantity);

  const handleIncrement = () => {
    dispatch(quantityActions.increment());
  };
  const handleDecrement = () => {
    dispatch(quantityActions.decrement());
  };

  return (
    <div>
      <p className='text-base pb-1'>Quantity</p>
      {/* Edit Quantity container */}
      <div className='flex items-center border-[1px] justify-between px-2 py-2.5 w-40'>
        <BiMinus
          className='w-6 h-6 font-bold lg:cursor-pointer'
          onClick={handleDecrement}
        />
        <p className='self-center h-full font-extrabold text-[1rem] mb-0 border-0 text-lg'>
          {quantity}
        </p>
        <BiPlus
          className='w-6 h-6 font-bold lg:cursor-pointer'
          onClick={handleIncrement}
        />
      </div>
    </div>
  );
};

export default QuantityButtons;
