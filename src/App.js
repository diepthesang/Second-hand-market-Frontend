import { BrowserRouter, Outlet, Route, Routes, Switch } from "react-router-dom";
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
import MyCountdownTimer from "./components/test/MyCountdownTimer";
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NoMatchPage from './components/common/NoMatchPage';
import MyManagePostingPage from "./components/managePosting/MyManagePostingPage";
import MyHeader from './components/common/MyHeader';
import MyFooter from "./components/common/MyFooter";
import MyEditPostPage from "./components/post/MyEditPostPage";
import MyProfilePage from "./components/profile/MyProfilePage";
import MyListPostBySearch from "./components/search/MyListPostBySearch";
import MyEditProfilePage from "./components/profile/MyEditProfilePage";
import MyCartPage from "./components/order/MyCartPage";
import MyRedirectPage from "./components/common/MyRedirectPage";
import MyBodyHome from "./components/home/MyBodyHome";
import MyModalLogin from "./components/common/MyModalLogin";
import MyCheckoutPage from "./components/checkout/MyCheckoutPage";
import MyPaymentSuccess from "./components/payment/MyPaymentSuccess";
// import NativePickers from "./components/test/MyTestPage";

const socket = socketIO.connect("http://localhost:8088")


function BasicLayout() {
  return (
    <>
      <MyHeader />
      <Outlet />
      <MyFooter />
    </>
  )
}


function App() {

  const [isLogin, setIsLogin] = useState(false);
  // const navigate = useNavigate();

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
        <Route exact path="/register" element={<MyRegister />} ></Route>
        <Route path="/login" index element={
          <MyLogin />
        }></Route>
        <Route path="/sendOTP" element={<MyOTPInputPage />}></Route>
        {/* <Route path="/chat" element={<MyChatPage socket={socket} />}></Route> */}
        {/* <Route path="/test" element={<MyTestGrid />}></Route> */}
        {/* <Route exact path="/managePosting" element={<MyManagePostingPage />}></Route> */}
        {/* <Route path="/category/:categoryParentId" element={<MyCategoryPage />}> </Route> */}
        {/* <Route path="/test" element={<BasicLayout />}>
          <Route index element={<MyTestPage />} />
        </Route>
        <Route path="/" element={<BasicLayout />}>
          <Route index element={<MyHomePage />} />
        </Route>
        <Route path="/post" element={<BasicLayout />}>
          <Route index element={<MyPostPage />} />
        </Route>
        <Route path="/post/:_postId" element={<BasicLayout />}>
          <Route index element={<MyDetailPage />} />
        </Route>
        <Route path="/managePosting" element={<BasicLayout />}>
          <Route index element={localStorage['access_token'] ? <MyManagePostingPage /> : <MyLogin />} />
        </Route>
        <Route path="/category/:categoryParentId" element={<BasicLayout />}>
          <Route index element={<MyCategoryPage />} />
        </Route>
        <Route path="/edit/post/:postId" element={<BasicLayout />}>
          <Route index element={localStorage['access_token'] ? <MyEditPostPage /> : <MyLogin />} />
        </Route>
        <Route path="/profile/user/:userId" element={<BasicLayout />}>
          <Route index element={<MyProfilePage />} />
        </Route>
        <Route path="/search" element={<BasicLayout />}>
          <Route index element={<MyListPostBySearch />} />
        </Route>
        <Route path="/editProfile" element={<BasicLayout />}>
          <Route index element={localStorage['access_token'] ? <MyEditProfilePage /> : <MyLogin />} />
        </Route>
        <Route path="/cart" element={<BasicLayout />}>
          <Route index element={localStorage['access_token'] ? <MyCartPage /> : <MyLogin />} />
        </Route> */}


        {/* <Route path="*" element={<BasicLayout />}>
          <Route index element={<NoMatchPage />} />
        </Route> */}

        <Route path="/" element={<BasicLayout />}>
          <Route path='/' element={<MyHomePage />} />
          <Route path="/post" element={<MyPostPage />} />
          <Route path="/post/:_postId" element={<MyDetailPage />} />
          <Route path="/category/:categoryParentId" element={<MyCategoryPage />} />
          <Route path="managePosting" element={localStorage['access_token'] ? <MyManagePostingPage /> : <MyLogin />} />
          <Route path="/cart" element={localStorage['access_token'] ? <MyCartPage /> : <MyLogin />} />
          <Route path="/edit/post/:postId" element={localStorage['access_token'] ? <MyEditPostPage /> : <MyLogin />} />
          <Route path="/profile/user/:userId" element={<MyProfilePage />} />
          <Route path="/search" element={<MyListPostBySearch />} />
          <Route path="/editProfile" element={localStorage['access_token'] ? <MyEditProfilePage /> : <MyLogin />} />
          <Route path="/cart" element={localStorage['access_token'] ? <MyCartPage /> : <MyLogin />} />
          <Route path="*" element={<NoMatchPage />} />
          <Route path="/checkout" element={<MyCheckoutPage />} />
          <Route path="/payment/success" element={<MyPaymentSuccess />} />
        </Route>




        <Route path="/redirect" element={<MyRedirectPage />}></Route>
        {/* <Route path="/date" element={<NativePickers />}></Route> */}


        {/* <Route path="*" element={<NoMatchPage />}></Route> */}
        <Route path="/admin" element={<MyAdminPage />}></Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;


