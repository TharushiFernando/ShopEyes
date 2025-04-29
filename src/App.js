import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './components/css/header.css';
import './components/css/common.css';

// import AllEmployees from './components/AllEmployees'; // need change
import AllItems from './components/AllItems';
import AddItem from './components/AddItem';
import UpdateItem from './components/UpdateItem'

import EmpHeader from './components/header';
import HomePage from './components/Home';
import Signin from './components/SignIn';
import Signup from './components/SignUp';
import Navigation from './components/Navigation';
import UpdateNavigation from './components/UpdateNavigation';

import AudioUpload from './components/AudioUpload'; //audio

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>

        <NavBar />

        <div className="">
          <Routes>
            {/* <Route path='/' exact Component={AllEmployees}></Route> */}
            <Route path='/item' exact Component={AllItems}></Route>
            <Route path='/' exact Component={HomePage}></Route>
            <Route path='/signIn' exact Component={Signin}></Route>
            <Route path='/navigation' exact Component={Navigation}></Route>
            <Route path='/signUp' exact Component={Signup}></Route>
            <Route path='/upload' exact Component={AudioUpload}></Route>
            <Route path='/item/add' exact Component={AddItem}></Route>
            <Route path='item/get/:id' exact Component={UpdateItem}></Route>
            <Route path='navigation/get/:id' exact Component={UpdateNavigation}></Route>
          </Routes>
        </div>

      </BrowserRouter>
    );
  }
}


function NavBar() {
  const location = useLocation();

  if (location.pathname.startsWith('/item') || location.pathname.startsWith('/') || location.pathname.startsWith('/') || location.pathname.startsWith('/')) {
    return <EmpHeader />;
  } else {
    return;
  }
}