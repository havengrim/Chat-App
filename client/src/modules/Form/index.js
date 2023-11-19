// Form.js
import React, { useState } from 'react';
import Input from '../../components/input/Input';

const Form = () => {
  const [isSignInPage, setIsSignInPage] = useState(true);

  const [data, setData] = useState({
    ...(isSignInPage && {
      fullName: '',
    }),
    email: '',
    password: '',
  });

  const toggleSignInPage = () => {
    setIsSignInPage((prevIsSignInPage) => !prevIsSignInPage);
  };

  console.log('data :>>', data);

  return (
    <div className='flex items-center justify-center h-screen'>
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 flex">
          <div className="px-6 py-4 w-full">
            <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
              Welcome {isSignInPage ? 'Back' : ''}
            </h3>

            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
              {isSignInPage
                ? 'Sign in to get explored'
                : 'Sign up to get started'}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log('Submitted', data);
              }}
            >
              {!isSignInPage && (
                <Input
                  type="text"
                  label="Full Name"
                  name="fullname"
                  placeholder="Enter your full name"
                  inputClassName="rounded-lg"
                  value={data.fullName}
                  onChange={(e) =>
                    setData({ ...data, fullName: e.target.value })
                  }
                />
              )}
              <Input
                type="email"
                label="Email"
                name="email"
                placeholder="Enter your email"
                inputClassName="rounded-lg"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
              <Input
                type="password"
                label="Password"
                name="password"
                placeholder="Enter your password"
                inputClassName="rounded-lg"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <div className="flex items-center justify-between mt-4">
                {isSignInPage && (
                  <a
                    href="#"
                    className={`text-sm ${
                      isSignInPage ? 'text-blue-500 dark:text-blue-400 hover:underline' : ''
                    }`}
                  >
                    Forgot Password?
                  </a>
                )}
                <button
                  type="submit"
                  className={`px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ${
                    !isSignInPage ? 'w-full' : '' // Set width to 100% for sign-up
                  }`}
                >
                  {isSignInPage ? 'Sign In' : 'Sign Up'}
                </button>
              </div>
              <div className="flex items-center justify-center mt-4">
                <a
                  href="#"
                  onClick={toggleSignInPage}
                  className={`text-sm ${
                    isSignInPage ? ' dark:text-blue-400' : ''
                  }`}
                >
                  {isSignInPage
                    ? "Don't have an account?"
                    : 'Already have an account?'
                    }
                    <span className='hover:underline text-blue-600'>
                    {isSignInPage
                    ? "Sign up"
                    : 'Sign in'
                    }
                    </span>
                </a>
              </div>
            </form>

            {/* ... rest of the component ... */}
          </div>
        </div>
    </div>
  );
};

export default Form;
