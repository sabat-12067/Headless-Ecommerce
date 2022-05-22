import { Button, Navigation } from '../HorLine';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cartSlice';

export default function Review() {
  const dispatch = useDispatch();
  const customerEmail = useSelector((state) => state.information.shippingAddress.email);
  //console.log(customerEmail);
  const handleClick = () => {
    dispatch(cartActions.clearCart());
    router.push('/thankyou');
  };

  const router = useRouter();
  return (
    <section className='px-4'>
      <h2 className='text-left pt-4 text-xl md:2xl lg:3xl font-bold tracking-wide border-b-2 pb-3'>
        Review
      </h2>
      <ShippingAddress />
      <DeliveryMethod />
      <PaymentInformation />
      <Button text='Place order' onClick={handleClick} />
      <Navigation path='/information/payment' pathName='Return To Payment' />
    </section>
  );
}

const ShippingAddress = () => {

  const ShippingAddress = useSelector((state) => state.information.shippingAddress);
  const { firstName, lastName, address, city, apartment, email, country } =
    ShippingAddress;
  return (
    <section className='border-b-2'>
      <h3 className='text-left pt-4 text-lg md:2xl lg:3xl font-bold tracking-wide pb-1'>
        Shipping Address
      </h3>
      <div className='font-medium leading-5 text-sm'>
        <div className='flex'>
          <p className='mr-1'>{firstName ? firstName : null}</p>
          <p>{lastName}</p>
        </div>
        <p>{address}</p>
        <p>{country}</p>
        <p>{city}</p>
        <p>{apartment}</p>
        <p>{email}</p>
      </div>
      <p className='underline text-secondary-7 text-xs'>
        <Link href='/information/address'>change</Link>
      </p>
    </section>
  );
};

const DeliveryMethod = () => {
  const deliveryMethod = useSelector(
    (state) => state.information.deliveryMethod
  );

  let deliveryTime = '';

  if (deliveryMethod === 'Standard') {
    deliveryTime = '10-20 business days';
  } else if (deliveryMethod === 'Express') {
    deliveryTime = '3-5 business days';
  } else if (deliveryMethod === 'Overnight') {
    deliveryTime = '1-2 business days';
  }

  return (
    <section className='border-b-2'>
      <h3 className='text-left pt-4 text-lg md:2xl lg:3xl font-bold tracking-wide pb-1'>
        delivery method
      </h3>
      <div className='font-medium leading-5 text-sm'>
        <p>{deliveryMethod}</p>
        <p>{deliveryTime}</p>
      </div>
      <p className='underline text-secondary-7 text-xs'>
        <Link href='/information/shipping'>change</Link>
      </p>
    </section>
  );
};
const PaymentInformation = () => {
 
  return (
    <section className='border-b-2'>
      <h3 className='text-left pt-4 text-lg md:2xl lg:3xl font-bold tracking-wide pb-1'>
        Payment Information
      </h3>
      <div className='font-medium leading-6 text-sm'>
        <p>Adam porter</p>
        <p>4124XXXXXXXX2028</p>
        <p>05/25</p>
      </div>
      <p className='underline text-secondary-7 text-xs'>
        <Link href='/information/payment'>change</Link>
      </p>
    </section>
  );
};
