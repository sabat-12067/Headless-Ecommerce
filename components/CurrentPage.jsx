import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

//This component highlights the pages that are currently being viewed. It is used to show the user where they are in the checkout process.

export const CurrentPage = ({ highlightColor, bgColor }) => {
 const [highlightShipping, setHightlightShipping] = useState(false);
 const [highLightAddress, setHighLightAddress] = useState(false);
 const [highLightPayment, setHighLightPayment] = useState(false);
 const [highLightReview, setHighLightReview] = useState(false);

   const router = useRouter();

   //Styles for highlighting the current page
   const numberStyles = 'bg-primary-11 text-white border-none' //Highlight the number
   const checkOutStepStyles = 'text-secondary-7' //Highlight name of the check out step
   
   useEffect(() => {
    if (router.pathname === '/information/address') {
     //Highlight only the address text when the user is on the address page
       setHighLightAddress(true);
       setHighLightPayment(false);
       setHightlightShipping(false);
       setHighLightReview(false);
    } else if (router.pathname === '/information/shipping') {
     //Highlight the shipping and address text when the user is on the shipping page
       setHighLightAddress(true);
       setHightlightShipping(true);
       setHighLightPayment(false);
       setHighLightReview(false);
    } else if (router.pathname === '/information/payment') {
     //Highlight the payment text when the user is on the payment page
       setHighLightAddress(true);
       setHighLightPayment(true);
       setHightlightShipping(true);
       setHighLightReview(false)
    } else {
        setHighLightAddress(true);
        setHighLightPayment(true);
        setHightlightShipping(true);
        setHighLightReview(true);
    }
   }, [router.pathname]);

   console.log(router.pathname, highLightReview);

  return (
    <div className='flex items-center text-xs py-3 font-medium pl-4'>
      <div className='flex'>
        <p
          className={`${
            highLightAddress && numberStyles
          } text-secondary-7 h-4 w-4 text-center text-xs rounded-[50%] font-bold flex justify-center items-center`}>
          1
        </p>
        <p className={`mx-1 ${highLightAddress && checkOutStepStyles}`}>
          Address
        </p>
      </div>
      <MdKeyboardArrowRight className='w-5 h-5 mx-2' />
      <div className='flex'>
        <p
          className={`${
            highlightShipping && numberStyles
          }  h-4 w-4 text-center text-xs rounded-[50%] font-bold border-[1px] flex justify-center items-center`}>
          2
        </p>
        <p className={`mx-1 ${highlightShipping && checkOutStepStyles}`}>
          Shipping
        </p>
      </div>
      <MdKeyboardArrowRight className='w-5 h-5 mx-2' />
      <div className='flex '>
        <p
          className={`${
            highLightPayment && numberStyles
          } h-4 w-4 text-center text-xs rounded-[50%] font-bold border-[1px] flex justify-center items-center`}>
          3
        </p>
        <p className={`mx-1 ${highLightPayment && checkOutStepStyles}`}>
          Payment
        </p>
      </div>
      <MdKeyboardArrowRight className='w-5 h-5 mx-2' />
      <div className='flex '>
        <p
          className={`${
            highLightReview && numberStyles
          } h-4 w-4 text-center text-xs rounded-[50%] font-bold border-[1px] flex justify-center items-center`}>
          4
        </p>
        <p className={`mx-1 ${highLightReview && checkOutStepStyles}`}>
          Review
        </p>
      </div>
    </div>
  );
};
