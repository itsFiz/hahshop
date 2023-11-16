import Sidebar from "../Adminside/pages/global/SideBar";
import AdminHeader from "./AdminHeader";

import HeaderUser from "./HeaderUser";
import NormalHeader from "./NormalHeader";
import SellerHeader from "./SellerHeader";

const RoleNav = () => {
  const user = JSON.parse(sessionStorage.getItem("active-customer"));
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const seller = JSON.parse(sessionStorage.getItem("active-seller"));

  if (user != null) {
    return <HeaderUser />;
  } else if (admin != null) {
    return (
      console.log("admin"),
    <AdminHeader />
    // <Sidebar /> 
    );
  } else if (seller != null) {
    return <SellerHeader />;
  } else {
    return <NormalHeader />;
  }
};

export default RoleNav;
