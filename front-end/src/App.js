import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './NavbarComponent/Header'
import AdminRegisterForm from './UserComponent/AdminRegisterForm'
import UserLoginForm from './UserComponent/UserLoginForm'
import UserRegister from './UserComponent/UserRegister'
import AboutUs from './PageComponent/AboutUs'
import HomePage from './PageComponent/HomePage'
import AddCategoryForm from './CategoryComponent/AddCategoryForm'
import AddProductForm from './ProductComponent/AddProductForm'
import Product from './ProductComponent/Product'
import AddProductReview from './ReviewComponent/AddProductReview'
import GetProductReviews from './ReviewComponent/GetProductReviews'
import SellerProducts from './ProductComponent/SellerProducts'
import ViewSellerProducts from './ProductComponent/ViewSellerProducts'
import UpdateProductForm from './ProductComponent/UpdateProductForm'
import ViewAllCategories from './CategoryComponent/ViewAllCategories'
import UpdateCategoryForm from './CategoryComponent/UpdateCategoryForm'
import ViewAllProducts from './ProductComponent/ViewAllProducts'
import AddCardDetails from './OrderComponent/AddCardDetails'
import ViewMyOrders from './OrderComponent/ViewMyOrders'
import ViewAllOrders from './OrderComponent/ViewAllOrders'
import ViewSellerDeliveryPerson from './UserComponent/ViewSellerDeliveryPerson'
import ViewSellerOrders from './OrderComponent/ViewSellerOrders'
import ViewAllSellers from './UserComponent/ViewAllSellers'
import ViewAllDeliveryPersons from './UserComponent/ViewAllDeliveryPersons'
import ViewAllCustomers from './UserComponent/ViewAllCustomers'
import ViewDeliveryOrders from './OrderComponent/ViewDeliveryOrders'
import ViewMyCart from './CartComponent/ViewMyCart'
import Sidebar from './Adminside/pages/global/SideBar'
import Dashboard from './Adminside/pages/dashboard/dashboard'
import Category from './Adminside/pages/category/category'
import Bar from './Adminside/pages/bar/bar'
import Form from './Adminside/pages/form/form'
import Line from './Adminside/pages/line/line'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ColorModeContext, useMode } from './theme'
import Allorders from './Adminside/pages/orders/Allorder'
import Allproduct from './Adminside/pages/product/Allproduct'
import Allseller from './Adminside/pages/seller/Allseller'
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import ProductCards from './glassmorphism/ProductCards'
import UploadFile from './UploadFile'
import NavBar from './components/NavBar'
import ShoppingCart from './components/ShoppingCart'
import Header from './NavbarComponent/Header'
import LoginPage from './pages/Auth/LoginPage'

