import Cart from '../cart';
import Carousel from './Carousel';
import ProductInfo from './ProductInfo';
import Buttons from './Buttons';
import Description from './Description';

const ProductDetailsPage = ({ singleProduct, productId, specifications, description }) => {
  return (
    <section className='pt-[56px] md:pt-[75px]'>
      <Cart />
      <div className='md:flex max-w-6xl mx-auto'>
        <Carousel singleProduct={singleProduct} />
        <div className='w-full'>
          <ProductInfo singleProduct={singleProduct} />
          <Buttons singleProduct={singleProduct} productId={productId} />
          <Description
            specifications={specifications}
            description={description}
          />
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage