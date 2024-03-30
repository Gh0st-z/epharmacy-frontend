import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import '../../static/css/ManageStaffs.css'
import '../../static/vendor/bootstrap/css/bootstrap.min.css'
import '../../static/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../static/fonts/iconic/css/material-design-iconic-font.min.css'
import '../../static/vendor/animate/animate.css'
import '../../static/vendor/css-hamburgers/hamburgers.min.css'
import '../../static/vendor/animsition/css/animsition.min.css'
import '../../static/vendor/select2/select2.min.css'
import '../../static/vendor/daterangepicker/daterangepicker.css'

const AddMedicineModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
  });

  const [message, setMessage] = useState('');

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

  if (!show) {
    return null;
  }

  const handleSubmit = async (e) => {
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
    onClose();
    };


  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2 class="form-head">Add Products</h2>
        <form action="" method="POST" enctype="multipart/form-data" onSubmit={handleSubmit}>
          <div class="wrap-input100">
            <button class="create-product">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

function ManageMedicines(){

  const navigate = useNavigate();

  const [showAddMedicineModal, setShowAddMedicineModal] = useState(false);

  const [staffs, setStaffs] = useState([]);

  const getServerIPAddress = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:8000';
    } else {
        return `http://${window.location.hostname}:8000`;
    }
  };

  const API_BASE_URL = getServerIPAddress();

  const openModal = () => {
    document.body.classList.add('body-no-scroll');
    setShowAddMedicineModal(true);
  };

  const closeModal = () => {
    document.body.classList.remove('body-no-scroll');
    setShowAddMedicineModal(false);
  };

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
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      toast.success('Logged in Successfully!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      localStorage.removeItem('isLoggedIn');
    }
  }, []);

  useEffect(() =>{
    const fetchStaffDetails = async () => {
      try{
        const response = await axios.get(API_BASE_URL + '/autho/get-staff/');
        setStaffs(response.data);
      }catch(error) {
        console.error('Failed to fetch staff details: ', error);
      }
    };
    fetchStaffDetails();
  }, []);

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userToken');
    localStorage.setItem('isLoggedout', 'true');
    navigate('/login');
  };


  return(
    <div class="main-dashboard">
      <ToastContainer/>
      <div class="left-navigation">
        <div class="pharmacy-name">
          Pharmacy Name
        </div>
        <div class="dashboard-button">
          <button class="nav-buttons"><Link class="button-links" to="/admin-dashboard">Dashboard</Link></button>
        </div>
        <div class="manage-staffs">
          <button class="nav-buttons"><Link class="button-links" to="/manage-staffs">Manage Staffs</Link></button>
        </div>
        <div class="manage-users">
          <button class="nav-buttons"><Link class="button-links" to="/manage-users">Manage Medicine</Link></button>
        </div>
        <div class="manage-products">
          <button class="nav-buttons"><Link class="button-links" to="/manage-products">Manage Products</Link></button>
        </div>
        <div class="admin-profile">
          <button class="nav-buttons"><Link class="button-links" to="">Admin Profile</Link></button>
        </div>
        <div class="logout">
          <button class="nav-buttons"><Link class="button-links" to="">Logout</Link></button>
        </div>
      </div>
      <div class="content">
        <h1 class="content-header">Manage Medicine</h1>
        <button class="add-staff-btn" onClick={openModal}>Add Medicine</button>
        <AddMedicineModal show={showAddMedicineModal} onClose={closeModal} />
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Produt Name</th>
                    <th>Price</th>
                    <th>Product info</th>
                    <th>Stock Available</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
    </div>
  );
}

export default ManageMedicines;
