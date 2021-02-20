import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as ROUTES from '../constants/routes';
import { doesUserNameExist } from '../helpers/firebase';
import { auth, firestore } from '../lib/firebase';

export default function SignUp() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid =
    username === '' || fullName === '' || password === '' || email === '';

  useEffect(() => {
    document.title = 'Sign Up - Instagram';
  }, []);

  const handleSignup = async e => {
    e.preventDefault();

    const usernameExists = await doesUserNameExist(username);
    if (!usernameExists) {
      try {
        const createdUser = await auth.createUserWithEmailAndPassword(
          email,
          password,
        );

        const { uid } = createdUser.user;

        await createdUser.user.updateProfile({
          displayName: username,
        });

        await firestore.collection('users').doc(`${uid}`).set({
          uid,
          username: username.toLowerCase(),
          fullName,
          email: email.toLowerCase(),
          dateCreated: Date.now(),
        });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError('That username is already taken!');
    }
  };

  return (
    <div className="container flex mx-auto max-w-xs items-center h-screen">
      <div className="flex flex-col">
        <div className="flex flex-col items-center bg-white p-4 border mb-4">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>

          {error && (
            <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
          )}

          <form onSubmit={handleSignup}>
            <input
              aria-label="Enter your username"
              className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
              type="text"
              placeholder="Username"
              value={username}
              onChange={({ target }) => setUsername(target.value.toLowerCase())}
            />
            <input
              aria-label="Enter your full name"
              className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
            />
            <input
              aria-label="Enter your email address"
              className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={({ target }) => setEmail(target.value.toLowerCase())}
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
              Sign Up
            </button>
          </form>
          <div className="w-full bg-white mt-4 py-3 px-4 border">
            <p className="text-sm">
              Have an account?{` `}
              <Link to={ROUTES.LOGIN} className="font-bold text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
