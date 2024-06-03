import { countries } from "./services/countriesService.js";
import { createCardsList } from "./services/domService.js";

// התוספות שהוצעו:
// 1. סידור המדינות לפי שטח (מהגדולה לקטנה)
countries.sort((a, b) => b.area - a.area);

// 2. הוספת פילטר להצגת מדינות המכילות אות "ia" בשם המדינה
const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes('ia'));

// 3. הצגת מידע נוסף בכרטיסייה: כמות השפות הרשמיות של המדינה
filteredCountries.forEach(country => {
    country.languagesCount = Object.keys(country.languages).length;
});

// 4. הוספת פונקציה להצגת מידע מורחב על מדינה לפי שם המדינה
const displayCountryInfo = (countryName) => {
    const country = countries.find(country => country.name.common === countryName);
    if (country) {
        console.log(`Additional information about ${countryName}:`);
        console.log("Languages:", Object.keys(country.languages).join(", "));
        console.log("Capital:", country.capital);
        console.log("Region:", country.region);
        console.log("Population:", country.population);
        console.log("Area:", country.area);
    } else {
        console.log(`Country "${countryName}" not found.`);
    }
};

createCardsList(filteredCountries);

console.log(filteredCountries);

// קריאה לפונקציה להצגת מידע מורחב על מדינה מסוימת
displayCountryInfo("Israel");