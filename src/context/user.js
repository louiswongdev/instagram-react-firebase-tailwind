import { createContext, useEffect, useState } from 'react';
import { createUserProfileDoc } from '../helpers/firebase';
import { auth } from '../lib/firebase';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({ user: null });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async authUser => {
      if (authUser) {
        const userRef = await createUserProfileDoc(authUser);
        // listen to changes to authed userRef
        userRef.onSnapshot(onSnapshot => {
          setUser({
            uid: onSnapshot.id,
            ...onSnapshot.data(),
          });
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
