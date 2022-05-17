import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Success from './pages/Success';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector(state => state.user.currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" exact />
        <Route element={<ProductCategory />} path="/products/:category" />
        <Route element={<ProductDetails />} path="/product/:id" />
        <Route element={<Cart />} path="/cart" />
        <Route element={user ? <Navigate to="/" /> : <Login />} path="/login" />
        <Route
          element={user ? <Navigate to="/" /> : <Register />}
          path="/register"
        />
        <Route element={<Success />} path="/success" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
