"use strict";
const $arenas = document.querySelector('.arenas');
//пока такой счетчик на первого или другого персонажа в дальнейшем при выборе песонажа будет две графи, которые по
// умолчанию будут давать сили первому или второму игроку
function makeCounter() {
    let currentCount=1;
        return function () {
        currentCount=currentCount===2?2:1;
        return currentCount++;
    };
}
const playerNumber = makeCounter();

//CreateSpecificationsPlayer создает персонажей, если будем создавать персонажей больше 2, про проще написать массив с
// параметрами, а потом скормить его этой функции.
function CreateSpecificationsPlayer(name, hp, img, weapon = []) {
    this.name = "" + name;
    this.hp = +hp;
    this.img = "" + img;
    this.weapon = weapon;
    this.attack = () => `${name} Fight...`;
}

function createTag(teg, Class = '', text = '', style = []) {
    const $div = document.createElement(teg);
    if (Class !== '' && style !== []) {
        $div.className = Class;

        style.forEach((item) => {
            return $div.style[item[0]] = item[1];
        })

        $div.textContent = text
        return $div
    }

    return $div;
}

const player1 = new CreateSpecificationsPlayer("Scorpion", 100, "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif", ["flamberg", "bastard"]);
const player2 = new CreateSpecificationsPlayer("Kung Lao", 70, "http://reactmarathon-api.herokuapp.com/assets/liukang.gif", ["claymore"]);
console.log(player2);

function createPlayer({name, hp, img}) {
    const $divParent = createTag('div', `player${playerNumber()}`);
    const $divProgressbar = createTag('div', "progressbar ");
    const $divCharacter = createTag('div', "character ");
    const $divLite = createTag('div', 'life ', '', [["width", "100%"]]);
    const $img = createTag('img', '', '', '');
    $img.setAttribute('src', img);
    $divProgressbar.appendChild($divLite);
    $divProgressbar.appendChild(createTag('div', 'name ', name));
    $divCharacter.appendChild($img);
    $divParent.appendChild($divProgressbar);
    $divParent.appendChild($divCharacter);
    return $divParent;
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
