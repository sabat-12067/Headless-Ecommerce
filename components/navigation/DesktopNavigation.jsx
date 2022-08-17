import { HiShoppingCart } from 'react-icons/hi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function DesktopNavigation({ toggleCart, totalQuantity }) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <nav
      className={`hidden px-6 md:flex w-screen text-white ${
        isHomePage ? 'text-white' : 'text-primary-11'
      }`}>
      <div className='flex justify-between items-center w-full md:py-2 lg:py-4 border-b-[1px]'>
        <div className='font-["Arima_Madurai"] font-bold hover:scale-105 duration-300 ease-linear text-2xl'>
          <Link href='/'>asuman sounds</Link>
        </div>
        <div className='flex items-center'>
          <Link href='/products/favorites' passHref>
            <h3 className='uppercase text-xs lg:text-sm xl:text-base mr-8 hover:translate-x-1 duration-300 ease-linear cursor-pointer'>
              favorites
            </h3>
          </Link>
          <Categories />
          {/**Cart icon container */}
          <div className='relative flex' onClick={toggleCart}>
            <HiShoppingCart className='md:ml-4 lg:ml-6 w-8 h-8 md:h-9 md:w-9 cursor-pointer hover:scale-105 duration-300 ease-linear self-center' />
            {totalQuantity >= 1 ? (
              <p className='absolute pt-[1px] bg-secondary-8 text-xs top-2 right-0 w-5 h-5 rounded-[50%] flex items-center justify-center font-bold cursor-pointer'>
                {totalQuantity}
              </p>
            ) : null}
          </div>
          {/**Sign-up and login buttons */}
          <div className='flex items-center'>
            <Button action={'signup'} path='auth/signup' />
            <Button action={'login'} path='auth/login' />
            <SignOutButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

const Categories = () => {
  const [showCategories, setShowCategories] = useState(false);

  const listItems = [
    { text: 'headsets', path: '/products/category/3' },
    { text: 'speakers', path: '/products/category/1' },
    { text: 'home theaters', path: '/products/category/2' },
    { text: 'headphones', path: '/products/category/4' },
  ];

  const displayCategories = () => {
    setShowCategories(true);
  };

  const hideCategories = () => {
    setShowCategories(false);
  };

  return (
    <div
      className='relative lg:mr-8'
      onMouseEnter={displayCategories}
      onMouseLeave={hideCategories}>
      <h3 className='uppercase text-xs lg:text-sm xl:text-base cursor-pointer'>
        categories
      </h3>
      {showCategories ? (
        <ul className='absolute justify-between items-center bg-primary-13 rounded-md shadow-2xl text-primary-10 pl-3 pb-4 text-xs lg:text-sm w-36'>
          {listItems.map((listItem, index) => {
            const { text, path } = listItem;
            return (
              <li
                key={index}
                className='capitalize font-semibold mt-3 tracking-wider hover:text-secondary-7 duration-200 ease-linear'>
                <Link href={path}>{text}</Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <ul></ul>
      )}
    </div>
  );
};

const Button = ({ action, path }) => {
  const router = useRouter();
  return (
    <button
      className='py-2.5 px-5 capitalize bg-primary-11 text-xs lg:text-sm xl:text-base ml-4 font-semibold'
      onClick={() => router.push(`/${path}`)}>
      {action}
    </button>
  );
};

const SignOutButton = () => {
  const router = useRouter();
   function handleSignOut() {
     localStorage.removeItem('token');
     router.push('/');
   }
  return (
      <button
        className='py-2.5 px-5 capitalize bg-primary-11 text-xs lg:text-sm xl:text-base ml-4 font-semibold'
        onClick={handleSignOut}>
        signout
      </button>
  );
};
