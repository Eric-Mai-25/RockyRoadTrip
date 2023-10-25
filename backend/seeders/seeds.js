const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User.js');
const City = require('../models/City.js');
const Itinerary = require('../models/Itinerary.js');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const Review = require("../models/Review.js");

const NUM_SEED_USERS = 10;

const users = [];

users.push(
    new User({
        username: 'demo-user',
        email: 'demo-user@rockyroadtrip.com',
        hashedPassword: bcrypt.hashSync('password', 10)
    })
)

for(let i=1; i<NUM_SEED_USERS; i++){
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    users.push(
        new User({
            username: faker.internet.userName({ firstName, lastName }),
            email: faker.internet.email({firstName, lastName}),
            hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
        })
    )
}

const citiesData = [
    {
        name: "Seattle",
        description: "Known for its tech industry and beautiful natural scenery, Seattle is the birthplace of Starbucks and the grunge music scene.",
        latitude: 47.6062,
        longitude: -122.3321
    }, {
        name: "Portland",
        description: `Famous for its quirky culture and beautiful landscapes, Portland is often called the "City of Roses."`,
        latitude: 45.5051,
        longitude: -122.6750
    }, {
        name: "San Francisco (SF)",
        description: "A hilly city known for the Golden Gate Bridge, cable cars, and a diverse food scene.",
        latitude: 37.7749,
        longitude: -122.4194
    }, {
        name: "Los Angeles (LA)",
        description: "Known as the entertainment capital of the world, it's home to Hollywood and endless beaches.",
        latitude: 34.0522,
        longitude: -118.2437
    }, {
        name: "Las Vegas",
        description: "Known for its vibrant nightlife and casinos, Las Vegas is a hub for entertainment.",
        latitude: 36.1699,
        longitude: -115.1398
    }, {
        name: "Phoenix",
        description: "Known for its year-round sun and desert landscapes, it's a popular destination for golf and outdoor activities.",
        latitude: 33.4484,
        longitude: -112.0740
    }, {
        name: "Salt Lake City",
        description: "Famous for being the headquarters of the Mormon Church and for its outdoor recreation.",
        latitude: 40.7608,
        longitude: -111.8910
    }, {
        name: "Denver",
        description: `Known as the "Mile-High City" due to its elevation, it's a gateway to the Rocky Mountains.`,
        latitude: 39.7392,
        longitude: -104.9903
    }, {
        name: "Minneapolis",
        description: "Known for its lakes and the iconic Mall of America, it's a cultural hub in the Midwest.",
        latitude: 44.9778,
        longitude: -93.2650
    }, {
        name: "Houston",
        description: "Known for its space industry, Houston is also a significant hub for energy and healthcare.",
        latitude: 29.7604,
        longitude: -95.3698
    }, {
        name: "Dallas",
        description: "Known for its modern architecture and southern hospitality, Dallas is a major cultural and economic center.",
        latitude: 32.7767,
        longitude: -96.7970
    }, {
        name: "New Orleans",
        description: "Famous for Mardi Gras, jazz music, and its unique cuisine like gumbo and beignets.",
        latitude: 29.9511,
        longitude: -90.0715
    }, {
        name: "Chicago",
        description: "Known for its architecture, deep-dish pizza, and the Chicago Bulls, it's a major city on Lake Michigan.",
        latitude: 41.8781,
        longitude: -87.6298
    }, {
        name: "Milwaukee",
        description: "Known for its breweries and the Harley-Davidson Museum, it's a city with a strong industrial history.",
        latitude: 43.0389,
        longitude: -87.9065
    }, {
        name: "Detroit",
        description: "Known as the birthplace of the auto industry and Motown music.",
        latitude: 42.3314,
        longitude: -83.0458
    }, {
        name: "New York City (NYC)",
        description: `Known as "The Big Apple," NYC is famous for its landmarks like Times Square and Central Park.`,
        latitude: 40.7128,
        longitude: -74.0060
    }, {
        name: "Boston",
        description: "Known for its rich history and academic community, Boston is the birthplace of the American Revolution.",
        latitude: 42.3601,
        longitude: -71.0589
    }, {
        name: "Philadelphia",
        description: "Known for its historical significance, including the Liberty Bell and Independence Hall.",
        latitude: 39.9526,
        longitude: -75.1652
    }, {
        name: "Washington, D.C. (DC)",
        description: "The capital of the United States, known for its iconic landmarks and museums.",
        latitude: 38.9072,
        longitude: -77.0369
    }, {
        name: "Miami",
        description: "Known for its beaches, art deco architecture, and lively nightlife.",
        latitude: 25.7617,
        longitude: -80.1918
    }, {
        name: "Orlando",
        description: "Famous for its theme parks, including Walt Disney World and Universal Studios.",
        latitude: 28.5383,
        longitude: -81.3792
    }, {
        name: "Atlanta",
        description: "Known for its civil rights history and a major hub for hip-hop music.",
        latitude: 33.7490,
        longitude: -84.3880
    }
]

