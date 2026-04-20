let q=[
["راتبك وصل؟",["ادخار","صرف"],0],
["سيارة تعطلت؟",["طوارئ","دين"],0],
["تخفيضات؟",["احتياج","شراء"],0],
["هدف مالي؟",["ابدأ","أؤجل"],0],
["مرض؟",["تأمين","مشكلة"],0],
["دخل إضافي؟",["ادخار","صرف"],0],
["نهاية السنة؟",["مراجعة","إهمال"],0]
];

let i=0;
let score=0;

/* ENTER GAME + MUSIC */
function enterGame(){
document.getElementById("intro").style.display="none";
document.getElementById("game").style.display="block";

startMusic(); // 🎵
load();
}

/* MUSIC */
let musicCtx;
function startMusic(){
musicCtx = new AudioContext();

setInterval(()=>{
let o = musicCtx.createOscillator();
let g = musicCtx.createGain();

o.type="triangle";
o.frequency.value = 220 + Math.random()*400;

g.gain.value = 0.03;

o.connect(g);
g.connect(musicCtx.destination);

o.start();
o.stop(musicCtx.currentTime+0.15);

},300);
}

/* SOUND FX */
function sound(ok){
let ctx=new AudioContext();
let o=ctx.createOscillator();
let g=ctx.createGain();

o.frequency.value=ok?700:200;
g.gain.value=0.05;

o.connect(g);
g.connect(ctx.destination);

o.start();
o.stop(ctx.currentTime+0.1);
}

/* SHAKE */
function shake(){
document.body.style.transform="translateX(5px)";
setTimeout(()=>document.body.style.transform="translateX(-5px)",50);
setTimeout(()=>document.body.style.transform="translateX(0)",100);
}

/* PARTICLES */
function particles(x,y){
for(let i=0;i<10;i++){
let p=document.createElement("div");
p.className="particle";

p.style.left=x+"px";
p.style.top=y+"px";

p.style.setProperty("--x",(Math.random()*120-60)+"px");
p.style.setProperty("--y",(Math.random()*120-60)+"px");

document.getElementById("world").appendChild(p);

setTimeout(()=>p.remove(),800);
}
}

/* LOAD */
function load(){
if(i>=q.length){
win();
return;
}

document.getElementById("q").innerText=q[i][0];

let o=document.getElementById("opts");
o.innerHTML="";

q[i][1].forEach((t,ix)=>{
let b=document.createElement("button");
b.innerText=t;
b.onclick=(e)=>pick(ix,e);
o.appendChild(b);
});

spawnCoin();
}

/* COIN */
function spawnCoin(){
let c=document.getElementById("coin");
c.style.left=(10+i*12)+"%";
c.style.bottom="45%";
}

/* PICK */
function pick(x,e){

let rect=e.target.getBoundingClientRect();

if(x===q[i][2]){
score+=10;
sound(true);
particles(rect.left,rect.top);
}else{
score-=5;
sound(false);
shake();
}

document.getElementById("score").innerText=score;

i++;
document.getElementById("character").style.left=(5+i*12)+"%";

transition();
load();
}

/* TRANSITION */
function transition(){
let w=document.getElementById("world");
w.style.opacity="0.5";
setTimeout(()=>w.style.opacity="1",200);
}

/* WIN */
function win(){
document.getElementById("win").style.display="flex";

document.getElementById("win").innerHTML=
"🏆 بطل مالي!<br>النقاط: "+score+
"<br><button onclick='location.reload()'>إعادة</button>";
}
