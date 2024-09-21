import { isAfter, isBefore, isMatch, isValid, sub, lightFormat,format } from "date-fns";
import { getDate, toCSSURL } from "./general-functions.js";
import { BACKGROUNDS } from "./globals.js";

// import sunset  from './backgrounds/sunset-bespin.png';

window.isMatch = isMatch;
window.isBefore = isBefore;
window.isAfter = isAfter;
window.isValid = isValid;
window.BACKGROUNDS = BACKGROUNDS;
window.toCSSURL = toCSSURL;
function updateScreen(weatherObject) {

    const middleSection = document.querySelector('.middle-section');
    const body = document.querySelector('body');

    // Date
    const todaysDateDOM = document.querySelector('.today-header');
    const nowTime = new Date();
    todaysDateDOM.textContent = format(nowTime,'PPPP');



    let tempUnits = '';
    let degreeSymbol = '\u00B0'
    if (weatherObject.tempUnits === 'F') {
        tempUnits =  degreeSymbol + ' F';
    } else {
        tempUnits = degreeSymbol + ' C';
    }

    // Is it day or night? 

    const sunsetDifferenceHours = 2;
    const eveningStart = sub(weatherObject.sunset, { hours: sunsetDifferenceHours });

    let timeOfDaySetting = 'day'; // or 'sunset' or 'night';

    console.log(`Current time: ${lightFormat(weatherObject.datetime, 'h:m:aaaa')}`)
    if (isBefore(weatherObject.datetime, weatherObject.sunrise) ||
        isAfter(weatherObject.datetime, weatherObject.sunset)) {

        console.log('is before sunrise or after sunset, dark!');
        timeOfDaySetting = 'night';


    } else if (isAfter(weatherObject.datetime, eveningStart) &&
        isBefore(weatherObject.datetime, weatherObject.sunset)) {

        console.log('evening!');
        timeOfDaySetting = 'sunset';


    } else {
        console.log('daytime!')
        timeOfDaySetting = 'day';

    }

    // Humidity: 
    const wetPoint = 75;
    const dryPoint = 30;
    let humiditySetting = 0;
    console.log(`humidity is ${weatherObject.humidity}, range is dry < ${dryPoint}, wet > ${wetPoint} `)
    if (weatherObject.humidity < dryPoint) {
        humiditySetting = 'dry';
    } else if ((weatherObject.humidity > dryPoint) && (weatherObject.humidity < wetPoint)) {
        humiditySetting = 'moderate';
    } else {
        humiditySetting = 'wet';
    }

    // Precip

    let precipitationSetting = null;

    // check if the word 'rain' is in the conditions string
    const rainRegex = /rain/i;
    const snowRegex = /snow/i;
    const cloudRegex = /cloud/i;
    console.log(`conditions: ${weatherObject.conditions}`);

    const weatherIcon = document.querySelector('.todays-icon-container')
    if (rainRegex.test(weatherObject.conditions)) {
        console.log(`theres rain here`);
        precipitationSetting = 'rain';
        weatherIcon.style.backgroundImage = toCSSURL(BACKGROUNDS.RAIN_ICON);
    } else if (snowRegex.test(weatherObject.conditions)) {
        console.log('snow');
        precipitationSetting = 'snow';
        weatherIcon.style.backgroundImage = toCSSURL(BACKGROUNDS.SNOW_ICON);
    } else if (cloudRegex.test(weatherObject.conditions)) {
        console.log('clouds');
        precipitationSetting = 'clouds';
        weatherIcon.style.backgroundImage = toCSSURL(BACKGROUNDS.CLOUDY_ICON);
    } else {
        console.log('clear enough');
        precipitationSetting = 'clear';
        weatherIcon.style.backgroundImage = toCSSURL(BACKGROUNDS.SUNNY_ICON);
    }


    // Temperature: 

    let tempSetting = null;
    const coldPointF = 40;
    const coldPointC = 5;

    switch(weatherObject.tempUnits){
        case 'F':
            if (weatherObject.temp < coldPointF) {
                tempSetting = 'freezing';
            }
            break;
        case 'C':
            if (weatherObject.temp < coldPointC) {
                tempSetting = 'freezing';
            }
            break;
    }
    


    // Background will be chosen on these factors: 
    // light: day, sunset, and night-time
    // 

    
    switch (timeOfDaySetting) {
        case 'day':
            // Styling: 
            body.className = 'light';
            if (tempSetting !== 'freezing') {
                switch (precipitationSetting) {
                    case 'rain':
                        middleSection.style.backgroundImage = toCSSURL(BACKGROUNDS.DAY_RAIN);
                        weatherObject.similarToPlanet = 'Ahch-To';
                        break;
                    case 'clouds':
                        middleSection.style.backgroundImage = toCSSURL(BACKGROUNDS.DAY_PARTLY_CLOUDY);
                        weatherObject.similarToPlanet = 'Naboo';
                        break;
                    default:
                        switch (humiditySetting) {
                            case 'dry':
                                middleSection.style.backgroundImage = toCSSURL(BACKGROUNDS.DAY_DRY);
                                weatherObject.similarToPlanet = 'Tatooine';
                                break;
                            default:
                                middleSection.style.backgroundImage = toCSSURL(BACKGROUNDS.DAY_CLEAR);
                                weatherObject.similarToPlanet = 'Naboo';
                        }

                }
            } else {
                switch (precipitationSetting) {
                    case 'snow':
                        middleSection.style.backgroundImage = toCSSURL(BACKGROUNDS.DAY_FREEZING_SNOW);
                        weatherObject.similarToPlanet = 'Unknown';
                        break;
                    default:
                        middleSection.style.backgroundImage = toCSSURL(BACKGROUNDS.DAY_FREEZING_CLEAR);
                        weatherObject.similarToPlanet = 'Hoth';
                }
                break;
            }
            break;
        case 'sunset':
            body.className = 'light';
            middleSection.style.backgroundImage = toCSSURL(BACKGROUNDS.SUNSET_PARTLY_CLOUDY);
            weatherObject.similarToPlanet = 'Bespin';
            break;
        case 'night':
            body.className = 'dark';
            if (tempSetting !== 'freezing') {
                switch (precipitationSetting) {
                    case 'rain':
                        middleSection.style.backgroundImage = toCSSURL(BACKGROUNDS.NIGHT_RAIN);
                        weatherObject.similarToPlanet = 'Kamino';
                        break;
                    default:
                        switch (humiditySetting) {
                            case 'wet':
                                middleSection.style.backgroundImage = toCSSURL(BACKGROUNDS.NIGHT_CLEAR_HUMID);
                                weatherObject.similarToPlanet = 'Dagobah';
                                break;
                            default:
                                middleSection.style.backgroundImage = toCSSURL(BACKGROUNDS.NIGHT_CLEAR);
                                weatherObject.similarToPlanet = 'Kashyyk';
                        }

                }
            } else {
                switch (precipitationSetting) {
                    case 'snow':
                        middleSection.style.backgroundImage = toCSSURL(BACKGROUNDS.NIGHT_FREEZING_SNOW);
                        weatherObject.similarToPlanet = 'Unknown';
                        break;
                    default:
                        middleSection.style.backgroundImage = toCSSURL(BACKGROUNDS.NIGHT_FREEZING_CLEAR);
                        weatherObject.similarToPlanet = 'Hoth';
                }
                break;
            }
            break;
    }



    const locationInfoDOM = document.querySelector('.todays-weather-location');
    locationInfoDOM.textContent = weatherObject.fullName;

    const localTimeInfoDOM = document.querySelector('.todays-weather-localtime');
    localTimeInfoDOM.textContent = `Local Time: ${format(weatherObject.datetime,'p')}`;


    const currTempDOM = document.querySelector('.current-temp');
    currTempDOM.textContent = weatherObject.temp + tempUnits;

    const currConditionsDOM = document.querySelector('.current-conditions');
    currConditionsDOM.textContent = weatherObject.conditions;


    const lowDOM = document.querySelector('.high');
    lowDOM.textContent = weatherObject.high + degreeSymbol;

    const highDOM = document.querySelector('.low');
    highDOM.textContent = weatherObject.low + degreeSymbol;

    const humidityDOM = document.querySelector('.humidity');
    humidityDOM.textContent = weatherObject.humidity + '%';

    const currDescriptionDOM = document.querySelector('.current-description');
    currDescriptionDOM.textContent = weatherObject.description;

    const similarToDOM = document.querySelector('.weather-like');
    similarToDOM.textContent = `Conditions most similar to ${weatherObject.similarToPlanet}.`;

}

export { updateScreen }