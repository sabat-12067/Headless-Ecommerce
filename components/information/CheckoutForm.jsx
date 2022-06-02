import { Button } from '../HorLine';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import Alert from '../Auth/Alert';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', msg: '' });

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setAlert({
            show: true,
            type: 'success',
            msg: 'Payment succeeded!',
          });
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          setAlert({
            show: true,
            type: 'warning',
            msg: 'Payment processing!',
          });
          break;
        case 'requires_payment_method':
          setMessage('');
          setAlert({
            show: true,
            type: 'danger',
            msg: 'Your payment was not successful, please try again!',
          });
          break;
        default:
          setAlert({
            show: true,
            type: 'danger',
            msg: 'Something went wrong!',
          });
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // navigate to payment completion page
        return_url: 'http://localhost:3000/thankyou',
      },
    });

    /* This point will only be reached if there is an immediate error when
      confirming the payment. 
      Otherwise, customer will be redirected to
      the `return_url`. For some payment methods like iDEAL, the customer will
      be redirected to an intermediate site first to authorize the payment, then
      redirected to the `return_url`.*/
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setAlert({
        show: true,
        type: 'danger',
        msg: error.message,
      });
    } else {
     console.log(error);
      setAlert({
        show: true,
        type: 'danger',
        msg: 'An unexpected error occurred.',
      });
    }
    setIsLoading(false);
  };

  return (
   <div className='w-full flex relative'>
       <div className='absolute w-full lg:w-[80%] z-30 top-4'>
          {alert.show && <Alert alert={alert} setAlert={setAlert} />}
       </div>
    <form
      className=' bg-primary-13 px-4 py-8 mt-4 rounded-md w-full lg:w-[80%]'
      onSubmit={handleSubmit}>
        <PaymentElement />
      <Button text='pay now' disabled={!stripe} type='submit' />
      <p className='text-center pt-3 text-secondary-7 font-bold lg:cursor-pointer' onClick={() => router.push('/checkout/review')}>
        Your checkout information summary
      </p>
    </form>
   </div>
  );
}
