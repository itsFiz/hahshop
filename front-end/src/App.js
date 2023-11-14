// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductCards from './glassmorphism/ProductCards'
import UploadFile from './UploadFile'
import NavBar from './components/NavBar'
import ShoppingCart from './components/ShoppingCart'
import Header from './NavbarComponent/Header'
import VideoBackground from './components/VideoBackground'

function App() {
  return (
    <div>
      <Router>
        <div>
          <NavBar />
          <Routes>
            {' '}
            {/* Change this line */}
            <Route path="/" element={<VideoBackground />} />{' '}
            {/* Change this line */}
            {/* Add more routes for other sections of your landing page */}
          </Routes>{' '}
          {/* Change this line */}
        </div>
      </Router>

      {/* <ProductCards></ProductCards> */}
      {/* <NavBar></NavBar> */}
      {/* <UploadFile></UploadFile>
      <ShoppingCart></ShoppingCart> */}
    </div>

    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/login" element={<LoginPage />} />
    //     <Route path="/register" element={<RegisterPage />} />
    //     {/* USER PAGES */}
    //     <Route path="/productlisting" element={<ProductListingPage />} />
    //     <Route path="/productdetails" element={<ProductDetailsPage />} />
    //     <Route path="/addtocart" element={<CartPage />} />
    //     <Route path="/checkoutpage" element={<CheckoutPage />} />
    //     <Route path="/userprofile" element={<UserProfile />} />
    //     {/* SELLER PAGES */}
    //     <Route path="/sellerdashboard" element={<SellerDashboard />} />
    //     <Route path="/productmanagement" element={<ProductManagement />} />
    //     <Route path="/productmanagement" element={<ProductManagement />} />
    //     {/* ADMIN PAGES */}
    //     <Route path="/adminportal" element={<AdminPortal />} />
    //     <Route path="/adminportal" element={<Seller />} />

    //     {/* EXCEPTION PAGE */}
    //     <Route path="/exception" element={<Exception />} />

    //   </Routes>
    // </Router>
  )
}

export default App
