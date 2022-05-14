import CustomerInfo from "../../components/information/CustomerInfo";
import CartSummary from "../../components/information/orderSummary/CartSummary";

//This page is displayed when customer clicks the 'add to cart' button

export default function cart() {
  return (
    <section className=''>
      <h2 className='text-primary-10 text-left font-["Arima_Madurai"] font-bold text-lg md:hidden py-6 px-4 '>
        Asuman&#39;s Supermarket
      </h2>
      <div className="lg:flex">
        <CartSummary />
        <div>
          <h2 className='text-primary-10 text-left font-["Arima_Madurai"] font-bold text-lg py-6 px-4 hidden'>
            Asuman&#39;s Supermarket
          </h2>
          <CustomerInfo />
        </div>
      </div>
    </section>
  );
}
