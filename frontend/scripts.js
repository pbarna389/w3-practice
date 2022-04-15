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
    <button class="flag-add">Show flags as background</button>
    <button class="flag-remove">Remove the flags from tha background</button>
    `);

    const countryComponent = countryName => {
        return `<div class="country">
                    <h2>${countryName}</h2>
                </div>`
    };

    const regionComponent = region => {
        return `<div class="region">
                    <h2>Continent: ${region}</h2>
                </div>`
    };

    const capitalComponent = capitalName => {
        return `<div class="capital">
                    <h3>Capital: ${capitalName}</h3>
                </div>`
    };


    const flagComponent = (flag) => {
        return `<div class="flag">
                    <h3>Flag: ${flag}</h3>
                </div>`
    };

    const independentComponent = independence => {
        const ind = independence => {
            if (independence === true) return "checked";
        };

        return `<div class="independence">
                    <h1>Independent:</h1><input type ="checkbox" disabled ${ind(independence)}>
                </div>`
    };

    //ARRAY.MAP FOR CIKLUS HELYETT
    // [...countriesJSON].map(country => countriesSection.insertAdjacentHTML('beforeend', countryComponent(country.name.common)));

    countriesJSON.map(countries => !countries.capital ? countriesSection.insertAdjacentHTML('beforeend',
        `<div class="countrycont">
            ${countryComponent(countries.name.common)}
            \n${regionComponent(countries.region)}
            \n${capitalComponent("None")}
            \n${independentComponent(countries.independent)}
            \n${flagComponent(countries.flag)}
        </div>}`)
        : countriesSection.insertAdjacentHTML('beforeend',
            `<div class="countrycont">
            ${countryComponent(countries.name.common)}
            \n${regionComponent(countries.region)}
            \n${capitalComponent(countries.capital[0])}
            \n${independentComponent(countries.independent)}
            \n${flagComponent(countries.flag)}
        </div>`));

    //     // for (let i = 0; i < countriesJSON.length; i++) {
    //     //     // countriesSection.insertAdjacentHTML('beforeend', `${ countriesJSON[i].name.common } `);
    //     //     if (!countriesJSON[i].capital) {
    //     //         countriesSection.insertAdjacentHTML('beforeend',
    //     //             `<div class="countrycont ${i}">
    //     //             ${countryComponent(countriesJSON[i].name.common)}
    //     //             \n${regionComponent(countriesJSON[i].region)}
    //     //             \n${capitalComponent("None")}
    //     //             \n${independentComponent(countriesJSON[i].independent)}
    //     //             \n${flagComponent(countriesJSON[i].flag)}
    //     //          </div>}`)
    //     //             ;
    //     //         // countriesSection.insertAdjacentHTML('beforeend', independentComponent(countriesJSON[i].independent));
    //     //         // countriesSection.insertAdjacentHTML('beforeend', flagComponent(countriesJSON[i].flag));
    //     //     } else {
    //     //         countriesSection.insertAdjacentHTML('beforeend',
    //     //             `<div class="countrycont ${i}">
    //     //             ${countryComponent(countriesJSON[i].name.common)}
    //     //             \n${regionComponent(countriesJSON[i].region)}
    //     //             \n${capitalComponent(countriesJSON[i].capital[0])}
    //     //             \n${independentComponent(countriesJSON[i].independent)}
    //     //             \n${flagComponent(countriesJSON[i].flag)}
    //     //             </div>`);
    //     // countriesSection.insertAdjacentHTML('beforeend', capitalComponent(countriesJSON[i].capital[0]));
    //     // countriesSection.insertAdjacentHTML('beforeend', independentComponent(countriesJSON[i].independent));
    //     // countriesSection.insertAdjacentHTML('beforeend', flagComponent(countriesJSON[i].flag));
    //     console.log(Object.values(countriesJSON[i].flags)[0])
    // };

    const flagAddButton = document.querySelector('.flag-add');
    const flagRemoverButton = document.querySelector('.flag-remove');

    const flagInsert = (country, countryInd) => {
        let divs = [...document.querySelectorAll(".countrycont")];
        divs.map((element, index) => index === countryInd && element.setAttribute("style", "background-image: url(" + `${Object.values(country.flags)[1]}` + ");background-repeat: no-repeat;background-size: cover; "));
    };

    const flagRemove = (country, countryInd) => {
        let divs = [...document.querySelectorAll(".countrycont")];
        divs.map((element, index) => index === countryInd && element.setAttribute("style", "background-image:none;background-repeat: no-repeat;background-size: cover; "));
    };

    const flagAdder = () => countriesJSON.map((country, index) => flagInsert(country, index));
    const flagRemover = () => countriesJSON.map((country, index) => flagRemove(country, index));

    flagAddButton.addEventListener('click', flagAdder);
    flagRemoverButton.addEventListener('click', flagRemover);

    // for (let i = 0; i < countriesJSON.length; i++) {
    //     let divs = [...document.querySelectorAll(".countrycont")];
    //     divs.map((x, index) => index === i && x.setAttribute("style", "background-image: url(" + `${Object.values(countriesJSON[i].flags)[1]}` + ");background-repeat: no-repeat;background-size: cover; "));
    // };

    // console.log([...countriesJSON])

    // countriesJSON.map((x, i) => i === 0 && console.log(x));
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