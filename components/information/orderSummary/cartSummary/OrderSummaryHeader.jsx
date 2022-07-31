import { HiOutlineShoppingCart } from 'react-icons/hi';
import { MdKeyboardArrowDown } from 'react-icons/md';

const OrderSummaryHeader = ({
  total,
  setShowOrderSummary,
  showOrderSummary,
}) => {
  return (
    <section
      className='flex w-full p-4 justify-between  border-t-2 border-b-2 border-primary-11 text-sm items-center lg:hidden'
      onClick={() => setShowOrderSummary(!showOrderSummary)}>
      <div className='flex p-2 items-center'>
        <HiOutlineShoppingCart className='w-6 h-6 text-white mr-2' />
        <p className='font-medium '>
          {showOrderSummary ? 'Hide' : 'Show'} order summary
        </p>
        <MdKeyboardArrowDown
          className={`w-6 h-6 text-white self-center duration-300 ease-in-out ${
            showOrderSummary ? 'rotate-180' : null
          }`}
        />
      </div>
      <p className='font-bold text-right text-secondary-7'>${total}</p>
    </section>
  );
};

export default OrderSummaryHeader;
