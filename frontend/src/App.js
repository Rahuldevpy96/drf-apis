import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
// import SignUp from "./Pages/SignUp";
// import Dashboard from "./Pages/Dashboard";
// import Contacts from "./Pages/Contacts";
// import Users from "./Pages/Users";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Loader from "./pages/Loader";
import Products from "./pages/Products";


function App() {
  const [email, setEmail] = useState(localStorage.getItem("email") || 'default-email');

  function UpdatingEmail(userEmail) {
    setEmail(userEmail);
    localStorage.setItem("email", userEmail);
  }

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/login"  element={<Login UpdatingEmail ={UpdatingEmail}/>} />
        <Route path="/auth" element={<Loader />} />
        {/* <Route path="signup" element={<SignUp />} /> */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/"  element={<MainLayout email={email}/>}>
            {/* <Route path="/dashboard" element={<Dashboard />} name="dashboard" /> */}
            <Route path="/product" element={<Products />} name="product" />
            {/* <Route path="/user" element={<Users />} /> */}
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
