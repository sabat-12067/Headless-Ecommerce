import { HiOutlineShoppingCart } from 'react-icons/hi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { formatPrice } from '../../HorLine';
import { useRouter } from 'next/router';


//This component is for the order summary information when customer has clicked on the buy now button

export default function BuyNowSummary({ buyItNowItem }) {
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  
 //console.log('buyItNowItem', buyItNowItem);

  const deliveryMethod = useSelector(
    (state) => state.information.deliveryMethod
  );
  //console.log('deliveryMethod', deliveryMethod);

  const { price, quantity } = buyItNowItem;

  const subTotal = price * quantity;

  let estimatedTaxes = 0.03 * subTotal;
  estimatedTaxes = formatPrice(estimatedTaxes);

  let total = parseFloat(subTotal) + parseFloat(estimatedTaxes);

  let deliveryFee = 0;
  if (deliveryMethod === 'Standard') {
    deliveryFee = 'FREE';
    total = formatPrice(total);
  } else if (deliveryMethod === 'Express') {
    deliveryFee = 15;
    total = formatPrice(total + deliveryFee);
  } else {
    deliveryFee = 25;
    total = formatPrice(total + deliveryFee);
  }

  return (
    <section className='bg-primary-11 text-white col-span-2 xl:mr-12 lg:mr-4 lg:ml-4 lg:mt-12 lg:h-[fit-content] lg:py-4 lg:rounded-md'>
      <OrderSummaryHeader
        total={total}
        setShowOrderSummary={setShowOrderSummary}
        showOrderSummary={showOrderSummary}
      />
      <OrderSummaryInfo
        buyItNowItem={buyItNowItem}
        subTotal={subTotal}
        total={total}
        estimatedTaxes={estimatedTaxes}
        showOrderSummary={showOrderSummary}
        deliveryFee={deliveryFee}
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
      className='flex w-full p-4 justify-between  border-t-2 border-b-2 border-white text-sm items-center lg:hidden'
      onClick={() => setShowOrderSummary(!showOrderSummary)}>
      <div className='flex p-2 items-center'>
        <HiOutlineShoppingCart className='w-6 h-6 mr-2' />
        <p className='font-medium '>
          {showOrderSummary ? 'Hide' : 'Show'} order summary
        </p>
        <MdKeyboardArrowDown
          className={`w-6 h-6 self-center duration-300 ease-in-out ${
            showOrderSummary ? 'rotate-180' : null
          }`}
        />
      </div>
      <p className='font-bold text-right text-secondary-7'>${total}</p>
    </section>
  );
};

const OrderSummaryInfo = ({
  buyItNowItem,
  subTotal,
  estimatedTaxes,
  total,
  showOrderSummary,
  deliveryFee,
}) => {
  return (
    <section
      className={`px-4 border-b-2 border-primary-11 overflow-hidden ${
        showOrderSummary ? 'h-70' : 'h-0 border-b-0 lg:h-auto'
      }`}>
      <ProductInfo buyItNowItem={buyItNowItem} />
      <Costs estimatedTaxes={estimatedTaxes} subTotal={subTotal} deliveryFee={deliveryFee} />
      <Total total={total} />
    </section>
  );
};

const ProductInfo = ({ buyItNowItem }) => {
  const { name, price, imageThumbnail, discountPercentage, quantity } =
    buyItNowItem;

       let discountPrice = (price * 100) / (100 - discountPercentage);
       discountPrice = formatPrice(discountPrice);

  return (
    <div className='flex justify-between items-center border-white py-4 relative'>
      <div className='flex items-center'>
        <img
          src={imageThumbnail}
          alt={`Thumbnail of ${name}`}
          className='rounded-lg w-20 h-20'
        />
        <p className='absolute text-white w-5 h-5 text-xs rounded-[50%] text-center flex items-center justify-center top-[6px] font-bold left-[70px] bg-secondary-7'>
          {quantity}
        </p>
        <div className='p-2 pl-4 w-[70%] sm:w-full'>
          <p className='font-bold text-xs sm:text-sm'>
            {name}
          </p>
        </div>
      </div>
      <div className='w-[50%] sm:w-auto text-right'>
        <p className='font-bold text-xs sm:text-sm'>
          ${price}
        </p>
        <p className='font-medium line-through text-sm'>${discountPrice}</p>
      </div>
    </div>
  );
};

const Costs = ({ subTotal, estimatedTaxes, deliveryFee }) => {

  const router = useRouter();
  const [showDeliveryFee, setShowDeliveryFee] = useState(false);

  useEffect(() => {
    //show the delivery fee only on the payment and review pages
    if (
      router.pathname === '/information/address' ||
      router.pathname === '/information/shipping'
    ) {
      // console.log('showDeliveryFee', showDeliveryFee, 'deliveryFee', deliveryFee);
      setShowDeliveryFee(false);
    } else {
      setShowDeliveryFee(true);
    }
  }, [router.pathname]);

    let dollarSign = '';

    if (deliveryFee === 'FREE') {
      dollarSign = '';
    } else {
      dollarSign = '$';
    }

    if (
      router.pathname === '/information/address' ||
      router.pathname === '/information/shipping'
    ) {
      dollarSign = '';
    }

  return (
    <section className='text-sm items-center  border-b-2 border-white py-4'>
      <div className='flex w-full justify-between font-semibold'>
        <p>Subtotal</p>
        <p>${formatPrice(subTotal)}</p>
      </div>
      <div className='flex w-full justify-between my-1 font-medium'>
        <p>Shipping</p>
        <p>
          {dollarSign}
          {showDeliveryFee ? deliveryFee : 'Calculated at next step'}
        </p>
      </div>
      <div className='flex w-full justify-between font-medium'>
        <p>Taxes (estimated)</p>
        <p>${estimatedTaxes}</p>
      </div>
    </section>
  );
};

const Total = ({ total }) => {
  return (
    <div className='flex w-full justify-between font-semibold py-2 text-secondary-7'>
      <p className=''>Total</p>
      <p className='text-lg'>${total}</p>
    </div>
  );
};
