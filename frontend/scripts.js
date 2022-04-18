console.log('This is a script file');

async function loadEvent() {
    let countriesData = await fetch(`https://restcountries.com/v3.1/all`);
    let countriesJSON = await countriesData.json();
    let countriesSection = document.querySelector('#countries');
    console.log(countriesJSON);

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

    const officialNameComponent = spokenLang => {

        return `<div class="language">
                <h3>Official name: ${spokenLang}</h3>
                </div>`
    };


    //ITERÁLÁS OBJEKTUMBAN (FOR CIKLUS ÉS .MAP)

    // for (let i = 0; i < countriesJSON.length; i++) {
    //     if (i === 25) continue;
    //     for (let x = 0, temp = Object.values(countriesJSON[i].name.nativeName); x < temp.length; x++) {
    //         console.log(Object.keys(countriesJSON[i].name.nativeName)[x], temp[x].official, i);
    //     };
    // };

    //INDEX === 25 = ANTARCTICA, NINCS NATIVENAME-JE

    countriesJSON.map((country, index) => index === 25 ? index++ : Object.values(country.name.nativeName).map(x => console.log(Object.keys(x), x.official, index)));

    //ARRAY.MAP FOR CIKLUS HELYETT

    countriesJSON.map(countries => !countries.capital ? countriesSection.insertAdjacentHTML('beforeend',
        `<div class="countrycont">
            ${countryComponent(countries.name.common)}
            \n${regionComponent(countries.region)}
            \n${capitalComponent("None")}
            \n${independentComponent(countries.independent)}
            \n${flagComponent(countries.flag)}
        </div>`)
        : countriesSection.insertAdjacentHTML('beforeend',
            `<div class="countrycont">
            ${countryComponent(countries.name.common)}
            \n${regionComponent(countries.region)}
            \n${capitalComponent(countries.capital[0])}
            \n${independentComponent(countries.independent)}
            \n${flagComponent(countries.flag)}
        </div>`));

    // FLAGEK HÁTTÉRNEK FOR CIKLUS HELYETT .MAP+FUNCTION-NEL + BUTTONS = ADD, REMOVE

    const flagAddButton = document.querySelector('.flag-add');
    const flagRemoverButton = document.querySelector('.flag-remove');
    const divs = [...document.querySelectorAll(".countrycont")];

    const flagInsert = (country, countryInd) => {
        divs.map((element, index) => index === countryInd && element.setAttribute("style", "background-image: url(" + `${Object.values(country.flags)[1]}` + ");background-repeat: no-repeat;background-size: cover;"));
    };

    const flagRemove = (country, countryInd) => {
        divs.map((element, index) => index === countryInd && element.setAttribute("style", "background-image:none;background-repeat: no-repeat;background-size: cover;"));
    };

    const flagAdder = () => countriesJSON.map((country, index) => flagInsert(country, index));
    const flagRemover = () => countriesJSON.map((country, index) => flagRemove(country, index));

    flagAddButton.addEventListener('click', flagAdder);
    flagRemoverButton.addEventListener('click', flagRemover);

};

window.addEventListener('load', loadEvent);