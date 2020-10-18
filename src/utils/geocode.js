const requests = require('requests');


const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2FrZXRzaW5naDAyMTUiLCJhIjoiY2tnNTcxcnBmMDF3eDM0bW94OWJ1YTYwciJ9.IdniEOQofAY8NYa9azLmsg&limit=1`
  
      requests(url)
     .on('data', function (mapchunk) {
  
      const data = JSON.parse(mapchunk);
      // console.log(data);
      // console.log(data.coord.lon);
      if(data.features.length === 0){
        callback('unable to find location');
      }else{
      
      callback('', {
         longtitude : data.features[0].center[0],
         latitude :data.features[0].center[1],
         location : data.features[0].place_name,
  
        // console.log(`The latitude is ${longtitude} and longtitude is ${latitude}`);
      })  
        
      }
   })
   .on('end', function (err) {
     if (err) return console.log('connection closed due to errors');
   });
  }
  

  module.exports = geoCode;