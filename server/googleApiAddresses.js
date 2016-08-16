var http = require("https");

//https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyDPR_rluVMdgqvM4JBorRSJa3Q2Mo_rUXU
//start:'{latitude: 37.33756603, longitude: -122.02681114}'
var getAddress = (start, end, cb) => {
  console.log(start, end)
  var start = start.latitude + ',' + start.longitude;
  var end = end.latitude + ',' + end.longitude;
  var results = {};
    getAddressFromLoc(start, (result)=>{
      result = JSON.parse(result)
      var Address = result['results'][0]['formatted_address']
      results.start = Address
      console.log(results)

     getAddressFromLoc(end, (result)=>{
      result = JSON.parse(result)
      var Address = result['results'][0]['formatted_address']
      results.end = Address
      console.log(results)
      cb(results)
     })
   })
};

function getAddressFromLoc(latLongStr, callback){
  var http = require("https");

  var options = {
    "method": "POST",
    "hostname": "maps.googleapis.com",
    "port": null,
    "path": "/maps/api/geocode/json?latlng="+ latLongStr +"&key=AIzaSyDPR_rluVMdgqvM4JBorRSJa3Q2Mo_rUXU",
    "headers": {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "postman-token": "53b1198e-8977-f90d-3293-c4e302516eb3"
    }
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      callback(body.toString())
    });
  });

  req.end();
}

  module.exports = getAddress;
