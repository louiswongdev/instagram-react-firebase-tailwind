import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import UserContext from '../context/user';
import { auth } from '../lib/firebase';

export default function Header() {
  const { user } = useContext(UserContext);

  console.log('user from context:', user);

  return (
    <header className="border-b border-gray-200 space-y-2">
      <nav className="container mx-auto max-w-screen-lg flex items-center justify-between py-4 px-6">
        <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
          <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12" />
        </Link>
        <div className="flex items-center">
          {user ? (
            <>
              <div className="flex items-center space-x-4  text-gray-600">
                <Link to={ROUTES.DASHBOARD} aria-label="Home">
                  <svg
                    className="w-8 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>
                <button
                  type="button"
                  title="SIgn Out"
                  onClick={() => auth.signOut()}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      auth.signOut();
                    }
                  }}
                >
                  <svg
                    className="w-8  text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                <div className="cursor-pointer">
                  <Link to={`/p/${user.displayName}`}>
                    <img
                      className="rounded-full h-8 w-8 flex"
                      src={`/images/avatars/${user.displayName}.jpg`}
                      alt={`${user.displayName} profile`}
                    />
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="space-x-4">
              <Link to={ROUTES.LOGIN}>
                <button
                  type="button"
                  className="rounded px-4 py-2 bg-blue-500 font-medium text-sm leading-5 text-white"
                >
                  Log In
                </button>
              </Link>
              <Link to={ROUTES.SIGN_UP}>
                <button type="button" className="font-medium text-sm leading-5">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
