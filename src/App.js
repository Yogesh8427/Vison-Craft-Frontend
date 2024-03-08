import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Product_detail from './Screens/Product_detail';
import HomeScreen from './Screens/HomeScreeen';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartScreen from './Screens/CartScreen';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route exact path='/' element={<HomeScreen/>}/>
      <Route path='/productdetails' element={<Product_detail/>}/>
      <Route path='/cartScreen' element={<CartScreen/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
