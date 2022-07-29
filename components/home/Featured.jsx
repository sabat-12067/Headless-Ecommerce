import speaker from '../../public/images/speaker.png';
import earbuds from '../../public/images/earbuds.jpg';

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
    <div className='bg-secondary-6 text-primary-12 rounded-lg pt-6 md:flex'>
      <div className='flex justify-center'>
        <img src={speaker.src} alt='Image of jbl speaker'/>
      </div>
      <div className='flex flex-col justify-center'>
        <h3 className='uppercase text-center text-xl px-5 tracking-wider mt-3'>
          jbl flip 6 portable waterproof speaker
        </h3>
        <p className='text-lg sm:text-xl text-center py-5 leading-8'>
          Upgrade to premium speakers that are phenomenally built to deliver
          truly remarkable sound.
        </p>
        <div className='flex justify-center'>
          <button className='uppercase tracking-widest px-10 bg-black mb-12 lg:cursor-pointer'>
            see product
          </button>
        </div>
      </div>
    </div>
  );
};

const FeaturedTwo = () => {
  return (
    <div className='md:flex'>
      <div className='mt-5 rounded-lg lg:cursor-pointer md:mr-6'>
        <img src={earbuds.src} alt='Image of earbuds' className='rounded-lg w-full'/>
      </div>
      <div className='mt-5 rounded-lg bg-primary-14 flex flex-col justify-center'>
        <h3 className='uppercase pt-8 px-5'>
          LG Hometheatre System 1000 Watts - Black
        </h3>
        <div className='flex justify-center py-8'>
          <button className='border-[1px] text-primary-11 uppercase tracking-widest lg:cursor-pointer'>
            see product
          </button>
        </div>
      </div>
    </div>
  );
}

//https://asmn-grocery-store.netlify.app/
