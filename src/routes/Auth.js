import React from 'react';
import {authService, firebaseInstance} from '../fBase';
import AuthForm from '../components/AuthForm';

const Auth = () => {
        const onSicialClick = async(event) => {
          const {target:{name}} = event;
          let provider;
          if(name==='google') {
            provider = new firebaseInstance.auth.GoogleAuthProvider();

          } else if (name ==='github') {
            provider = new firebaseInstance.auth.GithubAuthProvider();
          }
          await authService.signInWithPopup(provider);
        }
  return (
    <div>
      <AuthForm />
      <div>
        <button onClick={onSicialClick} name="google">Continue with Google</button>
        <button onClick={onSicialClick} name="github">Continue with Github</button>
      </div>
    </div>
  )
}

export default Auth;