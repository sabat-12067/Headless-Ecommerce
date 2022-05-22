import BrandInfo from '../components/home/BrandInfo';
import FeaturedCollection from '../components/home/FeaturedCollection';
import Hero from '../components/home/Hero';
import Cart from '../components/Cart';

export default function Home({ products }) {
  //console.log(products);
  return (
   <section>
     <div className='relative top-12 z-40'>
      <Cart />
     </div>
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
