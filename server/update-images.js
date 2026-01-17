import mongoose from 'mongoose';
import { Restaurant, FoodItem, Admin } from './Schema.js';

// Sample restaurant data with high-quality images
const sampleRestaurants = [
  {
    title: "Burger Palace",
    address: "123 Main Street, Downtown",
    mainImg: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    menu: ["Burgers", "Fast Food", "Beverages"]
  },
  {
    title: "Pizza Heaven",
    address: "456 Oak Avenue, Westside",
    mainImg: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    menu: ["Pizza", "Italian", "Desserts"]
  },
  {
    title: "Hyderabadi Biryani House",
    address: "789 Spice Road, Old City",
    mainImg: "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    menu: ["Biryani", "Indian", "Chinese"]
  },
  {
    title: "South Indian Tiffins",
    address: "321 Breakfast Street, Gandhi Nagar",
    mainImg: "https://images.unsplash.com/photo-1534422298391-e4f8c5ddc5fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    menu: ["Breakfast", "South Indian", "Tiffins"]
  },
  {
    title: "Noodle Express",
    address: "555 Asian Street, Chinatown",
    mainImg: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    menu: ["Noodles", "Chinese", "Asian"]
  },
  {
    title: "Sweet Dreams Bakery",
    address: "777 Sugar Lane, Confectionery District",
    mainImg: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    menu: ["Desserts", "Bakery", "Beverages"]
  }
];

// Sample food items with high-quality images
const sampleFoodItems = [
  {
    title: "Classic Cheeseburger",
    description: "Juicy beef patty with melted cheese, lettuce, tomato, and our special sauce",
    itemImg: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Non Veg",
    menuCategory: "Burgers",
    price: 299,
    discount: 10,
    rating: 4.5
  },
  {
    title: "Veggie Delight Pizza",
    description: "Fresh vegetables with mozzarella cheese on our crispy thin crust",
    itemImg: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Veg",
    menuCategory: "Pizza",
    price: 399,
    discount: 15,
    rating: 4.3
  },
  {
    title: "Hyderabadi Chicken Biryani",
    description: "Authentic Hyderabadi style biryani with aromatic basmati rice and tender chicken",
    itemImg: "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Non Veg",
    menuCategory: "Biryani",
    price: 450,
    discount: 5,
    rating: 4.7
  },
  {
    title: "South Indian Breakfast Tiffin",
    description: "Traditional South Indian breakfast with idli, vada, sambar and chutney",
    itemImg: "https://images.unsplash.com/photo-1534422298391-e4f8c5ddc5fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Veg",
    menuCategory: "Breakfast",
    price: 180,
    discount: 0,
    rating: 4.6
  },
  {
    title: "Veg Biryani",
    description: "Aromatic vegetable biryani with fresh vegetables and fragrant basmati rice",
    itemImg: "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Veg",
    menuCategory: "Biryani",
    price: 350,
    discount: 10,
    rating: 4.4
  },
  {
    title: "Masala Dosa with Chutney",
    description: "Crispy rice pancake with potato filling and coconut chutney",
    itemImg: "https://images.unsplash.com/photo-1534422298391-e4f8c5ddc5fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Veg",
    menuCategory: "Breakfast",
    price: 150,
    discount: 5,
    rating: 4.5
  },
  {
    title: "Hakka Noodles",
    description: "Stir-fried noodles with fresh vegetables and soy sauce",
    itemImg: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Veg",
    menuCategory: "Noodles",
    price: 250,
    discount: 0,
    rating: 4.2
  },
  {
    title: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten chocolate center, served with vanilla ice cream",
    itemImg: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Veg",
    menuCategory: "Desserts",
    price: 199,
    discount: 20,
    rating: 4.8
  }
];

async function updateImages() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/orderonthego', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Update categories
    let admin = await Admin.findOne();
    if (!admin) {
      admin = new Admin({
        categories: ["Breakfast", "Biryani", "Pizza", "Burger", "Noodles", "Chinese", "Desserts", "Beverages"],
        promotedRestaurants: []
      });
      await admin.save();
      console.log('Created admin with default categories');
    } else if (admin.categories.length === 0) {
      admin.categories = ["Breakfast", "Biryani", "Pizza", "Burger", "Noodles", "Chinese", "Desserts", "Beverages"];
      await admin.save();
      console.log('Updated admin categories');
    }

    // Update existing restaurants with better images
    const existingRestaurants = await Restaurant.find();
    for (let restaurant of existingRestaurants) {
      const randomImage = sampleRestaurants[Math.floor(Math.random() * sampleRestaurants.length)];
      restaurant.mainImg = randomImage.mainImg;
      await restaurant.save();
      console.log(`Updated restaurant: ${restaurant.title}`);
    }

    // Add sample restaurants if database is empty
    if (existingRestaurants.length < 2) {
      for (let restaurantData of sampleRestaurants) {
        const restaurant = new Restaurant({
          ownerId: "sample-owner",
          ...restaurantData
        });
        await restaurant.save();
        console.log(`Added sample restaurant: ${restaurantData.title}`);
      }
    }

    // Add sample food items
    const restaurants = await Restaurant.find();
    for (let i = 0; i < sampleFoodItems.length; i++) {
      const foodItem = new FoodItem({
        ...sampleFoodItems[i],
        restaurantId: restaurants[i % restaurants.length]._id  // Cycle through restaurants
      });
      await foodItem.save();
      console.log(`Added food item: ${sampleFoodItems[i].title} to ${restaurants[i % restaurants.length].title}`);
    }

    console.log('Image updates completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating images:', error);
    process.exit(1);
  }
}

updateImages();
