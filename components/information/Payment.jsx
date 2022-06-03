import { useState, useEffect } from 'react';
import { Navigation } from '../HorLine';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  'pk_test_51L5v4dJNPOaQ7OSxTtcorhUjbauQDelTBowOvjmovJhV3wGXG8K3q23WY6VuIvBCXrOA6ZncUgErVZf04dEqQoSy00jeokRBG1'
);

export default function Payment() {
  return (
    <section className='px-4'>
      <h2 className='text-left pt-4 text-xl md:2xl lg:3xl font-bold tracking-wide border-b-2 pb-3'>
        Payment
      </h2>
      <PaymentInfo />
      {/* <BillingAddress /> */}
      <Navigation path='/checkout/shipping' pathName='Return To Shipping' />
    </section>
  );
}

const PaymentInfo = () => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const buyItNowItem = JSON.parse(localStorage.getItem('buyItNowItem'));
    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
    const isAddToCartBtnClicked = JSON.parse(
      localStorage.getItem('isAddToCartBtnClicked')
    );
    const customerEmail = shippingAddress.email;

    const deliveryMethod = JSON.parse(localStorage.getItem('deliveryMethod'));

    //get the ids and quantities of products
    let idAndQuantity = [];
    if (isAddToCartBtnClicked) {
      cartItems.map((cartItem) =>
        idAndQuantity.push({ id: cartItem.id, quantity: cartItem.quantity })
      );
    } else {
      idAndQuantity = [
        { id: buyItNowItem.id, quantity: buyItNowItem.quantity },
      ];
    }
    //https://asuman-sounds-api.herokuapp.com/stripe/payment-intent

    const info = { email: customerEmail, idAndQuantity, deliveryMethod, isAddToCartBtnClicked };
    console.log('info', info);
    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post(
          'http://localhost:5000/stripe/payment-intent',
          JSON.stringify(info),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );

        const { clientSecret, orderNumber } = response.data;
        setClientSecret(clientSecret);

        // Store orderNumber in the localStorage
        localStorage.setItem('orderNumber', orderNumber);
      } catch (error) {
        console.log(error);
      }
    };
    createPaymentIntent();
  }, []);

  const options = {
    // passing the client secret obtained in step 2
    clientSecret,
  };
  return (
    <section>
      <div className='flex items-center justify-center lg:justify-start'>
        {clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </section>
  );
};
