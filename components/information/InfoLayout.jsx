import CustomerInfo from '../../components/information/CustomerInfo';
import CartSummary from './orderSummary/CartSummary';
import BuyNowSummary from './orderSummary/BuyNowSummary';
import { useSelector } from 'react-redux';
import { Children } from 'react';

//This page is displayed when customer clicks the 'add to cart' button

export default function InfoLayout({ children }) {
  const isAddToCartBtnClicked = useSelector(
    (state) => state.cart.isAddToCartBtnClicked
  );

  return (
    <section className=''>
      <h2 className='text-primary-10 text-left font-["Arima_Madurai"] font-bold text-lg md:hidden py-6 px-4 '>
        Asuman Sounds
      </h2>
      <div className='lg:flex'>
        {/*If 'continue to check out' button is clicked, cartSummary component is displayed and buynowsummary component is displayed when the customer takes the 'buy it now' path */}
        {isAddToCartBtnClicked ? <CartSummary /> : <BuyNowSummary />}
        <div>
          <h2 className='text-primary-10 text-left font-["Arima_Madurai"] font-bold text-lg py-6 px-4 hidden'>
            Asuman&#39;s Supermarket
          </h2>
          { children }
        </div>
      </div>
    </section>
  );
}
