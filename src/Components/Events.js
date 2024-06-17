import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import Footer from './Footer';


const Events = () => {
  const [events, setEvents] = useState([]);
  const [data, setData] = useState([]);
  const [shopData, setShopData] = useState(null);
  const [prices, setPrices] = useState([]);
  const defaultImage = 'images/default-image2.jpg';


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
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('https://demo.vshops.fi/api/events/652934b8a4604e20f653aafb');
        const jsonData = await response.json();
        setData(jsonData.data);  // Assuming the data is stored directly in the response
        setPrices(jsonData.data);
        const activeEvents = data.filter(event => event.status === 'active');
        setEvents(activeEvents);
        // Store fetched events in localStorage
        localStorage.setItem('events', JSON.stringify(activeEvents));
        setEvents(activeEvents);
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
      {/* Render shop details */}
      {shopData && (
        <div className='events-bannerImage-container'>
          {/* Render third slide image or default image */}
          {shopData.theme.slides[2] && shopData.theme.slides[2].image ? (
            <img src={shopData.theme.slides[2].image} alt="Slide 3" />
          ) : (
            <img src={defaultImage} alt="Default" />
          )}
        </div>
      )}
      <div className="heading">
        <h1>Events</h1>
      </div>
      <div className="events container-fluid" id="events">
        {data.filter(item => item.status === "active").length > 0 ? (
          data.map((item, index) => (
            item.status === "active" && (
              <div key={index} className="card">
                <img className="card-img-top" src={item.image} alt="" />
                <div className="card-body">
                  <div className="card-title">
                    <h5>{item.names[0].name}</h5>
                  </div>
                  <p>Place: {item.location}</p>
                  <p>Date: {item.fromDate}</p>
                  <p>Time: {item.fromTime} - {item.toTime}</p>
                  <div className='price'>
                    {item.prices.map((price, idx) => (
                      <div key={idx}>
                        <p>
                          {price.size} - {' '}
                          {price.offerPrice !== null && price.offerPrice > 0 ? (
                            <>
                              <span style={{ textDecoration: 'line-through' }}>
                                {price.price}€
                              </span>{' '}
                              &nbsp; {price.offerPrice}€
                            </>
                          ) : (
                            `${price.price}€`
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                  <button onClick={handleButtonClick} className="btn btn-secondary custom-button" style={{ backgroundColor: "#8916EE", color: '#fff', borderRadius: '5px', padding: '10px 20px', fontSize: '20px' }}>BOOK NOW</button>
                </div>
              </div>
            )
          ))
        ) : (
          <p>There are no active events.</p>
        )}
      </div>
      <Footer />
    </>
  )
}

export default Events;
