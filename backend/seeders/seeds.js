const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User.js');
const City = require('../models/City.js');
const Itinerary = require('../models/Itinerary.js');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const Review = require("../models/Review.js");
const Schema = mongoose.Schema;


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
            hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
            imgUrl: faker.image.avatar()
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
                let users = await User.find();
                let [user1, user2, user3, user4, user5] = users;

                let cities = await City.find();

                let NameToCity = cities.reduce((resObj, ele) => ({...resObj, [ele.name]: ele}), {})

                let itineraries = [];

                let itinerary1 = new Itinerary({
                    "name":"Vegas to Dallas",
                    "startCity": NameToCity["Las Vegas"]._id,
                    "endCity": NameToCity["Dallas"]._id,
                    "middleCities":[{
                        "city": NameToCity["Salt Lake City"]._id,
                        "activities":[
                            {
                                "name": "Another Round",
                                "imageUrl": "https://s3-media1.fl.yelpcdn.com/bphoto/SXETxwYgGsb0-KPWJgSD7g/o.jpg",
                                "rating": 4,
                                "reviewCount": 149,
                                "title": "Mini Golf",
                                "displayAddress": [
                                    "660 Fort Worth Ave",
                                    "Ste 100",
                                    "Dallas, TX 75208"
                                ],
                                "busineesId": "omNpv2vEH181aaMBm8LydQ"
                            }
                        ],
                        "hotels":[
                            {
                                "name": "The Highland Dallas, Curio Collection by Hilton",
                                "imageUrl": "https://s3-media3.fl.yelpcdn.com/bphoto/hbDY8mngpWnjA_bbuCRhZA/o.jpg",
                                "rating": 4,
                                "reviewCount": 238,
                                "title": "Hotels",
                                "displayAddress": [
                                    "5300 E Mockingbird Ln",
                                    "Dallas, TX 75206"
                                ],
                                "busineesId": "J7w-BX8rnWAUmou918jx7g"
                            }
                        ],
                        "food":[
                            {
                                "name": "Pho Vietz",
                                "imageUrl": "https://s3-media3.fl.yelpcdn.com/bphoto/hf-7HYh3B0QvqeNvuEmfMw/o.jpg",
                                "rating": 5,
                                "reviewCount": 35,
                                "title": "Vietnamese",
                                "displayAddress": [
                                    "4906 Maple Ave",
                                    "Dallas, TX 75235"
                                ],
                                "busineesId": "L5j_40WApWfn2O6Wn3Oyxg"
                            }
                        ]}],
                    "author": user1._id})

                let itinerary2 = new Itinerary({
                    "name":"Salt lake city to Dallas",
                    "startCity": NameToCity["Salt Lake City"]._id,
                    "endCity": NameToCity["Dallas"]._id,
                    "middleCities":[{
                        "city": NameToCity["New Orleans"]._id,
                        "activities":[
                            {
                                "name": "New Orleans Kayak Swamp Tours",
                                "imageUrl": "https://s3-media3.fl.yelpcdn.com/bphoto/NBjXqKI6b8BZmW9DJTblLg/o.jpg",
                                "rating": 5,
                                "reviewCount": 255,
                                "title": "Rafting/Kayaking",
                                "displayAddress": [
                                    "740 North Rampart St",
                                    "New Orleans, LA 70116"
                                ],
                                "busineesId": "TGa-k0lkz6t4pUpchVUoEQ"
                            }
                        ],
                        "hotels":[
                            {
                                "name": "French Market Inn",
                                "imageUrl": "https://s3-media4.fl.yelpcdn.com/bphoto/qQcW4H-lyqbfuVMvlUxwAg/o.jpg",
                                "rating": 4,
                                "reviewCount": 387,
                                "title": "Hotels",
                                "displayAddress": [
                                    "509 Decatur St",
                                    "New Orleans, LA 70130"
                                ],
                                "busineesId": "4JWuSA8tyXHteRgh_hU_Cw"
                            }
                        ],
                        "food": [
                            {
                                "name": "Bésame",
                                "imageUrl": "https://s3-media3.fl.yelpcdn.com/bphoto/OqhRdeMOJsSk5sdMuLukkQ/o.jpg",
                                "rating": 4.5,
                                "reviewCount": 174,
                                "title": "Tapas/Small Plates",
                                "displayAddress": [
                                    "110 S Rampart",
                                    "New Orleans, LA 70112"
                                ],
                                "busineesId": "CZ907J8vyP0xs56ggEgsqQ"
                            }
                        ]}],
                    "author": user1._id})


                let itinerary3 = new Itinerary({
                    "name":"Vegas to Dallas through Denver",
                    "startCity": NameToCity["Las Vegas"]._id,
                    "endCity": NameToCity["Dallas"]._id,
                    "middleCities":[{
                        "city": NameToCity["Denver"]._id,
                        "activities":[
                            {
                                "name": "International Church Of Cannabis",
                                "imageUrl": "https://s3-media3.fl.yelpcdn.com/bphoto/XbZae3SGryR_bgW7YQD5zA/o.jpg",
                                "rating": 4.5,
                                "reviewCount": 324,
                                "title": "Community Centers",
                                "displayAddress": [
                                    "400 S Logan St",
                                    "Denver, CO 80209"
                                ],
                                "busineesId": "PlptbDaLbOXGtrykkZAQRg"
                            }
                        ],
                        "hotels":[
                            {
                                "name": "Vīb Hotel by Best Western Denver RiNo",
                                "imageUrl": "https://s3-media1.fl.yelpcdn.com/bphoto/YwYXc2Y7otrunZoTBATSDg/o.jpg",
                                "rating": 5,
                                "reviewCount": 17,
                                "title": "Hotels",
                                "displayAddress": [
                                    "3560 Brighton Blvd",
                                    "Denver, CO 80216"
                                ],
                                "busineesId": "Mb5FrFDf04LDV7Ssk5ECKw"
                            }
                        ],
                        "food": [
                            {
                                "name": "Lucky Noodles",
                                "imageUrl": "https://s3-media4.fl.yelpcdn.com/bphoto/sI1LfYfMkL0k-6f6U702VQ/o.jpg",
                                "rating": 4.5,
                                "reviewCount": 227,
                                "title": "Thai",
                                "displayAddress": [
                                    "1201 E Colfax Ave",
                                    "Ste 102",
                                    "Denver, CO 80218"
                                ],
                                "busineesId": "RTvR4W7K-59xFFZAUTMTbQ"
                            }
                        ]
                    }],
                    "author": user1._id})


                    let itinerary4 = new Itinerary({
                        "name":"Minn to Detroit",
                        "startCity": NameToCity["Minneapolis"]._id,
                        "endCity": NameToCity["Detroit"]._id,
                        "middleCities":[{
                            "city": NameToCity["Chicago"]._id,
                            "activities":[
                                {
                                    "name": "Big Mini Putt Club",
                                    "imageUrl": "https://s3-media4.fl.yelpcdn.com/bphoto/YieYJNZHhRO39NHitaLf3Q/o.jpg",
                                    "rating": 5,
                                    "reviewCount": 104,
                                    "title": "Mini Golf",
                                    "displayAddress": [
                                        "1302 N Milwaukee Ave",
                                        "Chicago, IL 60622"
                                    ],
                                    "busineesId": "UVRkAcABnSxOIOpKXkdWAQ"
                                }
                            ],
                            "hotels":[
                                {
                                    "name": "The Robey",
                                    "imageUrl": "https://s3-media2.fl.yelpcdn.com/bphoto/uHnwGRTUszLcWUGxHaqLQg/o.jpg",
                                    "rating": 3.5,
                                    "reviewCount": 176,
                                    "title": "Hotels",
                                    "displayAddress": [
                                        "2018 W North Ave",
                                        "Chicago, IL 60647"
                                    ],
                                    "busineesId": "KpiYA2QRxzVZlvvExWNlTg"
                                }
                            ],
                            "food": [
                                {
                                    "name": "Quesabirria Jalisco",
                                    "imageUrl": "https://s3-media3.fl.yelpcdn.com/bphoto/F7yhgtgDsmAitulijvZpmQ/o.jpg",
                                    "rating": 5,
                                    "reviewCount": 41,
                                    "title": "Tacos",
                                    "displayAddress": [
                                        "1314 W 18th St",
                                        "Chicago, IL 60608"
                                    ],
                                    "busineesId": "L12zP2yCgoKm_NLwW_HIDw"
                                }
                            ]
                        }],
                        "author": user2._id})

                    let itinerary5 = new Itinerary({
                        "name":"Chicago to Philadelphia",
                        "startCity": NameToCity["Chicago"]._id,
                        "endCity": NameToCity["Washington, D.C. (DC)"]._id,
                        "middleCities":[{
                            "city": NameToCity["Philadelphia"]._id,
                            "activities":[
                                {
                                    "name": "Planet Word Museum",
                                    "imageUrl": "https://s3-media2.fl.yelpcdn.com/bphoto/ppoaT6LCfLvI4zPoRugpVA/o.jpg",
                                    "rating": 5,
                                    "reviewCount": 122,
                                    "title": "Museums",
                                    "displayAddress": [
                                        "925 13th St NW",
                                        "Washington, DC 20005"
                                    ],
                                    "busineesId": "piCDoicFTnVgOwQBRSjfmQ"
                                }
                            ],
                            "hotels":[
                                {
                                    "name": "Kimpton George Hotel",
                                    "imageUrl": "https://s3-media1.fl.yelpcdn.com/bphoto/cv7zs5Ls0gSuKwktUM9iEg/o.jpg",
                                    "rating": 4,
                                    "reviewCount": 225,
                                    "title": "Hotels",
                                    "displayAddress": [
                                        "15 E St NW",
                                        "Washington, DC 20001"
                                    ],
                                    "busineesId": "kl1LzY7Qjd0eW2UCsfxQwg"
                                }
                            ],
                            "food": [
                                {
                                    "name": "Cane",
                                    "imageUrl": "https://s3-media2.fl.yelpcdn.com/bphoto/ohbZe6vtFHFN_ZW8n91mYw/o.jpg",
                                    "rating": 4.5,
                                    "reviewCount": 553,
                                    "title": "Caribbean",
                                    "displayAddress": [
                                        "403 H St NE",
                                        "Washington, DC 20002"
                                    ],
                                    "busineesId": "ZQmeDA4ZkM6F1dr2HNVWXA"
                                }
                            ]
                        }],
                        "author": user2._id})

                    let itinerary6 = new Itinerary({
                        "name":"Miamiiiii",
                        "startCity": NameToCity["Houston"]._id,
                        "endCity": NameToCity["Miami"]._id,
                        "middleCities":[{
                            "city": NameToCity["Atlanta"]._id,
                            "activities":[
                                {
                                    "name": "The Splatter Studio",
                                    "imageUrl": "https://s3-media2.fl.yelpcdn.com/bphoto/Wa8y8iS3ifDuR-YLyW3vmA/o.jpg",
                                    "rating": 5,
                                    "reviewCount": 25,
                                    "title": "Team Building Activities",
                                    "displayAddress": [
                                        "792 North Highland Ave NE",
                                        "Atlanta, GA 30306"
                                    ],
                                    "busineesId": "5ADCGI9hjNBWNWwkFlGRaw"
                                }
                            ],
                            "hotels":[
                                {
                                    "name": "The St. Regis Atlanta",
                                    "imageUrl": "https://s3-media2.fl.yelpcdn.com/bphoto/AYXmRAVPA_0XFTo_y1d0Og/o.jpg",
                                    "rating": 4,
                                    "reviewCount": 215,
                                    "title": "Hotels",
                                    "displayAddress": [
                                        "88 W Paces Ferry Rd",
                                        "Atlanta, GA 30305"
                                    ],
                                    "busineesId": "x7lGiUPoObkxcz4Wd8-WCw"
                                }
                            ],
                            "food": [
                                {
                                    "name": "Pelicana Chicken",
                                    "imageUrl": "https://s3-media3.fl.yelpcdn.com/bphoto/2pWMg9UoCOZ2oJ0YkuRuwQ/o.jpg",
                                    "rating": 5,
                                    "reviewCount": 62,
                                    "title": "Korean",
                                    "displayAddress": [
                                        "420 14th St NW",
                                        "Ste 100A",
                                        "Atlanta, GA 30318"
                                    ],
                                    "busineesId": "saBBzLm12utmiab6hwod5w"
                                }
                            ]
                        }],
                        "author": user2._id})

                    let itinerary7 = new Itinerary({
                        "name":"Phoenix to New Orleans",
                        "startCity": NameToCity["Phoenix"]._id,
                        "endCity": NameToCity["Washington, D.C. (DC)"]._id,
                        "middleCities":[{
                            "city": NameToCity["New Orleans"]._id,
                            "activities":[
                                {
                                    "name": "New Orleans Secrets Tours",
                                    "imageUrl": "https://s3-media3.fl.yelpcdn.com/bphoto/TDFAekuASswfxcOZbUWRug/o.jpg",
                                    "rating": 5,
                                    "reviewCount": 250,
                                    "title": "Food Tours",
                                    "displayAddress": [
                                        "New Orleans, LA 70130"
                                    ],
                                    "busineesId": "ez4kMLP6OJEIaMbMrrGRdA"
                                }
                            ],
                            "hotels":[
                                {
                                    "name": "Courtyard by Marriott New Orleans French Quarter/Iberville",
                                    "imageUrl": "https://s3-media3.fl.yelpcdn.com/bphoto/Q92WSCmu2bZ6uUeCwYH6Sw/o.jpg",
                                    "rating": 4,
                                    "reviewCount": 176,
                                    "title": "Hotels",
                                    "displayAddress": [
                                        "910 Iberville St",
                                        "New Orleans, LA 70112"
                                    ],
                                    "busineesId": "tcAB1Q_NLd5uXpq4Pe1aQg"
                                }
                            ],
                            "food": [
                                {
                                    "name": "Bésame",
                                    "imageUrl": "https://s3-media3.fl.yelpcdn.com/bphoto/OqhRdeMOJsSk5sdMuLukkQ/o.jpg",
                                    "rating": 4.5,
                                    "reviewCount": 174,
                                    "title": "Tapas/Small Plates",
                                    "displayAddress": [
                                        "110 S Rampart",
                                        "New Orleans, LA 70112"
                                    ],
                                    "busineesId": "CZ907J8vyP0xs56ggEgsqQ"
                                }
                            ]
                        }],
                        "author": user3._id})

                    let itinerary8 = new Itinerary({
                        "name":"Seattle to Portland",
                        "startCity": NameToCity["Seattle"]._id,
                        "endCity": NameToCity["San Francisco (SF)"]._id,
                        "middleCities":[{
                            "city": NameToCity["Portland"]._id,
                            "activities":[
                                {
                                    "name": "DIY BAR",
                                    "imageUrl": "https://s3-media4.fl.yelpcdn.com/bphoto/NazJvxE2C9eSHF2CeU7brA/o.jpg",
                                    "rating": 5,
                                    "reviewCount": 169,
                                    "title": "Arts & Crafts",
                                    "displayAddress": [
                                        "3522 N Vancouver Ave",
                                        "Portland, OR 97227"
                                    ],
                                    "busineesId": "qGtQp-klDYK28cI428QW5A"
                                }
                            ],
                            "hotels":[
                                {
                                    "name": "The Society Hotel",
                                    "imageUrl": "https://s3-media1.fl.yelpcdn.com/bphoto/rBkoAcpuJYV7V1-kaW5DqQ/o.jpg",
                                    "rating": 4.5,
                                    "reviewCount": 396,
                                    "title": "Hotels",
                                    "displayAddress": [
                                        "203 NW 3rd Ave",
                                        "Portland, OR 97209"
                                    ],
                                    "busineesId": "1fvKhU81LtdTl4EqcIAu8Q"
                                }
                            ],
                            "food": [
                                {
                                    "name": "Eem",
                                    "imageUrl": "https://s3-media2.fl.yelpcdn.com/bphoto/eITdDr4IffxkXCl980rG1w/o.jpg",
                                    "rating": 4.5,
                                    "reviewCount": 1024,
                                    "title": "Cocktail Bars",
                                    "displayAddress": [
                                        "3808 N Williams Ave",
                                        "Ste 127",
                                        "Portland, OR 97227"
                                    ],
                                    "busineesId": "6DwR5rF1s6fJn4f-Lvfbuw"
                                }
                            ]
                        }],
                        "author": user4._id})


                    let itinerary9 = new Itinerary({
                        "name":"SF to Salt lake City",
                        "startCity": NameToCity["San Francisco (SF)"]._id,
                        "endCity": NameToCity["Phoenix"]._id,
                        "middleCities":[{
                            "city": NameToCity["Salt Lake City"]._id,
                            "activities":[
                                {
                                    "name": "Dreamscapes",
                                    "imageUrl": "https://s3-media2.fl.yelpcdn.com/bphoto/JG-cQ9YZkg7sZR1H8QgjMg/o.jpg",
                                    "rating": 4.5,
                                    "reviewCount": 58,
                                    "title": "Art Museums",
                                    "displayAddress": [
                                        "10450 State St",
                                        "Ste 2200",
                                        "Salt Lake City, UT 84101"
                                    ],
                                    "busineesId": "kQKQIRwPkEddjOC2TYWb_Q"
                                }
                            ],
                            "hotels":[
                                {
                                    "name": "Inn On The Hill",
                                    "imageUrl": "https://s3-media4.fl.yelpcdn.com/bphoto/ZdMuMnzHdHv4e3U9mrWA1g/o.jpg",
                                    "rating": 5,
                                    "reviewCount": 42,
                                    "title": "Hotels",
                                    "displayAddress": [
                                        "225 N State St",
                                        "Salt Lake City, UT 84103"
                                    ],
                                    "busineesId": "MuEBCFdd1NPb2a2M6V7oFA"
                                }
                            ],
                            "food": [
                                {
                                    "name": "Arempa's",
                                    "imageUrl": "https://s3-media2.fl.yelpcdn.com/bphoto/QX_C9kKgToTAQZ1JKFlXyg/o.jpg",
                                    "rating": 4.5,
                                    "reviewCount": 278,
                                    "title": "Venezuelan",
                                    "displayAddress": [
                                        "350 S State St",
                                        "Salt Lake City, UT 84111"
                                    ],
                                    "busineesId": "rY53WNZpNCQN-TxjbLXKlQ"
                                }
                            ]
                        }],
                        "author": user5._id})

                itineraries.push(itinerary1)
                itineraries.push(itinerary2)
                itineraries.push(itinerary3)
                itineraries.push(itinerary4)
                itineraries.push(itinerary5)
                itineraries.push(itinerary6)
                itineraries.push(itinerary7)
                itineraries.push(itinerary8)
                itineraries.push(itinerary9)
                await Itinerary.insertMany(itineraries)

                let allItineraries = await Itinerary.find()
                const reviews = [];
                for (let i = 0; i < 20; i++) {
                    let randomRating = Math.floor(Math.random() * 5) + 1; 
                    if(randomRating === 0){
                        randomRating = 1;
                    }
                    const randomComment = faker.lorem.sentence();
                    const randomAuthor = users[Math.floor(Math.random() * users.length)]._id;
                    const randomItinerary = allItineraries[Math.floor(Math.random() * allItineraries.length)]._id; 

                    const review = {
                        rating: randomRating,
                        comment: randomComment,
                        author: randomAuthor,
                        itinerary: randomItinerary,
                    };
                    reviews.push(review);
                }
                await Review.collection.drop();
                console.log("Inserting reviews");
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