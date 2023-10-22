import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Layout/Header";
import Login from "../components/Login/Login.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if(isAuthenticated === true){
      navigate("/");
    }
  }, [])
  
  return (
    <div>
      <Header  />
        <Login />
    </div>
  )
}

export default LoginPage;