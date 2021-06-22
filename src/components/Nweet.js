import React,{useState} from 'react';
import { dbService, storageService } from '../fBase';

const Nweet = ({nweetObj, isOwner}) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text)
  const onDeleteClick = async () => {
    const ok = window.confirm('삭제하겠습니다. ok?');
    if(ok){
      //delete
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    } else {
      // not delete

    }
    console.log(ok);

  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    console.log(nweetObj, newNweet)
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text:newNweet
    })
    setEditing(false);
  }
  const onChange = (event) => {
    const {target: {value}} = event;
    setNewNweet(value);
  }
  return (
    <div>
      {editing ? (
        <>
          {isOwner &&
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Edit your nweet"
                  value={newNweet}
                  required
                  onChange={onChange}
                />
                <input
                  type="submit"
                  value="Update Nweet"
                />
              </form>
              <button>edit</button>
              <button onClick={toggleEditing}>cancel</button>
        </>}
          
        </>
      ) : (
        <>
          <div>
              {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} alt={nweetObj.text} />}
              <h4>{nweetObj.text}</h4>
              {isOwner && (
                <>
                  <button onClick={onDeleteClick}>delete nweet</button>
                  <button onClick={toggleEditing}>edit nweet</button>
                </>
              )}
          </div>
        </>
      )}
    </div>
  )
};


export default Nweet;