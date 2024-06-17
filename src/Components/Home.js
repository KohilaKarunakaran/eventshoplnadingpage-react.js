import Navbar from "./Navbar";
import Footer from './Footer';
import React, { useState, useEffect } from 'react';

const Home = () => {
    const [shopName, setShopName] = useState('');
    const [slide1Image, setSlide1Image] = useState('');
    const [shopData, setShopData] = useState(null);


    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
          try {
            const response = await fetch('https://demo.vshops.fi/api/shop/652934b8a4604e20f653aafb');
            const data = await response.json();
            // Extract shopName from the theme array
            const name = data?.data?.name || '';
            setShopName(name);
            const slide1Image = data?.data?.theme?.slides && data.data.theme.slides.length > 0 ? data.data.theme.slides[0].image : '';
            setSlide1Image(slide1Image);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);

      const handleButtonClick = () => {
        // Redirect to the new page
        window.location.href = 'https://demo.vshops.fi/shop/652934b8a4604e20f653aafb';
    };


    return (
        <>
            <Navbar />
            <div className='home-container-fluid'>
                <div className='home-bannerImage-container'>
                {slide1Image ? (
                <img src={slide1Image} alt="Slide 1" />
                  ) : (
                  // If slide[1] image is not available, display a default image or message
                <img src="https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Default" />
                  )}
                </div>
                <div className="text-container d-flex align-items-center flex-column">
                    <h1>Welcome to 
                    {shopName && (
                    <span> {shopName}</span>)}
                    </h1>
                    <a onClick={handleButtonClick} href="#" className="bookNow">Book Now</a>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Home;