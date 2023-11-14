import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./Adminside/pages/global/TopBar";
import Sidebar from "./Adminside/pages/global/SideBar";
import Dashboard from "./Adminside/pages/dashboard/dashboard";
import Category from "./Adminside/pages/category/category";
import Bar from "./Adminside/pages/bar/bar";
import Form from "./Adminside/pages/form/form";
import Line from "./Adminside/pages/line/line";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Allorders from "./Adminside/pages/orders/Allorder";
import Allproduct from "./Adminside/pages/product/Allproduct";
import Allseller from "./Adminside/pages/seller/Allseller";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/category" element={<Category/>} />
              <Route path="/allorder" element={<Allorders/>} />
              <Route path="/allproduct" element={<Allproduct/>} />          
              <Route path="/allseller" element={<Allseller/>} />          
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/line" element={<Line />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;