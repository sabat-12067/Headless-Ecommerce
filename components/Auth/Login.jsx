import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/router';
import SVG from './SVG';
import Alert from './Alert';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';

function Login() {
  return <LoginForm />;
}

  const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [alert, setAlert] = useState({
    show: false,
    type: 'danger',
    msg: '',
  });

  const dispatch = useDispatch();
  const clientInfo = { email, password };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //post the client login info to the server
      const response = await axios.post(
        'http://localhost:5000/auth/login',
        JSON.stringify(clientInfo),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      //https://asuman-sounds-api.herokuapp.com/auth/login

      //Store userId in the redux store
      const userId = response.data.user.userId;
      dispatch(authActions.setUserId(userId));

      const token = response.data.token
      //Store token in local storage
      localStorage.setItem('token', token);
      console.log('token', token);

      setAlert({ show: true, type: 'success', msg: 'Login successfull!' });

      setEmail('');
      setPassword('');

      //Set logged-in status to true
      sessionStorage.setItem('isloggedIn', true);
    } catch (error) {
      setAlert({ show: true, type: 'danger', msg: error.response.data.msg });
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
    <section className='pt-16 sm:flex flex-col items-start bg-primary-11 h-screen'>
      <SVG />
      <div className='max-w-lg w-[90vw] mx-auto relative top-10 lg:top-0 shadow-md'>
        <form
          onSubmit={handleSubmit}
          className=' bg-white pt-10 w-full px-8 rounded-t-lg relative'>
          <div className='absolute w-full left-0 z-30'>
            {alert.show && <Alert alert={alert} setAlert={setAlert} />}
          </div>
          <h1 className='text-3xl text-left'>Sign in to asuman sounds</h1>
          <div className='flex flex-col pt-4'>
            <label htmlFor='email' className='text-sm font-medium'>
              Your Email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            className='bg-primary-11 my-10 w-full rounded-sm'>
            Sign in
          </button>
        </form>
        <div className='px-8 pt-4 bg-primary-12 pb-4 sm:flex rounded-b-lg'>
          <p className='font-medium mr-2'>New to Asuman Sounds?</p>
          <p
            className='font-medium text-secondary-7 lg:cursor-pointer'
            onClick={() => router.push('/auth/signup')}>
            Create your free account now!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
