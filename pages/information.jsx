import BuyNowSummary from '../components/information/orderSummary/BuyNowSummary';

export default function Information() {
  return (
    <section className=''>
      <h2 className='text-primary-10 text-left font-["Arima_Madurai"] font-bold text-lg md:hidden py-6 px-4'>
        Asuman&#39;s Supermarket
      </h2>
      <div>
        <BuyNowSummary />
      </div>
    </section>
  );
}
