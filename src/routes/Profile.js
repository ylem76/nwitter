import React, { useEffect, useState } from 'react';
import { authService, dbService } from '../fBase';
import {useHistory} from 'react-router-dom';

function Profile({ userObj, refreshUser }) {
  const history = useHistory();
  // 리액트 라우터 이용

  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  
  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  }
  const getMyNweets = async() => {
    const nweets = await dbService
      .collection('nweets')
      .where('creatorId', '==', userObj.uid)
      .orderBy('createdAt', 'desc')
      .get();

      // dbfiltering
      // 여기서 sort하는 orderBy를 사용하려고 하면 index 오류가 남
      // where을 이용해서 필터링하고 있는데, firebase는 noSQL기반 DB라서 몇몇 기능은 이렇게 작동할 수가 없음.
      // pre made query를 만들어야함
      // 이 쿼리를 사용할 거라고 데이터베이스에 알려줘야 함.
      // 데이터베이스가 쿼리를 만들 준비를 할 수 있도록
      // 오류 메시지를 확인해보면 인덱스를 만드는 페이지를 알려줌 가서 만들면 됨!!



      console.log(nweets.docs.map(doc => doc.data()));
  }
  useEffect(() => {
    getMyNweets();
  }, []);
  const onSubmit = async(event) => {
    event.preventDefault();
    if(userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({displayName : newDisplayName});
      
      refreshUser();
      /*
      동작은 잘 하는데, 적용이 되지 않는다?
      App.js의 refreshUser에 setUserObj를 텍스트로 바꾸면 잘 됨 (-> 리액트 내부 코드는 제대로 동작)
      그러나 authService.currentUser로 하면 적용이 안됨.

      리액트의 혼란?
      리액트는 리렌더링 기능 매우 특화되어있음.
      콘솔에  currentUser를 찍어보면 매우매우 큰 오브젝트가 나옴
      오브젝트 사이즈가 너무 커서 리액트가 결정장애가 왔다ㅏ..?

      현재의 상태가 과거의 상태와 다른건지 제대로 분간하지 못하는 것.
      파악해야하는 오브젝트의 크기를 줄여보자.
      필요한 요소는 uid, displayName, updateProfile userObj 안에 user정보 전체를 다 가져오지 말고
      필요한 요소만 골라 가져오기
      





      */
    }
  }

  /*
  authService가 아니라 userObj로 따로 나눠서 제작하는 이유
  authService를 사용하면 사용하는 페이지마다 따로따로 제작하게 됨.
  userObj로 통합해서 상태의 변화가 있으면 모든 페이지에 적용할 수 있도록 
  정보 변경을 감지하고 리렌더 할수 있도록


  
  */
  const onChange = (event) => {
    const {
      target: {value},
    } = event;
    setNewDisplayName(value);
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" placeholder="display name" value={newDisplayName} />
        <input type="submit" value="update profile" />
      </form>

      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
}
export default Profile;