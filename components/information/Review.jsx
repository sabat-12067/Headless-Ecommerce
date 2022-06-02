import { Button, Navigation } from '../HorLine';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { informationActions } from '../../store/infoSlice';
import { cartActions } from '../../store/cartSlice';

export default function Review() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Store the billingAddress, shippingAddress, deliveryMethod, buyItNowItem in local storage to the redux store.
    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
    dispatch(informationActions.setShippingAddress(shippingAddress));
    const billingAddress = JSON.parse(localStorage.getItem('billingAddress'));
    dispatch(informationActions.setBillingAddress(billingAddress));
    const deliveryMethod = JSON.parse(localStorage.getItem('deliveryMethod'));
    dispatch(informationActions.deliveryMethod(deliveryMethod));
    const isAddToCartBtnClicked = JSON.parse(
      localStorage.getItem('isAddToCartBtnClicked')
    );
    dispatch(cartActions.setIsAddToCartBtnClicked(isAddToCartBtnClicked));
    const buyItNowItem = JSON.parse(localStorage.getItem('buyItNowItem'));
    dispatch(cartActions.setBuyItNowItem(buyItNowItem));
  }, []);

  return (
    <section className='px-4'>
      <h2 className='text-left pt-4 text-xl md:2xl lg:3xl font-bold tracking-wide border-b-2 pb-3'>
        Review
      </h2>
      <ShippingAddress />
      <DeliveryMethod />
      <PaymentInformation />
      <CheckoutBtn />
      <Navigation path='/checkout/payment' pathName='Return To Payment' />
    </section>
  );
}

const ShippingAddress = () => {
  const shippingAddress = useSelector(
    (state) => state.information.shippingAddress
  );

  const { firstName, lastName, address, city, apartment, email, country } =
    shippingAddress;
  return (
    <section className='border-b-2'>
      <h3 className='text-left pt-4 text-lg md:2xl lg:3xl font-bold tracking-wide pb-1'>
        Shipping Address
      </h3>
      <div className='font-medium leading-5 text-sm'>
        <div className='flex'>
          <p className='mr-1 text-sm'>{firstName ? firstName : null}</p>
          <p>{lastName}</p>
        </div>
        <p>{address}</p>
        <p>{country}</p>
        <p>{city}</p>
        <p>{apartment}</p>
        <p>{email}</p>
      </div>
      <p className='underline text-secondary-7 text-xs'>
        <Link href='/checkout/address'>change</Link>
      </p>
    </section>
  );
};

const DeliveryMethod = () => {
  const deliveryMethod = useSelector(
    (state) => state.information.deliveryMethod
  );
  let deliveryTime = '';

  if (deliveryMethod === 'Standard') {
    deliveryTime = '10-20 business days';
  } else if (deliveryMethod === 'Express') {
    deliveryTime = '3-5 business days';
  } else if (deliveryMethod === 'Overnight') {
    deliveryTime = '1-2 business days';
  }

  return (
    <section className='border-b-2'>
      <h3 className='text-left pt-4 text-lg md:2xl lg:3xl font-bold tracking-wide pb-1'>
        delivery method
      </h3>
      <div className='font-medium leading-5 text-sm'>
        <p>{deliveryMethod}</p>
        <p>{deliveryTime}</p>
      </div>
      <p className='underline text-secondary-7 text-xs'>
        <Link href='/checkout/shipping'>change</Link>
      </p>
    </section>
  );
};
const PaymentInformation = () => {
  return (
    <section className='border-b-2'>
      <h3 className='text-left pt-4 text-lg md:2xl lg:3xl font-bold tracking-wide pb-1'>
        Payment Information
      </h3>
      <div className='font-medium leading-6 text-sm'>
        <p>Adam porter</p>
        <p>4124XXXXXXXX2028</p>
        <p>05/25</p>
      </div>
      <p className='underline text-secondary-7 text-xs'>
        <Link href='/checkout/payment'>change</Link>
      </p>
    </section>
  );
};

const CheckoutBtn = () => {
  const KEY =
    'pk_test_51L5v4dJNPOaQ7OSxTtcorhUjbauQDelTBowOvjmovJhV3wGXG8K3q23WY6VuIvBCXrOA6ZncUgErVZf04dEqQoSy00jeokRBG1';
  const billingAddress = useSelector(
    (state) => state.information.shippingAddress
  );
  const shippingAddress = useSelector(
    (state) => state.information.shippingAddress
  );
  const router = useRouter();

  const handleClick = () => {
    localStorage.setItem('cart', JSON.stringify([]));
    localStorage.setItem('shippingAddress', JSON.stringify([]));
    localStorage.setItem('deliveryMethod', JSON.stringify([]));
    router.push('/thankyou');
  };

  const cartItems = useSelector((state) => state.cart.cartItems);
  const buyItNowItem = useSelector((state) => state.cart.buyItNowItem);
  const isAddToCartBtnClicked = useSelector(
    (state) => state.cart.isAddToCartBtnClicked
  );

 // console.log(buyItNowItem, isAddToCartBtnClicked);

  let totalPrice = 0;

  if (isAddToCartBtnClicked) {
    cartItems.map((cartItem) => {
      const { totalPrice } = cartItem;
      totalPrice += totalPrice;
      console.log(totalPrice);
    });
  } else {
    const { price } = buyItNowItem;
    totalPrice = price;
  }

  const [stripeToken, setStripeToken] = useState(null);


  const onToken = (token) => {
           console.log(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
       const response = await  axios.post('http://localhost:5000/stripe/payment', {
          tokenId: stripeToken.id,
          amount: totalPrice,
      });  
      console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, [stripeToken]);


  return (
    <div>
      <StripeCheckout
        name='Asuman Sounds'
        billingAddress 
        shippingAddress 
        description={`Your price is ${totalPrice}`} amount={totalPrice} token={onToken}
        stripeKey={KEY}
        >
        <Button text='Place order' onClick={handleClick} />
      </StripeCheckout>
    </div>
  );
};
