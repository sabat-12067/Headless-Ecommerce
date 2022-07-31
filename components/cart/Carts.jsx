import Emptycart from "./EmptyCart";
import CartWithItems from "./CartWithItems";
import { useState } from "react";

const Carts = () => {
 // fetch the cart items from local storage
  const getCartItems = () => {
    const myCartItems = JSON.parse(localStorage.getItem('cartItems'));
    return myCartItems;
  };

  // then store the cart items to the cartItems variable so they can be displayed
  const [cartItems, setCartItems] = useState(getCartItems());

  const numberOfCartItems = cartItems.length; 

  return (
   // if the cart is empty, display the empty cart or else display the cart with items
    <>
      {numberOfCartItems <= 0 ? (
        <Emptycart />
      ) : (
        <CartWithItems
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      )}
    </>
  );
};

export default Carts;