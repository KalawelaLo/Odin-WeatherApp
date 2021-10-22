async function getWeather(loc){
    
    try{
        const myKey = "e4010c1afb417df7f9acee8fd22f7bd1"
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=metric&appid=${myKey}`, {mode: 'cors'})
        const data = await res.json();
        const a = data.name;
        const b = data.main.temp;
        const c = data.main.feels_like;
        const d = data.weather[0].description;
        const e = data.main.humidity;
        const f = data.main.temp_max;
        return {
            name: a, 
            temp: b, 
            feels_like: c, 
            desc: d, 
            humidity: e, 
            max_temp: f
        };
    }
    catch(err) {
       console.log(err);
       return {
        name: "", 
        temp: "", 
        feels_like: "", 
        desc: "", 
        humidity: "", 
        max_temp: ""
    };
    }
    
}

let current_loc = null;
let swap = false;

const updateCity = function(city) {
    const city_label = document.getElementById('city');
    city_label.textContent = city;
}

const updateTemp = function(temp, cel) {
    const temp_label = document.getElementById('temp');
    if(cel){
        temp_label.textContent = `${temp} °C`;
    } else {
        temp_label.textContent = `${temp} °F`; 
    }
    
}

const updateMisc = function(weat, cel) {
    const misc_label = document.getElementById('misc');
    let text = ''
    if(cel){
        text = `Feels Like: ${weat.feels_like}°C | Humidity: ${weat.humidity}% | Max. Temp: ${weat.max_temp}°C | ${weat.desc}`
    }else {
        text = `Feels Like: ${weat.feels_like}°F | Humidity: ${weat.humidity}% | Max. Temp: ${weat.max_temp}°F | ${weat.desc}`
    }
    misc_label.textContent = text
}

document.getElementById('query').addEventListener('click', (e) => {
    const bar = document.getElementById('location');
    const inp = bar.value;
    bar.value = "";

    const weather = getWeather(inp)
    .then( weather =>{
        updateCity(weather.name);
        updateTemp(weather.temp, true);
        updateMisc(weather, true);
        current_loc = weather;
    })
});

const convCtoF = function(cel) {
    return ((cel *  9.0/ 5.0)+32.0).toFixed(2)
}

document.getElementById('swap').addEventListener('click', (e)=>{
    if(current_loc && !swap){
        swap = true;
        const new_loc_temps = {
        name: current_loc.name, 
        temp: convCtoF(current_loc.temp), 
        feels_like: convCtoF(current_loc.feels_like), 
        desc: current_loc.desc, 
        humidity: current_loc.humidity, 
        max_temp: convCtoF(current_loc.max_temp)
        };
        updateCity(new_loc_temps.name);
        updateTemp(new_loc_temps.temp, false);
        updateMisc(new_loc_temps, false);
    } else {
        swap = false;
        updateCity(current_loc.name);
        updateTemp(current_loc.temp, true);
        updateMisc(current_loc, true);
    }
});


