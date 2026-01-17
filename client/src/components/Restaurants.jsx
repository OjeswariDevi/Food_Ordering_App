import React from 'react'
import '../styles/Restaurants.css'

const Restaurants = () => {
  return (
    <div className="restaurants-container">
        <div className="restaurants-filter">
            <h4>Filters</h4>
            <div className="restaurant-filters-body">

                <div className="filter-sort">
                    <h6>Sort By</h6>
                    <div className="filter-sort-body sub-filter-body">

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="filter-sort-radio1" />
                            <label className="form-check-label" htmlFor="filter-sort-radio1" >
                                Popularity
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="filter-sort-radio4" />
                            <label className="form-check-label" htmlFor="filter-sort-radio4">
                                Rating
                            </label>
                        </div>

                    </div>
                </div>
                <div className="filter-categories">
                    <h6>Categories</h6>
                    <div className="filter-categories-body sub-filter-body">

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="filter-category-check-1" />
                            <label className="form-check-label" htmlFor="filter-category-check-1">
                                South Indian
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="filter-category-check-2" />
                            <label className="form-check-label" htmlFor="filter-category-check-2">
                                North Indian
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="filter-category-check-3" />
                            <label className="form-check-label" htmlFor="filter-category-check-3">
                                Chinese
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="filter-category-check-4" />
                            <label className="form-check-label" htmlFor="filter-category-check-4">
                                Beverages
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="filter-category-check-5" />
                            <label className="form-check-label" htmlFor="filter-category-check-5">
                                Ice Cream
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                Tiffins
                            </label>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>


        <div className="restaurants-body">
            <h3>All restaurants</h3>
            <div className="restaurants">

                <div className='restaurant-item'>
                    <div className="restaurant">
                        <img src="https://odhi.in/image/cache/catalog/eat/chicken-biryani-odhi-in-eat-online-coimbatore-1000x1000.jpg" alt="" />
                        <div className="restaurant-data">
                            <h6>Product title</h6>
                            <p>Description about product</p>
                            <h5>Rating: <b>3.6/5</b></h5>
                        </div>
                    </div>
                </div>

                <div className='restaurant-item'>
                    <div className="restaurant">
                        <img src="https://odhi.in/image/cache/catalog/eat/chicken-biryani-odhi-in-eat-online-coimbatore-1000x1000.jpg" alt="" />
                        <div className="restaurant-data">
                            <h6>Product title</h6>
                            <p>Description about product</p>
                            <h5>Rating: <b>3.6/5</b></h5>
                        </div>
                    </div>
                </div>

                <div className='restaurant-item'>
                    <div className="restaurant">
                        <img src="https://odhi.in/image/cache/catalog/eat/chicken-biryani-odhi-in-eat-online-coimbatore-1000x1000.jpg" alt="" />
                        <div className="restaurant-data">
                            <h6>Product title</h6>
                            <p>Description about product</p>
                            <h5>Rating: <b>3.6/5</b></h5>
                        </div>
                    </div>
                </div>

                <div className='restaurant-item'>
                    <div className="restaurant">
                        <img src="https://odhi.in/image/cache/catalog/eat/chicken-biryani-odhi-in-eat-online-coimbatore-1000x1000.jpg" alt="" />
                        <div className="restaurant-data">
                            <h6>Product title</h6>
                            <p>Description about product</p>
                            <h5>Rating: <b>3.6/5</b></h5>
                        </div>
                    </div>
                </div>

                <div className='restaurant-item'>
                    <div className="restaurant">
                        <img src="https://odhi.in/image/cache/catalog/eat/chicken-biryani-odhi-in-eat-online-coimbatore-1000x1000.jpg" alt="" />
                        <div className="restaurant-data">
                            <h6>Product title</h6>
                            <p>Description about product</p>
                            <h5>Rating: <b>3.6/5</b></h5>
                        </div>
                    </div>
                </div>




            </div>
        </div>
    </div>
  )
}

export default Restaurants


// // updated code

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../styles/light-theme.css';

// const Restaurant = () => {
//   const [restaurants, setRestaurants] = useState([]);

//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       try {
//         const response = await axios.get('/api/restaurants');
//         setRestaurants(response.data);
//       } catch (error) {
//         console.error('Error fetching restaurants:', error);
//       }
//     };

//     fetchRestaurants();
//   }, []);

//   return (
//     <div className="container">
//       <h1 className="page-title">Our Partnered Restaurants</h1>
//       {restaurants.map((restaurant) => (
//         <div key={restaurant._id} className="card restaurant-card">
//           <div className="restaurant-header">
//             <h2 className="restaurant-name">{restaurant.name}</h2>
//           </div>
//           <div className="restaurant-body">
//             <p className="restaurant-description">{restaurant.description}</p>
//             <p className="restaurant-address">📍 {restaurant.location}</p>
//           </div>
//           <div className="restaurant-footer">
//             <button className="order-button">View Menu</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Restaurant;
