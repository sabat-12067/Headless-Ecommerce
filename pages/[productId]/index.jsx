import { useRouter } from 'next/router';
import Carousel from '../../components/details/Carousel';
import ProductInfo from '../../components/details/ProductInfo';
import Buttons from '../../components/details/Buttons';
import Description from '../../components/details/Description';
import Cart from '../../components/Cart';

//This page is the details page. It is displayed when customer clicks a product in the home page.

export default function Product({ product, productId }) {
  const singleProduct = product.attributes;

  return (
    <section className='pt-[56px]'>
      <Cart />
      <div className='md:flex max-w-6xl mx-auto'>
      <Carousel singleProduct={singleProduct} />
      <div className='w-full'>
        <ProductInfo singleProduct={singleProduct} />
        <Buttons singleProduct={singleProduct} productId={productId} />
        <Description singleProduct={singleProduct} />
      </div>
      </div>
    </section>
  );
}

export async function getStaticProps(context) {
  const productId = context.params.productId;

  //console.log(productId);
  const response = await fetch(
    `https://asmn-shopping-cart.herokuapp.com/api/shopping-carts/${productId}?populate=*`
  );
  const productData = await response.json();
  const product = productData.data;

  return {
    props: {
      product,
      productId,
    },
  };
}

export async function getStaticPaths() {
  const response = await fetch(
    'https://asmn-shopping-cart.herokuapp.com/api/shopping-carts?populate=*'
  );

  const productsData = await response.json();

  const paths = productsData.data.map((product) => {
    //console.log(product);
    return { params: { productId: product.id.toString() } };
  });

  return {
    paths,
    fallback: false,
  };
}
