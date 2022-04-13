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
    console.log(countriesJSON);


    let countriesSection = document.querySelector('#countries');

    countriesSection.insertAdjacentHTML('beforebegin', `
    <h1>Countries: </h1>
    `);

    const countryComponent = countryName => {
        return `<div class="country">
                    <h2>Country: ${countryName}</h2>
                </div>`
    };

    const capitalComponent = capitalName => {
        // if (!capitalName) {
        //     return `<div class="capital">
        //                 <h3>Capital: None</h3>
        //             </div>`
        // };
        return `<div class="capital">
                    <h3>Capital: ${capitalName}</h3>
                </div>`
    };

    const flagComponent = flagPic => {
        return `<div class="flagPic">
                    <h4>Flag: ${flagPic}</h4>
                </div>`
    };

    const independentComponent = independence => {
        const ind = independence => {
            if (independence === true) return "checked";
        };

        return `<div class="independence">
                    <h3>Independent:</h3><input type ="checkbox" disabled ${ind(independence)}>
                </div>`
    };

    //ARRAY.MAP FOR CIKLUS HELYETT
    // [...countriesJSON].map(country => countriesSection.insertAdjacentHTML('beforeend', countryComponent(country.name.common)));

    for (let i = 0; i < countriesJSON.length; i++) {
        // countriesSection.insertAdjacentHTML('beforeend', `${ countriesJSON[i].name.common } `);
        console.log(i)
        if (!countriesJSON[i].capital) {
            countriesSection.insertAdjacentHTML('beforeend',
                `<div class="countrycont">
                ${countryComponent(countriesJSON[i].name.common)}
                \n${independentComponent(countriesJSON[i].independent)}
                \n${flagComponent(countriesJSON[i].flag)}
             </div}`);
            // countriesSection.insertAdjacentHTML('beforeend', independentComponent(countriesJSON[i].independent));
            // countriesSection.insertAdjacentHTML('beforeend', flagComponent(countriesJSON[i].flag));
        } else {
            countriesSection.insertAdjacentHTML('beforeend',
                `<div class="countrycont">
                ${countryComponent(countriesJSON[i].name.common)}
                \n${capitalComponent(countriesJSON[i].capital[0])}
                \n${independentComponent(countriesJSON[i].independent)}
                \n${flagComponent(countriesJSON[i].flag)}
            </div>`);
            // countriesSection.insertAdjacentHTML('beforeend', capitalComponent(countriesJSON[i].capital[0]));
            // countriesSection.insertAdjacentHTML('beforeend', independentComponent(countriesJSON[i].independent));
            // countriesSection.insertAdjacentHTML('beforeend', flagComponent(countriesJSON[i].flag));
        };
    };

    // console.log([...countriesJSON])
    // countriesSection.insertAdjacentHTML('afterend', JSON.stringify(countriesJSON[0].name.nativeName.spa.official));
};

window.addEventListener('load', loadEvent);

// const logger = logThis => {
//     console.log(logThis);
// };

// logger(`Sup`);
// logger('Say hello to my little friend');
// logger('Are you talking to me');
// logger(4);
// logger(4 || null);
// logger(4 && null);
