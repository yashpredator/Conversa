import React from "react";
import { useState,useEffect } from "react";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import {useNavigate,Link} from "react-router-dom"
import axios from "axios"
import { registerRoute } from "../utils/ApiRoutes";

export default function Register() {
  const navigate=useNavigate();
  const [values,setValues]=useState({
    username: "",
    email:"",
    password:"",
    confirmPassword:"",
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
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
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
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    
    return true;
  };
  
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
      const {email,username,password}=values;
      const {data}= await axios.post(registerRoute,{
        username,email,password,
      });
      if(data.statue===false){
        toast.error(data.msg,toastOptions);
      }
      if(data.status===true){
        localStorage.setItem(
          'chat-app-user',
          JSON.stringify(data.user)
        );
        navigate("/setavatar")
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
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
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
          <div className="mb-4">
            <label className="block text-white mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
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
              Already have an account ? <Link to="/login">Login.</Link>
            </span>
          </div>
        </form>
      <ToastContainer/>
      </div>
    </div>
  );
}
