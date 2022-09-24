import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import MyDetail from "./components/MyDetail";
import MyHome from "./components/MyHome";
import MyLogin from "./components/MyLoginPage";
import MyOTPInputPage from "./components/MyOTPInputPage";
import MyRegister from "./components/MyRegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyHome />}></Route>
        <Route path="/detail" element={<MyDetail />}></Route>
        <Route path="/register" element={<MyRegister />}></Route>
        <Route path="/login" element={<MyLogin />}></Route>
        <Route path="/sendOTP" element={<MyOTPInputPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
