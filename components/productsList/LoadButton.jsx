import { useState, useEffect } from 'react';

const LoadButton = ({ setLastItemIndex, searchResults, lastItemIndex }) => {
 const [showLess, setShowLess] = useState(false);
 const numberOfProducts = searchResults.length;

 useEffect(() => {
   // if all the items in the array are displayed
   if (lastItemIndex >=  numberOfProducts) {
     setShowLess(true);
   }
   //if more items in the array can be displayed
   if (lastItemIndex <  numberOfProducts) {
     setShowLess(false);
   }
 }, [ numberOfProducts, lastItemIndex]);

 const handleLoadMore = () => {
   // Display the next 4 items each time the load more button is clicked
   setLastItemIndex(lastItemIndex + 4);
   // if all the items in the array are displayed
   if (showLess) {
     setLastItemIndex(4);
   }
 };
  return (
    <section className='flex justify-center'>
      <button
        className='rounded-sm bg-primary-11 py-2 px-8 mb-12 disabled:opacity-50'
        onClick={handleLoadMore}>
        {showLess ? 'Show less' : 'Load more'}
      </button>
    </section>
  );
};

export default LoadButton;
