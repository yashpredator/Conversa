import React from 'react';
import { BiPowerOff } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {logoutRoute} from "../utils/ApiRoutes"





function Logout() {

  const navigate=useNavigate();
  const handleClick=async()=>{
    // const id=await JSON.parse(localStorage.getItem('chat-app-user'))._id;
    // const data= await axios.get(`${logoutRoute}/${id}`);
    // if(data.status==200){
      localStorage.clear();
      navigate("/login");
    // }
  }
  return (
    <div>
      <button className="p-2" onClick={handleClick}>
        <BiPowerOff size={32} /> {/* Adjust the size as needed */}
      </button>
    </div>
  );
}

export default Logout;
