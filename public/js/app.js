
// fetch('http://puzzle.mead.io/puzzle').then( (response)=>{
//        response.json().then((data)=>{
//             console.log(data);
//        })
// })

// fetch('http://localhost:3000/weather?address=deoria').then((response)=>{
//         response.json().then((data)=>{

//             if(data.error){
//             console.log(data.error);
//             }
//             else{
//                 console.log(data.location);
//                 console.log(data.forecast)
//             }
//         })
// })

const weatherForm = document.querySelector('.weather_search');
const search = document.querySelector('input');
const locationPara = document.getElementById('location');
const weather = document.getElementById('weather');

    weatherForm.addEventListener('click', (data)=>{ 

    const location = search.value;
    // console.log(location);

    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{

            if(data.error){
                weather.innerHTML = data.error
            console.log(data.error);
            }
            else{            
             weather.innerHTML = data.forecast
             locationPara.innerHTML = data.location
            }
        })
})
})