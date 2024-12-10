import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verify from "./pages/Verify";
import { UserData } from "./context/UserContext";
import Loader from "./components/Loader";
import Accounts from "./pages/Accounts";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment.jsx";

const App = () => {
  const { loading, isAuth, user } = UserData();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route path="/cart" element={isAuth ? <Cart /> : <Login />} />
            <Route
              path="/account"
              element={isAuth ? <Accounts user={user} /> : <Login />}
            />
            <Route
              path="/checkout"
              element={isAuth ? <Checkout /> : <Login />}
            />
            <Route
              path="/payment/:id"
              element={isAuth ? <Payment /> : <Login />}
            />

            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
          </Routes>
        </BrowserRouter>
      )}
      ,
    </>
  );
};

export default App;
