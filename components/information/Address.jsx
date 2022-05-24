import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { informationActions } from '../../store/infoSlice';
import { useRouter } from 'next/router';
import { CurrentPage } from '../CurrentPage';
import { Navigation, Button } from '../HorLine';

export default function Address() {
  const productId = useSelector((state) => state.Id.id);

  return (
    <section className='px-'>
      <AddressDetails />
      <Navigation path={`/${productId}`} pathName='Return to Cart' />
    </section>
  );
  [];
}

const AddressDetails = () => {

  const dispatch = useDispatch();

  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //OnSubmit() function is only called when the form is validated
  const onSubmit = (data) => {
    //console.log(data);
    dispatch(informationActions.setShippingAddress(data));
    router.push('/information/shipping');
  };

  //console.log(errors);
 
  const inputStyles =
    'text-sm rounded-md bg-primary-12 text-primary-10 outline-1 outline-primary-11 text-sm w-full px-2 py-4 text-sm my-2 font-medium';

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='bg-white px-3 pb-6'>
        {/* Contact Information Container */}
        <div className='py-3'>
          <h4 className='text-left py-2'>Contact information</h4>
          <input
            {...register('email', {
              required: 'Please provide email',
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
                message: 'Please provide a valid email',
              },
              // pattern: {
              //   value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
              //   message: 'Please provide a valid phone number',
              // },
            })}
            autoComplete='on'
            placeholder='Email or mobile number'
            className='w-full px-2 py-4 rounded-md text-sm bg-primary-12 outline-primary-11 text-primary-10'
          />
          {errors.email && <Alert msg={errors.email.message} />}
          <div className='flex items-center py-2'>
            <input
              {...register('subscribe', { required: false })}
              autoComplete='on'
              id='subscribe'
              type='checkbox'
            />
            <label
              htmlFor='subscribe'
              className='text-sm text-secondary-7 ml-2 font-bold'>
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
          {errors.country && <Alert msg='Please provide a country' />}
          <input
            {...register('firstName', { required: false })}
            autoComplete='on'
            placeholder='First name (optional)'
            className={inputStyles}
          />
          <input
            {...register('lastName', {
              required: 'Please provide your last name.',
              minLength: {
                value: 3,
                message: 'Last name must be at least 2 characters',
              },
              maxLength: {
                value: 20,
                message: 'Last name must be at most 20 characters',
              },
            })}
            autoComplete='on'
            placeholder='Last name'
            className={inputStyles}
          />
          {errors.lastName && <Alert msg={errors.lastName.message} />}
          <input
            {...register('address', { required: 'Please provide address' })}
            autoComplete='on'
            placeholder='Address'
            className={inputStyles}
          />
          {errors.address && <Alert msg={errors.address.message} />}
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
          <Button type='submit' text='Continue to shipping' />
        </div>
      </form>
    </div>
  );
};

//This is an Alert Component for displaying error messages
const Alert = ({ msg }) => {
  return (
    <div className='flex items-center justify-center text-[red] font-bold tracking-wide relative'>
      <p>{msg}</p>
    </div>
  );
};
