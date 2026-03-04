# OrderOnTheGo-Your-On-Demand-Food-Ordering-Solution


OrderOnTheGo is a modern full-stack food ordering platform that connects users with restaurants for an easy and fast food delivery experience. The project is developed using the MERN (MongoDB, Express.js, React, Node.js) stack with role-based access for Admins, Customers, and Restaurants.

---

## 📁 Project Structure

```
client/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   ├── PopularRestaurants.jsx
│   │   ├── Register.jsx
│   │   └── Restaurants.jsx
│   ├── context/
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── Admin.jsx
│   │   │   ├── AllOrders.jsx
│   │   │   ├── AllProducts.jsx
│   │   │   ├── AllRestaurants.jsx
│   │   │   └── AllUsers.jsx
│   │   ├── customer/
│   │   │   ├── Cart.jsx
│   │   │   ├── CategoryProducts.jsx
│   │   │   ├── IndividualRestaurant.jsx
│   │   │   └── Profile.jsx
│   │   └── restaurant/
│   │       ├── Authentication.jsx
│   │       ├── EditProduct.jsx
│   │       ├── NewProduct.jsx
│   │       ├── RestaurantHome.jsx
│   │       ├── RestaurantMenu.jsx
│   │       └── RestaurantOrders.jsx
│   ├── styles/
│   ├── App.css
│   └── App.js
```

---

## 🚀 Features

### 👤 Admin
- Dashboard overview
- Manage users
- Manage restaurants
- View all orders and products

### 🍽️ Restaurant
- Login & authentication
- Add/Edit menu items
- View and manage orders
- Restaurant-specific dashboard

### 🧑‍💻 Customer
- Browse restaurants
- View categorized food items
- Add items to cart and place orders
- View order history and profile

---

## 🛠️ Tech Stack

| Category       | Technology         |
|----------------|--------------------|
| Frontend       | React.js           |
| Styling        | CSS                |
| State Management | React Context API |
| Backend        | Node.js, Express.js |
| Database       | MongoDB            |
| Authentication | JWT (JSON Web Token) |

---

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KalisettyAbhi234/OrderOnTheGo-Your-On-Demand-Food-Ordering-Solution.git
   cd OrderOnTheGo-Your-On-Demand-Food-Ordering-Solution
   ```

2. Install client dependencies:
   ```bash
   cd client
   npm install
   ```

3. Start the client:
   ```bash
   npm start
   ```

4. Backend setup (located in a separate folder not shown here):
   - Set up MongoDB connection string in `.env`
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the server:
     ```bash
     npm run start
     ```

---

## ✅ Future Improvements

- Payment gateway integration
- Order tracking with real-time updates
- Ratings and reviews for dishes/restaurants
- Responsive mobile-first UI

---

## 🙌 Contributing

Feel free to fork the repository and submit pull requests to improve the platform!

---

## ✨ Acknowledgments

Inspired by popular platforms like Swiggy and Zomato for their seamless user experience and food ordering flow.
