import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import './index.scss';

// import layout component
import Layout from './components/Layout';

// import pages for routing
import HomePage from "./components/pages/Home";
import MessagePage from "./components/pages/Messages";
import ProfilePage from "./components/pages/Profile";
import OverviewPage from "./components/pages/Overview";
import LoginPage from "./components/pages/Login";
import RegisterPage from "./components/pages/Register";

import { database } from "./database/database";

var Auth = false;

database.auth().onAuthStateChanged( firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser.uid);
    Auth = true;
    hashHistory.replace('/');
  } else {
    console.log("not logged in");
    Auth = false;
    hashHistory.replace('/login');
  }
});

// check before entering page
function requireAuth(nextState, replace) {
  if (Auth === false) {
    replace({
      pathname: '/login'
    })
  }
}

function requireUnAuth(nextState, replace) {
  if (Auth === true) {
    replace({
      pathname: '/'
    })
  }
}

// render and configure routes
ReactDOM.render(
  <Router history={ hashHistory }>
    <Route path="/" component={ Layout } onEnter={requireAuth}>
      <IndexRoute component={ HomePage }></IndexRoute>
      <Route path="messages" component={ MessagePage } ></Route>
      <Route path="profile" component={ ProfilePage }></Route>
      <Route path="overview" component={ OverviewPage }></Route>
    </Route>
    <Route path="/login" component={ LoginPage } onEnter={requireUnAuth}></Route>
    <Route path="/register" component={ RegisterPage } onEnter={requireUnAuth}></Route>
  </Router>,
  document.getElementById('root')
);
