import { useState } from "react";

const Search = ({ setSearchedProducts, categoryName, searchResults }) => {
  const [isUserSearching, setIsUserSearching] = useState(false);
  const handleSearch = (e) => {
    const inputValue = e.target.value;
    setSearchedProducts(inputValue);
    if (inputValue.length > 0) {
    setIsUserSearching(true);
    } else {
    setIsUserSearching(false);
    }
  }

  const moreThanOneProduct =  searchResults.length > 1;
  const noProductsFound =  searchResults.length === 0;
  
  return (
    <section>
      <div>
        <input
          type='text'
          placeholder={`Search ${categoryName}`}
          onChange={handleSearch}
          className='p-3 rounded-md w-full border-none outline-none mt-8'
        />
      </div>
      {isUserSearching && (
        <p className="text-base pt-2 font-medium tracking-wider">
          { searchResults.length} item
          { moreThanOneProduct  && 's' ||
            ( noProductsFound && 's')}{' '}
          found
        </p>
      )}
    </section>
  );
};

export default Search;
