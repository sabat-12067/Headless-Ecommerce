

const ProductsList = ({ productsData }) => {

  console.log('Data of products: ', productsData);

  const categoryName = productsData.attributes.name;

  return (
    <section>
      <h1 className="p-5">Products for the {categoryName} category</h1>
    </section>
  )
}

export default ProductsList