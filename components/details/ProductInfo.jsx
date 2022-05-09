
//This component is for the name of the product and the product prices

export default function ProductInfo({ singleProduct }) {

  const { price, name, discountPrice, discountPercentage } =
    singleProduct;

  return (
    <section className='p-4 md:pt-8'>
      <h4 className='uppercase font-["Arima_Madurai"] text-xs text-left'>
        Asuman&#39;s Supermarket
      </h4>
      <h1 className='text-left md:pt-4'>{name}</h1>
      <div className='flex justify-between items-center py-5'>
        <p className='font-extrabold text-lg'>{price}</p>
        <p className='font-medium line-through text-sm text-secondary-7 animate-zoomInOut'>
          {discountPrice}
        </p>
        <p className='font-bold bg-secondary-3 px-2 rounded-sm text-secondary-7'>
          - {discountPercentage}
        </p>
      </div>
    </section>
  );
}
