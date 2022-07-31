import Carousel from '../../../components/details/Carousel';
import ProductInfo from '../../../components/details/ProductInfo';
import Buttons from '../../../components/details/Buttons';
import Description from '../../../components/details/Description';
import Cart from '../../../components/cart';
import markDownToHtml from '../../../components/details/markDownToHtml';

//This page is the details/product page. It is displayed when customer clicks a product in the home page.

export default function Product({
  product,
  productId,
  specifications,
  description,
}) {
  //This is the information about the product that is being displayed.
  const singleProduct = product.attributes;

  return (
    <section className='pt-[56px]'>
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

export async function getStaticProps(context) {
  //The id of the product displayed on the product/details page.
  const productId = context.params.productId;
  const response = await fetch(
    `https://asmn-shopping-cart.herokuapp.com/api/audioproducts/${productId}?populate=*`
  );
  const productData = await response.json();
  const product = productData.data;

  //description of the product converted from markdown to html
  const description = await markDownToHtml(product.attributes.descriptions);
  //specifications of the product converted to html
  const specifications = await markDownToHtml(product.attributes.specifications);

  return {
    props: {
      product,
      productId,
      specifications,
      description,
    },
  };
}

export async function getStaticPaths() {
  const response = await fetch(
    'https://asmn-shopping-cart.herokuapp.com/api/audioproducts?populate=*'
  );

  const productsData = await response.json();

  const paths = productsData.data.map((product) => {
    return { params: { productId: product.id.toString() } };
  });

  return {
    paths,
    fallback: false,
  };
}
