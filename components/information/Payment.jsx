import { useState, useEffect } from 'react';
import { Navigation } from '../HorLine';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import RingLoader from 'react-spinners/RingLoader';

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
 const [isLoading, setIsLoading] = useState(false);

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

    const info = {
      email: customerEmail,
      idAndQuantity,
      deliveryMethod,
      isAddToCartBtnClicked,
    };
    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      //set the loading state to true while the client secret is being fetched
        setIsLoading(true);
      try {
       // console.log(isLoading);
        const response = await axios.post(
          'https://asuman-sounds-api.herokuapp.com/stripe/payment-intent',
          //http://localhost:5000/stripe/payment-intent
          JSON.stringify(info),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );

        const { clientSecret, orderNumber } =  response.data;
        //save clientSecret to localStorage
        setClientSecret(clientSecret);

        // Store orderNumber in the localStorage
        localStorage.setItem('orderNumber', orderNumber);
       
       setIsLoading(false);
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
    <section className='md:grid grid-cols-2 gap-4 lg:flex flex-col'>
      <div className='lg:w-[80%] pt-8 pb-3 text-sm'>
        <h4 className='text-left'>Payment Instructions</h4>
        <p className='leading-7'>
          The following form doesnt accept &#34;real&#34; card numbers and
          online payments, yet. <br /> For testing purposes... <br />
        </p>
        <p className='pt-2 leading-7'>
          1. Enter the &#34;testing&#34; card number -{' '}
          <span className='font-bold'>4242 4242 4242 4242</span>. <br /> 2.
          Enter <span className='font-bold'>any future date</span> for the
          &#34;Expiration.&#34; <br /> 3. Enter{' '}
          <span className='font-bold'>any 3-digit number </span>
          as the &#34;CVV.&#34; <br />
        </p>
      </div>
      <div className='flex items-center justify-center lg:justify-start'>
        {isLoading && (
          <div className='absolute z-50 flex flex-col justify-center items-center bg-primary-12 h-[33%] w-full lg:w-[40%]'>
            <RingLoader size={60} color={'#7c2d12'} />
            <p className='font-bold mt-12 animate-zoomInOut'>
              Wait a second! Form loading...
            </p>
          </div>
        )}
        {clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <div className='w-full'>
              <CheckoutForm />
            </div>
          </Elements>
        )}
      </div>
    </section>
  );
};
