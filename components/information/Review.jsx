import { Navigation } from '../HorLine';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { informationActions } from '../../store/infoSlice';
import { cartActions } from '../../store/cartSlice';

export default function Review() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Store the billingAddress, shippingAddress, deliveryMethod, buyItNowItem in local storage to the redux store.
    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
    dispatch(informationActions.setShippingAddress(shippingAddress));
    const billingAddress = JSON.parse(localStorage.getItem('billingAddress'));
    dispatch(informationActions.setBillingAddress(billingAddress));
    const deliveryMethod = JSON.parse(localStorage.getItem('deliveryMethod'));
    dispatch(informationActions.deliveryMethod(deliveryMethod));
    const isAddToCartBtnClicked = JSON.parse(
      localStorage.getItem('isAddToCartBtnClicked')
    );
    dispatch(cartActions.setIsAddToCartBtnClicked(isAddToCartBtnClicked));
    const buyItNowItem = JSON.parse(localStorage.getItem('buyItNowItem'));
    dispatch(cartActions.setBuyItNowItem(buyItNowItem));
  }, []);

  return (
    <section className='px-4'>
      <h2 className='text-left pt-4 text-xl md:2xl lg:3xl font-bold tracking-wide border-b-2 pb-3'>
        Review
      </h2>
      <ShippingAddress />
      <DeliveryMethod />
      <Navigation path='/checkout/payment' pathName='Return To Payment' />
    </section>
  );
}

const ShippingAddress = () => {
  const shippingAddress = useSelector(
    (state) => state.information.shippingAddress
  );

  const { firstName, lastName, address, city, apartment, email, country } =
    shippingAddress;
  return (
    <section className='border-b-2'>
      <h3 className='text-left pt-4 text-lg md:2xl lg:3xl font-bold tracking-wide pb-1'>
        Shipping Address
      </h3>
      <div className='font-medium leading-5 text-sm'>
        <div className='flex'>
          <p className='mr-1 text-sm'>{firstName ? firstName : null}</p>
          <p>{lastName}</p>
        </div>
        <p>{address}</p>
        <p>{country}</p>
        <p>{city}</p>
        <p>{apartment}</p>
        <p>{email}</p>
      </div>
      <p className='underline text-secondary-7 text-xs'>
        <Link href='/checkout/address'>change</Link>
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
        <Link href='/checkout/shipping'>change</Link>
      </p>
    </section>
  );
};
