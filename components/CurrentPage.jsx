import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

//This component highlights the pages that are currently being viewed. It is used to show the user where they are in the checkout process. It is displayed on each page of the checkout process (address, shpping, payment and review).

export const CurrentPage = ({ highlightColor, bgColor }) => {
  const [highlightShipping, setHightlightShipping] = useState(false);
  const [highLightAddress, setHighLightAddress] = useState(false);
  const [highLightPayment, setHighLightPayment] = useState(false);
  const [highLightReview, setHighLightReview] = useState(false);

  const router = useRouter();

  //Styles for highlighting the current page
  const numberStyles = 'bg-primary-11 text-white border-none'; //Highlight the number
  const checkOutStepStyles = 'text-secondary-7'; //Highlight name of the check out page (Shipping, Address, Payment, Review)

  useEffect(() => {
    if (router.pathname === '/product/checkout/address') {
      //Highlight only the address text when the user is on the address page
      setHighLightAddress(true);
      setHighLightPayment(false);
      setHightlightShipping(false);
      setHighLightReview(false);
    } else if (router.pathname === '/product/checkout/shipping') {
      //Highlight the shipping and address text when the user is on the shipping page
      setHighLightAddress(true);
      setHightlightShipping(true);
      setHighLightPayment(false);
      setHighLightReview(false);
    } else if (router.pathname === '/product/checkout/payment') {
      //Highlight the payment text when the user is on the payment page
      setHighLightAddress(true);
      setHighLightPayment(true);
      setHightlightShipping(true);
      setHighLightReview(false);
    } else {
      setHighLightAddress(true);
      setHighLightPayment(true);
      setHightlightShipping(true);
      setHighLightReview(true);
    }
  }, [router.pathname]);

  return (
    <div className='flex items-center text-sm py-3 font-medium pl-4'>
      <div className='flex items-center'>
        <div className='flex items-center justify-center'>
          <p
            className={`${
              highLightAddress && numberStyles
            } text-secondary-7 w-7 h-7 text-center text-xs rounded-full font-bold flex justify-center items-center`}>
            1
          </p>
        </div>
        <p className={`mx-1 ${highLightAddress && checkOutStepStyles}`}>
          Address
        </p>
      </div>
      <MdKeyboardArrowRight className='w-7 h-7 mx-1' />
      <div className='flex items-center'>
        <p
          className={`${
            highlightShipping && numberStyles
          }  h-7 w-7 text-center text-xs rounded-[50%] font-bold border-[1px] flex justify-center items-center`}>
          2
        </p>
        <p className={`mx-1 ${highlightShipping && checkOutStepStyles}`}>
          Shipping
        </p>
      </div>
      <MdKeyboardArrowRight className='w-7 h-7 mx-1' />
      <div className='flex items-center'>
        <p
          className={`${
            highLightPayment && numberStyles
          } h-7 w-7 text-center text-xs rounded-[50%] font-bold border-[1px] flex justify-center items-center`}>
          3
        </p>
        <p className={`mx-1 ${highLightPayment && checkOutStepStyles}`}>
          Payment
        </p>
      </div>
      <MdKeyboardArrowRight
        className={`w-5 h-5 mx-2 ${
          router.pathname === '/checkout/review' ? 'block' : 'hidden'
        }`}
      />
      <div
        className={`${
          router.pathname === '/checkout/review' ? 'flex' : 'hidden'
        }`}>
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
