import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";

const About = () => {
  const [shopDescription, setShopDescription] = useState('');
  const [slide2Image, setSlide2Image] = useState('');

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('https://demo.vshops.fi/api/shop/652934b8a4604e20f653aafb');
        const data = await response.json();
        // Extract shopDescription 
        const description = data?.data?.description || '';
        setShopDescription(description);
        const slide2Image = data?.data?.theme?.slides && data.data.theme.slides.length > 0 ? data.data.theme.slides[1].image : '';
        setSlide2Image(slide2Image);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (

    <>
      <Navbar />
      <div className="about" id="about">
        <div className='about-bannerImage-container'>
          {slide2Image ? (
            <img src={slide2Image} alt="Slide2" />
          ) : (
            // If slide[1] image is not available, display a default image or message
            <img src="https://media.istockphoto.com/id/1182650732/fi/valokuva/abstrakti-moniv%C3%A4rinen-bokeh-tausta-valot-y%C3%B6ll%C3%A4-syksy-syksy-syksy-talvi-joulu.jpg?s=612x612&w=0&k=20&c=vkyfmHgTB8Tuv638D6wVLll22KFVpz0oItQYjW51v78=" alt="Default" />
          )}
        </div>
        <h1 className="title">About</h1>
        <div className="d-lg-flex">
          {shopDescription && (
            <p>{shopDescription}</p>)}
        </div>
      </div>
      <div className="footer-about d-flex justify-content-center">
            Powered by VShop
        </div>
    </>
  )
}

export default About;
