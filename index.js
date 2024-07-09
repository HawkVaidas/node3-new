
const express = require('express');
const app = express();
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
uuidv4();
app.use(express.json());
app.use(cors());

let cars = [
    {
    id: 1,    
   brand: "BMW",
   model: "GT",
   year: 2016,    
    },
    {
    id: 2,
    brand: "AUDI",
    model: "A7",
    year: 2018,
    },
    {
        id: 3,
        brand: "VW",
        model: "GOLF",
        year: 2000,
        },
   ]; 
   app.get("/getCars", function(req, res) {
    if (cars.lenght) {
    const sortedCars = [...cars].sort((a, b) => a.year - b.year);
    return res.status(200).json({
        cars: sortedCars,
    });
    }
    return res.status(404).json({
        message: "cars array is empty",
    });
    });
//----------------------------------------------------------

app.get("/getCarById/:id", function(req, res) {
    const id = req.params.id;

    const car = cars.find((car) => {
        return car.id == id;                      
    });

    if(!car) {
        return res.status(404).json({
            // message: "car with this id not exist", //--sita pakeitem i becktikus ``ir idejom kintamaji ${id} su id-//
            message: `car with ${id} id not exist`,
        });
    }

    return res.status(200).json({
        response: "success",
        cars: car,
    });
    });

   
//--------------------------------------------------------------

    app.delete("/deleteCars", function(req, res) {
        cars = [];
        return res.status(200).json({
            response: "cars is deleted",
        });
        });
//------------------------------------------------------------

app.post("/insertCars", function(req, res) {
    const id = req.body.id;
    const existingCar = cars.find((car) => {
        return car.id === id;                      
    });
    console.log(existingCar);

    if(!existingCar){
 cars.push({
    id: req.body.id,
    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year,
 });
 return res.status(201).json({message: "succcessfully"});
}
return res.status(409).json({message: "car is exist with this id"});

});
app.use((req, res) => {
    return res.status(404).send("Entpoint, does not exsist");
});

app.listen(3000);