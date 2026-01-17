import React, { useContext, useState, useEffect } from 'react'
import { GeneralContext } from '../context/GeneralContext';

const Register = ({setIsLogin}) => {

  const {setUsername, setEmail, setPassword, setUsertype, usertype, setRestaurantAddress, setRestaurantImage, restaurantImage, register} = useContext(GeneralContext);

  // Default restaurant images
  const defaultRestaurantImages = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1534422298391-e4f8c5ddc5fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  ];

  // Set default image when restaurant type is selected
  useEffect(() => {
    if (usertype === 'restaurant' && !restaurantImage) {
      const randomImage = defaultRestaurantImages[Math.floor(Math.random() * defaultRestaurantImages.length)];
      setRestaurantImage(randomImage);
    }
  }, [usertype, restaurantImage, setRestaurantImage]);

  const handleRegister = async (e) =>{
    e.preventDefault();
    await register();
  }


  return (
    <form className="authForm">
        <h2>Register</h2>
        <div className="form-floating mb-3 authFormInputs">
            <input type="text" className="form-control" id="floatingInput" placeholder="username"
                                                       onChange={(e)=> setUsername(e.target.value)} />
            <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating mb-3 authFormInputs">
            <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com"
                                                       onChange={(e)=> setEmail(e.target.value)} />
            <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3 authFormInputs">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                                                       onChange={(e)=> setPassword(e.target.value)} /> 
            <label htmlFor="floatingPassword">Password</label>
        </div>
        <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" 
                                                      onChange={(e)=> setUsertype(e.target.value)}>
          <option value="">User type</option>
          {/* <option value="admin">Admin</option> */}
          <option value="restaurant">Restaurant</option>
          <option value="customer">Customer</option>
        </select>

        {usertype === 'restaurant' ?
          <>
          <div className="form-floating mb-3 authFormInputs">
              <input type="text" className="form-control" id="floatingAddress" placeholder="Address"
                                                        onChange={(e)=> setRestaurantAddress(e.target.value)} /> 
              <label htmlFor="floatingAddress">Address</label>
          </div>
          <div className="form-floating mb-3 authFormInputs">
              <input type="text" className="form-control" id="floatingImage" placeholder="Image" value={restaurantImage}
                                                        onChange={(e)=> setRestaurantImage(e.target.value)} /> 
              <label htmlFor="floatingImage">Thumbnail Image</label>
              {restaurantImage && (
                <div className="mt-2">
                  <img src={restaurantImage} alt="Restaurant Preview" style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px'}} />
                  <p className="text-muted small mt-1">Restaurant image preview</p>
                </div>
              )}
              <div className="mt-3">
                <p className="small text-muted">Or choose a default image:</p>
                <div className="d-flex flex-wrap gap-2">
                  {defaultRestaurantImages.map((img, index) => (
                    <img 
                      key={index}
                      src={img} 
                      alt={`Default ${index + 1}`}
                      style={{width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer', border: restaurantImage === img ? '3px solid #007bff' : '1px solid #ddd'}}
                      onClick={() => setRestaurantImage(img)}
                    />
                  ))}
                </div>
              </div>
          </div>
          </>
        :
        ""
        }
        
        <button className="btn btn-primary" onClick={handleRegister}>Sign up</button>
        <p>Already registered? <span onClick={()=> setIsLogin(true)}>Login</span></p>
    </form>
  )}
export default Register;