import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import Link from 'next/link';
import { Alert } from '../HorLine';
import { Navigation } from '../HorLine';
import { Button } from '../HorLine';

export default function Payment() {
  return (
    <section className='px-4'>
      <h2 className='text-left pt-4 text-xl md:2xl lg:3xl font-bold tracking-wide border-b-2 pb-3'>
        Payment
      </h2>
      <PaymentInfo />
      <BillingAddress />
      <Navigation path='/information/shipping' pathName='Return To Shipping' />
    </section>
  );
}

const inputStyles =
  'w-full px-2 py-3 rounded-md text-sm mt-3 outline-primary-8';

const PaymentInfo = () => {
  return (
    <section>
      <div className='py-3'>
        <h4 className='text-left pt-4'>Payment information</h4>
        <p className='text-sm'>All transactions are secure and encrypted.</p>
        <div className='flex items-center py-2 flex-col'>
          <InputElement placeholder='Card number' value='4334 2211 1203 6853' />
          <InputElement placeholder='Name on card' value='Asuman Ssendegeya' />
          <InputElement placeholder='Expiration date' value='05/25' />
          <InputElement placeholder='CVV' value='588' />
        </div>
      </div>
    </section>
  );
};

const InputElement = ({ placeholder, value }) => {
  return (
    <input
      autoComplete='on'
      placeholder={placeholder}
      className={inputStyles}
      value={value}
    />
  );
};

const BillingAddress = () => {
  const router = useRouter();

  const [defaultAddressChecked, setDefaultAddressChecked] = useState(false);
  const [differentAddressChecked, setDifferentAddressChecked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleDefault = (e) => {
    setDefaultAddressChecked(true);
    setDifferentAddressChecked(false);
    const shippingMethod = e.target.value;
    //console.log(shippingMethod);
  };

  const handleDifferent = () => {
    setDefaultAddressChecked(false);
    setDifferentAddressChecked(true);
  };

  //console.log(defaultAddressChecked, differentAddressChecked);

  //OnSubmit() function is only called when the form is validated
  const onSubmit = (data) => {
    if (!defaultAddressChecked && !differentAddressChecked) {
      setShowAlert(true);
      return;
    } else {
      setShowAlert(false);
    }
    //console.log(data);
    router.push('/information/review');
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <section>
      {showAlert && (
        <Alert
          setShowAlert={setShowAlert}
          msg='Please select a billing address'
        />
      )}
      <div className='py-3'>
        <h4 className='text-left pt-4'>Billing address</h4>
        <div className='flex items-center py-4 flex-col'>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Same as shipping address container*/}
            <div className='flex items-center'>
              <input
                {...register('country', { required: true })}
                autoComplete='on'
                placeholder='Country/region'
                className='w-4 h-4 mr-4'
                type='radio'
                id='defaultAddress'
                name='billingAddress'
                value='same address'
                onChange={handleDefault}
              />
              <label htmlFor='defaultAddress' className='font-medium text-sm'>
                Same as shipping address
              </label>
            </div>
            {/* Use a different address container*/}
            <div className='flex items-center flex-col pt-3'>
              <div className='w-full'>
                <input
                  {...register('country', { required: true })}
                  autoComplete='on'
                  placeholder='Country/region'
                  className='w-4 h-4 mr-4'
                  type='radio'
                  id='differentAddress'
                  name='billingAddress'
                  value='different address'
                  onChange={handleDifferent}
                />
                <label
                  htmlFor='defferentAddress'
                  className='font-medium text-sm'>
                  Use a different address
                </label>
              </div>
              {/* Input fields for 'different address'*/}
              <div
                className={`overflow-hidden ${
                  differentAddressChecked ? 'h-auto' : 'h-0'
                }`}>
                <input
                  {...register('country', {
                    required: differentAddressChecked ? true : false,
                  })}
                  autoComplete='on'
                  placeholder='Country/region'
                  className={inputStyles}
                />
                {errors.country && <Error msg='Country is required' />}
                <input
                  {...register('firstName', {
                    required: false,
                  })}
                  autoComplete='on'
                  placeholder='First name (optional)'
                  className={inputStyles}
                />
                <input
                  {...register('lastName', {
                    required: differentAddressChecked ? true : false,
                  })}
                  autoComplete='on'
                  placeholder='Last name'
                  className={inputStyles}
                />
                {errors.lastName && <Error msg='Provide a last name.' />}
                <input
                  {...register('address', {
                    required: differentAddressChecked ? true : false,
                  })}
                  autoComplete='on'
                  placeholder='Address'
                  className={inputStyles}
                />
                {errors.address && <Error msg='Please provide an address' />}
                <input
                  {...register('apartment', { required: false })}
                  autoComplete='on'
                  placeholder='Apartment, suite, etc. (optional)'
                  className={inputStyles}
                />
                <input
                  {...register('city', {
                    required: differentAddressChecked ? true : false,
                  })}
                  autoComplete='on'
                  placeholder='City'
                  className={inputStyles}
                />
                {errors.city && <Error msg='Please provide a city' />}
              </div>
            </div>
            <Button text='Continue' type='submit' />
          </form>
        </div>
      </div>
    </section>
  );
};

//This is an Alert Component for displaying error messages
const Error = ({ msg }) => {
  return (
    <div className='flex items-center justify-center text-red text-sm font-normal tracking-wide relative'>
      <p>{msg}</p>
    </div>
  );
};
