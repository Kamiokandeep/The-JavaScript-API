/*
I couldn't find a way to solve how to access the "Official Language" and "Currency" elements
so look for help at https://stackoverflow.com/
*/

// Gets the id of the elements
const countrySelect = document.getElementById('country-select');
const generalInformation = document.getElementById('general-information');
const geographyPopulation = document.getElementById('geography-population');
const languagesCurrency = document.getElementById('languages-currency');
const additionalInformation = document.getElementById('additional-information');
const imgFlags = document.getElementById('img-flags');
const maps = document.getElementById('maps');

/* 
First I use the "fetch" to get the data from the REST Countries API
https://restcountries.com/
*/
fetch('https://restcountries.com/v3.1/all')
  .then(response => response.json())
  .then(data => {
    // ForEach to go through all the Json countries and then pass them to the select
    data.forEach(country => {
      const option = document.createElement('option');
      option.value = country.name.common;
      option.textContent = country.name.common;
      countrySelect.appendChild(option);
    });

    // Add an "ADDEventListener" to know which country the user selected
    countrySelect.addEventListener('change', function() {
        const selectedCountryName = this.value;
        const selectedCountry = data.find(country => country.name.common === selectedCountryName);

        // I show the results in the HTML of the selected country
        imgFlags.innerHTML = `
            <img src="${selectedCountry.flags.svg}" alt="${selectedCountry.flags.alt}">
        `;
        generalInformation.innerHTML = `
            <h1>General Information</h1>
            <hr>
            <h1>${selectedCountry.name.common}</h1>
            <p>Official Name: ${selectedCountry.name.official}</p>
        `;
        geographyPopulation.innerHTML = `
            <h1>Geography and Population</h1>
            <hr>
            <p>Capital: ${selectedCountry.capital[0]}</p>
            <p>Region: ${selectedCountry.region}</p>
            <p>Subregion: ${selectedCountry.subregion}</p>
            <p>Population: ${selectedCountry.population}</p>
            <p>Fifa: ${selectedCountry.fifa[0]}</p>
            <p>Continents: ${selectedCountry.continents}</p>
            <p>Area: ${selectedCountry.area}</p>
        `;
        languagesCurrency.innerHTML = `
            <h1>Languages and Currency</h1>
            <hr>
            <p>Official Language: ${Object.values(selectedCountry.languages).join(', ')}</p>
            <p>Currency: ${Object.values(selectedCountry.currencies).map(currency => `${currency.name}`).join(', ')}</p>
            <p>Currency Symbol: ${Object.values(selectedCountry.currencies).map(currency => `(${currency.symbol})`).join(', ')}</p>
        `;
        additionalInformation.innerHTML = `
            <h1>Additional Information</h1>
            <hr>
            <p>Independent: ${selectedCountry.independent}</p>
            <p>Timezones: ${selectedCountry.timezones[0]}</p>
            <p>Start Of Week: ${selectedCountry.startOfWeek}</p>
            <p>Spellings: ${selectedCountry.altSpellings[1]}</p>
        `;  
    });
})