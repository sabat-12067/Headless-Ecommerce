import { useState, useEffect } from 'react';

const LoadButton = ({ setLastItem, filteredProducts, lastItem }) => {
 const [showLess, setShowLess] = useState(false);

 useEffect(() => {
   // if all the items in the array are displayed
   if (lastItem >= filteredProducts.length) {
     setShowLess(true);
   }
   //if more items in the array can be displayed
   if (lastItem < filteredProducts.length) {
     setShowLess(false);
   }
 }, [filteredProducts.length, lastItem]);

 const handleLoadMore = () => {
   // Display the next 4 items each time the load more button is clicked
   setLastItem(lastItem + 4);
   // if all the items in the array are displayed
   if (showLess) {
     setLastItem(4);
   }
 };
  return (
    <section>
      <button
        className='rounded-sm bg-primary-1 py-2 px-8 mt-6 disabled:opacity-50'
        onClick={handleLoadMore}>
        {showLess ? 'Show less' : 'Load more'}
      </button>
    </section>
  );
};

export default LoadButton;
