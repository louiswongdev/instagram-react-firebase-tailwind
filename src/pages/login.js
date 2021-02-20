import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { auth } from '../lib/firebase';
import * as ROUTES from '../constants/routes';

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isInvalid = password === '' || email === '';

  useEffect(() => {
    document.title = 'Login - Instagram';
  }, []);

  const handleLogin = async e => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      // setEmail('');
      // setPassword('');
      setError(error.message);
    }
  };

  return (
    <div className="container flex mx-auto max-w-screen-md items-center">
      <div className="flex items-center justify-center w-3/5 h-screen">
        <img
          className="h-4/6"
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram app"
        />
      </div>
      <div className="flex flex-col justify-center w-2/5">
        <h1 className="flex justify-center w-full">
          <img
            src="/images/logo.png"
            alt="Instagram"
            className="mt-2 w-6/12 mb-4"
          />
        </h1>

        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            aria-label="Enter your email address"
            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <input
            aria-label="Enter your password"
            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <button
            disabled={isInvalid}
            type="submit"
            className={`bg-blue-500 text-white w-full rounded py-2 font-semibold ${
              isInvalid && 'cursor-not-allowed opacity-50'
            }`}
          >
            Login
          </button>
        </form>
        <div className="w-full bg-white mt-4 py-3 px-4 border">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
