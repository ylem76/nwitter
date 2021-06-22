import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from '../fBase';
import Nweet from '../components/Nweet'

const Home = ({userObj}) =>{
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState();

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
    const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
    // child : 기본적으로 이미지의 path
    // 먼저 파일이 업로드 될 레퍼런스(자리)를 만들고
    // 데이터를 putString으로 업로드

    const response = await fileRef.putString(attachment, 'data_url');
    console.log(response);

    // await dbService.collection('nweets').add({
    //   text:nweet,
    //   createdAt:Date.now(),
    //   creatorId:userObj.uid,
    // });
    // setNweet('');
  };
  const onChange = (event) => {
    const{
      target:{ value },
    } = event;
    setNweet(value);
  };
  const onFileChange = (event) => {
    const {target:{ files },}= event;
    const theFile = files[0];
    
    // input onChange 감지, event에서 파일 정보 가져옴
    // fileReaderAPI로 파일을 읽어옴

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {currentTarget : {result}} = finishedEvent;
      setAttachment(result)
    }
    reader.readAsDataURL(theFile);
  }

  const onClearAttachment = (event) => {
    event.preventDefault();
    setAttachment(null);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="nweet" />
        {attachment &&
          <>
            <div>
              <img src={attachment} width="50px"/>
              <button onClick={onClearAttachment}>Clear image</button>
            </div>
          </>
        }
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