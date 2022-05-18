//This component is used to display shipping information

import React from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { informationActions } from '../../store/infoSlice';
import { useRouter } from 'next/router';
import { ImCross } from 'react-icons/im';
import { CurrentPage } from '../CurrentPage';
//import Shipping from '../../pages/information/shipping';

export default function CustomerInfo() {
  const isValidated = useSelector((state) => state.information.isValidated);
  return (
    <section className='px-2'>
      <Shipping />
      <Navigation />
    </section>
  );
  [];
}

const Shipping = () => {

  const [shippingMethodSelected, setShippingMethodSelected] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  
  const router = useRouter();

  const handleChange = (e) => {
    const { value } = e.target;
    if (value) {
      setShippingMethodSelected(true);
      setShowAlert(false);
    } else {
      setShippingMethodSelected(false);
      setShowAlert(true);
    }
  }

  console.log(shippingMethodSelected);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (shippingMethodSelected) {
      router.push('/information/payment');
    } else {
      setShowAlert(true);
    }
    //router.push('/information/payment');
  };
  
  const dispatch = useDispatch();
  
  return (
    <section className='px-3'>
      {showAlert && <Alert setShowAlert={setShowAlert}/>}
      <h2 className='text-left pt-4 text-xl md:2xl lg:3xl font-bold tracking-wide border-b-2 pb-3'>
        Shipping
      </h2>
      <div>
        <form onSubmit={handleSubmit}>
          <FormInput
            handleChange={handleChange}
            shippingMethod='Standard'
            shippingTime='10-20 business days'
            shippingCost='FREE'
          />
          <FormInput
            handleChange={handleChange}
            shippingMethod='Express'
            shippingTime='3-5 business days'
            shippingCost='$ 15'
          />
          <FormInput
            handleChange={handleChange}
            shippingMethod='Overnight'
            shippingTime='1-2 business days'
            shippingCost='$ 25'
          />
          <button
            type='submit'
            className='bg-primary-11 py-4 px-12 text-lg font-bold text-[white] w-full mt-6 '>
            Continue to payment
          </button>
        </form>
      </div>
    </section>
  );
};


const Navigation = () => {
  return (
    <div className='my-3 flex items-center flex-col'>
      <div className='flex py-2'>
        <MdKeyboardArrowLeft className='w-5 h-5' />
        <p className='ml-1 text-sm text-center '>
          <Link href={'/information/address'}>Return to information </Link>
        </p>
      </div>
    </div>
  );
};


const FormInput = ({ shippingCost, shippingTime, shippingMethod, handleChange }) => {
  return (
    <div className='pt-3 pb-5 flex items-start w-full justify-between border-b-[1px]'>
      <div className='flex'>
        <input
          placeholder='Email or mobile number'
          className='mr-4 relative top-2 w-4 h-4'
          type='radio'
          id={shippingMethod}
          name='shippingInput'
          value={shippingMethod}
          onChange={handleChange}
        />
        <div>
          <label htmlFor={shippingMethod} className='font-bold'>
            {shippingMethod}
          </label>
          <p className='font-medium'>{shippingTime}</p>
        </div>
      </div>
      <p className='font-bold'>{shippingCost}</p>
    </div>
  );
};

export const Alert = ({ setShowAlert }) => {
  //clear alert after 3 secs
  useEffect(() => {
    const alertTimeOut = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    //clean up function
    return () => clearTimeout(alertTimeOut);
  }, []);

  return (
    <div className='flex items-center justify-center fixed top-0 left-0 w-full bg-secondary-3'>
      <p className='text-center font-bold text-secondary-8 w-full py-2'>
        Please select a shipping method
      </p>
         <ImCross className='mr-5' onClick={() => setShowAlert(false)}/>
    </div>
  );
}
