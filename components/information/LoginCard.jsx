import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Alert from '../Auth/Alert';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';
import ClipLoader from 'react-spinners/ClipLoader';

const LoginCard = ({ setShowLoginCard }) => {
  return <LoginForm setShowLoginCard={setShowLoginCard} />;
};

const LoginForm = ({ setShowLoginCard }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    type: 'danger',
    msg: '',
  });

  const dispatch = useDispatch();
  const clientInfo = { email, password };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      //post the client login info to the server
      const response = await axios.post(
        'https://asuman-sounds-api.herokuapp.com/auth/login',
        JSON.stringify(clientInfo),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      //Store userId in the redux store
      const userId = response.data.user.userId;
      dispatch(authActions.setUserId(userId));

      setAlert({ show: true, type: 'success', msg: 'Login successfull!' });

      setEmail('');
      setPassword('');

      //Set logged-in status to true
      //dispatch(authActions.setIsLoggedIn(true));
      sessionStorage.setItem('isloggedIn', true);
      setShowLoginCard(false);
      setLoading(false);
    } catch (error) {
     console.log(error);
      setAlert({ show: true, type: 'danger', msg: error.response.data.msg });
      setLoading(false);
    }
  };

  const togglePassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  //border-2 h-[80vh] absolute bg-primary-11 w-screen bottom-0 lg:h-[70vh]
  //Svg is from gatwaves.io
  return (
    <section className='sm:flex flex-col items-start rounded-md bg-primary-11 w-full py-4 absolute z-30 duration-300 ease-in-out top-0 max-w-xl mx-auto left-0 sm:right-0'>
      <div className=' w-[90%] mx-auto top-6 lg:top-0 shadow-md'>
        <form
          onSubmit={handleSubmit}
          className=' bg-white pt-10 w-full px-4 rounded-t-lg relative border-'>
          <div className='absolute w-full left-0 z-30'>
            {alert.show && <Alert alert={alert} setAlert={setAlert} />}
          </div>
          <h1 className='text-xl text-left'>Sign in to asuman sounds</h1>
          <div className='flex flex-col pt-2'>
            <label htmlFor='email' className='text-sm font-medium'>
              Your Email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
              className='pl-2 py-2 mt-1 rounded-sm bg-primary-12 text-sm'
            />
          </div>
          <div className='flex flex-col pt-4'>
            <label htmlFor='password' className='text-sm font-medium'>
              Your Password
            </label>
            <div className='flex justify-between items-center bg-primary-12 relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='pl-2 py-2 rounded-sm bg-primary-12 w-full txt-sm'
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
          <div className='relative flex items-center'>
            <div className='absolute flex left-6 sm:left-16 md:left-20 lg:left-28 '>
              {isLoading && <ClipLoader size={28} color={'#ffff'} />}
            </div>
            <button
              type='submit'
              className='bg-primary-11 my-4 w-full rounded-sm py-3 text-lg'>
              {isLoading ? 'Logging in...' : 'Sign in'}
            </button>
          </div>
        </form>
        <div className='px-8 pt-4 bg-primary-12 pb-4 sm:flex rounded-b-lg '>
          <p className='font-medium mr-2'>Don&#39;t have an account?</p>
          <p
            className='font-medium text-secondary-7 lg:cursor-pointer'
            onClick={() => router.push('/auth/signup')}>
            Create your free account
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginCard;
