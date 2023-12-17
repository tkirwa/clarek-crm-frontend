import React from 'react';
import './App.css'; // Assuming you have a CSS file for styling

import { Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import PrivateRoutes from './utils/PrivateRoutes';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className='container mx-auto max-w-screen-xl'>
      <Header/>
          <Routes>
            <Route element={<PrivateRoutes />}>
                {/* <Route element={<Home/>} path="/" exact/> */}
                {/* <Route element={<Products/>} path="/products"/> */}
            </Route>
            <Route element={<LandingPage/>} path="/"/>
            <Route element={<Login/>} path="/login"/>
            <Route element={<Signup/>} path="/signup"/>
          </Routes>
          <Footer/>
    </div>
  );
}

export default App;