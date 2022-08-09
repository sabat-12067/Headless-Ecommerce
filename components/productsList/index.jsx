import { useState } from 'react';
import HeaderImage from './HeaderImage';
import Productslist from './Productslist';
import Search from './Search';
import Sort from './Sort';
import LoadButton from './LoadButton';

const ProductsList = ({ productsData }) => {
  const [searchedProducts, setSearchedProducts] = useState('');
  const [sortHighToLow, setSortHighToLow] = useState(false);
  const [sortLowToHigh, setSortLowToHigh] = useState(false);
  const categoryName = productsData.attributes.name;
  const [lastItemIndex, setLastItemIndex] = useState(4);

  const productsListData = productsData.attributes.audioproducts.data;

  //filter products by name
  const filteredProducts = productsListData.filter((productsList) => {
    if (searchedProducts === '') {
      return productsList;
    } else {
      return productsList.attributes.name
        .toLowerCase()
        .includes(searchedProducts.toLocaleLowerCase());
    }
  });

  if (sortHighToLow) {
    // sort products by price high to low
    filteredProducts.sort((a, b) => b.attributes.price - a.attributes.price);
  }

  if (sortLowToHigh) {
    // sort products by price low to high
    filteredProducts.sort((a, b) => a.attributes.price - b.attributes.price);
  }

  // Get a given number of the first items from the filteredProducts array
  const dispalyedProducts = filteredProducts.slice(0, lastItemIndex);

  return (
    <section>
      <HeaderImage productsData={productsData} />
      <div className='max-w-6xl lg:mx-auto px-4'>
        <Search
          setSearchedProducts={setSearchedProducts}
          categoryName={categoryName}
          filteredProducts={filteredProducts}
        />
        <Sort
          setSortHighToLow={setSortHighToLow}
          setSortLowToHigh={setSortLowToHigh}
          sortLowToHigh={sortLowToHigh}
          sortHighToLow={sortHighToLow}
        />
        {filteredProducts.length > 0 ? (
          <Productslist products={dispalyedProducts} />
        ) : (
          <NotFound />
        )}
        <LoadButton
          setLastItemIndex={setLastItemIndex}
          filteredProducts={filteredProducts}
          lastItemIndex={lastItemIndex}
        />
      </div>
    </section>
  );
};

const NotFound = () => {
  return (
    <section className='my-8 bg-light-red text-dark-red max-w-lg mx-auto'>
      <h3 className='py-16'>no items found!!!</h3>
    </section>
  );
};

export default ProductsList;
