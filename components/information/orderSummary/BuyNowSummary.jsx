import { HiOutlineShoppingCart } from 'react-icons/hi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { cartActions } from '../../../store/cartSlice';

export default function BuyNowSummary() {
  return (
    <section className='bg-primary-3'>
      <OrderSummaryHeader />
      <OrderSummaryInfo />
    </section>
  );
}

const OrderSummaryHeader = () => {
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  return (
    <section
      className='flex w-full p-4 justify-between  border-t-[1px] border-b-[1px] border-primary-4'
      onClick={() => setShowOrderSummary(!showOrderSummary)}>
      <HiOutlineShoppingCart className='w-6 h-6 text-primary-8' />
      <div className='flex mr-20'>
        <p className='text-base font-medium'>
          {showOrderSummary ? 'Hide' : 'Show'} order summary
        </p>
        <MdKeyboardArrowDown
          className={`w-6 h-6 text-primary-8 self-center duration-300 ease-in-out ${
            showOrderSummary ? 'rotate-180' : null
          }`}
        />
      </div>
      <p className='font-bold text-lg'>UGX 23,647,345</p>
    </section>
  );
};

const OrderSummaryInfo = () => {
 const buyItNowItemDetails = useSelector((state) => state.cart.buyItNowItemDetails);

  return (
    <section className='px-4'>
      <ProductInfo buyItNowItemDetails={buyItNowItemDetails} />
    </section>
  );
};

const ProductInfo = ({ buyItNowItemDetails }) => {

 const { name, price, imageUrl, discountPrice, discountPercentage, quantity } = buyItNowItemDetails;
  return (
    <div className='flex justify-between items-center  border-b-[1px] border-primary-4 py-4'>
      <div className='relative '>
        <img
          src={imageUrl}
          alt={`Thumbnail of ${name}`}
          className='rounded-lg w-20 h-20'
        />
        <button className='absolute text-[white] px-2.5 py-1 rounded-[50%] text-sm top-0 right-0'>
          {quantity}
        </button>
      </div>
      <div className=''>
        <p className='font-bold text-sm text-secondary-7'>{name}</p>
      </div>
      <div>
        <p className='font-bold text-sm text-secondary-7'>{price}</p>
        <p className='font-medium line-through text-sm'>{discountPrice}</p>
      </div>
    </div>
  );
};
