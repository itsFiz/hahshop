import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProductCards from './glassmorphism/ProductCards';
import UploadFile from './UploadFile';
import NavBar from './components/NavBar';
import ShoppingCart from './components/ShoppingCart';
import Header from './NavbarComponent/Header';
import UserLogin from './UserModule/UserLogin';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        {/* Uncomment the components you want to render */}
        {/* <ProductCards /> */}
        {/* <UploadFile /> */}
        {/* <ShoppingCart /> */}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        {/* USER PAGES */}
        { <Route path="/register" element={<RegisterPage />} /> }
        {/* <Route path="/productlisting" element={<ProductListingPage />} /> */}
        {/* <Route path="/productdetails" element={<ProductDetailsPage />} /> */}
        {/* <Route path="/addtocart" element={<CartPage />} /> */}
        {/* <Route path="/checkoutpage" element={<CheckoutPage />} /> */}
        {/* <Route path="/userprofile" element={<UserProfile />} /> */}
        {/* SELLER PAGES */}
        {/* <Route path="/sellerdashboard" element={<SellerDashboard />} /> */}
        {/* <Route path="/productmanagement" element={<ProductManagement />} /> */}
        {/* ADMIN PAGES */}
        {/* <Route path="/adminportal" element={<AdminPortal />} /> */}
        {/* <Route path="/adminportal" element={<Seller />} /> */}
        {/* EXCEPTION PAGE */}
        {/* <Route path="/exception" element={<Exception />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