const cities = []
citiesData.forEach(city => {
    cities.push(
        new City({
            name: city.name,
            description: city.description,
            location: {
                type: 'Point',
                coordinates: [city.longitude, city.latitude]
            }
        })
    )
})


const insertSeeds = () => {
    console.log("Resetting db and seeding collections...");
    User.collection.drop()
        .then(() => 
            User.ensureIndexes().then(() => User.insertMany(users)))
        .then(() => 
            City.collection.drop().then(() => City.ensureIndexes().then(() => City.insertMany(cities))))
        .then(async () => {
            await Itinerary.collection.drop().then(() => Itinerary.ensureIndexes().then(async () => {

                let user1 = await User.findOne({email: "demo-user@rockyroadtrip.com"});
                let itineraries = [];

                let seattle = await City.findOne({name: "Seattle"})
                let chicago = await City.findOne({name: "Chicago"})
                let denver = await City.findOne({name: "Denver"})

                let lv = await City.findOne({name: "Las Vegas"})
                let sf = await City.findOne({name: "San Francisco (SF)"})


                let itinerary1 = new Itinerary({"name": "Itinerary from Rocky road trip", 
                    "startCity": seattle._id, 
                    "endCity": chicago._id, 
                    "middleCities":[{
                        "city": denver._id,
                        "activities":[{
                            "name":"Disc Golf-Watrous course"}], 
                        "hotels":[{
                            "name":"The Brown Palace"}], 
                        "food":[{
                            "name":"Hop Alley"}]}],
                    "author": user1._id})

                itineraries.push(itinerary1)

                let itinerary2 = new Itinerary({"name": "Lets rock it !!!", 
                    "startCity": lv._id, 
                    "endCity": denver._id, 
                    "middleCities":[{
                        "city": sf._id,
                        "activities":[{
                            "name":"Golden Gate Bridge"}], 
                        "hotels":[{
                            "name":"Hotel Caza Fisherman's Wharf"}], 
                        "food":[{
                            "name":"Bun Mee"}]}],
                "author": user1._id})

                itineraries.push(itinerary2)
                await Itinerary.insertMany(itineraries)

                console.log("Inserting reviews")

                let allItineraries = await Itinerary.find()

                let review1 = new Review({
                    rating: 5,
                    comment: "Best route ever !!",
                    author: user1._id,
                    itinerary: allItineraries[0]._id
                })

                let review2 = new Review({
                    rating: 4,
                    comment: "Was a good route !!",
                    author: user1._id,
                    itinerary: allItineraries[1]._id
                })

                let reviews = []
                reviews.push(review1)
                reviews.push(review2)
                await Review.collection.drop()
                await Review.insertMany(reviews);

            }))



        })
        .then(() => {
            console.log("Done!");
            mongoose.disconnect();
        })
        .catch(err => {
            console.error(err.stack);
            process.exit(1);
        });
    }

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB successfully');
        insertSeeds();
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    });