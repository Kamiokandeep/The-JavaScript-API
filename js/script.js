const countrySelect = document.getElementById('country-select');
const generalInformation = document.getElementById('general-information');
const geographyPopulation = document.getElementById('geography-population');
const languagesCurrency = document.getElementById('languages-currency');

// First I use the "fetch" to get the data from the REST Countries API
// https://restcountries.com/
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
      generalInformation.innerHTML = `
        <h2>${selectedCountry.name.common}</h2>
        <p>Capital: ${selectedCountry.capital[0]}</p>
        <p>Region: ${selectedCountry.region}</p>
      `;
    });
})
