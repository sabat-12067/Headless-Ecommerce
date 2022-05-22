//This component is used to display shipping information

import React from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { informationActions } from '../../store/infoSlice';
import { useRouter } from 'next/router';
import { CurrentPage } from '../CurrentPage';
//import Shipping from '../../pages/information/shipping';
import { Alert, Button } from '../HorLine';
import { Navigation } from '../HorLine';

export default function CustomerInfo() {
  return (
    <section className='px-2'>
      <Shipping />
      <Navigation path='/information/address' pathName='Return To Address' />
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
    //console.log(value);
    if (value) {
      setShippingMethodSelected(true);
      setShowAlert(false);
    } else {
      setShippingMethodSelected(false);
      setShowAlert(true);
    }
     dispatch(informationActions.deliveryMethod(value));
  };

 // console.log(shippingMethodSelected);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (shippingMethodSelected) {
      router.push('/information/payment');
    } else {
      setShowAlert(true);
    }
  };

  const dispatch = useDispatch();

  return (
    <section className='px-3'>
      {showAlert && (
        <Alert
          setShowAlert={setShowAlert}
          msg='Please select a shipping method'
        />
      )}
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
          <Button
            type='submit'
            disabled={!shippingMethodSelected}
            text='Proceed to payment'
          />
        </form>
      </div>
    </section>
  );
};

const FormInput = ({
  shippingCost,
  shippingTime,
  shippingMethod,
  handleChange,
}) => {
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
