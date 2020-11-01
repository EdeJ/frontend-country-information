const errorMessage = document.getElementById('error-message');
const countryDetails = document.getElementById('country-details');
const searchResults = document.getElementById('search-results');
const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-button');

searchBox.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        getCountry(searchBox.value);
        searchBox.value = '';
    }
});

searchBtn.addEventListener('click', () => {
    if (searchBox.value !== '') {
        getCountry(searchBox.value);
        searchBox.value = '';
    }
});

async function getCountry(country) {
    const url = `https://restcountries.eu/rest/v2/name/${country}`;

    countryDetails.classList.add('animate-height');

    try {
        const result = await axios.get(url);

        const { name,
            subregion,
            population,
            capital,
            flag,
            languages,
            currencies
        } = result.data[0];

        errorMessage.textContent = '';

        function getCountryProp(props, isCurrency) {
            return props.reduce((acc, prop, index) => {
                if (props.length > 1 && index === props.length - 1) {
                    return acc + ` and ${prop.name}` + (isCurrency ? "'s" : "");
                } else {
                    return acc + (index === props.length > 1 ? ` ${prop.name},` : ` ${prop.name}`) + (isCurrency ? "'s" : "");
                }
            }, '');
        }

        const valutaMessage = getCountryProp(currencies, true);
        const languageMessage = getCountryProp(languages);

        const htmlData = `<img src="${flag}" width="100" alt="country flag">
        <h2>${name}</h2>
        <p>${name} is situated in ${subregion}. It has a population of ${population} people.<br>
        The capital is ${capital} and you can pay with ${valutaMessage}<br>
        They speak ${languageMessage}.</p>`;

        searchResults.textContent = '';
        let e = document.createElement('span');
        e.innerHTML = htmlData;
        searchResults.appendChild(e);

    } catch (error) {
        console.log(error);
        searchResults.textContent = '';
        errorMessage.textContent = 'Error: Input not valid. Type a country name!';
    }
}


