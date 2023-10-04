import { TodoProvider } from "./Context/Context.js";
import { Route, Routes, Router } from "react-router-dom";
import Home from "./Page/Home/Home.js";
import Login from "./Page/Login/Login.js";
import Signup from "./Page/SignUp/Signup.js";
function App() {
  return (
    <TodoProvider>
      <Routes>
        <Route path="/" />
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </TodoProvider>
  );
}

export default App;
