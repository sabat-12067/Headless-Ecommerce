import markDownToHtml from '../../../../components/details/markDownToHtml';
import ProductDetailsPage from '../../../../components/details';

//This page is the details/product page.

export default function Product({
  product,
  productId,
  specifications,
  description,
}) {
  //This is the information about the product that is being displayed.
  const singleProduct = product.attributes;

  return (
    <main>
      <ProductDetailsPage singleProduct={singleProduct} productId={productId} specifications={specifications} description={description} />
    </main>
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
    'https://asmn-shopping-cart.herokuapp.com/api/audioproducts?pagination[start]=0&pagination[limit]=100&populate=*'
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
