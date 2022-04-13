console.log('This is a script file');

console.log('load');


function loadEvent() {
    const menu = document.querySelector(".menu");
    menu.addEventListener('click', () => {
        menu.textContent = 'I have been changed'
    });
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

console.log(window);

