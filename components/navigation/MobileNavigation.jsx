
import { HiShoppingCart } from 'react-icons/hi';
import { IoMdContact} from 'react-icons/io';
import { SiAboutdotme } from 'react-icons/si';
import { BiCategoryAlt, BiLogIn } from 'react-icons/bi';
import { FaSignOutAlt, FaShippingFast, FaHome } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';

//This is a component for the mobile navigation

const listItems = [
  { text: 'sign in', icon: <BiLogIn /> },
  { text: 'home', icon: <FaHome /> },
  { text: 'categories', icon: <BiCategoryAlt /> },
  { text: 'about', icon: <SiAboutdotme /> },
  { text: 'contact us', icon: <IoMdContact /> },
  { text: 'shipping', icon: <FaShippingFast /> },
];

function MobileNavigation({ totalQuantity, toggleCart }) {
  
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <nav className='md:hidden w-screen flex overflow-hidden absolute'>
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
    <div className='text-[white] font-["Arima_Madurai"] font-bold text-lg flex justify-between w-full items-center p-4 pr-2 bg-primary-9'>
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
  return (
    <div
      className=' bg-[#4b5563] fixed h-screen right-0 left-[102%] top-0 p-4 leading-[4rem] z-10 duration-500 ease-in-out'
      style={{
        left: isMobileNavOpen ? '25%' : '102%',
      }}>
      <HamurgerMenu
        isMobileNavOpen={isMobileNavOpen}
        setIsMobileNavOpen={setIsMobileNavOpen}
      />
      <ul className='pt-[5rem] text-[white] uppercase font-bold tracking-wider '>
        {listItems.map((listItem, index) => {
          const { icon, text } = listItem;
          const linkTo = text === 'home' ? '/' : `/${text.split(' ').join('')}`;
          return (
            <li
              key={index}
              className='border-b-[1px] border-b-[white] flex items-center '>
              <div className='mr-3 text-[1.5rem]'>{icon}</div>
              <Link href={linkTo}>{text}</Link>
            </li>
          );
        })}
        <li className='mt-[4rem] flex items-center'>
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
        className={`bg-[white] h-[2.8px] w-8 duration-500 ease-in-out ${
          isMobileNavOpen ? 'rotate-45 absolute top-8' : ''
        }`}></div>
      <div
        className={`bg-[white] h-[2.8px] w-5 mt-2 mb-2 ${
          isMobileNavOpen ? 'hidden' : ''
        }`}></div>
      <div
        className={`bg-[white] h-[2.8px] w-8 duration-500 ease-in-out ${
          isMobileNavOpen ? 'rotate-[-45deg] absolute top-8' : ''
        }`}></div>
    </div>
  );
};

export default MobileNavigation;
