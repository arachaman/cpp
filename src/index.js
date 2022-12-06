import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LandingPages from "./pages/LandingPage";
import Login from './pages/Login'
import Register from "./pages/Register";
import Category from "./pages/Category";
import Dashboard from "./pages/admin/Dashboard";
import ManageOrder from "./pages/admin/ManageOrder";
import ManageCategory from "./pages/admin/ManageCategory";
import reportWebVitals from "./reportWebVitals";
import AddProd from "./pages/admin/AddProd";
import EditProd from "./pages/admin/EditProd"
import LoginAdmin from "./pages/admin/LoginAdmin"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRouteUser from "./components/ProtectedRoute/ProtectedRouteUser";
import ProtectedRouteAdmin from "./components/ProtectedRoute/ProtectedRouteAdmin";
import Cart from "./pages/user/Cart";
import Payment from "./pages/user/Payment";
import AddCategory from "./pages/admin/AddCategory";
import EditCategory from "./pages/admin/EditCategory";
import CartProvider from "./context/cart/CartProvider";
import PaymentNow from "./pages/user/PaymentNow";
import ListProducts from "./pages/ListProducts";
import ListCategories from "./pages/ListCategories";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <AuthContextProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<App />}>
                <Route path="/" element={<LandingPages />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/category/:id" element={<Category />} />
                <Route path="/listproducts" element={<ListProducts />} />
                <Route path="/listcategories" element={<ListCategories />} />
                <Route path="/loginadmin" element={<LoginAdmin />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRouteAdmin>
                      <Dashboard />
                    </ProtectedRouteAdmin>
                  } 
                />
                <Route 
                  path="/dashboard/category" 
                  element={
                    <ProtectedRouteAdmin>
                      <ManageCategory />
                    </ProtectedRouteAdmin>
                  } 
                />
                <Route 
                  path="/dashboard/addcategory" 
                  element={
                    <ProtectedRouteAdmin>
                      <AddCategory />
                    </ProtectedRouteAdmin>
                  } 
                />
                <Route 
                  path="/dashboard/manageorder" 
                  element={
                    <ProtectedRouteAdmin>
                      <ManageOrder />
                    </ProtectedRouteAdmin>
                  } 
                />
                <Route 
                  path="/dashboard/addproduct" 
                  element={
                    <ProtectedRouteAdmin>
                      <AddProd />
                    </ProtectedRouteAdmin>
                  } 
                />
                <Route 
                  path="/dashboard/editproduct" 
                  element={
                    <ProtectedRouteAdmin>
                      <EditProd />
                    </ProtectedRouteAdmin>
                  } 
                />
                <Route 
                  path="/dashboard/editcategory" 
                  element={
                    <ProtectedRouteAdmin>
                      <EditCategory />
                    </ProtectedRouteAdmin>
                  } 
                />
                <Route
                  path='/user/cart'
                  element={
                    <ProtectedRouteUser>
                      <Cart />
                    </ProtectedRouteUser>
                  }
                />
                <Route
                  path='/user/payment'
                  element={
                    <ProtectedRouteUser>
                      <Payment />
                    </ProtectedRouteUser>
                  }
                />
                <Route
                  path='/user/paymentnow/:id'
                  element={
                    <ProtectedRouteUser>
                      <PaymentNow />
                    </ProtectedRouteUser>
                  }
                />
              </Route>
            </Routes>
          </CartProvider>
        </AuthContextProvider>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
