import React, { useEffect, useState } from 'react'
import '../../styles/CategoryProducts.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SpecialItems = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpecialItems();
  }, []);

  const fetchSpecialItems = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-items');
      console.log('All items:', response.data);
      const specialItems = response.data.filter(item => 
        item.menuCategory === 'Breakfast' || 
        item.menuCategory === 'Biryani'
      );
      console.log('Filtered special items:', specialItems);
      setItems(specialItems);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching special items:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = async (foodItemId, foodItemName, restaurantId, foodItemImg, price, discount) => {
    const userId = localStorage.getItem('userId');
    const quantity = 1;

    if (!userId) {
      alert('Please login to add items to cart');
      navigate('/auth');
      return;
    }

    try {
      await axios.post('http://localhost:6001/add-to-cart', {
        userId, 
        foodItemId, 
        foodItemName, 
        restaurantId, 
        foodItemImg, 
        price, 
        discount, 
        quantity
      });
      alert('Item added to cart!');
    } catch (error) {
      alert('Failed to add item to cart');
    }
  };

  if (loading) {
    return <div className="loading">Loading special items...</div>;
  }

  return (
    <div className="category-products-page">
      <div className="category-header">
        <h2>🍳 Breakfast & 🍛️ Biryani Specials</h2>
        <p>Start your day with delicious breakfast or enjoy authentic biryani</p>
      </div>

      <div className="category-products">
        {items.map((item) => (
          <div className="category-product-card" key={item._id}>
            <div className="product-image">
              <img src={item.itemImg} alt={item.title} />
              {item.discount > 0 && (
                <span className="discount-badge">{item.discount}% OFF</span>
              )}
            </div>
            <div className="product-details">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <div className="product-meta">
                <span className="category-tag">{item.menuCategory}</span>
                <span className="type-tag">{item.category}</span>
              </div>
              <div className="price-section">
                <div className="price">
                  <span className="current-price">
                    ₹{parseInt(item.price - (item.price * item.discount) / 100)}
                  </span>
                  {item.discount > 0 && (
                    <span className="original-price">₹{item.price}</span>
                  )}
                </div>
                <div className="rating">
                  ⭐ {item.rating}
                </div>
              </div>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(
                  item._id, 
                  item.title, 
                  item.restaurantId, 
                  item.itemImg, 
                  item.price, 
                  item.discount
                )}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="no-items">
          <h3>No special items available</h3>
          <p>Check back later for delicious breakfast and biryani items!</p>
        </div>
      )}
    </div>
  );
};

export default SpecialItems;
