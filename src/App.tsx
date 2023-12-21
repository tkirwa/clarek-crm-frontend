// App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import { AuthProvider } from './auth/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Analytics from './components/stats/Analytics';
import Profile from './components/Profile';
import About from './components/About';
import Homepage from './components/Homepage';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route element={<Homepage />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<Signup />} path="/signup" />
          <Route element={<About />} path="/about" />
          <Route path="/dashboard/*" element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
            <Route path="stats" element={<Analytics />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          {/* Add other routes as needed */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
