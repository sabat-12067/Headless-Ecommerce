import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/router';
import SVG from './SVG';

const Signup = () => {
  return <SignupForm />;
};


const SignupForm = () => {
 const [showPassword, setShowPassword] = useState(false);
 
 const handleEmail = () => {
   console.log('email');
 };
 
 const handlePassword = () => {
   console.log('password');
 };
 
 const handleName = () => {
   console.log('password');
 };
 
 const handleSubmit = (e) => {
   e.preventDefault();
 };
 
 const togglePassword = () => {
   if (showPassword) {
     setShowPassword(false);
   } else {
     setShowPassword(true);
   }
 };
  return (
    <section className='pt-10 sm:flex flex-col items-start bg-primary-11 h-screen'>
      <SVG />
      <div className='max-w-lg mx-auto w-[90vw] relative lg:top-0 shadow-md'>
        <form
          onSubmit={handleSubmit}
          className=' bg-white pt-8 w-full px-8 sm:rounded-t-lg'>
          <h1 className='text-3xl text-left'>Sign up for a free account</h1>
          <div className='flex flex-col pt-4'>
            <label htmlFor='email' className='text-sm font-medium'>
              Your Name
            </label>
            <input
              type='email'
              id='email'
              placeholder='Name'
              onChange={handleName}
              className='pl-2 py-2 mt-1 rounded-sm bg-primary-12'
            />
          </div>
          <div className='flex flex-col pt-4'>
            <label htmlFor='email' className='text-sm font-medium'>
              Your Email
            </label>
            <input
              type='email'
              id='email'
              placeholder='Email'
              onChange={handleEmail}
              className='pl-2 py-2 mt-1 rounded-sm bg-primary-12'
            />
          </div>
          <div className='flex flex-col pt-4'>
            <label htmlFor='password' className='text-sm font-medium'>
              Your Password
            </label>
            <div className='flex justify-between items-center bg-primary-12 relative mt-1'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                id='password'
                onChange={handlePassword}
                className='pl-2 py-2 rounded-sm bg-primary-12 w-full'
                required
              />
              {showPassword ? (
                <FaEye
                  id='password-eye'
                  onClick={togglePassword}
                  className='absolute right-1 lg:cursor-pointer'
                />
              ) : (
                <FaEyeSlash
                  id='password-eye'
                  onClick={togglePassword}
                  className='absolute right-1 lg:cursor-pointer'
                />
              )}
            </div>
          </div>
          <button
            type='submit'
            className='bg-primary-11 my-8 w-full rounded-sm py-3'>
            Sign up
          </button>
        </form>
        <p className='text-primary-10 text-sm py-3 tracking-normal rounded-b-lg px-6 bg-[#f0f9ff]'>
          By clicking "Sign Up" button, I expressly agree to the Asuman Sounds{' '}
          <span className='underline'> Terms of Service</span> and understand
          that my account information will be used according to Asuman Sounds{' '}
          <span className='underline'>Privacy Policy</span>.
        </p>
      </div>
    </section>
  );
};

export default Signup;
