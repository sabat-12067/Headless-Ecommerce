
//This component is used to display shipping information 

import React from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { informationActions } from '../../store/infoSlice';
import { useRouter } from 'next/router';
//import Shipping from '../../pages/information/shipping';

export default function CustomerInfo() {
  const isValidated = useSelector((state) => state.information.isValidated);
  return (
    <section className='px-2'>
      <CurrentPage />
      <Shipping />
      <Navigation />
    </section>
  );
  [];
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

const Shipping = () => {
  const dispatch = useDispatch();
  return (
    <section>
      <h2>Shipping</h2>
    </section>
  )
}


const Navigation = () => {

  return (
    <div className='my-3 flex items-center flex-col'>
      <div className='flex py-2'>
        <MdKeyboardArrowLeft className='w-5 h-5' />
        <p className='ml-1 text-sm text-center '>
          <Link href={'/information'}>Return to information i</Link>
        </p>
      </div>
    </div>
  );
};
