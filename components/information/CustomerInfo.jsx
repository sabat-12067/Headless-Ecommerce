import React from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { useSelector } from 'react-redux';
import Link from 'next/link';

export default function CustomerInfo() {
  return (
    <section className='px-2'>
      <CurrentPage />
      <ContactInfo />
      <ShippingAddress />
      <Navigation />
    </section>
  );
}

const CurrentPage = () => {
  return (
    <div className='flex items-center text-xs py-3 font-medium'>
      <p className='mr-1'>Cart</p>
      <MdKeyboardArrowRight className='w-5 h-5' />
      <p className='mx-1 text-secondary-8'>Customer Info</p>
      <MdKeyboardArrowRight className='w-5 h-5' />
      <p className='mx-1'>Shipping</p>
      <MdKeyboardArrowRight className='w-5 h-5' />
      <p className='ml-1'>Payment</p>
    </div>
  );
};

const ContactInfo = () => {
  return (
    <div className='py-3'>
      <h4 className='text-left py-2'>Contact information</h4>
      <input
        type='text'
        placeholder='Email or mobile number'
        className='w-full px-2 py-3 text-sm'
      />
      <div className='flex items-center py-2'>
        <input type='checkbox' id='subscribe' />
        <label htmlFor='subscribe' className='text-sm text-secondary-8 ml-2'>
          Email me with news and offers
        </label>
      </div>
    </div>
  );
};

const ShippingAddress = () => {
  return (
    <div className=''>
      <h4 className='text-left py-2'>Shipping address</h4>
      <input
        type='text'
        placeholder='Country/region'
        className='w-full px-2 py-3 text-sm'
      />
      <input
        type='text'
        placeholder='First name (optional)'
        className='w-full px-2 py-3 text-sm my-2'
      />
      <input
        type='text'
        placeholder='Last name'
        className='w-full px-2 py-3 text-sm'
      />
      <input
        type='text'
        placeholder='Address'
        className='w-full px-2 py-3 text-sm my-2'
      />
      <input
        type='text'
        placeholder='Apartment, suite, etc. (optional)'
        className='w-full px-2 py-3 text-sm'
      />
      <input
        type='text'
        placeholder='City'
        className='w-full px-2 py-3 text-sm mt-2' 
      />
      <div>
       <input type="checkbox" id='save-info' />
       <label htmlFor="save-info" className='ml-2'>Save this information for next time</label>
      </div>
    </div>
  );
}

const Navigation = () => {
  const productId = useSelector((state) => state.Id.id);

  return (
    <div className='my-3 flex items-center flex-col'>
      <button className='w-full text-base bg-secondary-9'>
        Continue to shipping
      </button>
      <div className='flex py-2'>
        <MdKeyboardArrowLeft className='w-5 h-5' />
        <p className='ml-1 text-sm text-center '>
          <Link href={`/${productId}`}>Return to cart</Link>
        </p>
      </div>
    </div>
  );
}
