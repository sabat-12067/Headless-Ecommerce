import earbuds from '../../public/images/earbuds-copy.png';
import lenoveHeadphones from '../../public/images/lenovo-copy.png';
import Link from 'next/link';
import Image from 'next/image';

export default function Featured() {
  return (
    <section className='mt-20 px-5 max-w-6xl mx-auto'>
      <FeaturedOne />
      <FeaturedTwo />
    </section>
  );
}

const FeaturedOne = () => {
  return (
    <div className='bg-secondary-6 text-primary-14 rounded-lg pt-6 md:flex'>
      <div className='flex justify-center'>
        <Image src={earbuds} alt='image of jbl speaker' width={400} height={400} />
      </div>
      <div className='flex flex-col justify-center'>
        <h3 className='uppercase text-center text-xl px-5 tracking-wider mt-3'>
          Robot Bluetooth Wireless Earbuds
        </h3>
        <p className='text-lg px-4 sm:text-xl text-center py-5 leading-8'>
          Upgrade to premium earbuds that are phenomenally built to deliver
          truly remarkable sound.
        </p>
        <div className='flex justify-center'>
          <Link href={'/product/details/31'} passHref>
            <button className='uppercase tracking-widest px-10 bg-black mb-12 lg:cursor-pointer'>
              see product
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeaturedTwo = () => {
  return (
    <div className='md:flex'>
      <Link href='/product/details/34' passHref>
        <div className='relative mt-5 rounded-lg lg:cursor-pointer md:mr-6 bg-black'>
          <Image src={lenoveHeadphones} alt='image of earbuds' width={400} height={400} />
          <div className='absolute top-0 bottom-0 right-0 left-0 z-10 flex flex-col items-center justify-center p-5'>
            <h3 className='sm:text-xl bg-primary-3 text-primary-11 py-2 px-3 rounded-3xl absolute top-3 left-3'>
              New
            </h3>
            <h3 className='py-5 text-xl sm:text-2xl text-primary-2'>Lenovo</h3>
            <h3 className='uppercase tracking-widest text-primary-14 text-2xl sm:text-4xl md:text-2xl'>
              headphones
            </h3>
          </div>
        </div>
      </Link>
      <div className='mt-5 rounded-lg bg-primary-14 flex flex-col justify-center md:w-[70%]'>
        <h3 className='uppercase pt-8 px-5'>
          LG Home theater System 1000 Watts - Black
        </h3>
        <Link href='/product/details/3' passHref>
          <div className='flex justify-center py-8'>
            <button className=' text-primary-11 uppercase tracking-widest lg:cursor-pointer'>
              see product
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

//https://asmn-grocery-store.netlify.app/
