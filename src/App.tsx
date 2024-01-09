// App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import { AuthProvider } from './auth/AuthContext';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/Dashboard';
import Analytics from './components/stats/Analytics';
import Profile from './components/auth/Profile';
import About from './components/About';
import Homepage from './components/Homepage';
import Header from './components/Header';
import LaunchComplaint from './components/complaints/LaunchComplaint';
import ComplaintList from './components/complaints/ComplaintList';
import UsersList from './components/users/UsersList';
import ForgotPassword from './components/auth/ForgotPassword';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route element={<Homepage />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<ForgotPassword />} path="/forgot-password" />
          <Route element={<Signup />} path="/signup" />
          <Route element={<About />} path="/about" />
          <Route path="/dashboard/*" element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
            <Route path="complaints_list" element={<ComplaintList />} />
            <Route path="users" element={<UsersList />} />
            <Route path="stats" element={<Analytics />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/launch_complaint/*" element={<PrivateRoute />}>
            <Route index element={<LaunchComplaint />} />
            {/* <Route path="complaints_list" element={<ComplaintList />} /> */}
            {/* <Route path="profile" element={<Profile />} /> */}
          </Route>
          {/* Add other routes as needed */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
