const express = require('express')
const router = express.Router()
const expressJWT = require('express-jwt')
const { House } = require('../helpers/dbHelper')  
  


router.get('/', (req, res) => {
    House.find((err, houses) => res.render('api', {
      title: "API HOUSES",
      description: `Api dostępne dla wszystkich jednak aby zmieniać dane należy wygenreować sobie token,
                    który przekazuje się w nagłówku zapytania, co jest dotępne tylko dla użytkowników zarejstrowanych`,
      houses: err ? undefined : houses
    }))
  })


router.get('/house', (req, res) => {
    House.find((err, data) => res.json(err ? err : data))
})

router.post('/house',(req,res) =>{
var newHouse = new House({
    "name":req.body.name,
    "city":req.body.city,
    "address":req.body.address,
    "houseSize":req.body.houseSize,
    "price":req.body.price
})  
newHouse.save((err, data) => res.json(err ? err : data))
})

router.get('/house/:id', (req, res) => {
House.findOne(
    { _id: req.params.id },
    (err, data) => res.json(err ? err : data)
)
})


router.put('/house/:id', (req, res) => {
var house = {}
if(req.body.name) house.name = req.body.name
if(req.body.city) house.city = req.body.city
if(req.body.address) house.address = req.body.address
if(req.body.houseSize) house.houseSize = req.body.houseSize
if(req.body.price) house.price = req.body.price

House.update(
    { _id: req.params.id },
    { $set: house },
    (err, data) => res.json(err ? err : data)
)
})

router.delete('/house/:id', (req, res) => {
House.remove(
    { _id: req.params.id },
    (err, data) => res.json(err ? err : data)
)
})


module.exports = router
