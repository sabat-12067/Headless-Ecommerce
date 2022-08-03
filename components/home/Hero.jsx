import jblHeadphone from '../../public/images/jblheadsets.png';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Hero() {
  const router = useRouter();
return (
  <section className='flex items-center w-screen h-screen bg-primary-10'>
    <div className='flex justify-center items-center max-w-7xl mx-auto h-full'>
      <div className='absolute md:static text-white flex flex-col justify-center md:justify-start px-6 md:p-0 md:pl-12 md:w-[50%] md:mt-28 z-10'>
        <h5 className='uppercase tracking-widest text-center sm:text-left pb-4'>new product</h5>
        <h1 className='uppercase sm:text-left md:leading-[70px] xl:leading-[100px]'>
          500bt jbl wireless headphones
        </h1>
        <h4 className='normal-case text-xl tracking-wider text-center sm:text-left my-6 leading-10'>
          Experience natural life like audio and exceptional build quality made for the passionate music enthusiast
        </h4>
        <button className='bg-secondary-8 text-primary-3 uppercase tracking-widest sm:w-[300px] md:text-xl py-4 my-4' onClick={() => router.push('/product/details/24')}>
          see product
        </button>
      </div>
      <div className='absolute md:static md:mt-20'>
        {/* <img
          src={jblHeadphone.src}
          alt='inage of jbl headphones'
          className='md:w-[400px]'
        /> */}
        <Image src={jblHeadphone} alt='image of jbl headphones' width={400} height={400} />
      </div>
    </div>
  </section>
);
}
