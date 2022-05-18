import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import Link from 'next/link';

export default function Payment() {
  return (
    <section className='px-4'>
      <h2 className='text-left pt-4 text-xl md:2xl lg:3xl font-bold tracking-wide border-b-2 pb-3'>
        Payment
      </h2>
      <PaymentInfo />
      <BillingAddress />
      <Navigation />
    </section>
  );
}

const inputStyles = 'w-full px-2 py-3 rounded-md text-sm mt-3 outline-primary-8';

const PaymentInfo = () => {
  return (
    <section>
      <div className='py-3'>
        <h4 className='text-left pt-4'>Payment information</h4>
        <p>All transactions are secure and encrypted.</p>
        <div className='flex items-center py-2 flex-col'>
          <InputElement placeholder='Card number' />
          <InputElement placeholder='Name on card' />
          <InputElement placeholder='Expiration date' />
          <InputElement placeholder='CVV' />
        </div>
      </div>
    </section>
  );
};

const InputElement = ({ placeholder }) => {
  return (
    <input
      autoComplete='on'
      placeholder={placeholder}
      className={inputStyles}
    />
  );
};

const BillingAddress = () => {
  const router = useRouter();

  //OnSubmit() function is only called when the form is validated
  const onSubmit = (data) => {
    //console.log(data);
    //router.push('/information/shipping');
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <section>
      <div className='py-3'>
        <h4 className='text-left pt-4'>Billing address</h4>
        <div className='flex items-center py-2 flex-col'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register('country', { required: true })}
              autoComplete='on'
              placeholder='Country/region'
              className={inputStyles}
            />
            {errors.email && <Alert msg='Country is required' />}
            <input
              {...register('firstName', { required: false })}
              autoComplete='on'
              placeholder='First name (optional)'
              className={inputStyles}
            />
            <input
              {...register('lastName', { required: true })}
              autoComplete='on'
              placeholder='Last name'
              className={inputStyles}
            />
            {errors.email && <Alert msg='Please, provide last your name.' />}
            <input
              {...register('address', { required: true })}
              autoComplete='on'
              placeholder='Address'
              className={inputStyles}
            />
            {errors.email && <Alert msg='Please provide your address' />}
            <input
              {...register('apartment', { required: false })}
              autoComplete='on'
              placeholder='Apartment, suite, etc. (optional)'
              className={inputStyles}
            />
            <input
              {...register('city', { required: true })}
              autoComplete='on'
              placeholder='City'
              className={inputStyles}
            />
            {errors.city && <Alert msg='Please provide a city' />}
            <button
              type='submit'
              className='bg-primary-11 py-4 px-12 text-lg font-bold text-[white] w-full mt-6 '>
              Pay now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// const BillingAddressInput = ({
//   placeholder,
//   register,
//   required,
//   name,
//   errors,
//   msg,
// }) => {
//  console.log(errors, name);
//   return (
//     <>
//       <input
//         {...register(name, { required: required })}
//         autoComplete='on'
//         placeholder={placeholder}
//         className={inputStyles}
//       />
//       {errors.name && <Alert msg={msg} />}
//     </>
//   );
// };

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

//This is an Alert Component for displaying error messages
const Alert = ({ msg }) => {
  return (
    <div className='flex items-center justify-center text-[red] font-bold tracking-wide relative'>
      <p>{msg}</p>
    </div>
  );
};
