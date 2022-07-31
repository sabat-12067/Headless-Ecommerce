import { formatPrice } from "../../../HorLine";

const ProductInfo = ({ buyItNowItem }) => {
  const { name, price, imageThumbnail, discountPercentage, quantity } =
    buyItNowItem;

  let discountPrice = (price * 100) / (100 - discountPercentage);
  discountPrice = formatPrice(discountPrice);

  return (
    <div className='flex justify-between items-center border-white py-4 relative'>
      <div className='flex items-center'>
        <img
          src={imageThumbnail}
          alt={`Thumbnail of ${name}`}
          className='rounded-lg w-20 h-20'
        />
        <p className='absolute text-white w-5 h-5 text-xs rounded-[50%] text-center flex items-center justify-center top-[6px] font-bold left-[70px] bg-secondary-7'>
          {quantity}
        </p>
        <div className='p-2 pl-4 w-[70%] sm:w-full'>
          <p className='font-bold text-xs sm:text-sm'>{name}</p>
        </div>
      </div>
      <div className='w-[50%] sm:w-auto text-right'>
        <p className='font-bold text-xs sm:text-sm'>${price}</p>
        <p className='font-medium line-through text-sm'>${discountPrice}</p>
      </div>
    </div>
  );
};

export default ProductInfo;