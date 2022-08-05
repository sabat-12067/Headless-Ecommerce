import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import { useState } from 'react';

const FavoritesButton = ({ singleProduct, productId, setAlert }) => {
 
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  }
 

  return (
    <div onClick={handleFavorite} className='self-end'>
      { !isFavorite ? (<MdOutlineFavoriteBorder className='w-10 h-10 font-bold lg:cursor-pointer text-secondary-7' />) : 
      (<MdOutlineFavorite className='w-10 h-10 font-bold lg:cursor-pointer text-secondary-7' />) }
    </div>
  );
};

export default FavoritesButton