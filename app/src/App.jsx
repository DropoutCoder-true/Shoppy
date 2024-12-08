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

const App = () => {
  const { loading, isAuth } = UserData();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
