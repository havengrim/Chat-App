import React, { useState } from 'react';
import Input from '../../components/input/Input';

const Form = ({
    isSignInPage = true,
}) => {

    const [data, setData] = useState({
        ...(isSignInPage &&{
            fullName: ''
        }),
        email: '',
        password: ''
        })

      console.log('data :>>', data);

  return (
    <div class="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
    <div class="px-6 py-4">
      <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome {isSignInPage && 'Back'}</h3>

      <p className="mt-1 text-center text-gray-500 dark:text-gray-400">{isSignInPage ? 'Sign in to get explored' : 'Sign up to get started'}</p>

      <form onSubmit={() => console.log('Submitted')}>
        { !isSignInPage && <Input type="text" label="Full Name" name="name" placeholder="Enter your full name" value={data.fullName} onChange={(e) => setData({...data, fullName: e.target.value})}/>}
        <Input type="email" label="Email" name="email" placeholder="Enter your email" value={data.email}  onChange={(e) => setData({...data, email: e.target.value})}/>
        <Input type="password" label="Password" name="password" placeholder="Enter your password" value={data.password}  onChange={(e) => setData({...data, password: e.target.value})}/>
        <div className="flex items-center justify-between mt-4">
          <a href="#" className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">Forgot Password?</a>

          <button label={isSignInPage ? 'Sign in': 'Sign up'}className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
            Sign In
          </button>
        </div>
      </form>

      <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-200">{isSignInPage ? "Don't have an account?" : 'Already have an account?'}</span>

        <a href="#" className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">{isSignInPage ? "Sign up" : "Sign in"}</a>
      </div>
    </div>
    </div>
  );
}

export default Form;
