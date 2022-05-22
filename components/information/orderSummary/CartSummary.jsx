import { HiOutlineShoppingCart } from 'react-icons/hi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { formatPrice } from '../../HorLine'
import { formatpriceWithCommas } from '../../HorLine'; 

//This component is used to display the cart summary when customer clicks the 'continue to checkout' button of the cart section

export default function CartSummary() {
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const cartItemsDetails = useSelector((state) => state.cart.cartItemsList);
  //console.log(cartItemsDetails);

  let totalPriceOfCartItems = 0;

  cartItemsDetails.map((cartItem) => {
    return (totalPriceOfCartItems += cartItem.totalPrice);
  });

  let estimatedTaxes = 0.03 * totalPriceOfCartItems;
  estimatedTaxes = formatPrice(estimatedTaxes);

  let total = (totalPriceOfCartItems + parseFloat(estimatedTaxes))
  total = formatPrice(total);

  return (
    <section className='bg-primary-4 col-span-2 xl:mr-12 lg:mr-4 xl:ml-0 lg:ml-4 lg:mt-12 lg:h-[fit-content] lg:py-4 lg:rounded-md'>
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
      className='flex w-full p-4 justify-between  border-t-2 border-b-2 border-primary-4 text-sm items-center lg:hidden'
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
        USD {total}
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
        showOrderSummary ? 'h-70' : 'h-0 border-b-0 lg:h-auto'
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
          
          let totalDiscountPrice = discountPrice * quantity;
          totalDiscountPrice = formatPrice(totalDiscountPrice);

          const formatTotalPrice = formatPrice(totalPrice);
          
        return (
          <div
            className='flex justify-between items-center mt-2 relative py-2.5 lg:py-4 border-b-[1px]'
            key={index}>
            <div className='flex items-center'>
              <img
                src={imageUrl}
                alt={`Thumbnail of ${name}`}
                className='rounded-lg w-20 h-20'
              />
              <p className='absolute text-white w-5 h-5 text-xs rounded-[50%] top-0 text-center flex items-center justify-center font-bold left-[70px] bg-primary-11'>
                {quantity}
              </p>
              <div className='p-2 pl-4 w-[70%] sm:w-full'>
                <p className='font-bold text-xs sm:text-sm text-secondary-7'>
                  {name}
                </p>
              </div>
            </div>
            <div className='w-[50%] lg:w-[70%] sm:w-auto text-right'>
              <p className='font-bold text-xs sm:text-sm text-secondary-7 '>
                USD{' '}
                {formatTotalPrice}
              </p>
              <p className='font-medium line-through text-sm'>
                USD{' '}
                {totalDiscountPrice}
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
    <section className='text-sm items-center border-primary-4 py-4'>
      <div className='flex w-full justify-between font-semibold'>
        <p>Subtotal</p>
        <p>
          USD{' '}
          {formatPrice(totalPriceOfCartItems)}
        </p>
      </div>
      <div className='flex w-full justify-between my-1 font-medium'>
        <p>Shipping</p>
        <p>Calculated at next step</p>
      </div>
      <div className='flex w-full justify-between font-medium'>
        <p>Taxes (estimated)</p>
        <p>
          USD {estimatedTaxes}
        </p>
      </div>
    </section>
  );
};

const Total = ({ total }) => {
  return (
    <div className='flex w-full justify-between font-semibold py-2 border-t-[1px]'>
      <p className=''>Total</p>
      <p className='text-lg text-secondary-8'>
        USD {total}
      </p>
    </div>
  );
};
