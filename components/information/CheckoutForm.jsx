import { Button } from '../HorLine';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
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

  const [isProcessing, setIsProcessing] = useState(false);
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
    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // navigate to payment completion page
        return_url: 'https://asumansounds.com/thankyou',
        //https://asmn-grocery-store.netlify.app
        //http://localhost:3000
        //https://asumansounds.com
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
    setIsProcessing(false);
  };

  return (
    <>
      <div className='w-full flex relative'>
        <div className='absolute w-full lg:w-[80%] z-30 top-4'>
          {alert.show && <Alert alert={alert} setAlert={setAlert} />}
        </div>
        <form
          className=' bg-primary-13 px-4 py-8 mt-4 rounded-md w-full lg:w-[80%]'
          onSubmit={handleSubmit}>
          <div></div>
          <PaymentElement />
          <div className='relative'>
            <div className='absolute flex left-6 top-10 sm:left-12 md:left-16 lg:left-24 '>
              {isProcessing && <ClipLoader size={25} color={'#ffff'} />}
            </div>
            <Button text={isProcessing ? 'Processing...' : 'pay now'} disabled={!stripe} type='submit' />
          </div>
          <p
            className='text-left pt-3 text-primary-10 underline font-bold lg:cursor-pointer'
            onClick={() => router.push('/checkout/review')}>
            Your checkout information summary
          </p>
        </form>
      </div>
    </>
  );
}
