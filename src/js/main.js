"use strict";
function createPlayer  (name,hp,img,weapon=[] ){

    return{name:""+name,
        hp:+hp,
        img:""+img,
        weapon,
        attack:()=>`${name} Fight...`}

}
const player1=createPlayer("Scorpion",100,"http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",["flamberg","bastard"]);
const player2=createPlayer("Kung Lao",70,"http://reactmarathon-api.herokuapp.com/assets/liukang.gif",["claymore"]);