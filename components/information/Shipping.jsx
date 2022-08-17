//This component is used to display shipping information

import React from 'react';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { informationActions } from '../../store/infoSlice';
import { useRouter } from 'next/router';
import { Button } from '../HorLine';
import { Navigation } from '../HorLine';
import LoginCard from './LoginCard';
import axios from 'axios';

export default function CustomerInfo() {
  const [showLoginCard, setShowLoginCard] = useState(false);

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
  const [verifyingLogin, setVerifyingLogin] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // fetch token from local storage
    setVerifyingLogin(true);
    const token = localStorage.getItem('token');
     try {
      const response = await axios.post(
        'https://asuman-sounds-api.herokuapp.com/token/validate-token',
        JSON.stringify({ token }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      const msg = response.data.msg;
      setVerifyingLogin(false);

      // if (!showLoginCard) {
      //   setIsLoggedIn(true);
      // }

      if (msg.includes('verified')) {
        setShowLoginCard(false);
        setVerifyingLogin(false);
        router.push('/product/checkout/payment');
      } else {
        setShowLoginCard(true);
      }
    } catch (error) {
      setShowLoginCard(true);
      setVerifyingLogin(false);
    }

    console.log('verifying login...', verifyingLogin);
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
            text={ verifyingLogin ? 'Please wait...' : 'Proceed to payment'}
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
