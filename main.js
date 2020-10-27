async function getCountry(country) {
    const url = `https://restcountries.eu/rest/v2/name/${country}`;

    try {
        const result = await axios.get(url);
        const { name, subregion, population } = result.data[0];

        console.log(`${name} is situated in ${subregion}. It has a population of ${population} people.`);


    } catch (error) {
        console.log(error);
    }
}

const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-button');

let keyword = '';
searchBox.addEventListener('keyup', (e) => {
    keyword = e.target.value;
});

searchBtn.addEventListener('click', () => getCountry(keyword));
