import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import '../../static/css/dashboard-style.css'
import '../../static/css/styles.css'
import '../../static/vendor/bootstrap/css/bootstrap.min.css'
import '../../static/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../static/fonts/iconic/css/material-design-iconic-font.min.css'
import '../../static/vendor/animate/animate.css'
import '../../static/vendor/css-hamburgers/hamburgers.min.css'
import '../../static/vendor/animsition/css/animsition.min.css'
import '../../static/vendor/select2/select2.min.css'
import '../../static/vendor/daterangepicker/daterangepicker.css'

const AddProductModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    product_name: '',
    product_info: '',
    price: '',
    quantity: '',
    product_type: 'product',
    product_image: '',
    pharmacy: Cookies.get('pharmacyID'),
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'product_name' && !isNaN(value)) {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    } else if (name !== 'product_name') {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.product_name.trim() ||
      !formData.product_info.trim() ||
      !formData.price.trim() ||
      !formData.quantity.trim()
    ){
      showToast('error', 'Please fill in all fields.');
    }
    else{
      axios.post( API_BASE_URL + '/product/add-product/', formData)
      .then(response => {
        console.log(response.data.message);
        setMessage(response.data.message);
        showToast('success', 'Product sucessfully Added!');
        setFormKey((prevKey) => prevKey + 1);
      }).catch(error =>{
        console.log(error);
        setMessage('Error occurred during registration.');
        showToast('error', 'Error occurred while adding product!.');
      });
    }
    onClose();
    };

  return (
    <div className="modal-product" onClick={onClose}>
      <div className="modal-prod-content" onClick={e => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2 class="form-head">Add Products</h2>
        <form action="" method="POST" enctype="multipart/form-data" onSubmit={handleSubmit}>
          <div class="modal-pname-input100">
            <span class="modal-pname-label-input100">Product Name: </span>
            <input class="modal-pn-input100" type="text" name="product_name" onChange={handleInputChange}/>
          </div>
          <div class="modal-price-input100">
            <span class="modal-price-label-input100">Price: </span>
            <input class="modal-pr-input100" type="text" name="price" onChange={handleInputChange}/>
          </div>
          <div class="modal-wrap-input100">
            <span class="modal-label-input100">Product Info: </span>
            <input class="modal-input100" type="text" name="product_info" onChange={handleInputChange}/>
          </div>
          <div class="modal-quantity-input100">
            <span class="modal-quantity-label-input100">Quantity:</span>
            <input class="modal-qy-input100" type="text" name="quantity" onChange={handleInputChange}/>
          </div>
          <div class="modal-image-input100">
            <span class="modal-image-label-input100">Product Image: </span>
            <input class="modal-im-input100" type="file" name="product_image" onChange={handleInputChange}/>
          </div>
          <div class="wrap-input100">
            <button class="create-product">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditProductModal = ({ show, onClose, product, onUpdateProduct }) => {
  const [formData, setFormData] = useState({
    product_name: '',
    product_info: '',
    price: '',
    quantity: '',
    product_image: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        product_name: product.product_name || '',
        product_info: product.product_info || '',
        price: product.price || '',
        quantity: product.quantity || '',
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    onUpdateProduct({
      ...formData,
    }, Cookies.set('productID', product.product_id, { expires: 7, secure: true, sameSite: 'Strict' }));
  };

  // Return null to render nothing if the modal is not shown
  if (!show) return null;

  return (
    <div className="modal-product" onClick={onClose}>
      <div className="modal-prod-content" onClick={e => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2 class="form-head">Edit Products</h2>
        <form action="" method="POST" enctype="multipart/form-data" onSubmit={handleSubmit}>
          <div class="modal-pname-input100">
            <span class="modal-pname-label-input100">Product Name: </span>
            <input class="modal-pn-input100" type="text" name="product_name" value={formData.product_name} onChange={handleInputChange}/>
          </div>
          <div class="modal-price-input100">
            <span class="modal-price-label-input100">Price: </span>
            <input class="modal-pr-input100" type="text" name="price" value={formData.price} onChange={handleInputChange}/>
          </div>
          <div class="modal-wrap-input100">
            <span class="modal-label-input100">Product Info: </span>
            <input class="modal-input100" type="text" name="product_info" value={formData.product_info} onChange={handleInputChange}/>
          </div>
          <div class="modal-quantity-input100">
            <span class="modal-quantity-label-input100">Quantity:</span>
            <input class="modal-qy-input100" type="text" name="quantity" value={formData.quantity} onChange={handleInputChange}/>
          </div>
          <div class="modal-image-input100">
            <span class="modal-image-label-input100">Product Image: </span>
            <input class="modal-im-input100" type="file" name="product_image" value={formData.product_image} onChange={handleInputChange}/>
          </div>
          <div class="wrap-input100">
            <button class="create-product">Edit Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

function ManageProducts(){

  const navigate = useNavigate();

  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showEditProductModal, setShowEditProductModal] = useState(false);

  const [fullHeight, setFullHeight] = useState(window.innerHeight);

  const [isSidebarActive, setIsSidebarActive] = useState(false);

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
    setShowAddProductModal(true);
  };

  const handleEditClick = (product) => {
    document.body.classList.add('body-no-scroll');
    setSelectedProduct(product);
    setShowEditProductModal(true);
  };

  const closeModal = () => {
    document.body.classList.remove('body-no-scroll');
    setShowAddProductModal(false);
    setShowEditProductModal(false);
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
    function handleResize() {
      setFullHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_BASE_URL + '/product/get-product/', {
        params: {
          pharmacy: Cookies.get('pharmacyID'),
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products: ', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onUpdateProduct = async (updatedProduct) => {
    const productID = Cookies.get('productID');
    try {
      const response = await axios.put(`${API_BASE_URL}/product/update-product/${productID}/`, updatedProduct);
      setShowEditProductModal(false);
      showToast('success', 'Product updated successfully!');
    } catch (error) {
      showToast('error', 'Error occurred while updating product!');
      console.error('Error occurred while updating product:', error);
    }
  };

  const handleDeleteProduct = async (productID) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/product/delete-product/${productID}/`);
        showToast('success', 'Product deleted successfully!');
        fetchProducts();
      } catch (error) {
        showToast('error', 'Error occurred while deleting the product.');
        console.error('Error occurred while deleting the product:', error);
      }
    }
  };


  const logout = () => {
    Cookies.remove('userToken');
    Cookies.remove('userId');
    Cookies.set('isLoggedout', 'true', { expires: 1/24, path: '/' });
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  return(
    <div class="wrapper d-flex align-items-stretch">
    <ToastContainer/>
			<nav id="sidebar" className={isSidebarActive ? 'active' : ''}>
				<div class="custom-menu">
					<button type="button" id="sidebarCollapse" class="btn btn-primary" onClick={toggleSidebar}>
	          <i class="fa fa-bars"></i>
	          <span class="sr-only">Toggle Menu</span>
	        </button>
        </div>
				<div class="p-4">
		  		<h1><a href="index.html" class="logo">Pharmacy Name <span>Admin Name</span></a></h1>
	        <ul class="list-unstyled components mb-5">
	          <li class="active">
	            <Link to="/admin-dashboard/"><span class="fa fa-home mr-3"></span> Dashboard</Link>
	          </li>
	          <li>
	              <Link to="/manage-staffs/"><span class="fa fa-user mr-3"></span> Manage Users</Link>
	          </li>
	          <li>
              <Link to="/manage-products/"><span class="fa fa-briefcase mr-3"></span> Manage Products</Link>
	          </li>
	          <li>
              <Link to="/manage-medicines/"><span class="fa fa-briefcase mr-3"></span> Manage Medicines</Link>
	          </li>
	          <li>
              <Link to="/admin-profile/"><span class="fa fa-cogs mr-3"></span> User Profile</Link>
	          </li>
            <li>
              <Link to="/login/" onClick={logout}><span class="fa fa-paper-plane mr-3"></span> Logout</Link>
	          </li>
	        </ul>
	      </div>
    	</nav>
      <div class="content">
        <h1 class="content-header">Manage Products</h1>
        <button class="add-staff-btn" onClick={openModal}>Add Products</button>
        <AddProductModal show={showAddProductModal} onClose={closeModal} />
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Product info</th>
                    <th>Stock Available</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.product_id || index}>
                  <td>{index + 1}</td>
                  <td>{product.product_name}</td>
                  <td>{product.price}</td>
                  <td>{product.product_info}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <button className="btn btn-sm btn-primary mr-2" onClick={() => handleEditClick(product)} aria-label="Edit"><i className="fas fa-pencil-alt"></i></button>
                    <EditProductModal show={showEditProductModal} onClose={closeModal} product={selectedProduct}  onUpdateProduct={onUpdateProduct}/>
                    <button className="btn btn-sm btn-danger" aria-label="Delete" onClick={() => handleDeleteProduct(product.product_id)}><i className="fas fa-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
    </div>
    </div>
  );
}

export default ManageProducts;
