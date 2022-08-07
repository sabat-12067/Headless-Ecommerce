import { HiShoppingCart } from 'react-icons/hi';
import { IoMdHeadset } from 'react-icons/io';
import { MdHeadset, MdFavorite } from 'react-icons/md';
import { BsMusicPlayerFill, BsFillSpeakerFill } from 'react-icons/bs';
import { BiLogIn } from 'react-icons/bi';
import { FaSignOutAlt, FaHome } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
//This is a component for the mobile navigation

const listItems = [
  { text: 'sign in', icon: <BiLogIn />, path: '/auth/login' },
  { text: 'home', icon: <FaHome />, path: '/' },
  { text: 'headsets', icon: <IoMdHeadset />, path: '/products/category/3' },
  {
    text: 'speakers',
    icon: <BsFillSpeakerFill />,
    path: '/products/category/1',
  },
  {
    text: 'home theaters',
    icon: <BsMusicPlayerFill />,
    path: '/products/category/2',
  },
  { text: 'headphones', icon: <MdHeadset />, path: '/products/category/4' },
  { text: 'favorites', icon: <MdFavorite />, path: '/products/favorites' },
];

function MobileNavigation({ toggleCart, totalQuantity }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  return (
    <nav className='md:hidden w-screen flex overflow-hidden absolute shadow-lg'>
      <StaticNavigation
        setIsMobileNavOpen={setIsMobileNavOpen}
        isMobileNavOpen={isMobileNavOpen}
        totalQuantity={totalQuantity}
        toggleCart={toggleCart}
      />
      <ToggledNavigation
        isMobileNavOpen={isMobileNavOpen}
        setIsMobileNavOpen={setIsMobileNavOpen}
      />
    </nav>
  );
}

const StaticNavigation = ({
  setIsMobileNavOpen,
  isMobileNavOpen,
  totalQuantity,
  toggleCart,
}) => {
  return (
    <div className=' font-["Arima_Madurai"] font-bold text-lg flex justify-between w-full items-center p-4 pr-2 bg-white relative z-20'>
      <Link href='/'>Asuman Sounds</Link>
      <div className='relative flex' onClick={toggleCart}>
        <HiShoppingCart className='w-8 h-8' />
        {totalQuantity >= 1 ? (
          <p className='absolute pt-[3px] bg-secondary-8 text-xs top-2 right-0 w-4 h-4 rounded-[50%] flex items-center justify-center font-bold'>
            {totalQuantity}
          </p>
        ) : null}
      </div>
      <HamurgerMenu
        isMobileNavOpen={isMobileNavOpen}
        setIsMobileNavOpen={setIsMobileNavOpen}
      />
    </div>
  );
};

const ToggledNavigation = ({ isMobileNavOpen, setIsMobileNavOpen }) => {
  const router = useRouter();

  return (
    <div
      className=' bg-primary-10 fixed h-screen right-0 left-[102%] top-0 p-4 leading-[4rem] z-10 duration-300 ease-in-out opacity-90'
      style={{
        left: isMobileNavOpen ? '0' : '102%',
      }}>
      <ul className='pt-[5rem] uppercase font-bold tracking-wider '>
        {listItems.map((listItem, index) => {
          const { icon, text, path } = listItem;
          const handleClick = () => {
            router.push(`/${path}`);
            setIsMobileNavOpen(!isMobileNavOpen);
          };
          return (
            <li
              key={index}
              className='border-b-[1px] flex items-center text-white'
              onClick={handleClick}>
              <div className='mr-3 text-[1.5rem]'>{icon}</div>
              <p>{text}</p>
            </li>
          );
        })}
        <li className='mt-[4rem] flex items-center text-white'>
          <Link href='/login'>Sign Out</Link>
          <FaSignOutAlt className='ml-2' />
        </li>
      </ul>
    </div>
  );
};

const HamurgerMenu = ({ isMobileNavOpen, setIsMobileNavOpen }) => {
  return (
    <div
      className='flex flex-col items-end overflow-hidden mr-3 '
      onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
      <div
        className={`bg-primary-11 h-[2.8px] w-8 duration-500 ease-in-out ${
          isMobileNavOpen ? 'rotate-45 absolute top-8' : ''
        }`}></div>
      <div
        className={`bg-primary-11 h-[2.8px] w-5 mt-2 mb-2 ${
          isMobileNavOpen ? 'hidden' : ''
        }`}></div>
      <div
        className={`bg-primary-11 h-[2.8px] w-8 duration-300 ease-in-out ${
          isMobileNavOpen ? 'rotate-[-45deg] absolute top-8' : ''
        }`}></div>
    </div>
  );
};

export default MobileNavigation;
