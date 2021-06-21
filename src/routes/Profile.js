import React from 'react';
import { authService } from '../fBase';
import {useHistory} from 'react-router-dom';

function Profile() {
  const history = useHistory();
  // 리액트 라우터 이용
  
  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  }
  return <>

    <button onClick={onLogOutClick}>Log Out</button>
  </>
}
export default Profile;