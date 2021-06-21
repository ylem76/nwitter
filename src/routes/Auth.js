import React, { useState } from 'react'
// useState 경고 뜨지 않게 같이 import
import {authService} from '../fBase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  // 새로 가입 state 작성

  const [error, setError] = useState('');

  const onChange =(event) => {
    const {target:{name, value}} = event;
    if(name === 'email') {
      setEmail(value)
      // 타겟 name이 email이면 setEmail state에 input 값 저장
    } else if(name === 'password') {
      setPassword(value);
      // 타겟 name이 email이면 setPassword state에 input 값 저장
    }
  };

  const onSubmit = async(event) => {
    event.preventDefault();
    // 새로고침 금지

    try {
      let data;
      if(newAccount) {
        // create account
        data = await authService.createUserWithEmailAndPassword(email, password);
        
      } else {
        // log in
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch(error) {
      setError(error.message);
    }
  }

  const toggleAccount = () => { setNewAccount(prev => !prev);

  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? 'Create Account' : 'Log in'} />
      </form>
      {error}
      <span onClick={toggleAccount}>
        {newAccount ? 'Sign in' : 'Create Account'}
      </span>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  )
}
// 자동으로 App.js에서 자동으로 import 되기 원한다면 위와 같이
// const Auth ~처럼 변수 이름 사용하기
// 그러나 가끔 안 될 때도 있으므로, 확인해보기


export default Auth;