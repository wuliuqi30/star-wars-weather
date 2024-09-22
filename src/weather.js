import {getTime} from "./general-functions.js"

class Weather{

    constructor(data,unitsType){

        this.fullName = data.resolvedAddress;
        this.temp = data.currentConditions.temp;
        this.high = data.days[0].tempmax;
        this.low = data.days[0].tempmin;
        this.conditions = data.currentConditions.conditions;
        this.precip = data.currentConditions.preciptype;
        this.humidity = data.currentConditions.humidity;
        this.windSpeed = data.currentConditions.windspeed;
        this.description = data.description;
        this.days = data.days;

        this.datetime = getTime(data.currentConditions.datetime);
        this.sunset = getTime(data.currentConditions.sunset);
        this.sunrise = getTime(data.currentConditions.sunrise);
        this.similarToPlanet = null;
        
        this.units = unitsType;
        switch(this.units){
            case 'us':
                this.tempUnits = 'F';
                break;
            case 'uk':
                this.tempUnits = 'C';
                break;

        }
        
        
    }

    get info(){
        console.table(this);
    }

    print7DayForecast(){
        for(let d = 0; d < 7; d++){
            const day = this.days[d];
            console.log(`${day.datetime}, Conditions: ${day.conditions} High ${Math.round(day.tempmax)} Low ${Math.round(day.tempmin)}`)
        }
    }

    fahrenheitToCelsius(f){
        return Math.round( (f - 32) * (5 / 9) * 10) / 10;
    }

    celsiusToFahrenheit(c){
        return Math.round( (c * (9 / 5) + 32) * 10 ) / 10;
    }

    convertToFahrenheit(){

        switch(this.tempUnits){
            case 'F': 
                console.log("Units should already be F");
                break;
            case 'C':
                console.log("converting units from C to F");
                this.temp = this.celsiusToFahrenheit(this.temp);
                this.high = this.celsiusToFahrenheit(this.high);
                this.low = this.celsiusToFahrenheit(this.low);

                for(let d = 0; d < 7; d++){
                    const day = this.days[d];
                    day.tempmax = this.celsiusToFahrenheit(day.tempmax);
                    day.tempmin = this.celsiusToFahrenheit(day.tempmin);
                }
            
                break;

        }
        this.tempUnits = 'F';
    }

    

    convertToCelsius(){

        switch(this.tempUnits){
            case 'F': 
                console.log("converting units from F to C. ");
                this.temp = this.fahrenheitToCelsius(this.temp);
                this.high = this.fahrenheitToCelsius(this.high);
                this.low = this.fahrenheitToCelsius(this.low);
                for(let d = 0; d < 7; d++){
                    const day = this.days[d];
                    day.tempmax = this.fahrenheitToCelsius(day.tempmax);
                    day.tempmin = this.fahrenheitToCelsius(day.tempmin);
                }
                break;
            case 'C':
                console.log("Units should already be C");
                break;               

        }
        this.tempUnits = 'C';
    }

    
    
}

export {Weather};