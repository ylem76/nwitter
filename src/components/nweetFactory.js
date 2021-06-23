import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from '../fBase';

const NweetFactory = ({ userObj}) => {
  const [nweet, setNweet] = useState('');
  const [attachment, setAttachment] = useState('');

  const onSubmit = async(event) => {
    event.preventDefault();
    let attachmentUrl = '';
    if(attachment !== '') {
      const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, 'data_url');
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      text:nweet,
      createdAt:Date.now(),
      creatorId:userObj.uid,
      attachmentUrl
    };
    await dbService.collection('nweets').add(nweetObj);
    setAttachment('');
    setNweet('');
    
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
  )
}

export default NweetFactory;