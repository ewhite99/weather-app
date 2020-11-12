const getLocation = document.getElementById('get-location')
const locationInput = document.getElementById('search-input')
const tempText = document.getElementById('temp-text')

async function getWeatherData(location) {
    const key = '50185f12415e997defe4d0cdceb3909e';

        let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${key}`)

        let data = await response.json()

        return data
}

getLocation.onsubmit = function() {
    getWeatherData(locationInput.value)
        .then(data => createCard(data.name, Math.round(data.main.temp)+'°F', data.weather[0].description, data.weather[0].icon))
    
    
    document.getElementById('weather-card-container').removeChild(tempText)

    locationInput.value = ''
    return false;
}

function createCard(location, temperature, status, icon) {
    let card = document.createElement('div')
        card.setAttribute('id','weather-card')
        document.getElementById('weather-card-container').appendChild(card)

    let loc = document.createElement('h1')
        loc.textContent = location
        loc.setAttribute('id','weather-card-location')
        card.appendChild(loc)

    let temp = document.createElement('p')
        temp.textContent = temperature
        temp.setAttribute('id','weather-card-temp')
        card.appendChild(temp)

    let img = document.createElement('img')
        img.setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`)
        card.appendChild(img)

        let stat = document.createElement('p')
        stat.textContent = status
        stat.setAttribute('id','weather-card-status')
        card.appendChild(stat)
}

