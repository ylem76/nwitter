import React, { useEffect, useState } from 'react';
import { authService, dbService } from '../fBase';
import {useHistory} from 'react-router-dom';

function Profile({ userObj, refreshUser }) {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  
  const onLogOutClick = () => {
    authService.signOut();   
    history.push('/');
  }
  const getMyNweets = async() => {
    await dbService
      .collection('nweets')
      .where('creatorId', '==', userObj.uid)
      .orderBy('createdAt', 'desc')
      .get();
  }

  useEffect(() => {
    getMyNweets();
  }, []);

  const onSubmit = async(event) => {
    event.preventDefault();
    if(userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({displayName : newDisplayName});
      refreshUser();
    }
  }
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