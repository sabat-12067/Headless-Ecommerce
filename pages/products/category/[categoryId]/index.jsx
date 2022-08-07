import ProductsList from '../../../../components/productsList';
import Cart from '../../../../components/cart';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export default function ProductsListPage({ productsData }) {
  return (
    <main>
      <div className='pt-16'>
        <Cart />
      </div>
      <ProductsList productsData={productsData}/>
    </main>
  );
}

export const getStaticProps = async (context) => {
  //The id of the product displayed on the product/details page.
  const categoryId = context.params.categoryId;

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
        audioproducts(pagination: { start: 0, limit: 300 }) {
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

  const productsData = data.audiocategory.data;

  return {
    props: {
      productsData,
    },
  };
};

export const getStaticPaths = async () => {
  const client = new ApolloClient({
    uri: 'https://asmn-shopping-cart.herokuapp.com/graphql',
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query {
        audiocategories(pagination: { start: 0, limit: 300 }) {
          data {
            id
          }
        }
      }
    `,
  });

  const productsData = data.audiocategories.data;

  const paths = productsData.map((product) => {
    return { params: { categoryId: product.id } };
  });

  return {
    paths,
    fallback: false,
  };
};
