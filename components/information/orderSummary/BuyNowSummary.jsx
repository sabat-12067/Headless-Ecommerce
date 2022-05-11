import { HiOutlineShoppingCart } from 'react-icons/hi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { cartActions } from '../../../store/cartSlice';

export default function BuyNowSummary() {
  const [showOrderSummary, setShowOrderSummary] = useState(false)
  const buyItNowItemDetails = useSelector(
    (state) => state.cart.buyItNowItemDetails
  );
   
    const { price, quantity } =
      buyItNowItemDetails;

    const subTotal = price.replace(/\D/g, '') * quantity;
  const estimatedTaxes = 0.03 * subTotal;
  const total = (subTotal + estimatedTaxes).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); 

  return (
    <section className='bg-primary-3 '>
      <OrderSummaryHeader total={total} setShowOrderSummary={setShowOrderSummary} showOrderSummary={showOrderSummary} />
      <OrderSummaryInfo buyItNowItemDetails={buyItNowItemDetails} subTotal={subTotal} total={total} estimatedTaxes={estimatedTaxes} showOrderSummary={showOrderSummary} />
    </section>
  );
}

const OrderSummaryHeader = ({total, setShowOrderSummary, showOrderSummary}) => {
  return (
    <section
      className='flex w-full p-4 justify-between  border-t-2 border-b-2 border-primary-4 text-sm items-center md:text-base'
      onClick={() => setShowOrderSummary(!showOrderSummary)}>
      <div className='flex p-2 items-center'>
        <HiOutlineShoppingCart className='w-6 h-6 text-primary-8 mr-2' />
        <p className='font-medium '>
          {showOrderSummary ? 'Hide' : 'Show'} order summary
        </p>
        <MdKeyboardArrowDown
          className={`w-6 h-6 text-primary-8 self-center duration-300 ease-in-out ${
            showOrderSummary ? 'rotate-180' : null
          }`}
        />
      </div>
      <p className='font-bold text-right'>UGX {total}</p>
    </section>
  );
};

const OrderSummaryInfo = ({ buyItNowItemDetails, subTotal, estimatedTaxes, total, showOrderSummary }) => {
  return (
    <section
      className={`px-4 border-b-2 border-primary-4 overflow-hidden ${
        showOrderSummary ? 'h-70' : 'h-0 border-b-0'
      }`}>
      <ProductInfo buyItNowItemDetails={buyItNowItemDetails} />
      <Costs estimatedTaxes={estimatedTaxes} subTotal={subTotal} />
      <Total total={total} />
    </section>
  );
};

const ProductInfo = ({ buyItNowItemDetails }) => {
  const { name, price, imageUrl, discountPrice, quantity } =
    buyItNowItemDetails;
  return (
    <div className='relative flex justify-between items-center  border-b-2 border-primary-4 py-4'>
      <div className='flex items-center'>
        <img
          src={imageUrl}
          alt={`Thumbnail of ${name}`}
          className='rounded-lg w-20 h-20'
        />
        <button className='absolute text-[white] px-2.5 py-1 rounded-[50%] text-sm top-1 left-16'>
          {quantity}
        </button>
        <div className='p-2 w-[60%] sm:w-full'>
          <p className='font-bold text-sm text-secondary-7'>{name}</p>
        </div>
      </div>
      <div className='w-[60%] sm:w-auto text-right'>
        <p className='font-bold text-sm text-secondary-7 '>
         {price}
        </p>
        <p className='font-medium line-through text-sm'>{discountPrice}</p>
      </div>
    </div>
  );
};

const Costs = ({subTotal, estimatedTaxes}) => {
  return (
    <section className='text-sm items-center  border-b-2 border-primary-4 py-4'>
      <div className='flex w-full justify-between font-semibold'>
        <p>Subtotal</p>
        <p>UGX {subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
      </div>
      <div className='flex w-full justify-between my-1 font-medium'>
        <p>Shipping</p>
        <p>Calculated at next step</p>
      </div>
      <div className='flex w-full justify-between font-medium'>
        <p>Taxes (estimated)</p>
        <p>
          UGX {estimatedTaxes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
      </div>
    </section>
  );
};

const Total = ({total}) => {
  return (
    <div className='flex w-full justify-between font-semibold py-2'>
      <p className=''>Total</p>
      <p className='text-lg text-secondary-8'>UGX {total}</p>
    </div>
  );
}
