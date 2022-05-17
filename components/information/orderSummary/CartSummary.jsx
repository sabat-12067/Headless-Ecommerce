import { HiOutlineShoppingCart } from 'react-icons/hi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useState } from 'react';

//This component is used to display the cart summary when customer clicks the 'continue to checkout' button of the cart section

export default function CartSummary() {
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const cartItemsDetails = useSelector((state) => state.cart.cartItemsList);
  console.log(cartItemsDetails);

  let totalPriceOfCartItems = 0;

  cartItemsDetails.map((cartItem) => {
    return (totalPriceOfCartItems += cartItem.totalPrice);
  });

  //NOTE: '.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ' inserts commas every 3 digits

  let estimatedTaxes = 0.03 * totalPriceOfCartItems;
  estimatedTaxes = ((estimatedTaxes * 100) / 100 ).toFixed(2);

  let total = (totalPriceOfCartItems + parseFloat(estimatedTaxes))
  total = ((total * 100) / 100).toFixed(2);


  return (
    <section className='bg-primary-3 '>
      <OrderSummaryHeader
        total={total}
        setShowOrderSummary={setShowOrderSummary}
        showOrderSummary={showOrderSummary}
      />
      <OrderSummaryInfo
        cartItemsDetails={cartItemsDetails}
        totalPriceOfCartItems={totalPriceOfCartItems}
        total={total}
        estimatedTaxes={estimatedTaxes}
        showOrderSummary={showOrderSummary}
      />
    </section>
  );
}

const OrderSummaryHeader = ({
  total,
  setShowOrderSummary,
  showOrderSummary,
}) => {
  return (
    <section
      className='flex w-full p-4 justify-between  border-t-2 border-b-2 border-primary-4 text-sm items-center md:text-base'
      onClick={() => setShowOrderSummary(!showOrderSummary)}>
      <div className='flex p-2 items-center'>
        <HiOutlineShoppingCart className='w-6 h-6 text-primary-8 mr-2' />
        <p className='font-medium '>
          {showOrderSummary ? 'Hide' : 'Show'} order summary
        </p>
        <MdKeyboardArrowDown
          className={`w-6 h-6 text-primary-8 self-center duration-300 ease-in-out ${
            showOrderSummary ? 'rotate-180' : null
          }`}
        />
      </div>
      <p className='font-bold text-right'>
        USD {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </p>
    </section>
  );
};

const OrderSummaryInfo = ({
  cartItemsDetails,
  estimatedTaxes,
  total,
  showOrderSummary,
  totalPriceOfCartItems
}) => {
  return (
    <section
      className={`px-4 border-b-2 border-primary-4 overflow-hidden ${
        showOrderSummary ? 'h-70' : 'h-0 border-b-0'
      }`}>
      <ProductInfo cartItemsDetails={cartItemsDetails} />
      <Costs
        estimatedTaxes={estimatedTaxes}
        totalPriceOfCartItems={totalPriceOfCartItems}
      />
      <Total total={total} />
    </section>
  );
};

const ProductInfo = ({ cartItemsDetails }) => {
  return (
    <div className='border-b-2 border-primary-4 py-4'>
      {cartItemsDetails.map((cartItem, index) => {
        const { name, imageUrl, discountPrice, totalPrice, quantity } =
          cartItem;
          
          const totalDiscountPrice = discountPrice * quantity;
        return (
          <div className='flex justify-between items-center mt-2 relative' key={index}>
            <div className='flex items-center'>
              <img
                src={imageUrl}
                alt={`Thumbnail of ${name}`}
                className='rounded-lg w-20 h-20'
              />
              <button className='absolute text-[white] px-2.5 py-1 rounded-[50%] text-sm top-0'>
                {quantity}
              </button>
              <div className='p-2 w-[60%] sm:w-full'>
                <p className='font-bold text-sm text-secondary-7'>{name}</p>
              </div>
            </div>
            <div className='w-[60%] sm:w-auto text-right'>
              <p className='font-bold text-sm text-secondary-7 '>
                USD{' '}
                {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </p>
              <p className='font-medium line-through text-sm'>
                USD {totalDiscountPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Costs = ({ totalPriceOfCartItems, estimatedTaxes }) => {
  return (
    <section className='text-sm items-center  border-b-2 border-primary-4 py-4'>
      <div className='flex w-full justify-between font-semibold'>
        <p>Subtotal</p>
        <p>
          USD{' '}
          {totalPriceOfCartItems
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
      </div>
      <div className='flex w-full justify-between my-1 font-medium'>
        <p>Shipping</p>
        <p>Calculated at next step</p>
      </div>
      <div className='flex w-full justify-between font-medium'>
        <p>Taxes (estimated)</p>
        <p>
          USD {estimatedTaxes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
      </div>
    </section>
  );
};

const Total = ({ total }) => {
  return (
    <div className='flex w-full justify-between font-semibold py-2'>
      <p className=''>Total</p>
      <p className='text-lg text-secondary-8'>
        USD {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </p>
    </div>
  );
};
