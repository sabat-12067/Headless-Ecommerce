import CustomerInfo from '../../components/information/Address';
import CartSummary from './orderSummary/CartSummary';
import BuyNowSummary from './orderSummary/BuyNowSummary';
import { useSelector } from 'react-redux';
import { Children, useEffect } from 'react';
import { CurrentPage } from '../CurrentPage';
import { useLocalStorage } from '../UseLocalStorage';
import { useState } from 'react';

//This is the layout component for checkout pages i.e shipping, payment, address, review

export default function InfoLayout({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [buyItNowItem, setBuyItNowItem] = useState({});

  const [isAddToCartBtnClicked, setIsAddToCartBtnClicked] = useState();

 
  useEffect(() => {
    setBuyItNowItem(JSON.parse(localStorage.getItem('buyItNowItem')));
    setCartItems(JSON.parse(localStorage.getItem('cartItems')));
    setIsAddToCartBtnClicked(JSON.parse(localStorage.getItem('isAddToCartBtnClicked')));
  }, []);

  console.log('buyItNowItem', buyItNowItem);

  //console.log('cartItemsinfolayout', cartItems);
 // console.log('isAddToCartBtnClicked', isAddToCartBtnClicked);

  return (
    <section className='max-w-[1200px] lg:mx-auto'>
      <h2 className='text-primary-10 text-left font-["Arima_Madurai"] font-bold text-lg md:hidden py-6 px-4 '>
        Asuman Sounds
      </h2>
      <div className='lg:grid grid-cols-grid-checkout-pg'>
        {/*If 'continue to check out' button is clicked, cartSummary component is displayed and buynowsummary component is displayed when the customer takes the 'buy it now' path */}
        {isAddToCartBtnClicked ? <CartSummary cartItems={cartItems} /> : <BuyNowSummary buyItNowItem={buyItNowItem} />}
        <div className='col-span-3 lg:pt-10'>
          <h2 className='text-primary-10 text-left font-["Arima_Madurai"] font-bold text-lg py-6 px-4 hidden'>
            Asuman&#39;s Supermarket
          </h2>
          <CurrentPage />
          {children}
        </div>
      </div>
    </section>
  );
}
