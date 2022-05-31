import { useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import Link from 'next/link';

//This file contains Re-Usable components for the app

const HorLine = () => {
  return (
    <div className='md:absolute top-2 flex items-center justify-center left-0 w-full'>
      <hr className='w-28 md:w-44 m-8' />
    </div>
  );
};

//convert price to two decimal places
export const formatprice = (price) => {
  return ((price * 100) / 100).toFixed(2);
};

//convert price to string with commas
export const formatpriceWithCommas = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

//convert price to string with commas and two decimal places
export const formatPrice = (price) => {
  return ((price * 100) / 100)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const Alert = ({ setShowAlert, msg }) => {
  //clear alert after 3 secs
  useEffect(() => {
    const alertTimeOut = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    //clean up function
    return () => clearTimeout(alertTimeOut);
  });

  return (
    <div className='flex items-center justify-center fixed top-0 left-0 w-full bg-secondary-3'>
      <p className='text-center font-bold text-secondary-8 w-full py-2 text-sm tracking-wide'>
        {msg}
      </p>
      <ImCross className='mr-5' onClick={() => setShowAlert(false)} />
    </div>
  );
};

export const Navigation = ({ path, pathName }) => {
  return (
    <div className='my-3 flex items-center flex-col'>
      <div className='flex py-2'>
        <MdKeyboardArrowLeft className='w-5 h-5' />
        <p className='ml-1 text-sm text-center '>
          <Link href={path}>{pathName}</Link>
        </p>
      </div>
    </div>
  );
};

export const Button = ({ text, onClick, type, disabled }) => {
  return (
    <button
      className='bg-primary-11 py-4 px-12 text-lg font-bold text-[white] w-full mt-6 disabled:opacity-50 uppercase rounded-none tracking-wider'
      onClick={onClick}
      type={type}
      disabled={disabled}>
      {text}
    </button>
  );
};

export default HorLine;
