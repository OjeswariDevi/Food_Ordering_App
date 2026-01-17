import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import {Admin, Cart, FoodItem, Orders, Restaurant, User } from './Schema.js'


const app = express();

app.use(express.json());
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());


const PORT = 6001;
mongoose.connect('mongodb://localhost:27017/orderonthego', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{

    app.post('/register', async (req, res) => {
        const { username, email, usertype, password , restaurantAddress, restaurantImage} = req.body;
        
        console.log('Registration request:', { username, email, usertype, hasRestaurantAddress: !!restaurantAddress, hasRestaurantImage: !!restaurantImage });
        
        try {
          
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            if(usertype === 'restaurant'){
                if (!restaurantAddress || !restaurantImage) {
                    return res.status(400).json({ message: 'Restaurant address and image are required for restaurant registration' });
                }
                
                const newUser = new User({
                    username, email, usertype, password: hashedPassword, approval: 'approved'
                });
                const user =  await newUser.save();
                console.log('User created:', user);
                
                const restaurant = new Restaurant({ownerId: user._id ,title: username, address: restaurantAddress, mainImg: restaurantImage, menu: []});
                await restaurant.save();
                console.log('Restaurant created:', restaurant);

                return res.status(201).json(user);

            } else{

                const newUser = new User({
                    username, email, usertype, password: hashedPassword, approval: 'approved'
                });
                const userCreated = await newUser.save();
                return res.status(201).json(userCreated);
            }

        } catch (error) {
          console.log('Registration error:', error);
          return res.status(500).json({ message: 'Server Error', error: error.message });
        }
    });
    });



    app.post('/login', async (req, res) => {
        const { email, password } = req.body;
        try {

            const user = await User.findOne({ email });
    
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            } else{
                return res.json(user);
            }
          
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'Server Error' });
        }
    });

    // promote restaurant

    app.post('/update-promote-list', async(req, res)=>{
        const {promoteList} = req.body;
        try{
            const admin = await Admin.findOne();
            admin.promotedRestaurants = promoteList;
            await admin.save();
            res.json({message: 'approved'});

        }catch(err){
            res.status(500).json({ message: 'Error occured' });
        }
    })

    // approve restaurant

    app.post('/approve-user', async(req, res)=>{
        const {id} = req.body;
        try{
            const restaurant = await User.findById(id);
            restaurant.approval = 'approved';
            await restaurant.save();
            res.json({message: 'approved'});

        }catch(err){
            res.status(500).json({ message: 'Error occured' });
        }
    })

    // reject restaurant

    app.post('/reject-user', async(req, res)=>{
        const {id} = req.body;
        try{
            const restaurant = await User.findById(id);
            restaurant.approval = 'rejected';
            await restaurant.save();
            res.json({message: 'rejected'});

        }catch(err){
            res.status(500).json({ message: 'Error occured' });
        }
    })



    // fetch user details

    app.get('/fetch-user-details/:id', async(req, res)=>{

        try{
            const user = await User.findById(req.params.id);
            res.json(user);

        }catch(err){
            res.status(500).json({ message: 'Error occured' });
        }
    })

    // fetch users

    app.get('/fetch-users', async(req, res)=>{
        try{
            const users = await User.find();
            res.json(users);

        }catch(err){
            res.status(500).json({ message: 'Error occured' });
        }
    })

    // fetch restaurants

    app.get('/fetch-restaurants', async(req, res)=>{
        try{
            const restaurants = await Restaurant.find();
            res.json(restaurants);

        }catch(err){
            res.status(500).json({ message: 'Error occured' });
        }
    })

     // Fetch individual product
     app.get('/fetch-product-details/:id', async(req, res)=>{
        const id = req.params.id;
        try{
            const product = await Product.findById(id);
            res.json(product);
        }catch(err){
            res.status(500).json({message: "Error occured"});
        }
    })

    // fetch products

    app.get('/fetch-products', async(req, res)=>{
        try{
            const products = await Product.find();
            res.json(products);

        }catch(err){
            res.status(500).json({ message: 'Error occured' });
        }
    })

    // fetch orders

    app.get('/fetch-orders', async(req, res)=>{
        try{
            const orders = await Orders.find();
            res.json(orders);

        }catch(err){
            res.status(500).json({ message: 'Error occured' });
        }
    })

    // fetch food items

    app.get('/fetch-items', async(req, res)=>{
        try{
            const items = await FoodItem.find();
            res.json(items);

        }catch(err){
            res.status(500).json({ message: 'Error occured' });
        }
    })


    // Fetch categories

    app.get('/fetch-categories', async(req, res)=>{
        try{
            const data = await Admin.find();
            if(data.length===0){
                const newData = new Admin({ categories: [], promotedRestaurants: []})
                await newData.save();
                return res.json(newData[0].categories);
            }else{
                return res.json(data[0].categories);
            }
        }catch(err){
            res.status(500).json({message: "Error occured"});
        }
    })

    // Fetch promoted list

    app.get('/fetch-promoted-list', async(req, res)=>{
        try{
            const data = await Admin.find();
            if(data.length===0){
                const newData = new Admin({ categories: [], promotedRestaurants: []})
                await newData.save();
                return res.json(newData[0].promotedRestaurants);
            }else{
                return res.json(data[0].promotedRestaurants);
            }
        }catch(err){
            res.status(500).json({message: "Error occured"});
        }
    })

    // fetch restaurant details with owner id

    app.get('/fetch-restaurant-details/:id', async(req, res)=>{

        try{
            const restaurant = await Restaurant.findOne({ownerId: req.params.id});
            res.json(restaurant);

        }catch(err){
            res.status(500).json({ message: 'Error occured' });
        }
    })

    

     // fetch restaurant details with restaurant id

     app.get('/fetch-restaurant/:id', async(req, res)=>{

        try{
            const restaurant = await Restaurant.findById( req.params.id);
            res.json(restaurant);

        }catch(err){
            res.status(500).json({ message: 'Error occured' });
        }
    })

     // fetch item details

     app.get('/fetch-item-details/:id', async(req, res)=>{

        try{
            const item = await FoodItem.findById(req.params.id);
            res.json(item);

        }catch(err){
            res.status(500).json({ message: 'Error occured' });
        }
    })



    // Add new product

    app.post('/add-new-product', async(req, res)=>{
        const {restaurantId, productName, productDescription, productMainImg, productCategory, productMenuCategory, productNewCategory, productPrice, productDiscount} = req.body;
        try{
            if(productMenuCategory === 'new category'){
                const admin = await Admin.findOne();
                admin.categories.push(productNewCategory);
                await admin.save();
                const newProduct = new FoodItem({restaurantId, title: productName, description: productDescription, itemImg: productMainImg, category: productCategory, menuCategory: productNewCategory, price: productPrice, discount: productDiscount, rating: 0});
                await newProduct.save();
                const restaurant = await Restaurant.findById(restaurantId);
                restaurant.menu.push(productNewCategory);
                await restaurant.save();
            } else{
                const newProduct = new FoodItem({restaurantId, title: productName, description: productDescription, itemImg: productMainImg, category: productCategory, menuCategory: productMenuCategory,  price: productPrice, discount: productDiscount, rating: 0});
                await newProduct.save();
            }
            res.json({message: "product added!!"});
        }catch(err){
            res.status(500).json({message: "Error occured"});
        }
    })




    // update product

    app.put('/update-product/:id', async(req, res)=>{
        const {restaurantId, productName, productDescription, productMainImg, productCategory, productMenuCategory, productNewCategory, productPrice, productDiscount} = req.body;
        try{
            if(productCategory === 'new category'){
                const admin = await Admin.findOne();
                admin.categories.push(productNewCategory);
                await admin.save();

                const product = await FoodItem.findById(req.params.id);

                product.title = productName;
                product.description = productDescription;
                product.itemImg = productMainImg;
                product.category = productCategory;
                product.menuCategory = productNewCategory
                product.price = productPrice;
                product.discount = productDiscount;

                await product.save();
               
            } else{
                const product = await FoodItem.findById(req.params.id);

                product.title = productName;
                product.description = productDescription;
                product.itemImg = productMainImg;
                product.category = productCategory;
                product.menuCategory = productMenuCategory;
                product.price = productPrice;
                product.discount = productDiscount;

                await product.save();
            }
            res.json({message: "product updated!!"});
        }catch(err){
            res.status(500).json({message: "Error occured"});
        }
    })

   
    // cancel order

    app.put('/cancel-order', async(req, res)=>{
        const {id} = req.body;
        try{

            const order = await Orders.findById(id);
            order.orderStatus = 'cancelled';
            await order.save();
            res.json({message: 'order cancelled'});

        }catch(err){
            res.status(500).json({message: "Error occured"});
        }
    })


    // update order status

    app.put('/update-order-status', async(req, res)=>{
        const {id, updateStatus} = req.body;
        try{

            const order = await Orders.findById(id);
            order.orderStatus = updateStatus;
            await order.save();
            res.json({message: 'order status updated'});

        }catch(err){
            res.status(500).json({message: "Error occured"});
        }
    })


    // fetch cart items

    app.get('/fetch-cart', async(req, res)=>{
        try{
            
            const items = await Cart.find();
            res.json(items);

        }catch(err){
            res.status(500).json({message: "Error occured"});
        }
    })

    app.get('/restaurants-by-category/:category', async (req, res) => {
  const { category } = req.params;

  try {
    // Step 1: Find food items in this category
    const foodItems = await FoodItem.find({ menuCategory: category });

    // Step 2: Extract unique restaurant IDs
    const restaurantIds = [...new Set(foodItems.map(item => item.restaurantId))];

    // Step 3: Fetch restaurants by those IDs
    const restaurants = await Restaurant.find({ _id: { $in: restaurantIds } });

    res.json(restaurants);
//     console.log("Category:", category);
// console.log("Found items:", foodItems.length);
// console.log("Restaurant IDs:", restaurantIds);

  } catch (error) {
    console.error("Error fetching restaurants by category:", error);
    res.status(500).json({ message: 'Server error' });
  }
});



    // add cart item

    app.post('/add-to-cart', async(req, res)=>{

        const {userId, foodItemId, foodItemName, restaurantId, foodItemImg, price, discount, quantity} = req.body
        try{

    // Add sample food items
    const restaurants = await Restaurant.find();
    const sampleFoodItems = [
      {
        title: "Classic Cheeseburger",
        description: "A classic cheeseburger with beef patty, cheese, lettuce, tomato, and onion on a toasted bun",
        itemImg: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "Burgers",
        menuCategory: "Burger Palace",
        price: 299,
        discount: 10,
        rating: 4.5
      },
      {
        title: "Veggie Delight Pizza",
        description: "A delicious veggie pizza with a variety of vegetables and cheese on a crispy crust",
        itemImg: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "Pizzas",
        menuCategory: "Pizza Heaven",
        price: 399,
        discount: 15,
        rating: 4.8
      }
    ];

    for (let i = 0; i < sampleFoodItems.length; i++) {
      const foodItem = new FoodItem({
        ...sampleFoodItems[i],
        restaurantId: restaurants[i % restaurants.length]._id  // Cycle through restaurants
      });
      await foodItem.save();
      console.log(`Added food item: ${sampleFoodItems[i].title} to ${restaurants[i % restaurants.length].title}`);


    // remove from cart

    app.put('/remove-item', async(req, res)=>{
        const {id} = req.body;
        try{
            const item = await Cart.deleteOne({_id: id});
            res.json({message: 'item removed'});
        }catch(err){
            res.status(500).json({message: "Error occured"});
        }
    });


    
    app.post('/place-cart-order', async (req, res) => {
  const {
    userId, name, email, mobile,
    address, pincode, paymentMethod, orderDate
  } = req.body;

  try {
    // Fetch all cart items for this user
    const cartItems = await Cart.find({ userId });
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Map each cart item to an order document
    const orders = cartItems.map(item => ({
      userId,
      name,
      email,
      mobile,
      address,
      pincode,
      restaurantId: item.restaurantId,
      restaurantName: item.restaurantName,
      foodItemId: item.foodItemId,
      foodItemName: item.foodItemName,
      foodItemImg: item.foodItemImg,
      quantity: item.quantity,
      price: item.price,
      discount: item.discount,
      paymentMethod,
      orderDate,
      orderStatus: 'order placed'
    }));

    await Orders.insertMany(orders);
    await Cart.deleteMany({ userId });

    return res.status(201).json({ message: 'Order placed successfully', cartItems });
  } catch (err) {
    console.error('Order failed:', err);
    return res.status(500).json({ error: 'Server error during order placement' });
  }
});



    app.listen(PORT, ()=>{
        console.log('running @ 6001');
    })
}).catch((e)=> console.log(`Error in db connection ${e}`));

