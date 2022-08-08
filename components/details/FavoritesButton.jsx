import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { formatprice } from '../HorLine';

const FavoritesButton = ({ singleProduct, productId, setAlert }) => {

 const { name, image, price, percentageDiscount } = singleProduct;

 let discountPrice = (price * 100) / (100 - percentageDiscount);
 discountPrice = formatprice(discountPrice);
 
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoriteItems = localStorage.getItem('favoriteItems')
      ? JSON.parse(localStorage.getItem('favoriteItems'))
      : [];
    const existingFavoriteItem = favoriteItems.find(
      (favorite) => favorite.id === productId
    );
    if (existingFavoriteItem) {
      setIsFavorite(true);
    }
  // eslint-disable-next-line 
  }, []);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);

   const favoriteItems = localStorage.getItem('favoriteItems') ? JSON.parse(localStorage.getItem('favoriteItems')) : [];

   //check if the item is already in the favoriteItems array
   const existingFavoriteItem = favoriteItems.find((favoriteItem) => favoriteItem.id === productId);

   if (existingFavoriteItem) {
    // remove item if it exists
    const newFavoriteItems = favoriteItems.filter((favoriteItem) => favoriteItem.id !== productId);

    // update local storage with new favorite items array
    localStorage.setItem('favoriteItems', JSON.stringify(newFavoriteItems));

   } else {
    // add favorite item if it doesn't exist
    favoriteItems.push({
     id: productId,
     name,
     imageUrl: image.data[0].attributes.url,
     price,
     discountPrice,
     percentageDiscount,
     isFavorite: true,
    });

    // update local storage with new favorite items array
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
   }

    if (isFavorite) {
      setAlert({
        type: 'success',
        show: true,
        msg: 'Item removed from favorites',
      });
    } else {
      setAlert({
        type: 'success',
        show: true,
        msg: 'Item added to favorites',
      });
    }

  }
 
  return (
    <div onClick={handleFavorite} className='self-end'>
      { !isFavorite ? (<MdOutlineFavoriteBorder className='w-10 h-10 font-bold lg:cursor-pointer text-secondary-7' />) : 
      (<MdOutlineFavorite className='w-10 h-10 font-bold lg:cursor-pointer text-secondary-7' />) }
    </div>
  );
};

export default FavoritesButton