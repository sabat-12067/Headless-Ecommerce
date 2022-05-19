import { HiOutlineShoppingCart } from 'react-icons/hi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { formatprice } from '../../HorLine';

//This component is for the order summary information when customer has clicked on the buy now button

export default function BuyNowSummary() {
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const buyItNowItemDetails = useSelector(
    (state) => state.cart.buyItNowItemDetails
  );

  const { price, quantity} = buyItNowItemDetails;

  const subTotal = price * quantity;

  let estimatedTaxes = 0.03 * subTotal;
  estimatedTaxes = formatprice(estimatedTaxes);

  let total = parseFloat(subTotal) + parseFloat(estimatedTaxes);
  total = formatprice(total);

  return (
    <section className='bg-primary-3 '>
      <OrderSummaryHeader
        total={total}
        setShowOrderSummary={setShowOrderSummary}
        showOrderSummary={showOrderSummary}
      />
      <OrderSummaryInfo
        buyItNowItemDetails={buyItNowItemDetails}
        subTotal={subTotal}
        total={total}
        estimatedTaxes={estimatedTaxes}
        showOrderSummary={showOrderSummary}
      />
    </section>
  );
}

const OrderSummaryHeader = ({
  total,
  setShowOrderSummary,
  showOrderSummary,
}) => {
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
      <p className='font-bold text-right'>USD {total}</p>
    </section>
  );
};

const OrderSummaryInfo = ({
  buyItNowItemDetails,
  subTotal,
  estimatedTaxes,
  total,
  showOrderSummary,
}) => {
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
  const { name, price, imageUrl, discountPercentage, quantity } =
    buyItNowItemDetails;

       let discountPrice = (price * 100) / (100 - discountPercentage);
       discountPrice = formatprice(discountPrice);

  return (
    <div className='flex justify-between items-center border-primary-4 py-4 relative'>
      <div className='flex items-center'>
        <img
          src={imageUrl}
          alt={`Thumbnail of ${name}`}
          className='rounded-lg w-20 h-20'
        />
        <p className='absolute text-white w-5 h-5 text-xs rounded-[50%] text-center flex items-center justify-center top-[6px] font-bold left-[70px] bg-primary-11'>
          {quantity}
        </p>
        <div className='p-2 pl-4 w-[70%] sm:w-full'>
          <p className='font-bold text-xs sm:text-sm text-secondary-7'>
            {name}
          </p>
        </div>
      </div>
      <div className='w-[50%] sm:w-auto text-right'>
        <p className='font-bold text-xs sm:text-sm text-secondary-7 '>
          USD {price}
        </p>
        <p className='font-medium line-through text-sm'>USD {discountPrice}</p>
      </div>
    </div>
  );
};

const Costs = ({ subTotal, estimatedTaxes }) => {
  return (
    <section className='text-sm items-center  border-b-2 border-primary-4 py-4'>
      <div className='flex w-full justify-between font-semibold'>
        <p>Subtotal</p>
        <p>$ {subTotal}</p>
      </div>
      <div className='flex w-full justify-between my-1 font-medium'>
        <p>Shipping</p>
        <p>Calculated at next step</p>
      </div>
      <div className='flex w-full justify-between font-medium'>
        <p>Taxes (estimated)</p>
        <p>USD {estimatedTaxes}</p>
      </div>
    </section>
  );
};

const Total = ({ total }) => {
  return (
    <div className='flex w-full justify-between font-semibold py-2'>
      <p className=''>Total</p>
      <p className='text-lg text-secondary-8'>USD {total}</p>
    </div>
  );
};
