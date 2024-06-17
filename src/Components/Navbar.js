import React, { useState, useEffect } from 'react';
import { HiOutlineBars3 } from 'react-icons/hi2';
import { Link } from 'react-router-dom';


const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [bannerImage, setBannerImage] = useState('');
    const [primaryColor, setPrimaryColor] = useState('');
    const [secondaryColor, setSecondaryColor] = useState('');
    const toggleMenu = () => {
        setOpenMenu(!openMenu); // Toggle the state between true and false
    };

    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            try {
                const response = await fetch('https://demo.vshops.fi/api/shop/652934b8a4604e20f653aafb');
                const data = await response.json();
                // Extract bannerImage from the theme array
                const themeBannerImage = data?.data?.theme?.bannerImage || '';
                setBannerImage(themeBannerImage);
                const primaryColor = data?.data?.theme?.primaryColor || '';
                setPrimaryColor(primaryColor);
                const secondaryColor = data?.data?.theme?.secondaryColor || '';
                setSecondaryColor(secondaryColor);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark"  style={{ backgroundColor: primaryColor }}>
            <div className="container">
                <Link className="navbar-brand" href="#">
                    {bannerImage && (
                        <img src={bannerImage} alt="Banner" />
                    )}
                </Link>
                <div className='navBar-menu-container'>
                <HiOutlineBars3 onClick={toggleMenu} />
                </div>

                <div className={`collapse navbar-collapse ${openMenu ? 'show' : ''}`}>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item" >
                            <Link className="nav-links" to="/home" style={{ color: secondaryColor }}>Home</Link></li>
                        <li className="nav-item">
                            <Link className="nav-links" to="/about" style={{ color: secondaryColor }}>About</Link></li>
                        <li className="nav-item">
                            <Link className="nav-links" to="/events" style={{ color: secondaryColor }}>Events</Link></li>
                        <li className="nav-item">
                            <Link className="nav-links" to="/contact" style={{ color: secondaryColor }}>Contact</Link></li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Navbar;
