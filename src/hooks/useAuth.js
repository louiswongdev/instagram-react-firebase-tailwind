import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';

export default function useAuth() {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user };
}
