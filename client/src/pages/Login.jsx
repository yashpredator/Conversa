import React from "react";
import { useState,useEffect } from "react";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import {useNavigate,Link} from "react-router-dom"
import axios from "axios"
import { loginRoute } from "../utils/ApiRoutes";

export default function Register() {
  const navigate=useNavigate();
  const [values,setValues]=useState({
    username: "",
    password:"",
  }
  );
  const toastOptions={
    position:"bottom-right",
    autoClose:8000,
    pauseOnHover: true,
    draggable: true,
    theme:"dark",
  }
  
  const handleValidation = () => {
    const { password, username} = values;
     if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    }
    
    return true;
  };
  
  // Agar user already logged in h then usse login page
  // me bhejne se achha direct chat me bhej do
  // Agar user already logged in then localstorage me pada hoga
  // Inspect->Applicatin->Local Storage
  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      navigate("/chat");
    }
  },[]);

  const handleChange = (e) => {
    setValues({...values,[e.target.name]:e.target.value});
  };
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    if(handleValidation()){
      const {username,password}=values;
      const {data}= await axios.post(loginRoute,{
        username,password,
      });
      if(data.statue===false){
        toast.error(data.msg,toastOptions);
      }
      if(data.status===true){
        localStorage.setItem(
          'chat-app-user',
          JSON.stringify(data.user)
        );
        navigate("/chat")
      }
    }
    
  };
  return (
    <div className="flex justify-center items-center h-screen bg-violet-400">
      <div className="bg-purple-700 p-8 rounded-lg">
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="mb-4">
            {/* Your form content */}
            <label className="block text-white mb-2">Username</label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
              className="bg-white rounded px-4 py-2 w-full"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
              className="bg-white rounded px-4 py-2 w-full"
            />
          </div>
          
          <div className="flex justify-center">
            <button type="submit" className=" bg-orange-600 text-white px-4 py-2 rounded-lg mb-2">
              Submit
            </button>
          </div>
          <div>
             <span>
              Don't have an account ? <Link to="/register">Register</Link>
            </span>
          </div>
        </form>
      <ToastContainer/>
      </div>
    </div>
  );
}
