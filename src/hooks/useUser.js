import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserById } from '../helpers/firebase';

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserObjById() {
      const data = await getUserById(user.uid);
      setActiveUser(data);
    }

    if (user && user.uid) {
      getUserObjById();
    }
  }, [user]);

  return { user: activeUser };
}
