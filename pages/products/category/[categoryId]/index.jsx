import Menu from "../../../../components/productsList";
import Cart from "../../../../components/Cart";

export default function ProductsListPage() {

 return (
  <main>
    <div className="pt-16">
    <Cart />
    </div>
    <Menu />
  </main>
 )
}