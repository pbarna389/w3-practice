console.log('This is a script file');

async function loadEvent() {
    // const menu = document.querySelector(".menu");
    // menu.addEventListener('click', () => {
    //     menu.textContent = 'I have been changed'
    // });
    // console.dir(document.querySelector('#countries'));

    // document.querySelector('#countries').innerHTML += " ,hali";
    let countriesData = await fetch(`https://restcountries.com/v3.1/all`);
    let countriesJSON = await countriesData.json();
    // console.log(countriesData);
    // console.log(countriesJSON);


    let countriesSection = document.querySelector('#countries');

    countriesSection.insertAdjacentHTML('beforeend', `
    <h1>Countries</h1>
    `);

    // countriesSection.insertAdjacentHTML('beforeend', JSON.stringify(countriesJSON[0].name.common));

    //A KIKOMMENTÁLT RÉSZ NEM JÓ, A FUNCTIONTŐL KEZDŐDIK A FASZA

    // let countryComponent = `
    // <div class="country">
    //     <h2>Country name</h2>
    // </div>`;

    const countryComponent = countryName => {
        return `<div class="country">
                    <h2>${countryName}</h2>
                </div>`
    };


    //ARRAY.MAP FOR CIKLUS HELYETT
    // [...countriesJSON].map(country => countriesSection.insertAdjacentHTML('beforeend', countryComponent(country.name.common)));

    for (let i = 1; i < countriesJSON.length; i++) {
        // countriesSection.insertAdjacentHTML('beforeend', `${countriesJSON[i].name.common}`);
        countriesSection.insertAdjacentHTML('beforeend', countryComponent(countriesJSON[i].name.common));
    };

    // countriesSection.insertAdjacentHTML('afterend', JSON.stringify(countriesJSON[0].name.nativeName.spa.official));
    console.log(countriesJSON);
};

window.addEventListener('load', loadEvent);

const logger = logThis => {
    console.log(logThis);
};

logger(`Sup`);
logger('Say hello to my little friend');
logger('Are you talking to me');
logger(4);
logger(4 || null);
logger(4 && null);
