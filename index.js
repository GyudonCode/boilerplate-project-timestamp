// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//date now 
app.get("/api", function(req, res){
  let dateNow = new Date();
  res.json({unix: Math.floor(dateNow.getTime() / 1000), utc: dateNow.toUTCString()});
});

//date conversions
app.get("/api/:date", function(req, res){  
  //------ Date format YYYY-MM-DD ----------
  const REGULAR_DATE_REGEX = /[\d]*-/g;

  if (REGULAR_DATE_REGEX.test(req.params.date)){
    //console.log("regular date : " + req.params.date);
    let clientDate = new Date(req.params.date);
    //console.log("clientDate: " + clientDate);
    res.json({unix: Math.floor(clientDate.getTime() / 1000), utc: clientDate.toUTCString()});
  }

  //----- UNIX Timestamp format -----------
  const ALL_NUMBERS_REGEX = /^[\d]*$/g;

  if (ALL_NUMBERS_REGEX.test(req.params.date)){
    console.log('All numbers : ' + req.params.date)
    let clientDate = new Date(Math.floor(req.params.date * 1000));
    console.log('date conversion : ' + clientDate);
    res.json({unix: req.params.date, utc: clientDate.toUTCString()});
  }else{
  //------- invalids like "34gt" -----------
    res.json({error: "Invalid Date"});
  }
});


// listen for requests :)
//var listener = app.listen(process.env.PORT, function () {
let listener = app.listen(3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
