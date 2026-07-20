const groups={

"あ行":["あ","い","う","え","お"],
"か行":["か","き","く","け","こ"],
"さ行":["さ","し","す","せ","そ"],
"た行":["た","ち","つ","て","と"],
"な行":["な","に","ぬ","ね","の"],
"は行":["は","ひ","ふ","へ","ほ"],
"ま行":["ま","み","む","め","も"],
"や行":["や","ゆ","よ"],
"ら行":["ら","り","る","れ","ろ"],
"わ行":["わ","を","ん"]

};

groups["ぜんぶ"]=Object.values(groups).flat();

let list=groups["あ行"];

let answer="";
let score=0;

const left=document.getElementById("left");
const right=document.getElementById("right");
const result=document.getElementById("result");
const message=document.getElementById("message");
const scoreText=document.getElementById("score");

function speak(text){

const ut=new SpeechSynthesisUtterance(text);

ut.lang="ja-JP";

speechSynthesis.cancel();
speechSynthesis.speak(ut);

}

function randomQuestion(){

result.textContent="";

answer=list[Math.floor(Math.random()*list.length)];

let wrong;

do{

wrong=list[Math.floor(Math.random()*list.length)];

}while(wrong===answer);

let arr=[answer,wrong];

if(Math.random()<0.5){

arr.reverse();

}

left.textContent=arr[0];
right.textContent=arr[1];

message.textContent="";

setTimeout(()=>{

speak(answer+"わどっち？");

},500);

}

function check(btn){

if(btn.textContent===answer){

result.textContent="⭕";

score++;

scoreText.textContent=score+" / 10";

speak("せいかい");

if(score>=10){

message.textContent="10こできたね！😄";
return;
}

setTimeout(randomQuestion,1200);

}else{

result.textContent="❌";

speak("もういちど");

}

}

left.onclick=()=>check(left);
right.onclick=()=>check(right);

const area=document.getElementById("groups");

Object.keys(groups).forEach(name=>{

const b=document.createElement("button");

b.textContent=name;

b.onclick=()=>{

list=groups[name];

score=0;

scoreText.textContent="0 / 10";

randomQuestion();

};

area.appendChild(b);

});

randomQuestion();
