import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';
import styled from 'styled-components';
import Book from './pages/Book';
import Cart from './pages/Cart';

function App() {
  return (
    <AppDiv className="App">
      <BrowserRouter>
      <Header/>

        <Routes>

          <Route path='/' element={<Home/>}/>
          <Route path='/wishlist' element={<Wishlist/>}/>
          <Route path='/book/:id' element={<Book/>}/>
          <Route path='/cart' element={<Cart/>}/>



        </Routes>
      </BrowserRouter>
    </AppDiv>
  );
}

export default App;
const AppDiv = styled.div`
  overflow-x: hidden;

    width: 90%;
    margin: 0 auto;
    padding-bottom: 50px;
`
