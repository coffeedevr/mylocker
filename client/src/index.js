import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import NotFound from './pages/404/NotFound';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Footer from './components/layout/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Navigate to="/dashboard" />
        } />
        <Route path="/dashboard/*" element={<App />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path="*"  element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    <Footer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
