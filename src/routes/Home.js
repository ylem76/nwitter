import React, { useEffect, useState } from 'react'
import { dbService } from '../fBase';

const Home = () =>{
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const getNweets = async() => {
    const dbNweets = await dbService.collection('nweets').get();
    // get(); querySnapshot을 리턴함.
    // 원하는 데이터를 뽑아 쓰려면 아래와 같이 data() 메서드 사용해서 작성
    // dbNweets.forEach((document) => console.log(document.data()));

    dbNweets.forEach((document) => {
      setNweets((prev) => [document.data(), ...prev]);
      // set이 붙는 함수를 쓸 때 값 대신에 함수를 전달할 수 있음.
      // 함수를 전달하면 리액트는 이전 값에 접근할 수 있게 해줌.
      // 잘 모르겠는데 하여튼 배열을 리턴한다는 뜻 같음.
    });
  };
  useEffect(()=>{
    getNweets();
  }, []);
  const onSubmit = async(event) => {
    event.preventDefault();
    await dbService.collection('nweets').add({
      // firestore.collection('nweets 콜렉션')에
      // nweet을 추가
      nweet,
      // key(=nweet) : value(nweet = input value)
      // 축약해서 nweet

      createdAt:Date.now(),
    });
    setNweet('');
  };
  const onChange = (event) => {
    const{
      target:{ value },
    } = event;
    setNweet(value);
  };
  // console.log(nweets);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="submit" value="nweet" />
      </form>
    </div>
  );
}

export default Home;