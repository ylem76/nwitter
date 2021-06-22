
import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import {authService} from '../fBase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      console.log(user);
      // onAuthStateChanged : 사용자가 생겼는지 일종의 이벤트리스너
      // 상태가 변경되면 user 정보를 콘솔에 찍는다.

      if(user) {
        setIsLoggedIn(true);
        setUserObj(user);
        
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
    
  },[]);
  return (
    <>
    {init ? <AppRouter isLoggedIn = {isLoggedIn} userObj={userObj} />: 'initializing...'}
    <footer>test</footer>
  </>
  );
}






export default App;
