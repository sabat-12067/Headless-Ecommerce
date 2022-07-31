import ProductInfo from "./ProductInfo";
import Costs from "./Costs";
import Total from "../Total";

const OrderSummaryInfo = ({
  buyItNowItem,
  subTotal,
  estimatedTaxes,
  total,
  showOrderSummary,
  deliveryFee,
}) => {
  return (
    <section
      className={`px-4 border-b-2 border-primary-11 overflow-hidden ${
        showOrderSummary ? 'h-70' : 'h-0 border-b-0 lg:h-auto'
      }`}>
      <ProductInfo buyItNowItem={buyItNowItem} />
      <Costs
        estimatedTaxes={estimatedTaxes}
        subTotal={subTotal}
        deliveryFee={deliveryFee}
      />
      <Total total={total} />
    </section>
  );
};

export default OrderSummaryInfo;