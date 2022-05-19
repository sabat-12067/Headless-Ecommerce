import { HiShoppingCart } from 'react-icons/hi';
import Link from 'next/link';

const listItems = ['categories', 'about', 'contact us'];

export default function DesktopNavigation({ toggleCart, totalQuantity }) {
  return (
    <nav className='hidden md:flex items-center w-screen justify-between py-2 px-6 text-[white] uppercase tracking-wider absolute bg-primary-9'>
      <div className='font-["Arima_Madurai"] font-bold lg:text-base md:text-sm md:w-2 hover:scale-105 duration-300 ease-linear'>
        <Link href='/'>Asuman Sounds</Link>
      </div>
      <div className='flex justify-between w-[70%]'>
        <ul className='flex justify-between items-center w-[50%]'>
          {listItems.map((listItem, index) => {
            return (
              <li
                key={index}
                className='lg:text-xs md:text-[10px] font-semibold hover:translate-x-2 duration-300 ease-linear'>
                <Link href={`/${listItem.split(' ').join('')}`}>
                  {listItem}
                </Link>
              </li>
            );
          })}
        </ul>
        {/**Cart icon container */}
        <div className='relative flex' onClick={toggleCart}>
          <HiShoppingCart className='w-8 h-8 md:h-9 md:w-9 cursor-pointer hover:scale-105 duration-300 ease-linear self-center' />
          {totalQuantity >= 1 ? (
            <p className='absolute pt-[1px] bg-secondary-8 text-xs top-2 right-0 w-5 h-5 rounded-[50%] flex items-center justify-center font-bold cursor-pointer'>
              {totalQuantity}
            </p>
          ) : null}
        </div>
        {/**Sign-up and login buttons */}
        <div className='flex items-center'>
          <Button action={'sign-up'} />
          <Button action={'login'} />
        </div>
      </div>
    </nav>
  );
}

const Button = ({ action }) => {
  return (
    <button className='py-2.5 px-5 capitalize text-xs ml-4 font-semibold'>
      {action}
    </button>
  );
};