function App() {
  const [theme, colorMode] = useMode()
  const [isSidebar, setIsSidebar] = useState(true)
  const navigate = useNavigate()

  const user = JSON.parse(sessionStorage.getItem('active-customer'))
  const admin = JSON.parse(sessionStorage.getItem('active-admin'))
  const seller = JSON.parse(sessionStorage.getItem('active-seller'))

  // Redirect to /dashboard if the user is an admin
  // useEffect(() => {
  //   if (admin && admin.role === "Admin") {
  //     navigate("/dashboard");
  //   }
  // }, [admin, navigate]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {admin && admin.role === 'Admin' && <Sidebar />}
          {/* <Sidebar isSidebar={isSidebar} /> */}
          <main className="content">
            {/* <Topbar setIsSidebar={setIsSidebar} /> */}
            {admin && admin.role !== 'Admin' && <Header />}
            <Header />
            <Routes>
              {/* <Route path="/login" element={<LoginPage />} /> */}
              <Route path="/home" element={<HomePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/category" element={<Category />} />

              <Route path="/allorder" element={<Allorders />} />
              <Route path="/allproduct" element={<Allproduct />} />
              <Route path="/allseller" element={<Allseller />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/line" element={<Line />} />
              {/* <Route path="/adminregister" element={<AdminRegisterForm />} /> */}
              {/* <Route path="/viewallseller" element={<ViewAllSellers />} /> */}

              {/* .................................. */}
              <Route path="/" element={<HomePage />} />
              <Route path="/homepage" element={<HomePage />} />
              <Route
                path="/user/admin/register"
                element={<AdminRegisterForm />}
              />
              <Route path="/user/login" element={<UserLoginForm />} />
              <Route
                path="/user/customer/register"
                element={<UserRegister />}
              />
              <Route path="/user/seller/register" element={<UserRegister />} />
              <Route
                path="/seller/delivery/register"
                element={<UserRegister />}
              />
              <Route path="/aboutus" element={<AboutUs />} />

              <Route
                path="/product/category/:categoryId/:categoryName"
                element={<HomePage />}
              />
              <Route path="/category/add" element={<AddCategoryForm />} />
              <Route path="/product/add" element={<AddProductForm />} />
              <Route
                path="/product/:productId/category/:categoryId"
                element={<Product />}
              />
              <Route
                path="/product/:productId/review/add"
                element={<AddProductReview />}
              />
              <Route
                path="/product/review/fetch"
                element={<GetProductReviews />}
              />

              <Route
                path="/product/seller/:sellerId/:sellerName"
                element={<SellerProducts />}
              />
              <Route
                path="/product/seller/:sellerId/:sellerName/category/:categoryId/:categoryName"
                element={<SellerProducts />}
              />
              <Route
                path="/seller/product/all"
                element={<ViewSellerProducts />}
              />
              <Route
                path="/seller/product/update"
                element={<UpdateProductForm />}
              />
              <Route
                path="/admin/category/all"
                element={<ViewAllCategories />}
              />
              <Route
                path="/admin/category/update"
                element={<UpdateCategoryForm />}
              />
              <Route path="/admin/product/all" element={<ViewAllProducts />} />
              <Route
                path="/customer/order/payment"
                element={<AddCardDetails />}
              />
              <Route path="/customer/cart" element={<ViewMyCart />} />
              <Route path="/customer/order" element={<ViewMyOrders />} />
              <Route path="/admin/order/all" element={<ViewAllOrders />} />
              <Route
                path="/seller/delivery-person/all"
                element={<ViewSellerDeliveryPerson />}
              />
              <Route path="/seller/order/all" element={<ViewSellerOrders />} />
              <Route path="/admin/seller/all" element={<ViewAllSellers />} />
              <Route
                path="/admin/delivery-person/all"
                element={<ViewAllDeliveryPersons />}
              />
              <Route
                path="/admin/customer/all"
                element={<ViewAllCustomers />}
              />
              <Route
                path="/delivery-person/order/all"
                element={<ViewDeliveryOrders />}
              />
              {/* .................................. */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    // <div>
    //   <Header />
    //   <Routes>
    //     <Route path="/" element={<HomePage />} />
    //     <Route path="/home" element={<HomePage />} />
    //     <Route path="/user/admin/register" element={<AdminRegisterForm />} />
    //     <Route path="/user/login" element={<UserLoginForm />} />
    //     <Route path="/user/customer/register" element={<UserRegister />} />
    //     <Route path="/user/seller/register" element={<UserRegister />} />
    //     <Route path="/seller/delivery/register" element={<UserRegister />} />
    //     <Route path="/aboutus" element={<AboutUs />} />

    //     <Route
    //       path="/product/category/:categoryId/:categoryName"
    //       element={<HomePage />}
    //     />
    //     <Route path="/category/add" element={<AddCategoryForm />} />
    //     <Route path="/product/add" element={<AddProductForm />} />
    //     <Route
    //       path="/product/:productId/category/:categoryId"
    //       element={<Product />}
    //     />
    //     <Route
    //       path="/product/:productId/review/add"
    //       element={<AddProductReview />}
    //     />
    //     <Route path="/product/review/fetch" element={<GetProductReviews />} />

    //     <Route
    //       path="/product/seller/:sellerId/:sellerName"
    //       element={<SellerProducts />}
    //     />
    //     <Route
    //       path="/product/seller/:sellerId/:sellerName/category/:categoryId/:categoryName"
    //       element={<SellerProducts />}
    //     />
    //     <Route path="/seller/product/all" element={<ViewSellerProducts />} />
    //     <Route path="/seller/product/update" element={<UpdateProductForm />} />
    //     <Route path="/admin/category/all" element={<ViewAllCategories />} />
    //     <Route path="/admin/category/update" element={<UpdateCategoryForm />} />
    //     <Route path="/admin/product/all" element={<ViewAllProducts />} />
    //     <Route path="/customer/order/payment" element={<AddCardDetails />} />
    //     <Route path="/customer/cart" element={<ViewMyCart />} />
    //     <Route path="/customer/order" element={<ViewMyOrders />} />
    //     <Route path="/admin/order/all" element={<ViewAllOrders />} />
    //     <Route
    //       path="/seller/delivery-person/all"
    //       element={<ViewSellerDeliveryPerson />}
    //     />
    //     <Route path="/seller/order/all" element={<ViewSellerOrders />} />
    //     <Route path="/admin/seller/all" element={<ViewAllSellers />} />
    //     <Route
    //       path="/admin/delivery-person/all"
    //       element={<ViewAllDeliveryPersons />}
    //     />
    //     <Route path="/admin/customer/all" element={<ViewAllCustomers />} />
    //     <Route
    //       path="/delivery-person/order/all"
    //       element={<ViewDeliveryOrders />}
    //     />
    //   </Routes>
    // </div>
  )
}

export default App
