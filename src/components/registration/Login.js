import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import '../../static/css/Login.css'
import '../../static/vendor/bootstrap/css/bootstrap.min.css'
import '../../static/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../static/fonts/iconic/css/material-design-iconic-font.min.css'
import '../../static/vendor/animate/animate.css'
import '../../static/vendor/css-hamburgers/hamburgers.min.css'
import '../../static/vendor/animsition/css/animsition.min.css'
import '../../static/vendor/select2/select2.min.css'
import '../../static/vendor/daterangepicker/daterangepicker.css'

function LoginForm() {
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formKey, setFormKey] = useState(0);
  const navigate = useNavigate();

  const showToast = (type, message) => {
    toast[type](message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  useEffect(() => {
    const isLoggedout = localStorage.getItem('isLoggedout') === 'true';

    if (isLoggedout) {
      toast.success('Logged out Successfully!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      localStorage.removeItem('isLoggedout');
    }
  }, []);

  const handleSubmit= (e) =>{
    e.preventDefault();
    if (
      !formData.email.trim() ||
      !formData.password.trim()
      ){
        showToast('error', 'Please fill in all fields.');
      }
      else{
        axios.post('http://localhost:8000/autho/login/', formData)
        .then(response => {
          setMessage(response.data.message);
          showToast('success', 'Login Successful');
          localStorage.setItem('isLoggedIn', 'true');
          const userID = response.data.id;
          localStorage.setItem('userId', userID);
          const userRole = response.data.role;
          if (userRole === 'admin') {
            navigate('/register-pharma');
          } else if (userRole === 'customer') {
            navigate('/home'); 
          } else {
            console.error('Unexpected user role:', userRole);
            setMessage('Login failed: Unexpected User Role');
            showToast('error', 'Login Failed: Unexpected User Role');
          }
          setFormKey((prevKey) => prevKey + 1);
        }).catch(error =>{
          console.log(error);
          setMessage('Error occurred during Logging in.');
          showToast('error', 'Incorrect Login Details!');
        }); 
      }
  };

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
          ...prevState,
          [name]: value,
      }));
  }

  return (
    <div id="main">
      <ToastContainer/>
      <div class = "container">
      <div class = "login-form">
        <form key={formKey} action="" method="POST" enctype="multipart/form-data" onSubmit={handleSubmit}>
          <h1 id = "wb">Welcome Back!</h1>
          <div class="wrap-input100">
            <span class="label-input100">Email: </span>
            <input class="input100" type="text" name="email" placeholder="Enter your email" onChange={handleInputChange}/>
            <span class="focus-input100" data-symbol="&#x2709;"></span>
          </div>
          <div class="wrap-input100">
            <span class="label-input100">Password: </span>
            <input class="input100" type="password" name="password" placeholder="Enter your password" onChange={handleInputChange}/>
            <span class="focus-input100" data-symbol="&#xf190;"></span>
          </div>
          <div class="caps-lock-warning">
            <p>Caps Lock is enabled.</p>
          </div>
          <a href="#" id="for-pass">Forgot Password?</a>
          <div class="wrap-input100">
            <button class="login-btn">Login</button>
          </div>
          <span id="account">Don't have an account?</span><br/>
          <nav>
            <Link id="loginlink" to="/register"> Create an account</Link>
          </nav>
        </form>
      </div>
    </div>
    </div>
  );
};

export default LoginForm;