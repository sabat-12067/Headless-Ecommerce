import markDownToHtml from '../../../../components/details/markDownToHtml';
import ProductDetailsPage from '../../../../components/details';
import YouMayAlsoLike from '../../../../components/YouMayAlsoLike';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

//This page is the details/product page.

export default function Product({
  product,
  productId,
  specifications,
  description,
  youMayAlsoLikeData,
}) {
  //This is the information about the product that is being displayed.
  const singleProduct = product.attributes;

  return (
    <main>
      <ProductDetailsPage
        singleProduct={singleProduct}
        productId={productId}
        specifications={specifications}
        description={description}
      />
      <YouMayAlsoLike youMayAlsoLikeData={youMayAlsoLikeData} />
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


  const categoryId = product.attributes.audiocategory.data.id;
  
  const client = new ApolloClient({
    uri: 'https://asmn-shopping-cart.herokuapp.com/graphql',
    cache: new InMemoryCache(),
  });

  //(id: ${productId})
  const { data } = await client.query({
    query: gql`
      query {
        audiocategory(id: ${categoryId}) {
          data {
      id 
      attributes {
        name
        image {
          data {
            attributes {
              url
            }
          }
        }
        audioproducts(pagination: { start: 0, limit: 7 }) {
          data {
            id
            attributes {
              name
              price
              percentageDiscount
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
        }
      }
    `,
  });

  const youMayAlsoLikeData = data.audiocategory.data;

  return {
    props: {
      product,
      productId,
      specifications,
      description,
      youMayAlsoLikeData,
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
