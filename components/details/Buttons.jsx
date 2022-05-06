import { BiPlus, BiMinus } from 'react-icons/bi';
import { HiOutlineShoppingCart } from 'react-icons/hi';

//This component is for the 'edit quantity',  'add to cart' and the 'buy now' buttons of the product details screen/page.

export default function buttons() {
  return (
    <section className='px-4'>
      <div>
        <p className='text-base'>Quantity</p>
        <div className='flex items-center border-2 justify-between w-32 px-2 py-2.5'>
          <BiMinus
            className='w-6 h-6 font-bold lg:cursor-pointer'
            // onClick={handleDecreament}
          />
          <p className='self-center h-full font-extrabold text-[1rem] mb-0 border-0'>
            {/* {count} */}
          </p>
          <BiPlus
            className='w-6 h-6 font-bold lg:cursor-pointer'
            // onClick={handleIncreament}
          />
        </div>
      </div>
      <div>
        <button className='text-center w-full bg-primary-1 mt-6 mb-4 py-4 text-[1.5rem] text-primary-7 flex flex-row items-center justify-center border-2 border-primary-7 outline-none'>
          <HiOutlineShoppingCart className='absolute left-[5rem]' />
          Add to cart
        </button>
        <button className='text-center w-full bg-primary-dark mb-12 py-4 text-[1.5rem] text-white flex flex-row items-center justify-center border-0 outline-none'>
          {' '}
          <HiOutlineShoppingCart className='absolute left-[5rem]' />
          Buy it now
        </button>
      </div>
    </section>
  );
}
