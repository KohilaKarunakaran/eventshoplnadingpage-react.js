import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import Footer from './Footer';


const Contact = () => {
    const [shopData, setShopData] = useState(null);
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [openingHours, setOpeningHours] = useState({});

    useEffect(() => {
        // Fetch data from API
        const fetchshopData = async () => {
          try {
            const response = await fetch('https://demo.vshops.fi/api/shop/652934b8a4604e20f653aafb');
            const jsonData = await response.json();
            setShopData(jsonData.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchshopData();
    }, []);

    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
          try {
            const response = await fetch('https://demo.vshops.fi/api/shop/652934b8a4604e20f653aafb');
            const data = await response.json();
            // Extract shopName from the theme array
            const { addressLine1, addressLine2, city, state, pincode } = data?.data?.address || {};
        setAddressLine1(addressLine1 || '');
        setAddressLine2(addressLine2 || '');
        setCity(city || '');
        setState(state || '');
        setPinCode(pincode || '');
        const phoneNumber = data?.data?.phoneNumber || '';
        setPhoneNumber(phoneNumber || '');
        const hours = data?.data?.shopTiming || {};
        setOpeningHours(hours);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
    return (
        <>
        <Navbar />
                    {/* Render shop details */}
           {shopData && (
              <div className='events-bannerImage-container'>
                  {/* Render third slide image or default image */}
                     {shopData.theme.slides[3] && shopData.theme.slides[3].image ? (
                        <img src={shopData.theme.slides[3].image} alt="Slide4" />
                       ) : (
                       <img src="https://th.bing.com/th/id/OIP.20tGK2byPoTRxhKC_xr3twHaEK?w=271&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Default" />
                          )}
              </div>
                )}
            <div className="heading">
                <h1>Contact</h1>
            </div>

        <div className="contact d-lg-flex" id="contact">
            <div className="leftContainer">
                <div className="addressContainer">
                    <h3 className="contactHeadings" id="addressHeading">Address</h3>
                    <div className="line1">
                        <span id="addressLine1">{addressLine1}</span>
                        <span>,</span>
                        <span id="addressLine2"> {addressLine2}</span>
                    </div>
                    <div className="line2">
                        <span id="city">{city}</span>
                        <span>,</span>
                        <span id="state"> {state}</span>
                        <span>,</span>
                        <span id="pinCode"> {pinCode}</span>
                    </div>
                </div>
                <div className="googleMapContainer">
                        <iframe className="map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1979.887577255238!2d24.05927707711804!3d60.24877797507256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x468dbf7a90feb01d%3A0x31e2efe9e67459d!2sLaurinkatu%2034%2C%2008100%20Lohja!5e0!3m2!1sfi!2sfi!4v1710710638829!5m2!1sfi!2sfi"
                        ></iframe>
                </div>
            </div>
            <div className="rightContainer">
                <div className="phNumContainer">
                    <h3 className="contactHeadings" id="contactNum">Contact</h3>
                    <i id="callIcon" className="fa-solid fa-phone"></i>
                    <p id="phoneNumber">{phoneNumber}</p>
                </div>
                <div className="openHrContainer">
                    <h3 className="contactHeadings" id="openHours">Opening Hours</h3>
                    <div id="nostyle">
                        <table className="table-responsive-md table-borderless" id="openHoursTable">
                            <tbody>
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                <tr key={day}>
                                    <td id="days">{day}</td>
                                    <td>{openingHours[day.toLowerCase()]?.opening}</td>
                                    <td>-</td>
                                    <td>{openingHours[day.toLowerCase()]?.closing}</td>
                                </tr>
                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default Contact
