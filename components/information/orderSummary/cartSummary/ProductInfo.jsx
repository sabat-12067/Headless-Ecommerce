import { formatPrice } from "../../../HorLine";

const ProductInfo = ({ cartItems }) => {
  return (
    <div>
      {cartItems.map((cartItem, index) => {
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
              <p className='absolute text-white w-5 h-5 text-xs rounded-[50%] top-0 text-center flex items-center justify-center font-bold left-[70px] bg-secondary-7'>
                {quantity}
              </p>
              <div className='p-2 pl-4 w-[70%] sm:w-full'>
                <p className='font-bold text-xs sm:text-sm text-white'>
                  {name}
                </p>
              </div>
            </div>
            <div className='w-[50%] lg:w-[70%] sm:w-auto text-right'>
              <p className='font-bold text-xs sm:text-sm'>
                ${formatTotalPrice}
              </p>
              <p className='font-medium line-through text-sm'>
                ${totalDiscountPrice}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductInfo;