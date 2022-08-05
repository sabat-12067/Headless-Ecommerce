import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';

const FavoritesButton = () => {
  return (
    <div>
     <MdOutlineFavoriteBorder className='w-6 h-6 font-bold lg:cursor-pointer' />
     <MdOutlineFavorite className='w-6 h-6 font-bold lg:cursor-pointer' />
    </div>
  )
}

export default FavoritesButton