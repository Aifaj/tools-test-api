# Angular + Node.js + Express + MySQL + MongoDB

A complete full-stack e-commerce application featuring user authentication, product management, order placement, weather integration, and clean modular architecture.

This e-commerce system includes secure user management using MySQL, where users can register and log in, with login tokens stored safely in sessionStorage and passwords encrypted using bcrypt. The product and order operations are handled through MongoDB, allowing all users to view products added by anyone, while ensuring that each user can see only their own orders. The cart system uses localStorage, so cart items remain even after page refresh. Additionally, the project includes real-time weather integration, which automatically detects the user’s current location via the browser’s geolocation API and displays live weather data on the dashboard.

# MySQL Setup (User Management)

Create a database: atdrive_test

Import the provided SQL dump file from the backend folder (Optional).

# MongoDB Setup (Products & Orders)

Create a MongoDB Atlas account (Free Tier)

Create a cluster

Add a database user

Copy your connection string

Paste inside: config/mongo.js