import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { formatPrice } from '../../../HorLine';

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

export default Costs;
