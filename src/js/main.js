"use strict";
const $arenas=document.querySelector('.arenas');
function createSpecificationsPlayer  (name,hp,img,weapon=[] ){
    return{name:""+name,
        hp:+hp,
        img:""+img,
        weapon,
        attack:()=>`${name} Fight...`}
}
function createTag(teg,Class='', text='',style=[]) {
    const $div=document.createElement(teg);
     if(Class!=='' && style!==[]) {
        $div.className=Class;

       style.forEach((item)=>{
           return $div.style[item[0]]=item[1];
       })

        $div.textContent=text
        return $div
    }

    return  $div;
}
const player1=createSpecificationsPlayer("Scorpion",100,"http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",["flamberg","bastard"]);
const player2=createSpecificationsPlayer("Kung Lao",70,"http://reactmarathon-api.herokuapp.com/assets/liukang.gif",["claymore"]);
function createPlayer(player,{name,hp,img}) {
    const $divParent=createTag('div',player);
    const $divProgressbar=createTag('div',"progressbar ");
    const $divCharacter=createTag('div',"character ");
    const $divLite=createTag('div','life ','',[["width","100%"]]);
    const $img =createTag('img','','','');
    $img.setAttribute('src',img);
    $divProgressbar.appendChild($divLite);
    $divProgressbar.appendChild(createTag('div','name ',name));
    $divCharacter.appendChild($img);
    $divParent.appendChild($divProgressbar);
    $divParent.appendChild($divCharacter);
    return $divParent;
}
$arenas.appendChild(createPlayer('player1',player1));
$arenas.appendChild(createPlayer('player2',player2));
