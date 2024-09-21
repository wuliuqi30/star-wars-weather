// index.js
import "./styles.css";
import { Weather } from './weather.js';
import { updateScreen } from './pageUpdateFunctions.js'
console.log('Hello World!');

const visCrossingKey = 'ZCWDE5932FHQ7QKTCRSZ25B94';
const urlBeginning = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

const body = document.querySelector('body');

const searchBtn = document.querySelector('.search-btn');

const unitsBtn = document.querySelector('.convert-temp-btn');

let units = 'us'

let w = null;



searchBtn.addEventListener('click', () => {
    getWeatherFromSite(units);
})

unitsBtn.addEventListener('click', () => {
    if (w.tempUnits === 'F'){
        w.convertToCelsius();
    } else {
        w.convertToFahrenheit();
    }

    
    updateScreen(w);

})



async function getWeatherFromSite(units, cityName) {
    const search = document.querySelector('input');
    const searchBar = document.querySelector('.search-bar');
    
    if (!cityName) {
        cityName = search.value;
    }


    const fullUrlSearch = urlBeginning + cityName + '?key=' + visCrossingKey + `&unitGroup=${units}`;
    console.log(`URL is : ${fullUrlSearch}`);

    try {

        const response = await fetch(fullUrlSearch, { mode: 'cors' })
        const weatherData = await response.json();
        console.log("-----------------------");
        console.log(weatherData);
        window.weatherData = weatherData;
        w = new Weather(weatherData, units);
        window.w = w;
        
        updateScreen(w);
        searchBar.value = '';
        

    } catch (error) {


        console.log(`Error: ${error}`);
        
        searchBar.setAttribute('placeholder', "Sorry! Couldn't find this city. Try again.")
        searchBar.value = '';


    }

    search.focus();

}


// Onload


getWeatherFromSite(units,'syracuse, new york')