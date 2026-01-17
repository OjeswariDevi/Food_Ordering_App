import React, { useEffect, useState } from 'react'
import '../../styles/NewItems.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const NewProduct = () => {
 
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productMainImg, setProductMainImg] = useState('');
  const [productMenuCategory, setProductMenuCategory] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productNewCategory, setProductNewCategory] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productDiscount, setProductDiscount] = useState(0);

  // Default food images based on category
  const getDefaultFoodImage = (category, menuCategory) => {
    const defaultImages = {
      'Veg': {
        'Breakfast': 'https://images.unsplash.com/photo-1534422298391-e4f8c5ddc5fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'Biryani': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'Pizza': 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'Noodles': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'Chinese': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'Desserts': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'default': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      'Non Veg': {
        'Biryani': 'https://images.unsplash.com/photo-1618737459434-4d0e5a5e3f4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'Pizza': 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'default': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      'Beverages': {
        'default': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      }
    };
    
    return defaultImages[category]?.[menuCategory] || defaultImages[category]?.['default'] || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
  };

  // Auto-fill image when category changes
  useEffect(() => {
    if (productCategory && productMenuCategory && productMenuCategory !== 'new category') {
      const defaultImage = getDefaultFoodImage(productCategory, productMenuCategory);
      setProductMainImg(defaultImage);
    }
  }, [productCategory, productMenuCategory]);


  const [AvailableCategories, setAvailableCategories] = useState([]);

  const [restaurant, setRestaurant] = useState();

  useEffect(()=>{
    fetchCategories();
    fetchRestaurant();
  },[])
  const fetchCategories = async () =>{
    await axios.get('http://localhost:6001/fetch-categories').then(
      (response)=>{
        setAvailableCategories(response.data);
      }
    )
  }

  const fetchRestaurant = async () =>{
    await axios.get(`http://localhost:6001/fetch-restaurant-details/${userId}`).then(
      (response)=>{
        setRestaurant(response.data);
      }
    )
  }

  const handleNewProduct = async() =>{
    await axios.post('http://localhost:6001/add-new-product', {restaurantId: restaurant._id, productName, productDescription, productMainImg, productCategory, productMenuCategory, productNewCategory, productPrice, productDiscount}).then(
      (response)=>{
        alert("product added");
        setProductName('');
        setProductDescription('');
        setProductMainImg('');
        setProductCategory('');
        setProductMenuCategory('');
        setProductNewCategory('');
        setProductPrice(0);
        setProductDiscount(0);

        navigate('/restaurant-menu');
      }
    )
  }


  return (
    <div className="new-product-page">
        <div className="new-product-container">
          <h3>New Item</h3>

          <div className="new-product-body">

            <span>
              <div className="form-floating mb-3 span-21">
                <input type="text" className="form-control" id="floatingNewProduct1" value={productName} onChange={(e)=>setProductName(e.target.value)} />
                <label htmlFor="floatingNewProduct1">Product name</label>
              </div>
              <div className="form-floating mb-3 span-22">
                <input type="text" className="form-control" id="floatingNewProduct2" value={productDescription} onChange={(e)=>setProductDescription(e.target.value)} />
                <label htmlFor="floatingNewProduct2">Product Description</label>
              </div>
            </span>

            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="floatingNewProduct1" value={productMainImg} onChange={(e)=>setProductMainImg(e.target.value)}/>
              <label htmlFor="floatingNewProduct1">Thumbnail Img url</label>
              {productMainImg && (
                <div className="mt-2">
                  <img src={productMainImg} alt="Preview" style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px'}} />
                  <p className="text-muted small mt-1">Image preview (auto-filled based on category)</p>
                </div>
              )}
            </div>

            <section>
              <h4>Type</h4>
              <span>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="productCategory" value="Veg" id="flexRadioDefault1" onChange={(e)=> setProductCategory(e.target.value)} />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Veg
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="productCategory" value="Non Veg" id="flexRadioDefault2" onChange={(e)=> setProductCategory(e.target.value)}/>
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Non Veg
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="productCategory" value="Beverages" id="flexRadioDefault2" onChange={(e)=> setProductCategory(e.target.value)}/>
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Beverages
                  </label>
                </div>
              </span>
            </section>


            <span>
              <div className="form-floating mb-3 span-3">
                <select className="form-select" id='floatingNewProduct5' aria-label="Default select example" value={productMenuCategory} onChange={(e)=>setProductMenuCategory(e.target.value)}>
                  <option value="">Choose Product category</option>
                  {AvailableCategories.map((category)=>{
                    return(
                        <option value={category}>{category}</option>
                    )
                  })}
                  <option value="new category">New category</option>
                </select>
                <label htmlFor="floatingNewProduct5">Category</label>
              </div>
              <div className="form-floating mb-3 span-3">
                <input type="number" className="form-control" id="floatingNewProduct6" value={productPrice} onChange={(e)=>setProductPrice(e.target.value)}/>
                <label htmlFor="floatingNewProduct6">Price</label>
              </div>
              <div className="form-floating mb-3 span-3">
                <input type="number" className="form-control" id="floatingNewProduct7" value={productDiscount} onChange={(e)=>setProductDiscount(e.target.value)}/>
                <label htmlFor="floatingNewProduct7">Discount (in %)</label>
              </div>
            </span>

            {productMenuCategory === 'new category' ?
               <div className="form-floating mb-3">
               <input type="text" className="form-control" id="floatingNewProduct8" value={productNewCategory} onChange={(e)=>setProductNewCategory(e.target.value)}/>
               <label htmlFor="floatingNewProduct8">New Category</label>
           </div>
            :
                  ""
            }
           

          </div>

          <button className='btn btn-primary' onClick={handleNewProduct}>Add Item</button>
        </div>
    </div>
  )
}

export default NewProduct