import React, { useEffect, useState } from 'react'
import { dbService } from '../fBase';
import Nweet from '../components/Nweet'
import NweetFactory from '../components/nweetFactory';

const Home = ({userObj}) =>{
  
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    dbService.collection('nweets').orderBy("createdAt","desc").onSnapshot(snapshot => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(nweetArray);
      setNweets(nweetArray)
    })
  }, []);

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
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

export default Home;