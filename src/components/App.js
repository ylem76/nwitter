
import React, { useState } from 'react';
import AppRouter from './Router';
import {authService} from '../fBase';
// 상대 경로를 이용해 firebase.js 파일을 임포트
// fBase.js 에서 export const 사용,
// 원하는 서비스만 따로 불러올 수 있도록 지정함.

function App() {
  // const auth = firebase.auth();
  // auth를 이렇게 임포트 할 수도 있고 fBase.js 파일 수정해도 됨

  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  // firebase auth와 state 연동
  return <>
    <AppRouter isLoggedIn = {isLoggedIn}/>
    <footer>test</footer>
  </>;
}

// 하단의 footer 등 다른 요소를 조합할 수 있게 하기 위해
// AppRouter 따로 분리해서 사용
// App.js에서 로직 관리할 수 있도록





export default App;
