
//This component is for the name of the product and the product prices

export default function ProductInfo({ singleProduct }) {

  const { price, name, discountPercentage } =
    singleProduct;

    let discountPrice =
      (price * 100) / (100 - discountPercentage);

      //convert to two decimal places
      discountPrice = Math.round((discountPrice * 100) / 100).toFixed(2)

  return (
    <section className='p-4 md:pt-8'>
      <h4 className='uppercase font-["Arima_Madurai"] text-xs text-left'>
        Asuman Sounds
      </h4>
      <h1 className='text-left md:pt-4'>{name}</h1>
      <div className='flex justify-between items-center py-5'>
        <p className='font-extrabold text-lg'>$ {price}</p>
        <p className='font-medium line-through text-sm text-primary-11 animate-zoomInOut'>
          $ {discountPrice}
        </p>
        <p className='font-bold bg-primary-4 px-2 rounded-sm text-primary-11'>
          - {discountPercentage}%
        </p>
      </div>
    </section>
  );
}
