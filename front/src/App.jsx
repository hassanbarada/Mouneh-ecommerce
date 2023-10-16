import React from "react";
import {Routes,Route,Outlet} from 'react-router-dom'
import Navbar from "./Components/NAVBAR/Navbar";
import Home from './Components/HOME/Home'
import Contact from "./Components/CONTACT/Contact";
import AboutUs from "./Components/ABOUT/About";
import Footer from "./Components/FOOTER/Footer";
import Product from "./Components/PRODUCT/Product";
import ShowProducts from "./Components/PRODUCTS/ShowProduct";
import Register from "./Components/AUTHENTICATION/Register";
import Login from "./Components/AUTHENTICATION/Login";
import Editprofile from "./Components/EDITPROFILE/Editprofile";
import Forgotpassword from "./Components/AUTHENTICATION/Forgotpassword";
import Resetpassword from "./Components/AUTHENTICATION/Resetpassword";
import Cart from "./Components/CART/Cart";
import CheckoutSuccess from "./Components/CART/CheckoutSuccess";
import AllWorkshops from './Components/WORKSHOPS/AllWorkshops';
import SingleWorkshop from './Components/WORKSHOPS/SingleWorkshop';
import { RegisterForm } from "./Components/WORKSHOPREGISTER/RegisterForm";
import RegisterSuccess from "./Components/WORKSHOPREGISTER/RegisterSuccess";
import { ChatComponent } from "./Components/CHAT/ChatComponent";
import UserChat from "./Components/UserChat/UserChat";
import AddProduct from "./Components/ADDPRODUCT/AddProduct";
import AdminDashboard from './Components/ADMIN/AdminDashboard';
import UpdateProduct from './Components/ADMIN/updateproduct';
import Products from './Components/ADMIN/Allproduct';
import CreateProduct from './Components/ADMIN/createproduct';
import Users from './Components/ADMIN/users';
import AllWorkshop from './Components/ADMIN/allworkshop';
import CreateWorkshop from './Components/ADMIN/createworkshop';
import MyProducts from "./Components/PRODUCTS/showmyproducts";
import UpdatemyProduct from"./Components/PRODUCTS/updateproduct";
import Waiting from './Components/ADMIN/waitingproduct';
import UserWorkshop from './Components/ADMIN/userworkshop';
import { useLocation } from "react-router-dom";
import NotFound from "./Components/PageNotFound/404";
function App(){
    const location = useLocation();
    const isMyChatRoute = location.pathname.includes('/mychat') || location.pathname.includes('/chat/') ;
    const isRegisterSuccessRoute = location.pathname.includes('/workshop/register-success/');
    const isNotFoundRoute = location.pathname.includes('*'); 
    const isAdminRoute = location.pathname.includes('/dashboard/admin/*');

    const shouldDisplayNavbar = !isNotFoundRoute || isAdminRoute;
    const shouldDisplayFooter = !isNotFoundRoute || isAdminRoute;

    return (
    <>
            {shouldDisplayNavbar  && <Navbar />}
    <Routes>
       
        <Route path="/" element={<Home />}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/about" element={<AboutUs/>}></Route>
        <Route path="/product/:productID" element={<Product/>}></Route>
        <Route path="/updateproduct/:productID" element={<UpdatemyProduct/>}></Route>
        <Route path="/showProducts/:Category" element={<ShowProducts />}></Route>
        <Route path="/myProducts" element={<MyProducts />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/editprofile" element={<Editprofile />}></Route>
        <Route path="/forgot-password" element={<Forgotpassword />}></Route>
        <Route path="/reset_password/:id/:token" element={<Resetpassword />}></Route>
        <Route path="/Cart" element={<Cart />}></Route>
        <Route path="/checkout-success" element={<CheckoutSuccess />}></Route>
        <Route path="/workshops" element={<AllWorkshops />} />
        <Route path="/workshop/:id" element={<SingleWorkshop />} />
        <Route path="/workshop/register" element={<RegisterForm />} />
        <Route path="/workshop/register-success/:capacity/:workshopID" element={<RegisterSuccess />} />
        <Route path="/chat/:workshopid" element={<ChatComponent />} />
        <Route path="/mychat" element={<UserChat />} />
        <Route path="/addproduct" element={<AddProduct />}></Route>
        <Route path="/dashboard/admin/*" element={<AdminDashboard />} />
        <Route path="/dashboard/admin/createproduct" element={<CreateProduct />} />
        <Route path="/dashboard/admin/products" element={<Products />} />
        <Route path="/dashboard/admin/product/update/:userId/:productId" element={<UpdateProduct />} />
        <Route path="/dashboard/admin/create-workshop" element={<CreateWorkshop />} />
        <Route path="/dashboard/admin/users" element={<Users />} />
        <Route path="/dashboard/admin/allworkshop" element={<AllWorkshop />} />
        <Route path="/dashboard/admin/userworkshop" element={<UserWorkshop />} />
        <Route path="/dashboard/admin/waitingproduct" element={<Waiting/>} />
        <Route path="/*" element={<NotFound />} />
    </Routes>
    {shouldDisplayFooter && <Footer isFixed={isMyChatRoute  && !isRegisterSuccessRoute}/>}
    </>
    )
}

export default App;