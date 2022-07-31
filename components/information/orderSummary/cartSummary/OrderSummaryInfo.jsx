import ProductInfo from './ProductInfo';
import Costs from './Costs';
import Total from '../Total';

const OrderSummaryInfo = ({
  cartItems,
  estimatedTaxes,
  total,
  showOrderSummary,
  totalPriceOfCartItems,
  deliveryFee,
}) => {
  return (
    <section
      className={`px-4 border-b-2 border-white overflow-hidden ${
        showOrderSummary ? 'h-70' : 'h-0 border-b-0 lg:h-auto'
      }`}>
      <ProductInfo cartItems={cartItems} />
      <Costs
        estimatedTaxes={estimatedTaxes}
        totalPriceOfCartItems={totalPriceOfCartItems}
        deliveryFee={deliveryFee}
      />
      <Total total={total} />
    </section>
  );
};

export default OrderSummaryInfo;
