import React, { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';

const AppRouter = ({isLoggedIn}) => {
  
  return(
    <Router>
      <Switch>
        {isLoggedIn 
          ? <>
            <Route exact path='/'><Home /></Route>
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