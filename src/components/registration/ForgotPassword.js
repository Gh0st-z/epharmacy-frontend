import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, redirect, useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';
import '../../static/css/styles.css'

function ForgotPassword(){
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    Email: '',
  });

  const [formKey, setFormKey] = useState(0);
  const navigate = useNavigate();

  const showToast = (type, message) => {
    toast[type](message, {
      position: 'top-center',
      autoclose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.Email.trim()) {
      showToast('error', 'Please Fill In All The Fields.');
    }else{
      axios.post('http://localhost:5234/api/user/forgotpassword', formData).then(response => {
        setMessage(response.data.message);
        showToast('success', 'Reset link sent!');
      }).catch(error => {
        console.log(error);
        setMessage('Error occured during login process. Please Try Again!');
        showToast('error', 'Error occured during login process. Please Try Again!');
      });
    };
  };

  const handleInput = (e) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:value,
    }));
  }

  return(
    <div className="login-main">
      <ToastContainer/>
      <div className="login-form">
        <div className="header-div">
          <h1 className="form-header">Forgot Password</h1>
        </div>
        <form key={formKey} action="" method="POST" onSubmit={handleSubmit}>
          <div className="wrap-input100">
            <span className="label-input100">Username/Email: </span>
            <input className="input100" type="text" name="Email" placeholder="Enter your username/email" onChange={handleInput}/>
            <img src={envelope} className="focus-input100"/>
          </div>
          <div className="wrap-input100">
            <button className="login-btn">Send Verification</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
