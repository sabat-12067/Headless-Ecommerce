
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { informationActions } from '../../store/infoSlice';
import { useRouter } from 'next/router';
import { CurrentPage } from '../CurrentPage';
import { Navigation, Button } from '../HorLine'

export default function Address() {
   const productId = useSelector((state) => state.Id.id);
  return (
    <section className='px-2'>
      <AddressDetails />
      <Navigation path={`/${productId}`} pathName='Return to Cart' />
    </section>
  );
[
  
]}

const AddressDetails = () => {
  const dispatch = useDispatch();

  //console.log(errors);
   const router = useRouter();

   //OnSubmit() function is only called when the form is validated
  const onSubmit = (data) => {
   // console.log(data);
    router.push('/information/shipping');
  };
  const inputStyles =
    'text-sm rounded-md bg-primary-3 text-primary-10 outline-1 outline-primary-5 text-sm w-full px-2 py-4 text-sm my-2 font-medium';

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Contact Information Container */}
        <div className='py-3'>
          <h4 className='text-left py-2'>Contact information</h4>
          <input
            {...register('email', { required: true })}
            autoComplete='on'
            placeholder='Email or mobile number'
            className='w-full px-2 py-4 rounded-md text-sm'
          />
          {errors.email && <Alert msg='Please, provide your email.' />}
          <div className='flex items-center py-2'>
            <input
              {...register('subscribe', { required: false })}
              autoComplete='on'
              id='subscribe'
              type='checkbox'
            />
            <label
              htmlFor='subscribe'
              className='text-sm text-secondary-8 ml-2'>
              Email me with news and offers
            </label>
          </div>
        </div>
        {/* Shipping Address Container */}
        <div>
          <h4 className='text-left py-2'>Shipping address</h4>
          <input
            {...register('country', { required: true })}
            autoComplete='on'
            placeholder='Country/region'
            className={inputStyles}
          />
          {errors.email && <Alert msg='Country is required' />}
          <input
            {...register('firstName', { required: false })}
            autoComplete='on'
            placeholder='First name (optional)'
            className={inputStyles}
          />
          <input
            {...register('lastName', { required: true })}
            autoComplete='on'
            placeholder='Last name'
            className={inputStyles}
          />
          {errors.email && <Alert msg='Please, provide last your name.' />}
          <input
            {...register('address', { required: true })}
            autoComplete='on'
            placeholder='Address'
            className={inputStyles}
          />
          {errors.email && <Alert msg='Please, provide your address' />}
          <input
            {...register('apartment', { required: false })}
            autoComplete='on'
            placeholder='Apartment, suite, etc. (optional)'
            className={inputStyles}
          />
          <input
            {...register('city', { required: true })}
            autoComplete='on'
            placeholder='City'
            className={inputStyles}
          />
          {errors.city && <Alert msg='Please, provide city' />}
          <div>
            <input type='checkbox' id='save-info' />
            <label htmlFor='save-info' className='ml-2'>
              Save this information for next time
            </label>
          </div>
          <Button type='submit' text='Continue to shipping'/>
        </div>
      </form>
    </div>
  );
};

// const Navigation = () => {
//   const productId = useSelector((state) => state.Id.id);

//   return (
//     <div className='my-3 flex items-center flex-col'>
//       <div className='flex py-2'>
//         <MdKeyboardArrowLeft className='w-5 h-5' />
//         <p className='ml-1 text-sm text-center '>
//           <Link href={`/${productId}`}>Return to cart</Link>
//         </p>
//       </div>
//     </div>
//   );
// };



//This is an Alert Component for displaying error messages
const Alert = ({ msg }) => {
  return (
    <div className='flex items-center justify-center text-[red] font-bold tracking-wide relative'>
      <p>{msg}</p>
    </div>
  );
}