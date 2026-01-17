import React, { useEffect, useState } from 'react'
import '../../styles/Restaurants.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllRestaurants = () => {

    const navigate = useNavigate();

    const [restaurants, setRestaurants] = useState([]);

    useEffect(()=>{
        fetchRestaurants();
      }, [])

    const fetchRestaurants = async() =>{
        await axios.get('http://localhost:6001/fetch-restaurants').then(
          (response)=>{
            setRestaurants(response.data);
          }
        )
      }

    const handleRestaurantClick = (restaurantId) => {
        navigate(`/restaurant/${restaurantId}`);
    }

  return (
    <div className="AllRestaurantsPage" style={{marginTop: '14vh'}}>

    <div className="restaurants-container">
 
        <div className="restaurants-body">
            <h3>All restaurants</h3>
            <div className="restaurants">
                {restaurants.map((restaurant) =>(

                    <div className='restaurant-item' key={restaurant._id}>
                        <div className="restaurant" onClick={() => handleRestaurantClick(restaurant._id)}>
                            <img 
                                src={restaurant.mainImg} 
                                alt={restaurant.title}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
                                }}
                            />
                            <div className="restaurant-data">
                                <h6>{restaurant.title}</h6>
                                <p>{restaurant.address}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    </div>
  )
}

export default AllRestaurants