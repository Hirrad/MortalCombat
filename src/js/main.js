"use strict";
const $arenas = document.querySelector('.arenas');
const $buttonRandom = document.querySelector('.random');

// рандомизатор
function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
//CreateSpecificationsPlayer создает персонажей, если будем создавать персонажей больше 2, про проще написать массив с
// параметрами, а потом скормить его этой функции.
//remnantsOfLife-сколько здоровья осталось, почему и hp и remnantsOfLife, для того чтобы считать
// процентное соотношение от первоначального
function CreateSpecificationsPlayer(name, hp, img, weapon = []) {
    this.name = "" + name;
    this.hp = +hp;
    this.img = "" + img;
    this.weapon = weapon;
    this.alive = true;
    this.remnantsOfLife = +hp

    this.changeHP = (hit) => {
        this.remnantsOfLife = this.remnantsOfLife - hit
        if (this.remnantsOfLife <= 0) {
            this.alive = false;
            this.remnantsOfLife = 0;
            return;
        }
        return this.remnantsOfLife;
    };
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

//создаю 2 персонажей, в дальнейшем они будут создаватся по клику на персонажа на экране.
const player1 = new CreateSpecificationsPlayer("Scorpion", 100, "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif", ["flamberg", "bastard"]);
const player2 = new CreateSpecificationsPlayer("Kung Lao", 70, "http://reactmarathon-api.herokuapp.com/assets/liukang.gif", ["claymore"]);
// добавил вручную эти параметры так как, они нужны только для опрелеление позицияи персонажа, а это в дальнейшем будет выбиратся на экране
player1.player = 1
player2.player = 2

function createPlayer({name, img, player}) {
    const $divParent = createTag('div', `player${player}`);
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

function fightPlayer({hp, remnantsOfLife, player, changeHP, alive, name}) {
    changeHP(randomInteger(5, 15))
    const hpPlayer = document.querySelector(`.player${player} .life`);
    hpPlayer.style.width = `${Math.round(remnantsOfLife * 100 / hp)}%`;
    console.log(`${name}  ${Math.round(remnantsOfLife * 100 / hp)}%`);
    if (!alive) {
        $buttonRandom.setAttribute("disabled", true);
        hpPlayer.style.width = `${Math.round(remnantsOfLife * 100 / hp)}%`;
        return hpPlayer.style.width === '0%' ? false : true;
        // такой возврат пришлось сделать, так как не додумался синхронизоровать даные которые отдает обьект, на одно
        // действие отстает
    }

}
$buttonRandom.addEventListener('click', (e) => {
    $buttonRandom.textContent = 'Random';
    // вышел таким спосбом, все равно if будет прогонять обе функции для сравнения, как толко получит false значит
    // кто то проиграл
    if (fightPlayer(player1) !== fightPlayer(player2)) {
        const $playerWin = document.createElement('div');
        $playerWin.classList.add('loseTitle')
        $playerWin.textContent = `${player1.alive ? player1.name : player2.name} Выграл!`;
        $arenas.appendChild($playerWin);
    }

})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
