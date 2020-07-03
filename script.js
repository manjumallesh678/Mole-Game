let score = 0;

function getStatus(){
    return Date.now() + 1000;
}
function getGoneInterval(){
    return Date.now() + Math.floor(Math.random() * 18000) + 2000;
}
function getHungryStatus(){
    return Date.now() + Math.floor(Math.random() * 3000) + 2000;
}
const moles = [
    {
        status: "sad",
        next: getStatus(),
        king: false,
        node: document.getElementById("hole-0") 
    },
    {
        status: "sad",
        next: getStatus(),
        king: false,
        node: document.getElementById("hole-1") 
    },
    {
        status: "sad",
        next: getStatus(),
        king: false,
        node: document.getElementById("hole-2") 
    },
    {
        status: "sad",
        next: getStatus(),
        king: false,
        node: document.getElementById("hole-3") 
    },
    {
        status: "sad",
        next: getStatus(),
        king: false,
        node: document.getElementById("hole-4") 
    },
    {
        status: "sad",
        next: getStatus(),
        king: false,
        node: document.getElementById("hole-5") 
    },
    {
        status: "sad",
        next: getStatus(),
        king: false,
        node: document.getElementById("hole-6") 
    },
    {
        status: "sad",
        next: getStatus(),
        king: false,
        node: document.getElementById("hole-7") 
    },
    {
        status: "sad",
        next: getStatus(),
        king: false,
        node: document.getElementById("hole-8") 
    },
    {
        status: "sad",
        next: getStatus(),
        king: false,
        node: document.getElementById("hole-9") 
    },
];
function getNextStatus(moles){
    switch(moles.status){
        case "sad":
        case "fed":
            moles.next = getStatus();
           // moles.king = getKingStatus();
            moles.status = "leaving";
            if(moles.king){
                moles.node.children[0].src = "./img/king-mole-leaving.png"; 
            }
            else{
                moles.node.children[0].src = "./img/mole-leaving.png"; 
            }
            break;
        case "leaving":
            moles.next = getGoneInterval();
           // moles.king = getKingStatus();
            moles.status = "gone";

            moles.node.children[0].classList.add("gone");
            break;
        case "gone":
            moles.status = "hungry";
            moles.king = getKingStatus();
            moles.next = getHungryStatus();
            moles.node.children[0].classList.add("hungry");
            if(moles.king){
                moles.node.children[0].src = "./img/king-mole-hungry.png";
                moles.node.children[0].classList.remove("gone");
            }
            else{
                moles.node.children[0].src = "./img/mole-hungry.png";
                moles.node.children[0].classList.remove("gone");
            }
            break;
        case "hungry":
            moles.status = "sad";
            //moles.king = getKingStatus();
            moles.node.children[0].classList.remove("hungry");
            moles.next = getStatus();
            if(moles.king){
                moles.node.children[0].src = "./img/king-mole-sad.png";
            }
            else{
                moles.node.children[0].src = "./img/mole-sad.png";
            }
            break;
    }
}

function getKingStatus(){
    return Math.random() > 0.9;
}

function feed(event){

    if(event.target.tagName !== "IMG" || !event.target.classList.contains("hungry")){
        return;
    }

    const mole = moles[parseInt(event.target.dataset.index)];
    mole.status = "fed";
    mole.next = getStatus();
    //mole.king = getKingStatus();
   if(mole.king){
    mole.node.childNodes[0].src = "./img/king-mole-fed.png";
    mole.node.childNodes[0].classList.remove("hungry");
    score += 2;
   }
   else{
    mole.node.childNodes[0].src = "./img/mole-fed.png";
    mole.node.childNodes[0].classList.remove("hungry");
    score++;
   }
    if(score >= 10){
        win();
    }
    document.querySelector(".worm-container").style.width = `${10 * score}%`;

}
function win(){
    document.querySelector(".bg").classList.add("hide");
    document.querySelector(".win").classList.remove("hide");
}
let runAgains = Date.now() + 100;
function nextFrame  (){
    const now = Date.now();
    if(runAgains <= now){
        for(let i = 0; i < moles.length; i++){
            if(moles[i].next <= now){
                getNextStatus(moles[i]);
            }
        }
        runAgains = 100 + now;
    }
    requestAnimationFrame(nextFrame);
    
}
document.querySelector(".bg").addEventListener("click",feed);
nextFrame();