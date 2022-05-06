import BrandInfo from '../components/home/BrandInfo';
import FeaturedCollection from '../components/home/FeaturedCollection';
import Hero from '../components/home/Hero';

export default function Home({ products }) {
  //console.log(products);
  return (
   <section>
     <Hero /> 
     <BrandInfo />
     <FeaturedCollection products={products} />
   </section>
  )
}

export async function getStaticProps() {
  const response = await fetch(
    'https://asmn-shopping-cart.herokuapp.com/api/shopping-carts?populate=*'
  );
const productsData = await response.json();
const products = productsData.data;
  //console.log(products);

return {
  props: {
    products
  },
};
}
