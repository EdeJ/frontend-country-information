const errorMessage = document.getElementById('error-message');

async function getCountry(country) {
    const url = `https://restcountries.eu/rest/v2/name/${country}`;

    try {
        const result = await axios.get(url);
        console.log(result.data[0]);
        const { name,
            subregion,
            population,
            capital,
            flag,
            languages,
            currencies
        } = result.data[0];

        errorMessage.textContent = '';

        // OPDRACHT 2
        console.log(`${name} is situated in ${subregion}. It has a population of ${population} people.`);

        // OPDRACHT 3
        console.log(`The capital is ${capital}`);

        // OPDRACHT 4
        // Maak een functie die ongeacht het aantal currencies die in een land gebruikt worden, een string maakt:
        // 1 valuta: and you can pay with [currency]'s
        // 2 valuta's: and you can pay with [currency]'s and [currency]'s
        // 3 valuta's: and you can pay with [currency]'s, [currency]'s and [currency]'s
        // let valutaMessage = currencies.reduce((acc, currencie, index) => {
        //     if (currencies.length > 1 && index === currencies.length - 1) {
        //         return acc + ` en ${currencie.name}`;
        //     } else {
        //         return acc + (index === currencies.length > 1 ? ` ${currencie.name},` : ` ${currencie.name}`);
        //     }
        // }, currencies.length > 1 ? 'valuta\'s: ' : 'valuta: ');
        // console.log(valutaMessage);

        function getCountryProp(props) {
            return props.reduce((acc, prop, index) => {
                if (props.length > 1 && index === props.length - 1) {
                    return acc + ` en ${prop.name}`;
                } else {
                    return acc + (index === props.length > 1 ? ` ${prop.name},` : ` ${prop.name}`);
                }
            }, '');
        }
        valutaMessage = getCountryProp(currencies);
        console.log(valutaMessage);

        // OPDRACHT 5
        // Check of alles nog steeds werkt als je de gegevens over Aruba of Duitsland ophaalt.

        // Maak een functie die ongeacht het aantal talen die in een land gesproken worden, een string maakt:
        // 1 taal: They speak [language]
        // 2 talen: They speak [language] and [language]
        // 3 talen: They speak [language], [language] and [language]
        // etc.
        // let languageMessage = languages.reduce((acc, language, index) => {
        //     if (languages.length > 1 && index === languages.length - 1) {
        //         return acc + ` en ${language.name}`;
        //     } else {
        //         return acc + (index === languages.length > 1 ? ` ${language.name},` : ` ${language.name}`);
        //     }
        // }, languages.length > 1 ? 'talen: ' : 'taal: ');
        languageMessage = getCountryProp(languages);
        console.log(languageMessage);

        // OPDRACHT 7
        // Zorg ervoor dat de opgehaalde data op de volgende manier wordt toegevoegd aan de DOM:
        // [IMAGE: flag]
        // [country-name]
        // [country-naam] is situated in [subarea-name]. It has a population of [amount] people.
        // The capital is [city] and you can pay with [currency]'s
        // They speak [language], [language] and [language]

        const htmlData = `<img src="${flag}" width="100" alt="country flag">
        <h2>${name}</h2>
        <p>
        ${name} is situated in ${subregion}. It has a population of ${population} people.<br>
        The capital is ${capital} and you can pay with ${valutaMessage}'s<br>
        They speak ${languageMessage}.
        </p>`;

        const searchResults = document.getElementById('search-results');
        searchResults.textContent = '';
        let e = document.createElement('span');
        e.innerHTML = htmlData;
        searchResults.appendChild(e);

    } catch (error) {
        console.log(error);
        errorMessage.textContent = 'Error: Input not valid'
    }
}

const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-button');

searchBox.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        getCountry(searchBox.value);
        searchBox.value = '';
    }
});

searchBtn.addEventListener('click', () => {
    getCountry(searchBox.value);
    searchBox.value = '';
});
