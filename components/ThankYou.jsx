import { useEffect, useState } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import Link from 'next/link';
import axios from 'axios';

//const orderNumber =  Math.floor(Math.random() * 1000000);
const ThankYou = () => {
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify([]));
    localStorage.setItem('shippingAddress', JSON.stringify({}));
    localStorage.setItem('paymentMethod', JSON.stringify({}));
    localStorage.setItem('deliveryMethod', JSON.stringify(''));
    localStorage.setItem('buyItNowItem', JSON.stringify({}));
    setOrderNumber(localStorage.getItem('orderNumber'));
  }, []);

  return (
    <div className='pt-[75px] flex flex-col items-center '>
      <div className='flex items-center pt-10'>
        <BsCheckCircleFill className='md:w-6 md:h-6' />
        <h3 className='ml-2'>Your order was successful</h3>
      </div>
      <h1 className='py-5 px-2 text-secondary-7'>
        thanks for purchasing from asuman sounds!
      </h1>
      <p className='font-bold'>
        Your order number is{' '}
        <span className='text-secondary-8'>
          #{orderNumber ? orderNumber : null}
        </span>
      </p>
      <p className='px-8 text-center py-4'>
        You&#39;ll recieve an email confirming your order details shortly.
      </p>
      <button className='uppercase rounded-none bg-primary-11 mb-6 md:mb-28'>
        <Link href='/'>back to home</Link>
      </button>
    </div>
  );
};

export default ThankYou;
