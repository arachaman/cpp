import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LandingPages from "./pages/LandingPage";
import Login from './pages/Login'
import Register from "./pages/Register";
import Dashboard from "./pages/admin/Dashboard";
import Category from "./pages/Category";
import ManageOrder from "./pages/admin/ManageOrder";
import ManageCategory from "./pages/admin/ManageCategory";
import reportWebVitals from "./reportWebVitals";
import AddProd from "./pages/admin/AddProd";
import EditProd from "./pages/admin/EditProd"
import Auth from "./components/wrapper/Auth";
import LoginAdmin from "./pages/admin/LoginAdmin"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<LandingPages />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<Product />} />
          <Route path="/category" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/loginadmin" element={<LoginAdmin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/category" element={<ManageCategory />} />
          <Route path="/dashboard/manageorder" element={<ManageOrder />} />
          <Route path="/dashboard/addproduct" element={<AddProd />} />
          <Route path="/dashboard/editproduct" element={<EditProd />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
