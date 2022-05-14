import { MdKeyboardArrowUp } from 'react-icons/md';

import { useState } from 'react';

//This is a component that returns the description of the product.

export default function Description({ singleProduct }) {
  const { description, specifications } = singleProduct;

  const [showSpecs, setShowSpecs] = useState(false);

  const [readMore, setReadMore] = useState(false);

  //Returns the specifications of the product as an array.
  const splitSpecifications = specifications.split('\n');

  return (
    <section className='px-4'>
      {/*Descriptions container */}
      <div className='md:max-w-[500px]'>
        <p className='font-bold'>Description</p>
        <p>
          {readMore ? description : description.substr(0, 100)}
          <button
            className='px-2 text-sm py-2 bg-primary-2 text-primary-9'
            onClick={() => setReadMore(!readMore)}>
            {readMore ? 'Read less' : '... Read more'}
          </button>
        </p>
      </div>
      {/*Specifications container */}
      <div className='mt-12 md:py-1 border-t-2 border-b-2 overflow-hidden'>
        <div
          className='flex justify-between items-center'
          onClick={() => setShowSpecs(!showSpecs)}>
          <p className='font-bold'>Specifications</p>
          <MdKeyboardArrowUp
            className={`w-8 h-8 ${
              showSpecs ? null : 'rotate-[180deg]'
            } duration-300 ease-in-out`}
          />
        </div>
        <ul
          className={`${
            showSpecs ? 'h-auto' : 'h-0'
          } duration-500 ease-in-out md:pt-2`}>
          {splitSpecifications.map((specification, index) => {
            const specificationType = specification.split(':')[0];
            const specificationValue = specification.split(':')[1];
            return (
              <li key={index}>
                <span className='font-semibold'>{specificationType}: </span>
                {specificationValue}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
