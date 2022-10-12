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
  //res.json({unix: Math.floor(dateNow.getTime() / 1000), utc: dateNow.toUTCString()});
  res.json({unix: dateNow.getTime(), utc: dateNow.toUTCString()});
});

//date conversions
app.get("/api/:date", function(req, res){  
  const clientDate = req.params.date;  
  const YYYYMMDD_REGEX = /[\d]*-/g 
  let date;

  if (YYYYMMDD_REGEX.test(clientDate)){
    //YYYY-MM-DD date 
    date = new Date(clientDate);

  } else {
    //unix timestamp
    date = new Date(Number(clientDate));
  }

  if (date == "Invalid Date"){
    res.json({ error: "Invalid Date" }); 
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }  
});


// listen starts the server in a given port 
//var listener = app.listen(process.env.PORT, function () {
let listener = app.listen(3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
