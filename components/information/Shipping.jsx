//This component is used to display shipping information

import React from 'react';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { informationActions } from '../../store/infoSlice';
import { useRouter } from 'next/router';
import { Button } from '../HorLine';
import { Navigation } from '../HorLine';
import LoginCard from './LoginCard';

export default function CustomerInfo() {
  const [showLoginCard, setShowLoginCard] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    //set isloggedIn to false if it doesn't exist in session storage
    if (sessionStorage.getItem('isloggedIn') == null) {
      sessionStorage.setItem('isloggedIn', false);
    }
  }, []);

  return (
    <section className='px-2'>
      {showLoginCard && <LoginCard setShowLoginCard={setShowLoginCard} />}
      <Shipping
        setShowLoginCard={setShowLoginCard}
        showLoginCard={showLoginCard}
      />
      <Navigation path='/product/checkout/address' pathName='Return To Address' />
    </section>
  );
}

const Shipping = ({ setShowLoginCard, showLoginCard }) => {
  const [shippingMethodSelected, setShippingMethodSelected] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { value } = e.target;
    if (value) {
      setShippingMethodSelected(true);
    } else {
      setShippingMethodSelected(false);
    }
    dispatch(informationActions.deliveryMethod(value));
  };

  const handleSubmit = (e) => {
    const isloggedIn = JSON.parse(sessionStorage.getItem('isloggedIn'));
    e.preventDefault();
    if (isloggedIn) {
      setShowLoginCard(false);
      router.push('/product/checkout/payment');
    } else {
      //Task the customer to login if they aren't logged in
      setShowLoginCard(true);
    }
  };

  const dispatch = useDispatch();

  return (
    <section className='px-3'>
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
