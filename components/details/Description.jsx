import { MdKeyboardArrowUp } from 'react-icons/md';
import { useState } from 'react';

//This is a component that returns the description of the product.

export default function Description({ specifications, description }) {
  const [showSpecs, setShowSpecs] = useState(false);
  const [readMore, setReadMore] = useState(false);

  //set number of the first characters of the description to be displayed.
  const shortenDescription = readMore
    ? description
    : description.substr(0, 250);

  return (
    <section className='px-4 mb-12'>
      {/*Descriptions container */}
      <div className='md:max-w-[500px]'>
        <h3 className='font-bold pb-2 text-left'>Description</h3>
        <div>
          <div dangerouslySetInnerHTML={{ __html: shortenDescription }} className='text-sm leading-6'></div>
          <p
            className='px-2 text-sm py-2 text-primary-9 font-bold'
            onClick={() => setReadMore(!readMore)}>
            {readMore ? 'Read less' : '... Read more'}
          </p>
        </div>
      </div>
      {/*Specifications container */}
      <div className='mt-12 md:py-1 border-t-2 border-b-2 overflow-hidden'>
        <div
          className='flex justify-between items-center'
          onClick={() => setShowSpecs(!showSpecs)}>
          <h3 className='font-bold'>Specifications</h3>
          <MdKeyboardArrowUp
            className={`w-8 h-8 ${
              showSpecs ? null : 'rotate-[180deg]'
            } duration-300 ease-in-out`}
          />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: specifications }}
          className={`${
            showSpecs ? 'h-auto' : 'h-0'
          } duration-500 ease-in-out md:pt-2`}></div>
      </div>
    </section>
  );
}
