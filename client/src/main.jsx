import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Quiz from './pages/Quiz.jsx'
import Results from './pages/Results.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
