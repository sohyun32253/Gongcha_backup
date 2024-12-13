import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import Header from './components/Header'
import Content from './components/Content.js'
import MenuDrink from './components/MenuDrink.js'
import Footer from './components/Footer.js'
import Login from './components/Login.js'
import Join from './components/Join.js'
import Mypage from './components/Mypage.js'
import Store from './components/Store.js'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
       <Router basename="/Gongcha">
        <div className="App">
          <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/MenuDrink" element={<MenuDrink />} />
            <Route path="/Login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/Join" element={<Join />} />
            <Route path="/Mypage" element={<Mypage />} />
            <Route path="/Store" element={<Store />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
