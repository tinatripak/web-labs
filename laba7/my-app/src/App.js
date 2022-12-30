import MyPage from './MyPage'
import Products from './components/Products/Products'
import React from 'react';
import Menu from './Menu';
import "./myPage.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (<Router>
    <div>
      <Routes>
        <Route index path="/" element={<Menu />} />
        <Route path="/home" element={<MyPage />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;