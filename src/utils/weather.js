const requests = require('requests');

const weather = (long, lat, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=f833ba80c28716360b1153b78313729c`
  
     requests(url)
     .on('data', function (chunk, err) {
  
      const data = JSON.parse(chunk);
      const arrData = [data];
          // console.log(arrData);
          //  console.log(arrData[0]);
          //  console.log(arrData[0].main);
          // console.log(`It is ${arrData[0].main.temp} degree out there with the humidity of ${arrData[0].main.humidity}`);
  
           if(arrData[0].main === undefined) {
             callback('unable to find loaction', undefined);
           } else{
            callback(undefined, 
              // Temprature: arrData[0].main.temp,
              // Humidity: arrData[0].main.humidity,
              // location: arrData[0].name,
              // forcastToday: arrData[0].weather[0].description,
                `It is ${arrData[0].main.temp} degree out there with the humidity of ${arrData[0].main.humidity} and Today forecast is '${arrData[0].weather[0].description}'`
             ) //
          }             
  })
  
  
  .on('end', function (err ) {
    if (err) {
      console.log('connection closed due to errors', err);
    }
    // console.log('end');
  });
  }
  

  module.exports = weather;