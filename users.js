var express = require('express');
var router = express.Router();
var sha1 = require('sha1')
var JWT = require('jwt-async')
const { User } = require('../helpers/dbHelper')

router.get('/', function(req, res) {
  User.find((err, data) => {
    if (err) return console.error(err)
    console.log(data)    
    res.render('users',{title:"Uzytkownicy", users:data,passport: req.session.passport})
  })
});


router.get('/reset', (req, res, next) => {
  User.remove({}, (err) => {
    if (err) return handleError(err)
    var admin = new User({
      "username": "admin",
      "password": sha1("zaq1@WSX"),
      "admin": true,
      "active": true,
      "email": "barwoj@homepl.pl"
    })
    var user1 = new User({
      "username":"user1",
      "password":sha1("user1"),
      "active": false,
      "admin": false,
      "email" : "user1@homepl.pl"
    })
    admin.save((err,data) => {
      if (err) return console.error(err)
      user1.save((err,data2) => {
        if (err) return console.error(err)
        var users = [data,data2]
        res.render('users', { users:users,title:"Uzytkownicy Po Resecie" })
      })
    })
  })
})

router.get('/activate/:id', (req, res) => {
  User.update({_id:req.params.id}, {$set: {active:true}}, (err, data) => {
    if (err) return console.error(err)
    res.render('index', {
      success: 'Acount is activated.'
    })
  })
})

router.get('/token', (req, res, next) => {
  var options = {
    crypto: {
      algorithm: 'HS256',
      secret: 'barwoj'
    },
    claims: {
      id: req.user._id,
      sub: req.user.username
    }
  }

  var jwt = new JWT(options)
  var moreClaims = {

  }

  jwt.sign(moreClaims, (err, data) => {
    if (err) console.log(err)
    res.render('token', {
       title: "Api Token",
       description: "Add to http header.",
       token: data
    })

    jwt.verify(data, (err, data) => {
      if (err) console.log(err)
      console.log(data)
    })
  })
})


module.exports = router;
