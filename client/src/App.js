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
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.js";
import { TOKEN_TYPES } from "./Constant/Constant.js";
import Profile from "./Page/Profile/Profile.js";
function App() {
  const dispatch = useDispatch();

  const fetchCurrentUser = async () => {
    const accessToken = localStorage.getItem(TOKEN_TYPES.ACCESS_TOKEN);
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
          <Route index element={<ProtectedRoute component={Home} />} />
          <Route
            path="profile"
            element={<ProtectedRoute component={Profile} />}
          />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </TodoProvider>
  );
}

export default App;
