
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

        /*
        파이어베이스 유저 정보 중에서 필요한 것만 userObj에 담는 것
        updateProfile 사실 펑션을 왜 저렇게 넣는 건지는 잘 모르겠다.
        파이어베이스의 함수를 복사해서 넣는 것 같다.
        */
        
      } else {
        Boolean(!userObj);
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

    // 작게 만든 userObj를 refresh할 때 update

    // setUserObj(Object.assign({}, user));
    // user를 복사한 새로운 오브젝트를 생성
    // 새로운 오브젝트 이므로 리액트는 무조건 다시 렌더링 근데 2번째 할 때는 오류남 왜그런지는 모르겠다.
  }

  /*
  유저정보를 업데이트 하게 되면 firebase 쪽에 있는 user를 변경, 새로고침 해주게 되는데,
  헤더와 네비게이션은 UserObj랑만 연결되어있음.(react state)
  */
  return (
    <>
    {init ? <AppRouter refreshUser={refreshUser} isLoggedIn = {Boolean(userObj)} userObj={userObj} />: 'initializing...'}
    <footer>test</footer>
  </>
  );
}






export default App;
