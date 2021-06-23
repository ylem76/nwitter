import React,{useState} from 'react';
import { dbService, storageService } from '../fBase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="nweet">
      {editing ? (
        <>
          {isOwner &&
            <>
              <form onSubmit={onSubmit} className="container nweetEdit">
                <input
                  type="text"
                  placeholder="Edit your nweet"
                  value={newNweet}
                  required
                  autoFocus
                  onChange={onChange}
                  className="formInput"
                />
                <input
                  type="submit"
                  value="Update Nweet"
                  className="formBtn"
                />
              </form>
              <button>edit</button>
              <button onClick={toggleEditing}>cancel</button>
              <span onClick={toggleEditing} className="formBtn cancelBtn">
                Cancel
              </span>
        </>}
          
        </>
      ) : (
        <>
          <div>
              <h4>{nweetObj.text}</h4>
              {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} alt={nweetObj.text} />}
              {isOwner && (
                <div className="nweet__actions">
                  <span onClick={onDeleteClick}>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                  <span onClick={toggleEditing}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </span>
                </div>
              )}
          </div>
        </>
      )}
    </div>
  )
};


export default Nweet;