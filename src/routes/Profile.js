import React, { useEffect } from 'react';
import { authService, dbService } from '../fBase';
import {useHistory} from 'react-router-dom';

function Profile({ userObj }) {
  const history = useHistory();
  // 리액트 라우터 이용
  
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
  return (
    <>

      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
}
export default Profile;