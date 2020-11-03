
const countryList = document.getElementById('country-list');

getAllCountries();

async function getAllCountries() {
    const url = 'https://restcountries.eu/rest/v2/all';

    try {
        const result = await axios.get(url);
        console.log(result.data);
        const allCountries = result.data;
        printCountries(allCountries);
    } catch (error) {
        console.log(error);
    }
}

function printCountries(allCountries) {
    allCountries = sortCountries(allCountries);
    console.log(allCountries);

    allCountries.forEach((country, index) => {
        const { name, flag, population, region } = country;

        const listElement = document.createElement('li');
        listElement.setAttribute('id', `list-item-${index}`);
        const imgElement = document.createElement('img');
        const nameSpan = document.createElement('span');
        nameSpan.classList.add('country-name');
        const detailsSpan = document.createElement('span');

        switch (region) {
            case 'Africa':
                listElement.classList.add('blue');
                break;
            case 'Americas':
                listElement.classList.add('green');
                break;
            case 'Asia':
                listElement.classList.add('red');
                break;
            case 'Europe':
                listElement.classList.add('yellow');
                break;
            case 'Oceania':
                listElement.classList.add('purple');
                break;
            default:
                break;
        }


        detailsSpan.classList.add('hide');

        imgElement.setAttribute('src', flag);
        // console.log(imgElement)
        listElement.appendChild(imgElement);
        nameSpan.textContent = name;
        listElement.appendChild(nameSpan);
        detailsSpan.textContent = `${name} heeft een populatie van: ${population}`;
        listElement.appendChild(detailsSpan);
        listElement.addEventListener('click', () => toggleDetails(detailsSpan));
        const cancelBtn = document.createElement('span');
        cancelBtn.classList.add('material-icons');
        cancelBtn.textContent = 'cancel';
        detailsSpan.appendChild(cancelBtn);

        countryList.appendChild(listElement);

    });
}

function toggleDetails(detailsSpan) {
    if (detailsSpan.classList.contains('hide')) {
        detailsSpan.classList.remove('hide');
        detailsSpan.classList.add('show');
    } else {
        detailsSpan.classList.remove('show');
        detailsSpan.classList.add('hide');
    }
}

function sortCountries(allCountries) {
    return allCountries.sort((a, b) => {
        return a.population - b.population;
    });

}