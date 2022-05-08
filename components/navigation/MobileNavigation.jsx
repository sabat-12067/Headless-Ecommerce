
import { HiShoppingCart } from 'react-icons/hi';
import { IoMdContact} from 'react-icons/io';
import { SiAboutdotme } from 'react-icons/si';
import { BiCategoryAlt, BiLogIn } from 'react-icons/bi';
import { FaSignOutAlt, FaShippingFast, FaHome } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';

import { cartActions } from '../../store/cartSlice';
import { useSelector, useDispatch } from 'react-redux';

//This is a component for the mobile navigation

const listItems = [
  { text: 'sign in', icon: <BiLogIn /> },
  { text: 'home', icon: <FaHome /> },
  { text: 'categories', icon: <BiCategoryAlt /> },
  { text: 'about', icon: <SiAboutdotme /> },
  { text: 'contact us', icon: <IoMdContact /> },
  { text: 'shipping', icon: <FaShippingFast /> },
];

function MobileNavigation({ quantity }) {
  
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <nav className='w-screen flex overflow-hidden absolute'>
      <StaticNavigation
        setIsMobileNavOpen={setIsMobileNavOpen}
        isMobileNavOpen={isMobileNavOpen}
        quantity={quantity}
      />
      <ToggledNavigation
        isMobileNavOpen={isMobileNavOpen}
        setIsMobileNavOpen={setIsMobileNavOpen}
      />
    </nav>
  );
}

const StaticNavigation = ({ setIsMobileNavOpen, isMobileNavOpen, quantity }) => {

  const dispatch = useDispatch();

  const toggleCart = () => {
    dispatch(cartActions.setShowCart());
  };

  return (
    <div className='text-[white] font-["Arima_Madurai"] font-bold text-lg flex justify-between w-full items-center p-4 pr-2 bg-primary-9'>
      <Link href='/'>Asuman&#39;s Supermarket</Link>
      <div className='relative flex' onClick={toggleCart}>
        <HiShoppingCart className='w-8 h-8' />
        {quantity >= 1 ? (
          <p className='absolute bg-secondary-8 text-xs px-1 py-0.5 items-center top-2 right-1 rounded-lg font-bold'>
            {quantity}
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
          return (
            <li
              key={index}
              className='border-b-[1px] border-b-[white] flex items-center '>
              <div className='mr-3 text-[1.5rem]'>{icon}</div>
              <Link href={`/${text.split(' ').join('')}`}>{text}</Link>
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
