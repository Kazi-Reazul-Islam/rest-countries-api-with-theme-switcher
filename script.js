// TODOs:
// Api Call
// Theme Toggle
// Search
// Filter
// Modal

const countriesEl = document.getElementById('countries');
const toggleBtn = document.getElementById('toggle');
const filterBtn = document.getElementById('filter');
const regionFilters = document.querySelectorAll('li');
const searchEl = document.getElementById('search');

getCountries();
async function getCountries(){
    const res = await fetch('https://restcountries.com/v3.1/all')
    const countries = await res.json();


    displayCountries(countries);
}

function displayCountries(countries){

    countriesEl.innerHTML = '';

    countries.forEach(country => {
    
        const countryEl = document.createElement('div');
        countryEl.classList.add('card');
        countryEl.innerHTML = `
                <div class="card-header">
                    <img src="${country.flags.svg}" alt="Germany"/>
                </div>

                <div class="card-body">
                    <h3 class="country-name">${country.name.common}</h3>
                    <p><strong>Populations:</strong> ${country.population}</p>
                    <p class="country-region"><strong>Region:</strong> ${country.region}</p>
                    <p><strong>Start Of Week:</strong> ${country.startOfWeek}</p>
                    <p><strong>Capital:</strong> ${country.capital}</p>
                </div>

                `

        countriesEl.appendChild(countryEl);
    });

};

// Toggle theme - dark & light
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// show and hide the filters (li tags)
filterBtn.addEventListener('click', () => {
    filterBtn.classList.toggle('open');
});

searchEl.addEventListener('input', e => {
    const value = e.target.value;
    const countryName = document.querySelectorAll('.country-name');

    countryName.forEach(name => {
        // .card -> .card-body -> .country-name ->
        if(name.innerText.toLowerCase().includes(value.toLowerCase())){
            name.parentElement.parentElement.style.display = 'block';

        }else{
            name.parentElement.parentElement.style.display = 'none';
        }

    });


});

// Add a filter on the li's inside the .dropdown
regionFilters.forEach(filter =>{
    filter.addEventListener('click', () => {
        const value = filter.innerText;
        const countryRegion = document.querySelectorAll('.country-region');

        countryRegion.forEach(region => {
            // .card -> .card-body -> .country-region ->
            if(region.innerText.includes(value) || value === 'All'){
                region.parentElement.parentElement.style.display = 'block';
    
            }else{
                region.parentElement.parentElement.style.display = 'none';
            }
    
        });

    });

});
