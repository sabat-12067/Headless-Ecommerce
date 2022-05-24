import BrandInfo from '../components/home/BrandInfo';
import FeaturedCollection from '../components/home/FeaturedCollection';
import Hero from '../components/home/Hero';
import Cart from '../components/Cart';
import { Fragment } from 'react';
import Head from 'next/head';

export default function Home({ products }) {
  //console.log(products);
  return (
    <Fragment>
     <Head>
    <title>Asuman Sounds</title>
    <meta name="description" content="Asuman Sounds is a store for high end earphones, headphones, speakers and audio accessories. Helping you find the best quality personal audio" />
    </Head>  
   <section>
     <div className='relative top-12 z-40'>
      <Cart />
     </div>
     <Hero /> 
     <BrandInfo />
     <FeaturedCollection products={products} />
   </section>
    </Fragment>
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
