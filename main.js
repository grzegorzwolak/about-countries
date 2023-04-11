const input = document.querySelector('.input');
const countriesBox = document.querySelector('.wrapper');
const backBtn = document.querySelector('.go-search')
let allCountries


const URL = 'https://restcountries.com/v3.1/all';

let countryName;
let capital;
let continent;
let population;
let flag;
let alt;
let currency;
let allCurrency;
let language
let allLanguages

const handleCountries = () => {
	fetch(URL)
		.then((response) => response.json())
		.then((result) => {
			createVariables(result);
		});
};

const createVariables = (country) => {
	for (let i = 0; i < country.length; i++) {
		countryName = country[i].name.common;
		capital = country[i].capital;
		continent = country[i].continents;
		population = country[i].population;
		flag = country[i].flags.png;
		alt = country[i].flags.alt;
		currency = '';
        language = '';

		allCurrency = country[i].currencies;

		if (allCurrency === undefined) {
            currency = 'No information'
        } else {
            currency = Object.entries(allCurrency)[0][1].name
        } 

        allLanguages = country[i].languages;

		if (allLanguages === undefined) {
            language = 'No information'
        } else {
            language = Object.entries(allLanguages)[0][1]
        } 

		createCountry();
	}
	allCountries = document.querySelectorAll('.country')
	
};

const createCountry = () => {
	const countryCard = document.createElement('div');
	countryCard.innerHTML = `
        <div class="country">
                        <h3 class="title">${countryName}</h3>
                        <p>Language: <span class="language">${language}</span></p>
                        <p>Capital: <span class="capital">${capital}</span></p>
                        <p>Continent: <span class="region">${continent}</span></p>
                        <p>Currency: <span class="currency">${currency}</span></p>
                        <p>Population: <span class="population">${population}</span></p>
                        <img src="${flag}" alt="${alt}">
                    </div>
        `;
	countriesBox.appendChild(countryCard);
	
};

const searchCountry = () => {
	const typedText = input.value.toUpperCase()
	showCountry(typedText)
	
};

const showCountry = (input) => {
	allCountries.forEach(el => {
		let cardTitle = el.querySelector('.title')
		
		if (cardTitle.textContent.toUpperCase().includes(input) === false) {
			el.classList.add('hide')
		} else {
			el.classList.remove('hide')
		}

	});
}

const showBackBtn = () => {
	if (window.scrollY > 800) {
		backBtn.classList.remove('hide');
	} else {
		backBtn.classList.add('hide');
	}
}



window.addEventListener('scroll', showBackBtn)
window.addEventListener('onload', handleCountries());
input.addEventListener('keyup', searchCountry);
