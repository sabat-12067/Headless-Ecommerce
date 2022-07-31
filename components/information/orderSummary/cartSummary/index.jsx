import OrderSummaryHeader from '../OrderSummaryHeader';
import OrderSummaryInfo from './OrderSummaryInfo';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { formatPrice } from '../../../HorLine'

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
