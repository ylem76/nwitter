import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import {authService} from '../fBase';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        Boolean(userObj);
        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile:(args) => user.updateProfile(args)
        })
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
    
  },[]);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName:user.displayName,
      uid:user.uid,
      updateProfile:(args) => user.updateProfile(args)
    });
  }
  return (
    <>
    {init ? <AppRouter refreshUser={refreshUser} isLoggedIn = {Boolean(userObj)} userObj={userObj} />: 'initializing...'}
    <footer>test</footer>
  </>
  );
}

export default App;
