import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Alert from '../Auth/Alert';
import { Navigation } from '../HorLine';
import { Button } from '../HorLine';
import { informationActions } from '../../store/infoSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Payment() {
  return (
    <section className='px-4'>
      <h2 className='text-left pt-4 text-xl md:2xl lg:3xl font-bold tracking-wide border-b-2 pb-3'>
        Payment
      </h2>
      <PaymentInfo />
      <BillingAddress />
      <Navigation path='/checkout/shipping' pathName='Return To Shipping' />
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
          <InputElement value='4124 7598 3491 2028' />
          <InputElement value='Adam Porter' />
          <InputElement value='05/25' />
          <InputElement value='465' />
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
      readOnly
    />
  );
};

const BillingAddress = () => {
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: '',
  });
  const router = useRouter();

  const [shippingAddressSelected, setShippingAddressSelected] = useState(false);
  const [differentAddressSelected, setDifferentAddressSelected] =
    useState(false);
  const [showAlert, setShowAlert] = useState(false);

  //grab shipping address
  const shippingAddress = useSelector(
    (state) => state.information.shippingAddress
  );
  //console.log(`shippingAddress`, shippingAddress);

  const dispatch = useDispatch();

  //function runs when user clicks on the checkbox, with "same as shipping address"
  const handleDefault = () => {
    setShippingAddressSelected(true);
    setDifferentAddressSelected(false);
  };

  //function runs when user clicks on the checkbox, with "different address"
  const handleDifferent = () => {
    setDifferentAddressSelected(true);
    setShippingAddressSelected(false);
  };

  //OnSubmit() function is only called when the form is validated
  const onSubmit = (data) => {
    if (!shippingAddressSelected && !differentAddressSelected) {
     setAlert({
        show: true,
        msg: 'Please select a billing address!',
        type: 'danger',
      });
      return;
    } else {
      setAlert({
        show: false,
      });
    }

    if (differentAddressSelected) {
      //console.log(`New Billing Address:`, data);
      //Set the billing address to the new address
      dispatch(informationActions.setBillingAddress(data));
    } else {
      //Set billing address to shipping address
      dispatch(
        informationActions.setBillingAddress({
          address: shippingAddress.address,
          city: shippingAddress.city,
          country: shippingAddress.country,
          firstName: shippingAddress.firstName,
          lastName: shippingAddress.lastName,
          apartment: shippingAddress.apartment,
        })
      );
    }

    router.push('/checkout/review');
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <section>
      <div className='w-full left-0 fixed top-0 z-40'>
        {alert.show && <Alert alert={alert} setAlert={setAlert} />}
      </div>
      <div className='py-3'>
        <h4 className='text-left pt-4'>Billing address</h4>
        <div className='flex items-center py-4 flex-col'>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 'Same as shipping address' container*/}
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
              <label htmlFor='defaultAddress' className='font-medium text-base'>
                Same as shipping address
              </label>
            </div>
            {/* 'Use a different address' container*/}
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
                  htmlFor='differentAddress'
                  className='font-medium text-base'>
                  Use a different address
                </label>
              </div>
              {/* Input fields for 'different address'*/}
              <div
                className={`overflow-hidden ${
                  differentAddressSelected ? 'h-auto' : 'h-0'
                }`}>
                <input
                  {...register('country', {
                    required: differentAddressSelected ? true : false,
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
                    required: differentAddressSelected ? true : false,
                  })}
                  autoComplete='on'
                  placeholder='Last name'
                  className={inputStyles}
                />
                {errors.lastName && <Error msg='Provide a last name.' />}
                <input
                  {...register('address', {
                    required: differentAddressSelected ? true : false,
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
                    required: differentAddressSelected ? true : false,
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
