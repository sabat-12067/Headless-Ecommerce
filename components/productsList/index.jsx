import { formatprice } from '../HorLine';

const ProductsList = ({ productsData }) => {
  return (
    <section>
      <HeaderImage productsData={productsData} />
      <Productslist productsData={productsData} />
    </section>
  );
};

const HeaderImage = ({ productsData }) => {
  const categoryName = productsData.attributes.name;
  const imageUrl = productsData.attributes.image.data[0].attributes.url;
  return (
    <div className=' flex items-cente justify-center relative bg-white'>
      <div>
        <img src={imageUrl} alt={`Image of ${categoryName}`} />
      </div>
      <h1 className='absolute left-5 top-16'>{categoryName}</h1>
    </div>
  );
};

const Productslist = ({ productsData }) => {
  const productsListData = productsData.attributes.audioproducts.data;
  return (
    <div>
      {productsListData.map((product) => {
        const productId = product.id;
        const name = product.attributes.name;
        const price = product.attributes.price;
        const imageUrl = product.attributes.image.data[0].attributes.url;
        const percentageDiscount = product.attributes.percentageDiscount;
        let originalPrice
         = (price * 100) / (100 - percentageDiscount);
        originalPrice = formatprice(originalPrice);

        return (
          <div key={productId}>
            <div>
              <img src={imageUrl} alt={`Image of ${name}`} />
              <p>{percentageDiscount}</p>
            </div>
            <h3>{name}</h3>
            <div>
              <p>{price}</p>
              <p>{originalPrice}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;
