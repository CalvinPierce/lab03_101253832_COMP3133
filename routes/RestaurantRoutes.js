const express = require('express');
const restaurantModel = require('../models/Restaurant');
const app = express();

//Read ALL
//http://localhost:3000/restaurants
app.get('/restaurants', async (req, res) => {
  const restaurants = await restaurantModel.find({});
  //Sorting
  //use "asc", "desc", "ascending", "descending", 1, or -1
  //const restaurants = await restaurantModel.find({}).sort({'name': -1});
  
  //Select Specific Column
  //const restaurants = await restaurantModel.find({}).select("id cuisines name city restaurant_id").sort({'restaurant_id' : 'desc'});  
  
  try {
    console.log(restaurants[0].name) 
    res.send(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Read by cuisine
//http://localhost:3000/restaurants/cuisine/Japanese
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
    const cuisine = req.params.cuisine
    const restaurants = await restaurantModel.find({cuisine : cuisine});

    try {
      res.send(restaurants);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  //Read and Sort
//http://localhost:3000/restaurant?sortBy=DESC
app.get('/restaurant', async (req, res) => {
    //Select Specific Column
    const sort = req.query.sortBy
    const restaurants = await restaurantModel.find({}).select("id cuisine name city restaurant_id").sort({'restaurant_id' : sort});  
    
    try {
      res.send(restaurants);
    } catch (err) {
      res.status(500).send(err);
    }
  });

   //Read where cuisine == Delicatessen and city !== Brooklyn
//http://localhost:3000/restaurants/Delicatessen
app.get('/restaurants/Delicatessen', async (req, res) => {
    //Select Specific Column
    const sort = req.query.sortBy
    const restaurants = await restaurantModel.find({cuisine: 'Delicatessen', city: {$ne : 'Brooklyn'}}).select("cuisine name city").sort({'name' : 'asc'});  
    
    try {
      res.send(restaurants);
    } catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = app

// Populate database
// restaurantModel.create(
//     [{  "address": {
//         "building": "1008",
//         "street": "Morris Park Ave",
//         "zipcode": "10462"
//      },
//      "city": "Bronx",
//      "cuisine": "Bakery",
//      "name": "Morris Park Bake Shop",
//      "restaurant_id": "30075445"
//     },
//     {
//       "address": {
//         "street": "Thai Son Street",
//         "zipcode": null
//      },
//      "city": "Manhattan",
//      "cuisine": "Vietnamese",
//      "name": "Pho Me Long Time",
//      "restaurant_id": "30075455"
//     },
//     {
//       "address": {
//         "building": "253",
//         "street": "East 167 Street",
//         "zipcode": null
//      },
//      "city": "Bronx",
//      "cuisine": "Chicken",
//      "name": "Mom's Fried Chicken",
//      "restaurant_id": "40382900"
//     },
//     {
//       "address": {
//         "building": "120",
//         "street": "East 56 Street",
//         "zipcode": "19800"
//      },
//      "city": "Mahattan",
//      "cuisine": "Italian",
//      "name": "Montebello Restaurant",
//      "restaurant_id": "40397082"
//     },
//     {
//       "address": {
//         "building": "195",
//         "street": "Soprano Street",
//         "zipcode": "17500"
//      },
//      "city": "Staten Island",
//      "cuisine": "Hamburgers",
//      "name": "Joeys Burgers",
//      "restaurant_id": "40397555"
//     },
//     {
//       "address": {
//         "building": "200",
//         "street": "Queens Boulevard",
//         "zipcode": "19700"
//      },
//      "city": "Queens",
//      "cuisine": "American",
//      "name": "Brunos on the Boulevard",
//      "restaurant_id": "40397678"
//     },
//     {
//       "address": {
//         "building": "555",
//         "street": "Sushi Street",
//         "zipcode": "17700"
//      },
//      "city": "Brooklyn",
//      "cuisine": "Japanese",
//      "name": "Iron Chef House",
//      "restaurant_id": "40397699"
//     },
//     {
//       "address": {
//         "building": "555",
//         "street": "Fontana Street",
//         "zipcode": null
//      },
//      "city": "Brooklyn",
//      "cuisine": "Japanese",
//      "name": "Wasabi Sushi",
//      "restaurant_id": "40398000"
//     },
//     {
//       "address": {
//         "building": "900",
//         "street": "Goodfellas Street",
//         "zipcode": "17788"
//      },
//      "city": "Brooklyn",
//      "cuisine": "Delicatessen",
//      "name": "Sal's Deli",
//      "restaurant_id": "40898000"
//     },
//     {
//       "address": {
//         "building": "909",
//         "street": "44 Gangster Way",
//         "zipcode": "17988"
//      },
//      "city": "Queens",
//      "cuisine": "Delicatessen",
//      "name": "Big Tony's Sandwich Buffet",
//      "restaurant_id": "40898554"
//     },
//     {
//       "address": {
//         "building": "1201",
//         "street": "121 Canolli Way",
//         "zipcode": "17989"
//      },
//      "city": "Queens",
//      "cuisine": "Delicatessen",
//      "name": "The Godfather Panini Express",
//      "restaurant_id": "40898554"
//     }]
//     )
