import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';

const Alert = ({ alert, setAlert }) => {

  const { type, show, msg } = alert;

  // useEffect(() => {
  //   const alertTimeOut = setTimeout(() => {
  //     setAlert({ show: false });
  //   }, 3500);
  //   return () => clearTimeout(alertTimeOut);
  // });

  return (
    <div className='flex items-center'>
      <p
        className={` text-sm font-extrabold tracking-wide py-3 px-4 rounded-sm left-2 w-full mx-auto ${
          type === 'danger'
            ? 'text-dark-red bg-light-red border-dark-red border-[1px]'
            : 'text-dark-green bg-light-green border-[1px] border-dark-green'
        }`}>
        {msg}
      </p>
      <div
        className={`absolute right-3 text-2xl lg:cursor-pointer ${
          type === 'danger' ? 'text-dark-red' : 'text-dark-green'
        }`}
        onClick={() => setAlert({ show: false })}>
        <MdOutlineCancel />
      </div>
    </div>
  );
  
};

export default Alert;  

