import { Navigation } from '../HorLine';


export default function Review() {
    return (
      <section className='px-4'>
        <h2 className='text-left pt-4 text-xl md:2xl lg:3xl font-bold tracking-wide border-b-2 pb-3'>
          Review
        </h2>
        
        <Navigation path='/information/payment' pathName='Return To Payment' />
      </section>
    );
}
