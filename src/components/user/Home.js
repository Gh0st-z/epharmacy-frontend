import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../static/css/Home.css'
import companylogo from '../../static/images/company_logo.png'
import '../../static/vendor/bootstrap/css/bootstrap.min.css'
import '../../static/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../static/fonts/iconic/css/material-design-iconic-font.min.css'
import '../../static/vendor/animate/animate.css'
import '../../static/vendor/css-hamburgers/hamburgers.min.css'
import '../../static/vendor/animsition/css/animsition.min.css'
import '../../static/vendor/select2/select2.min.css'
import '../../static/vendor/daterangepicker/daterangepicker.css'

function HomePage(){

  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.setItem('isLoggedout', 'true');
    showToast('success', 'Logged out Successfully!');
    navigate('/login');
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

  return(
    <div>
      <ToastContainer />
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">PHARMA</div>
          <div className="navbar-links">
            <Link to="/" className="navbar-link">HOME</Link>
            <Link to="/store" className="navbar-link">STORE</Link>
            <Link to="/about" className="navbar-link">ABOUT</Link>
            <Link to="/contact" className="navbar-link">CONTACT</Link>
          </div>
          <div className="navbar-icons">
            <FaSearch className="icon-search"/>
            <FaShoppingCart className="icon-cart"/>
            <span className="cart-badge">2</span>
          </div>
        </div>
      </nav>
      <div className="welcome-section">
        <div className="welcome-text">
          <h1>WELCOME TO PHARMA</h1>
          <p>EFFECTIVE MEDICINE, NEW MEDICINE EVERYDAY</p>
          <button className="shop-now-btn">SHOP NOW</button>
        </div>
      </div>
      <div className="promotional-cards">
        <div className="card card-cyan">
          <h2>Free Shipping</h2>
          <p>Amet sit amet dolor Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
        </div>
        <div className="card card-green">
          <h2>Season Sale 50% Off</h2>
          <p>Amet sit amet dolor Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
        </div>
        <div className="card card-yellow">
          <h2>Buy A Gift Card</h2>
          <p>Amet sit amet dolor Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
        </div>
      </div>
      <div className="popular-products-section">
        <h2 className="popular-products-heading">POPULAR PRODUCTS</h2>
        <div className="popular-products-container">
          <div className="product-item">
            <div className="sale-tag">SALE</div>
            <img src="/path-to-bioderma.png" alt="Bioderma" className="product-image" />
            <h3 className="product-name">Bioderma</h3>
            <div className="product-price">
              <span className="original-price">$95.00</span>
              <span className="sale-price">$55.00</span>
            </div>
          </div>
        </div>
        <div className="popular-products-container">
          <div className="product-item">
            <div className="sale-tag">SALE</div>
            <img src="/path-to-bioderma.png" alt="Bioderma" className="product-image" />
            <h3 className="product-name">Bioderma</h3>
            <div className="product-price">
              <span className="original-price">$95.00</span>
              <span className="sale-price">$55.00</span>
            </div>
          </div>
        </div>
        <button className="view-all-button">VIEW ALL PRODUCTS</button>
      </div>
      <div className="new-products-carousel">
        <h2>NEW PRODUCTS</h2>
        <Slider {...settings}>
          <div className="slide">
            <img src="/path-to-umcka-cold-care.png" alt="Umcka Cold Care" />
            <p>Umcka Cold Care</p>
            <p>$120.00</p>
          </div>
        </Slider>
      </div>
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-column">
            <h3>About Us</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eius quae reiciendis distinctio voluptates sed dolorem excepturi iure eaque, aut unde.</p>
          </div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Supplements</a></li>
              <li><a href="#">Vitamins</a></li>
              <li><a href="#">Diet & Nutrition</a></li>
              <li><a href="#">Tea & Coffee</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact Info</h3>
            <p><i className="icon-location"></i> 203 Fake St. Mountain View, San Francisco, California, USA</p>
            <p><i className="icon-phone"></i> +2 392 3929 210</p>
            <p><i className="icon-envelope"></i> emailaddress@domain.com</p>
          </div>
        </div>
        <div className="footer-bottom-text">
          <p>Copyright © 2024 All rights reserved | This template is made with <i className="icon-heart"></i> by Colorlib</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
