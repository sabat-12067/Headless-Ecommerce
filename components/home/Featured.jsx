import speaker from '../../public/images/speaker.png';

export default function Featured() {
  return (
    <section className='mt-20 px-5'>
      <FeaturedOne />
    </section>
  );
}

const FeaturedOne = () => {
  return (
    <div className='bg-secondary-6 text-primary-12 rounded-lg pt-6'>
      <div>
        <img src={speaker.src} alt='Image of jbl speaker' />
      </div>
      <div>
        <h3 className='uppercase text-center text-xl px-5 tracking-wider mt-3'>
          jbl flip 6 portable waterproof speaker
        </h3>
        <p className='text-lg text-center py-5 leading-8'>
          Upgrade to premium speakers that are phenomenally built to deliver
          truly remarkable sound.
        </p>
        <div className='flex justify-center'>
          <button className='uppercase tracking-widest px-10 bg-black mb-12'>see product</button>
        </div>
      </div>
    </div>
  );
};



//https://asmn-grocery-store.netlify.app/
