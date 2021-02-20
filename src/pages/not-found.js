import React, { useEffect } from 'react';
import Header from '../components/Header';

export default function NotFound() {
  useEffect(() => {
    document.title = '404 - Not Found';
  });

  return (
    <>
      <Header />
      <div className="bg-gray-200">
        <div className="flex flex-col justify-center mx-auto max-w-screen-lg h-screen">
          <p className="text-center text-2xl">Page not found</p>
        </div>
      </div>
    </>
  );
}
