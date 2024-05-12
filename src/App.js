import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ProductDetail from './Screens/Product_detail';
import HomeScreen from './Screens/HomeScreeen';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartScreen from './Screens/CartScreen';
import LoginSingup from './Screens/LoginSingup';
import Singup from './Screens/Singup';
import Mens from './Screens/Mens';
import Womens from './Screens/Womens';
import Kids from './Screens/Kids';
import Alert from './Components/Alert';
import { useSelector } from 'react-redux';
import Admin from './Screens/Admin';
import AdminNavbar from './Components/AdminNavbar';
import AdminProductDetails from './Screens/AdminProductDetails';
import ThankyouScreen from './Screens/ThankyouScreen';
function App() {
  const alert = useSelector(state => state.alertreduser);
  return (
    <BrowserRouter>
    <Alert message={alert.message} type={alert.type} />
    {localStorage.getItem('role')==="admin"
    ?<AdminNavbar/>
    :<Navbar/>
    }
    <Routes>
      <Route exact path='/' element={<HomeScreen/>}/>
      <Route path='/productdetails' element={<ProductDetail/>}/>
      <Route path='/cartScreen' element={<CartScreen/>}/>
      <Route path='/login' element={<LoginSingup/>}/>
      <Route path='/singup' element={<Singup/>}/>
      <Route path='/mens' element={<Mens/>}/>
      <Route path='/womens' element={<Womens/>}/>
      <Route path='/kids' element={<Kids/>}/>
      <Route path='/adminadditem' element={<Admin/>}/>
      <Route path='/admin' element={<AdminProductDetails/>}/>
      <Route path='/thankyou' element={<ThankyouScreen/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
