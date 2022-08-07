

const Search = ({ setSearchedProducts, categoryName }) => {
  return (
    <section>
      <div>
        <input
          type='text'
          placeholder={`Search ${categoryName}`}
          onChange={(e) => setSearchedProducts(e.target.value)}
          className='p-3 rounded-md w-full border-none outline-none mt-16'
        />
      </div>
    </section>
  );
};

export default Search;
