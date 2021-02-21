import React, { useContext } from 'react';
import { UserContext } from '../../context/user';

export default function Sidebar() {
  const { user: { username, uid, fullName, email } = {} } = useContext(UserContext);

  return <div>Sidebar</div>;
}
