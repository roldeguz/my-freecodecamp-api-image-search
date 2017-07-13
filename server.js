// server.js
// roldeguz
// 30-June-2017
// freecodecamp API projects: image search abstraction layer

// init project
var express = require('express');
var app = express();
// dotenv
var dotenv = require('dotenv');
dotenv.config();
// mongo db
var mongo = require("mongodb").MongoClient;
var mongoUrl = process.env.MONGOLAB_URI;
var appUrl = process.env.APP_URL;
// bing search
var bingSearchKey = process.env.BING_ACCT_KEY;
var bingSearch = require('node-bing-api')({ accKey: bingSearchKey });

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// route for recent search terms
app.get("/latest/imagesearch", function (request, response) {
  mongo.connect(mongoUrl, function(error, db) {
    if (error) 
      throw error;
    
    var coll = db.collection('image-search');
    coll.find({}, { _id:0 }).limit(10).sort({when: -1}).toArray((err, data) => {
      if (data.length > 0) {
        response.end(JSON.stringify(data));
      } else {
        var result = {"Response": "No recent searches"};
        response.end(JSON.stringify(result));
      }
    });
    
    db.close();
  });  
});

// route for image search
app.get("/imagesearch/*", function (request, response) {
  var term = request.params[0];
  var offset = 10;
  
  if (request.query.hasOwnProperty('offset')) {
    offset = request.query["offset"];
  }
  
  // save search term
  mongo.connect(mongoUrl, function(error, db) {
    var coll = db.collection('image-search');
    var search = {term: term, when: new Date()};
    
    coll.insert(search, function(error, data) {      
      db.close();
    });
  });
  
  // do image search   
  bingSearch.images(term, {
    top: offset 
  }, 
  function(err, results, body) {
    if (err)
      throw err;
    
    response.end(JSON.stringify(body.value.map(parseResults)));
  });  
});

function parseResults(img) {
  // Construct object from the json result
  return {
    "url": img.webSearchUrl,
    "snippet": img.name,
    "thumbnail": img.thumbnaiUrl,
    "context": img.contentUrl
  };
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});