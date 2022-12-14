const express = require('express')
const router = express.Router()
const { tTransporter } = require('../helpers/mailHelper')
const { User } = require('../helpers/dbHelper')

router.get('/activation-email/:id', (req, res) => {
  User.findOne({ _id: req.params.id }, (err, data) => {
    if (err) res.render('index', {
      error: 'Nie ma takiego użytkownika'
    })
    else {
      let mailOptions = {
        from: `"Student Web 2.0" `,
        to: data.email,
        subject: `Aktywacja konta`,
        text: `Wjedź na stronę https://homenode.herokuapp.com/users/activate/${req.params.id} by aktywować konto`,
        html: `<h1>Student Web 2.0</h1>
        <b>Klikni w link aby aktywować</b>
        <p>
          <a href="https://homenode.herokuapp.com/users/activate/${req.params.id}">
          https://homenode.herokuapp.com/users/activate/${req.params.id}
          </a>
        </p>`
      }

      tTransporter.sendMail(mailOptions, (error, info) => {
        if (error){
          console.log(error)
          res.render('index', {         
            error: 'Problem z wysłaniem maila aktywacyjnego. Powiadom administatora strony.'
          })
        } 
        else res.render('index', {
          info: 'Na adres e-mail wysłany został link aktywacyjny'
        })
      })
    }
  })
})

module.exports = router