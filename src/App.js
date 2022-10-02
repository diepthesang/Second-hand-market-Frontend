import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyChatPage from "./components/mychatting.components/MyChatPage";
import MyDetail from "./components/MyDetailPage";
import MyHomePage from "./components/MyHomePage";
import MyLogin from "./components/MyLoginPage";
import MyOTPInputPage from "./components/MyOTPInputPage";
import MyRegister from "./components/MyRegisterPage";
import socketIO from "socket.io-client"
import MyTestGrid from "./components/MyTestGrid";
import MyPostPage from "./components/MyPostPage";
import MyAdminPage from "./components/MyAdminPage";
const socket = socketIO.connect("http://localhost:8080")

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<MyRegister />}></Route>
        <Route path="/login" element={<MyLogin />}></Route>
        <Route path="/" element={<MyHomePage />}></Route>
        <Route path="/post" element={<MyPostPage />}></Route>
        <Route path="/detail" element={<MyDetail />}></Route>
        <Route path="/sendOTP" element={<MyOTPInputPage />}></Route>
        <Route path="/chat" element={<MyChatPage socket={socket} />}></Route>
        <Route path="/test" element={<MyTestGrid />}></Route>
        <Route path="/admin" element={<MyAdminPage />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
