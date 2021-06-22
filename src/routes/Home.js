import React, { useEffect, useState } from 'react'
import { dbService } from '../fBase';
import Nweet from '../components/Nweet'

const Home = ({userObj}) =>{
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  // const getNweets = async() => {
  //   const dbNweets = await dbService.collection('nweets').get();
  //   dbNweets.forEach((document) => {
  //     const nweetObject = {
  //       ...document.data(), // 스프레드 연산자, 데이터를 가져옴
  //       id: document.id,
  //     }
  //     setNweets((prev) => [document.data(), ...prev]);
  //   });
  // };

  useEffect(()=>{
    dbService.collection('nweets').orderBy("createdAt","desc").onSnapshot(snapshot => {

      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(nweetArray);
      setNweets(nweetArray)

    })
    // db에서 뭔가 일어나면 실행
    // read, del, update, create 모두 포함
    
  }, []);

  const onSubmit = async(event) => {
    event.preventDefault();
    await dbService.collection('nweets').add({
      text:nweet,
      createdAt:Date.now(),
      creatorId:userObj.uid,
    });
    setNweet('');
  };
  const onChange = (event) => {
    const{
      target:{ value },
    } = event;
    setNweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="submit" value="nweet" />
      </form>
      <div>
        {nweets.map(nweet => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
}
// state의 nweets에서 nweet정보 가져옴.

export default Home;