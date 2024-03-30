import React, {lazy, useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../static/css/PharmaRegister.css'
import '../../static/vendor/bootstrap/css/bootstrap.min.css'
import '../../static/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../static/fonts/iconic/css/material-design-iconic-font.min.css'
import '../../static/vendor/animate/animate.css'
import '../../static/vendor/css-hamburgers/hamburgers.min.css'
import '../../static/vendor/animsition/css/animsition.min.css'
import '../../static/vendor/select2/select2.min.css'
import '../../static/vendor/daterangepicker/daterangepicker.css'

function RegisterPharmaAdmin(){
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: '',
        password: '',
        role: 'admin'
    });
    
    const [passData, setPassData] = useState({
        password2: '',
    });

    const [formKey, setFormKey] = useState(0);

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

    const getServerIPAddress = () => {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:8000';
        } else {
            return `http://${window.location.hostname}:8000`;
        }
    };
    
    const API_BASE_URL = getServerIPAddress();

    const handleSubmit= async(e) =>{
        e.preventDefault();
        if (
            !formData.first_name.trim() ||
            !formData.last_name.trim() ||
            !formData.email.trim() ||
            !formData.phone_number.trim() ||
            !formData.password.trim()
          ){
            showToast('error', 'Please fill in all fields.');
          }
        else{
            if (formData.password != passData.password2) {
                showToast('error', 'The passwords do not match!');
            }
            else if (!/^\d+$/.test(formData.phone_number)) {
                showToast('error', 'Phone number should contain only numeric values.');
            }
            else{
                const emailCheckResponse = await axios.get(API_BASE_URL + '/autho/register-get/', {
                    params: {
                        email: formData.email,
                    },
                });
                if(emailCheckResponse.data.exists){
                    showToast('error', 'Email already registered!');
                    setFormKey((prevKey) => prevKey + 1);
                }
                else{
                    axios.post( API_BASE_URL + '/autho/register/', formData)
                    .then(response => {
                        console.log(response.data.message);
                        setMessage(response.data.message);
                        showToast('success', 'Account successfully created!');
                        setFormKey((prevKey) => prevKey + 1);
                    }).catch(error =>{
                        console.log(error);
                        setMessage('Error occurred during registration.');
                        showToast('error', 'Error occurred during registration.');
                    }); 
                }
            }
           
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone_number' && !isNaN(value)) {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        } else if (name !== 'phone_number') {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

    };

    const handlePassValidation = (e) => {
        const {name, value} = e.target;
        setPassData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    
    return(
        <div id = 'pharma_reg'>
        <ToastContainer/>
            <div class = "pharma-reg-form">
                <form key={formKey} action="" method="POST" enctype="multipart/form-data" onSubmit={handleSubmit}>
                <h1 id = "pacc">Create an admin account</h1>
                <div class="pharma-name-input100">
                    <span class="pharma-name-label-input100">First Name: </span>
                    <input class="pharma-n-input100" type="text" name="first_name" onChange={handleInputChange}/>
                </div>
                <div class="pharma-name-input100">
                    <span class="pharma-name-label-input100">Middle Name: </span>
                    <input class="pharma-n-input100" type="text" name="middle_name" onChange={handleInputChange}/>
                </div>
                <div class="pharma-name-input100">
                    <span class="pharma-lname-label-input100">Last Name: </span>
                    <input class="pharma-ln-input100" type="text" name="last_name" onChange={handleInputChange}/>
                </div>
                <div class="pharma-wrap-input100">
                    <span class="pharma-label-input100">Email: </span>
                    <input class="pharma-input100" type="email" name="email" placeholder="Enter your Email" onChange={handleInputChange}/>
                    <span class="pharma-focus-input100" data-symbol="&#x2709;"></span>
                </div>
                <div class="pharma-phn-num-wrap-input100">
                    <span class="pharma-phn-num-label-input100">Phone Number: </span>
                    <input class="pharma-phn-num-input100" type="text" name="phone_number" onChange={handleInputChange}/>
                </div>
                <div class="pharma-addr-wrap-input100">
                    <span class="pharma-addr-label-input100">Address: </span>
                    <input class="pharma-addr-input100" type="text" name="address" onChange={handleInputChange}/>
                </div>
                <div class="pharma-wrap-input100">
                    <span class="pharma-label-input100">Password: </span>
                    <input class="pharma-input100" type="password" name="password" placeholder="Enter your password" onChange={handleInputChange}/>
                    <span class="pharma-focus-input100" data-symbol="&#xf190;"></span>
                </div>
                <div class="pharma-wrap-input100">
                    <span class="pharma-label-input100">Confirm Password: </span>
                    <input class="pharma-input100" type="password" name="password2" placeholder="Re-Enter your password" onChange={handlePassValidation}/>
                    <span class="pharma-focus-input100" data-symbol="&#xf190;"></span>
                </div>
                <div class="caps-lock-warning">
                    <p>Caps Lock is enabled.</p>
                </div>
                <div class="pharma-wrap-input100">
                    <button class="pharma-register-btn">Create</button>
                </div>
                <p id="account-alr">Already have an account? <Link to="/">Sign in here</Link></p>
                </form>
            </div>
        </div>
    );
}

export default RegisterPharmaAdmin;