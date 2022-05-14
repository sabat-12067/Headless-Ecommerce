import BuyNowSummary from '../../components/information/orderSummary/BuyNowSummary';
import CustomerInfo from '../../components/information/CustomerInfo';

export default function BuyNowInformation() {
  return (
    <section className=''>
      <h2 className='text-primary-10 text-left font-["Arima_Madurai"] font-bold text-lg md:hidden py-6 px-4'>
        Asuman&#39;s Supermarket
      </h2>
      <div className='flex'>
        <BuyNowSummary />
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
