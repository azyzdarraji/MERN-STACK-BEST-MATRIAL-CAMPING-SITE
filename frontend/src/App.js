import './App.css';
import React ,{useEffect} from "react";
import Header from "./component/layout/Header/Header.js" ;
import Footer from "./component/layout/Footer/Footer.js";
import {BrowserRouter,Routes,Route} from 'react-router-dom' ;
import WebFont from "webfontloader" ;
import Home  from  "./component/Home/Home.js"; 
import ProductDetails from  "./component/Product/ProductDetails.js" ;
import Products from "./component/Product/Products.js" ;
import Search from "./component/Product/Search.js" ;
import LoginSignUp from "./component/User/LoginSignUp" ;
import store from "./redux/store" ;
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from 'react-redux';
import PrivateRoute from './router/PrivateRoute';
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgetPassword from "./component/User/ForgetPassword"
import ResetPassword  from './component/User/ResetPassword '


function App() { 

  const {isAuthenticated,user} = useSelector ((state)=>state.user)

useEffect(()=>{
  WebFont.load({
    google:{
      families: ["Roboto", "Droid Sans", "Chilanka"],
    },
  })
  store.dispatch(loadUser());

  },[])
    return ( 
      <BrowserRouter>
      
      <Header/>
      {isAuthenticated && <UserOptions user={user} />}
       <Routes>

         <Route path="/" element={<Home />} />

         <Route path="/product/:id" element={<ProductDetails/>} />

         <Route path="/products" element={<Products/>} />
         <Route path="/products/:keyword" element={<Products/>} />

         <Route path="/search" element={<Search/>} />

         <Route path="/login" element={<LoginSignUp/>} />

         <Route path='/account' element={

            <PrivateRoute >

                <Profile />

            </PrivateRoute>
                                } /> 
 
          <Route path='/me/update' element={

            <PrivateRoute >

                <UpdateProfile />

            </PrivateRoute>
                                } /> 



        <Route path='/password/update' element={

           <PrivateRoute >

               <UpdatePassword />
    
           </PrivateRoute>
                                } /> 
                        

       <Route path='/password/forget' element={

           <PrivateRoute >

               <ForgetPassword /> 

          </PrivateRoute>
                    } /> 



        
       <Route path='/password/reset/:token' element={

            <PrivateRoute >

          <ResetPassword />

    

          </PrivateRoute>
         } />             

         </Routes> 
         
         <Footer />

      </BrowserRouter>
    

    );
}

export default App;