import React, {lazy, useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../static/css/PharmaProfile.css'
import '../../static/vendor/bootstrap/css/bootstrap.min.css'
import '../../static/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../static/fonts/iconic/css/material-design-iconic-font.min.css'
import '../../static/vendor/animate/animate.css'
import '../../static/vendor/css-hamburgers/hamburgers.min.css'
import '../../static/vendor/animsition/css/animsition.min.css'
import '../../static/vendor/select2/select2.min.css'
import '../../static/vendor/daterangepicker/daterangepicker.css'

function Registerpharma(){
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        pharmacy_name: '',
        license_number: '',
        address: '',
        phone_number: '',
        pharmacy_type: '',
        pharmacy_logo: '',
        website_url: '',
        admin_id: localStorage.getItem('userId'),
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
        const fileInput = document.querySelector('input[type="file"]');
        if (
            !formData.pharmacy_name.trim() ||
            !formData.license_number.trim() ||
            !formData.address.trim() ||
            !formData.phone_number.trim() ||
            !formData.pharmacy_type.trim()
          ){
            showToast('error', 'Please fill in all fields.');
          }
        else{
            if (!/^\d+$/.test(formData.phone_number)) {
                showToast('error', 'Phone number should contain only numeric values.');
            }
            else{
                const pharmacyCheckResponse = await axios.get(API_BASE_URL + '/pharmacy/get-pharmacy/', {
                    params: {
                        pharmacy_name: formData.pharmacy_name,
                    },
                });
                if(pharmacyCheckResponse.data.exists){
                    showToast('error', 'Pharmacy Name already registered!');
                    setFormKey((prevKey) => prevKey + 1);
                }
                else{
                    axios.post( API_BASE_URL + '/pharmacy/add-pharmacy/', formData)
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
    
    return(
        <div id = 'pharma_reg'>
        <ToastContainer/>
            <div class = "pharma-reg-form">
                <form key={formKey} action="" method="POST" enctype="multipart/form-data" onSubmit={handleSubmit}>
                <h1 id = "racc">Register Pharma</h1>
                <div class="pharma-wrap-input100">
                    <span class="pharma-label-input100">Pharmacy Name: </span>
                    <input class="pharma-input100" type="text" name="pharmacy_name" placeholder="Enter Pharmacy Name" onChange={handleInputChange}/>
                    <span class="pharma-focus-input100" data-symbol="&#x269A;"></span>
                </div>
                <div class="sdo-wrap-input100">
                    <span class="sdo-label-input100">License No.: </span>
                    <input class="sdo-input100" type="number" name="license_number" onChange={handleInputChange}/>
                </div>
                <div class="sdt-wrap-input100">
                    <span class="sdt-label-input100">Address: </span>
                    <input class="sdt-input100" type="text" name="address" onChange={handleInputChange}/>
                </div>
                <div class="sdo-wrap-input100">
                    <span class="sdo-label-input100">Phone Number: </span>
                    <input class="sdo-input100" type="text" name="phone_number" onChange={handleInputChange}/>
                </div>
                <div class="sdt-wrap-input100">
                    <span class="sdt-label-input100">Pharmacy Type: </span>
                    <input class="sdt-input100" type="text" name="pharmacy_type" onChange={handleInputChange}/>
                </div>
                <div class="sdo-wrap-input100">
                    <span class="sdo-label-input100">Logo: </span>
                    <input class="sdo-file-input100" type="file" name="pharmacy_logo" onChange={handleInputChange}/>
                </div>
                <div class="sdt-wrap-input100">
                    <span class="sdt-label-input100">Website URL: </span>
                    <input class="sdt-input100" type="text" name="website_url" onChange={handleInputChange}/>
                </div>
                <div class="sdo-checkbox-wrap-input100">
                    <input class="sdo-checkbox-input100" type="checkbox" name="t_n_c" required/>
                    <span class="sdo-label-input100">Terms and Conditions </span>
                </div>
                <div class="sdt-checkbox-wrap-input100">
                    <input class="sdt-checkbox-input100" type="checkbox" name="p_p" required/>
                    <span class="sdt-checkbox-label-input100">Privacy Policy </span>
                </div>
                <div class="pharma-wrap-input100">
                    <button class="pharma-register-btn">Create</button>
                </div>
                </form>
            </div>
        </div>
    );
}

export default Registerpharma;