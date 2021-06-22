import React, { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile';

import Navigation from './Navigation';

const AppRouter = ({isLoggedIn, userObj}) => {
  
  return(
    <Router>
      {isLoggedIn && <Navigation userObj={userObj}/>}
      <Switch>
        {isLoggedIn 
          ? <>
            <Route exact path='/'><Home userObj={userObj} /></Route>
            <Route exact path='/profile'><Profile userObj={userObj} /></Route>
          </>
          : <>
            <Route exact path='/'><Auth /></Route>
          </>}
      </Switch>
    </Router>
  )
}

// <> </> 빈꺽쇠 : fragment
// 여러 가지 요소를 한 페이지에서 렌더링 하고 싶은데,
// html 요소로 묶기는 싫을 때 사용

export default AppRouter;