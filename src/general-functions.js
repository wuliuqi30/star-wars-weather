import { isAfter,isMatch, isValid } from "date-fns";

function getTime(vizCrossingdate){

    // '06:37:12'
    const hr = vizCrossingdate.slice(0,2);

    const minute = vizCrossingdate.slice(3,5);

    const second = vizCrossingdate.slice(6,8);

    const now = new Date();
    return new Date(now.getFullYear(),now.getMonth(),now.getDate(),hr,minute,second)

}

function getDate(vizCrossingdate){

    // '06:37:12'
    const yr = vizCrossingdate.slice(0,4);

    const month = vizCrossingdate.slice(5,7);

    const day = vizCrossingdate.slice(8,10);

    const now = new Date();
    return new Date(yr,month-1,day);

}


function toCSSURL(url){
    return `url("${url}")`;
}

export {getTime,toCSSURL,getDate}