import { TodoProvider } from "./Context/Context.js";
import { Route, Routes, Router } from "react-router-dom";
import Home from "./Page/Home/Home.js";
import Login from "./Page/Login/Login.js";
import Signup from "./Page/SignUp/Signup.js";
import SiteLayout from "./Components/Layout/SiteLayout/SiteLayout.js";
import { useEffect } from "react";
import AuthApi from "./services/AuthAPI.js";
import { useDispatch } from "react-redux";
import { login } from "./Redux/auth/AuthSlice.js";
function App() {
  const dispatch = useDispatch();

  const fetchCurrentUser = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        const currentUser = await AuthApi.fetchCurrentUser();
        const payload = {
          currentUser: currentUser.data,
        };
        dispatch(login(payload));
      } catch (error) {
        console.log("fetch-current-user falied", error);
      }
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <TodoProvider>
      <Routes>
        <Route path="/" element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </TodoProvider>
  );
}

export default App;
