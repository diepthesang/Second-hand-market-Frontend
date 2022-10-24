import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyLogin from "./components/authentication/MyLoginPage";
import MyRegister from "./components/authentication/MyRegisterPage";
import MyTestGrid from "./components/common/MyTestGrid";
import MyHomePage from "./components/home/MyHomePage";
import MyPostPage from "./components/post/MyPostPage";
import MyDetailPage from "./components/detail/MyDetailPage";
import socketIO from "socket.io-client"
import MyOTPInputPage from './components/OTP/MyOTPInputPage';
import MyCategoryPage from './components/categoryChild/MyCategoryPage';
import MyAdminPage from './components/admin/MyAdminPage';
import MyTestPage from "./components/test/MyTestPage";
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NoMatchPage from './components/common/NoMatchPage';
import MyManagePostingPage from "./components/managePosting/MyManagePostingPage";

const socket = socketIO.connect("http://localhost:8088")

function App() {

  const [isLogin, setIsLogin] = useState(false)

  // const navigate = useNavigate()

  const checkIsLogin = async () => {
    if (localStorage['access_token'] !== undefined || localStorage['access_token'] !== null || localStorage['access_token']) {
      // navigate('/')
      setIsLogin(true)
    }
  }

  useEffect(
    () => {
      checkIsLogin()
    }, []
  )


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<MyRegister />} >
          {/* {isLogin ? <redirect to='/register' /> : <MyHomePage></MyHomePage>} */}
        </Route>
        <Route path="/login" element={<MyLogin />}></Route>
        <Route path="/" element={<MyHomePage />}></Route>
        <Route path="/post" element={<MyPostPage />}></Route>
        <Route path="/post/:postId" element={<MyDetailPage />}> </Route>
        <Route path="/sendOTP" element={<MyOTPInputPage />}></Route>
        {/* <Route path="/chat" element={<MyChatPage socket={socket} />}></Route> */}
        <Route path="/test" element={<MyTestGrid />}></Route>
        <Route path="/managePosting" element={<MyManagePostingPage />}></Route>
        <Route path="/category/:categoryParentId" element={<MyCategoryPage />}> </Route>
        <Route path="/test" >
          <Route path=":id" element={<MyTestPage />}> </Route>
        </Route>
        <Route path="*" element={<NoMatchPage />}></Route>
        <Route path="/admin" element={<MyAdminPage />}></Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
