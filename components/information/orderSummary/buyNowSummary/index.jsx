import { useSelector } from 'react-redux';
import { useState } from 'react';
import { formatPrice } from '../../../HorLine';
import OrderSummaryInfo from './OrderSummaryInfo';
import OrderSummaryHeader from '../OrderSummaryHeader';

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
