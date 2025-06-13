import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Quiz from './pages/Quiz.jsx'
import Results from './pages/Results.jsx'
import './index.css'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/quiz" element={
            <ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/results" element={<ProtectedRoute>
          <Results />
        </ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProtectedRoute>
        <Profile />
      </ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
