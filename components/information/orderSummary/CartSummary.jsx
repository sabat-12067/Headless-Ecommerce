import { HiOutlineShoppingCart } from 'react-icons/hi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { formatPrice } from '../../HorLine'
import { useRouter } from 'next/router';

//This component is used to display the cart summary when customer clicks the 'continue to checkout' button of the cart section
export default function CartSummary({ cartItems }) {
  const [showOrderSummary, setShowOrderSummary] = useState(false);


  const deliveryMethod = useSelector((state) => state.information.deliveryMethod);
   //console.log('deliveryMethod', deliveryMethod);
    //console.log('cartItems Summary', cartItems);

  let totalPriceOfCartItems = 0;
  cartItems.map((cartItem) => {
    return (totalPriceOfCartItems += cartItem.totalPrice);
  });

  let estimatedTaxes = 0.03 * totalPriceOfCartItems;
  estimatedTaxes = formatPrice(estimatedTaxes);

  let total = (totalPriceOfCartItems + parseFloat(estimatedTaxes))

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
    <section className='bg-primary-11 col-span-2 text-white xl:mr-12 lg:mr-4 xl:ml-0 lg:ml-4 lg:mt-12 lg:h-[fit-content] lg:py-4 lg:rounded-md'>
      <OrderSummaryHeader
        total={total}
        setShowOrderSummary={setShowOrderSummary}
        showOrderSummary={showOrderSummary}
      />
      <OrderSummaryInfo
        cartItems={cartItems}
        totalPriceOfCartItems={totalPriceOfCartItems}
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
      <p className='font-bold text-right text-secondary-7'>
        ${total}
      </p>
    </section>
  );
};

const OrderSummaryInfo = ({
  cartItems,
  estimatedTaxes,
  total,
  showOrderSummary,
  totalPriceOfCartItems,
  deliveryFee,
}) => {
  return (
    <section
      className={`px-4 border-b-2 border-white overflow-hidden ${
        showOrderSummary ? 'h-70' : 'h-0 border-b-0 lg:h-auto'
      }`}>
      <ProductInfo cartItems={cartItems} />
      <Costs
        estimatedTaxes={estimatedTaxes}
        totalPriceOfCartItems={totalPriceOfCartItems}
        deliveryFee={deliveryFee}
      />
      <Total total={total} />
    </section>
  );
};

const ProductInfo = ({ cartItems }) => {
  return (
    <div>
      {cartItems.map((cartItem, index) => {
        const { name, imageUrl, discountPrice, totalPrice, quantity } =
          cartItem;
          
          let totalDiscountPrice = discountPrice * quantity;
          totalDiscountPrice = formatPrice(totalDiscountPrice);

          const formatTotalPrice = formatPrice(totalPrice);
          
        return (
          <div
            className='flex justify-between items-center mt-2 relative py-2.5 lg:py-4 border-b-[1px]'
            key={index}>
            <div className='flex items-center'>
              <img
                src={imageUrl}
                alt={`Thumbnail of ${name}`}
                className='rounded-lg w-20 h-20'
              />
              <p className='absolute text-white w-5 h-5 text-xs rounded-[50%] top-0 text-center flex items-center justify-center font-bold left-[70px] bg-secondary-7'>
                {quantity}
              </p>
              <div className='p-2 pl-4 w-[70%] sm:w-full'>
                <p className='font-bold text-xs sm:text-sm text-white'>
                  {name}
                </p>
              </div>
            </div>
            <div className='w-[50%] lg:w-[70%] sm:w-auto text-right'>
              <p className='font-bold text-xs sm:text-sm'>
                ${formatTotalPrice}
              </p>
              <p className='font-medium line-through text-sm'>
                ${totalDiscountPrice}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Costs = ({ totalPriceOfCartItems, estimatedTaxes, deliveryFee }) => {

  const router = useRouter();

  const [showDeliveryFee, setShowDeliveryFee] = useState(false);

  useEffect(() => {
    //show the delivery fee only on the payment and review pages
    if (router.pathname === '/information/address' || router.pathname === '/information/shipping') {
     // console.log('showDeliveryFee', showDeliveryFee, 'deliveryFee', deliveryFee);
      setShowDeliveryFee(false);
    } else {
      setShowDeliveryFee(true);
    }
  }, [router.pathname]);

  let dollarSign = '';
  
  if (deliveryFee === 'FREE') {
    dollarSign = ''
  } else {
    dollarSign = '$'
  }
  
  if (router.pathname === '/information/address' || router.pathname === '/information/shipping') {
    dollarSign = ''
  }
  

  return (
    <section className='text-sm items-center py-4'>
      <div className='flex w-full justify-between font-semibold'>
        <p>Subtotal</p>
        <p>
          ${formatPrice(totalPriceOfCartItems)}
        </p>
      </div>
      <div className='flex w-full justify-between my-1 font-medium'>
        <p>Shipping</p>
        <p>{dollarSign} { showDeliveryFee ? deliveryFee : 'Calculated at next step' }</p>
      </div>
      <div className='flex w-full justify-between font-medium'>
        <p>Taxes (estimated)</p>
        <p>
          ${estimatedTaxes}
        </p>
      </div>
    </section>
  );
};

const Total = ({ total }) => {
  return (
    <div className='flex w-full justify-between font-semibold py-2 border-white border-t-[1px] text-secondary-8'>
      <p className=''>Total</p>
      <p className='text-lg'>${total}</p>
    </div>
  );
};
