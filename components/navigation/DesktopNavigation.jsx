import { HiShoppingCart } from 'react-icons/hi';
import Link from 'next/link';

const listItems = ['categories', 'about', 'contact us'];

export default function DesktopNavigation() {
  return (
    <nav className='flex items-center w-screen justify-between p-6 text-[white] uppercase tracking-wider absolute'>
      <div className='font-["Arima_Madurai"] font-bold lg:text-lg md:text-sm md:w-2 hover:scale-105 duration-300 ease-linear '>
        <Link href='/'>Asuman's Supermarket</Link>
      </div>
      <div className='flex justify-between w-[70%]'>
        <ul className='flex justify-between items-center w-[50%]'>
          {listItems.map((listItem, index) => {
            return (
              <li
                key={index}
                className='lg:text-[1rem] md:text-[10px] font-semibold hover:translate-x-2 duration-300 ease-linear'>
                <Link href={`/${listItem.split(' ').join('')}`}>
                  {listItem}
                </Link>
              </li>
            );
          })}
        </ul>
        <HiShoppingCart className='w-8 h-8 md:h-6 md:w-6 cursor-pointer hover:scale-105 duration-300 ease-linear self-center' />
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
    <button className='py-3  md:py-1 md:px-5 capitalize lg:text-[1rem] md:text-[10px] ml-4 font-semibold'>
      {action}
    </button>
  );
};
