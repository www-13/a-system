const express = require('express');
const router = express.Router();
const User = require("../models/customerSchema");
var moment = require("moment");

// GET request
router.get('/', (req, res) => {
    User.find()
      .then((result) => {
        res.render("index", { arr: result, moment: moment });    
      })
      .catch((err) => {
        console.log(err);
      })
  })
  
router.get('/user/add.html', (req, res) => {
    res.render("user/add", {countries: country_list})
  })
  
var country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  
router.get('/edit/:id', (req, res) => {
    User.findById(req.params.id).then((result) => {
      res.render("user/edit", {userD: result, moment: moment, countries: country_list})
    }).catch((err) => {
       console.log(err)
    })
  })
  
router.get('/view/:id', (req, res) => {
    User.findById(req.params.id).then((result) => {
      res.render("user/view", {userD: result, moment: moment})
    }).catch((err) => {
       console.log(err)
    })
  })

// POST request

router.post('/user/add.html', (req, res) => {
    User
      .create(req.body)
      .then(() => {
        res.redirect("/")
      })
      .catch((err) => {
        console.log(err);
        router.send("<h1>Something happend wrong. Please try again later.</h1>")
      })
  })
  
router.post('/search', (req, res) => {
    const searchText = req.body.searchText.trim()
    User
      .find({$or: [{firstName: searchText},{lastName: searchText}] })
      .then((result) => {
         res.render("user/search", {arrr: result})
         console.log(result)
       }).catch((err) => {
         console.log(err);
       })
  })

// DELETE requests

router.delete('/edit/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id).then(() => {
      res.redirect("/")
    }).catch((err) => {
      console.log(err);
    })
  })

// PUT requests

router.put('/edit/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body).then(() => {
      res.redirect("/")
    }).catch((err) => {
      console.log(err)
    })
  })

module.exports = router