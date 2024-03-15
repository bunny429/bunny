// let div = document.querySelector("div");
// let ul = document.querySelector("ul");
// let lis = document.querySelectorAll("li");

// div.addEventListener("click",function () {
//     console.log("Div was clicked");
// })
// ul.addEventListener("click",function (event) {
//     event.stopPropagation();
//     console.log("ul was clicked");
// })
// for (li of lis) {
//     li.addEventListener("click",function (event) {
//         event.stopPropagation();
//         console.log("li was clicked");
//     })
// }

// 1

// to do list

// let inp = document.querySelector("input");
// let btn = document.querySelector("button");
// let ul = document.querySelector("ul");

// btn.addEventListener("click",function (){
//     let item = document.createElement("li");
//     item.innerText = inp.value;
//     ul.appendChild(item);

//     let delBtn = document.createElement("button");
//     delBtn.innerText= "Delete";
//     delBtn.classList.add("del");
//     item.appendChild(delBtn);
//     // console.log(inp.value);
//     inp.value="";
// })

// let de = document.querySelectorAll(".del");
// for (d of de) {
//     d.addEventListener("click",function () {
//         let par = this.parentElement;
//         par.remove();
//     })
// }

// Event delegation

// ul.addEventListener("click",function (event) {
//     if (event.target.nodeName=="BUTTON" ){
//         let pa = event.target.parentElement;
//         pa.remove();
//     }
// })2

let gameSeq = [];
let userSeq = [];
let btns = ["yellow","red","green","blue"];

let started = false;
let level = 0;
let score = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress",function (){
    if (started==false){
        console.log("Game Started!!");
        started=true;

        levelUp();
    }
})

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    },250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText= `LEVEL ${level}`;

    let index = Math.floor(Math.random()*3);
    let randColor = btns[index];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randBtn);
    console.log(gameSeq);
}

let allBtns = document.querySelectorAll(".btn");

function checkAns(inx){
    if (gameSeq[inx]==userSeq[inx]) {
        score += 1;
        if (gameSeq.length==userSeq.length) {
            setTimeout(levelUp,1000);
        }
    } else {
        h2.innerText=`Game OVER!, Your SCORE:${score}\npress any key to continue...`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function () {document.querySelector("body").style.backgroundColor="white"},200);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    let inx = userSeq.length-1;
    checkAns(inx);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash")
    },250);
}

for (btn of allBtns) {
    btn.addEventListener("click",btnPress);
}

function reset() {
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
    score = 0;
}