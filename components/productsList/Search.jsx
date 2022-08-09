import { useState } from "react";

const Search = ({ setSearchedProducts, categoryName, filteredProducts }) => {
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
          {filteredProducts.length} item
          {filteredProducts.length > 1 && 's' ||
            (filteredProducts.length === 0 && 's')}{' '}
          found
        </p>
      )}
    </section>
  );
};

export default Search;
