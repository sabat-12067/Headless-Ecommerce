import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';

const Alert = ({ alert, setAlert }) => {

  const { type, show, msg } = alert;

  // useEffect(() => {
  //   const alertTimeOut = setTimeout(() => {
  //     setAlert({ show: false });
  //   }, 3500);
  //       console.log('msg has changed');
  //   return () => clearTimeout(alertTimeOut);
  // });

  return (
    <div className='flex items-center'>
      <p
        className={` text-sm font-meduim tracking-wide py-3 px-4 rounded-sm left-2 w-full mx-auto ${
          type === 'danger'
            ? 'text-red bg-light-red border-red border-[1px]'
            : 'text-green bg-light-green border-[1px] border-green'
        }`}>
        {msg}
      </p>
      <div
        className={`absolute right-3 text-2xl ${
          type === 'danger' ? 'text-red' : 'text-green'
        }`}
        onClick={() => setAlert({ show: false })}>
        <MdOutlineCancel />
      </div>
    </div>
  );
  
};

export default Alert;  

