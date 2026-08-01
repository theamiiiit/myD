/* ==========================================
   PREMIUM GIRLFRIEND'S DAY WEBSITE
   Part 1
========================================== */

// -------------------------
// DOM Elements
// -------------------------

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

const openBtn = document.getElementById("open");
const envelope = document.querySelector(".envelope");

const typing = document.getElementById("typing");

const heartContainer = document.getElementById("heart-container");

const canvas = document.getElementById("canvas");
const ctx = canvas ? canvas.getContext("2d") : null;


// GSAP loads from an external CDN in index.html. If that request is ever
// blocked or slow (ad-blockers, restricted networks, offline previews),
// `gsap`/`ScrollTrigger` won't exist. These flags let every GSAP call below
// be skipped safely instead of throwing and killing the rest of the script.
const hasGSAP = typeof window.gsap !== "undefined";
const hasScrollTrigger = hasGSAP && typeof window.ScrollTrigger !== "undefined";
if(hasScrollTrigger){ gsap.registerPlugin(ScrollTrigger); }

// -------------------------
// Resize Canvas
// -------------------------

function resizeCanvas(){

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

// =========================================
// STARS
// =========================================

let stars = [];

for(let i=0;i<220;i++){

    stars.push({

        x:Math.random()*canvas.width,

        y:Math.random()*canvas.height,

        r:Math.random()*2,

        alpha:Math.random(),

        speed:.1+Math.random()*.4

    });

}

// =========================================
// DRAW STARS
// =========================================

function drawStars(){
    if(!ctx) return;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    stars.forEach(star=>{

        ctx.beginPath();

        ctx.arc(star.x,star.y,star.r,0,Math.PI*2);

        ctx.fillStyle="rgba(255,255,255,"+star.alpha+")";

        ctx.fill();

        star.alpha += (Math.random()-.5)*0.02;

        if(star.alpha<0.2) star.alpha=.2;

        if(star.alpha>1) star.alpha=1;

    });

    requestAnimationFrame(drawStars);

}

drawStars();

// =========================================
// FLOATING HEARTS
// =========================================

function createHeart(){

    const heart=document.createElement("div");

    heart.className="heart";

    heart.innerHTML="❤️";

    heart.style.left=Math.random()*100+"vw";

    heart.style.fontSize=(15+Math.random()*35)+"px";

    heart.style.animationDuration=(6+Math.random()*6)+"s";

    heartContainer.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },12000);

}

setInterval(createHeart,1200);

// =========================================
// MUSIC BUTTON
// =========================================

let playing=false;

// music.mp3 isn't bundled in this project — drop your own audio file named
// music.mp3 into the same folder. If it's missing or fails to load, hide
// the button instead of leaving a control that silently does nothing.
music.addEventListener("error",()=>{

    musicBtn.style.display="none";

});

musicBtn.onclick=()=>{

    if(!playing){

        music.play().catch(()=>{});

        playing=true;

        musicBtn.innerHTML='<i class="fa-solid fa-pause"></i>';

    }

    else{

        music.pause();

        playing=false;

        musicBtn.innerHTML='<i class="fa-solid fa-music"></i>';

    }

};

// =========================================
// LOVE LETTER
// =========================================

const message=`Happy Girlfriend's Day ❤️

Thank you for being the most beautiful chapter of my life.

You are my peace.

My happiness.

My safe place.

Every smile of yours makes my world brighter.

Every hug feels like home.

I never knew someone could become my favorite person until I met you.

Thank you for staying beside me.

Thank you for understanding me.

Thank you for loving me.

No matter what happens...

I'll always choose you.

I'll always stand beside you.

Forever.

❤️ Happy Girlfriend's Day, My Love ❤️`;

let index=0;

// =========================================
// TYPEWRITER
// =========================================

function typeLetter(){

    if(index<message.length){

        typing.innerHTML+=message.charAt(index);

        index++;

        setTimeout(typeLetter,35);

    }

}

// =========================================
// ENVELOPE OPEN
// =========================================

openBtn.addEventListener("click", () => {

    // Prevent double click
    openBtn.disabled = true;

    openBtn.innerHTML = "Opening... ❤️";

    // Scroll to the letter
    document.getElementById("letterSection").scrollIntoView({
        behavior: "smooth"
    });

    // Open envelope
    setTimeout(() => {

        envelope.classList.add("open");

    }, 600);

    // Start typing after animation
    setTimeout(() => {

        openBtn.innerHTML = "Opened ❤️";

        typing.innerHTML = "";
        index = 0;

        typeLetter();

    }, 2200);

});
// =========================================
// HERO ANIMATION
// =========================================

if(hasGSAP){

gsap.from(".hero h1",{

    opacity:0,

    y:80,

    duration:1,

    clearProps:"all"

});

gsap.from(".hero p",{

    y:60,

    opacity:0,

    delay:.5,

    duration:1

});

gsap.from(".hero button",{

    scale:0,

    opacity:0,

    delay:1,

    duration:1

});

}

/* ==========================================
   PART 2
   Premium Effects
========================================== */

// ==========================
// Cursor Heart Trail
// ==========================

let lastHeart = 0;

document.addEventListener("mousemove",(e)=>{

    if(Date.now()-lastHeart<40) return;

    lastHeart=Date.now();

    const heart=document.createElement("div");

    heart.innerHTML="❤";

    heart.style.position="fixed";

    heart.style.left=e.clientX+"px";

    heart.style.top=e.clientY+"px";

    heart.style.pointerEvents="none";

    heart.style.color="#ff4d94";

    heart.style.fontSize=(10+Math.random()*15)+"px";

    heart.style.zIndex="9999";

    heart.style.transition="all 1.2s linear";

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.style.opacity=0;

        heart.style.transform="translateY(-60px) scale(2) rotate("
            +(Math.random()*360)+"deg)";

    },20);

    setTimeout(()=>{

        heart.remove();

    },1200);

});

// ==========================
// Gallery Hover Animation
// ==========================

const photos=document.querySelectorAll(".photos img");

photos.forEach(photo=>{

    photo.addEventListener("mouseenter",()=>{

        if(hasGSAP){

        gsap.to(photo,{

            scale:1.08,

            rotate:2,

            duration:.4

        });

        }

    });

    photo.addEventListener("mouseleave",()=>{

        if(hasGSAP){

        gsap.to(photo,{

            scale:1,

            rotate:0,

            duration:.4

        });

        }

    });

});

// ==========================
// Scroll Animations
// ==========================

if(hasScrollTrigger){

// gsap.utils.toArray("section").forEach(sec=>{

//     gsap.from(sec,{

//         opacity:0,

//         y:100,

//         duration:1,

//         scrollTrigger:{

//             trigger:sec,

//             start:"top 80%"

//         }

//     });

// });

}

// ==========================
// Rose Animation
// ==========================

const rose=document.querySelector(".rose");

let angle=0;

setInterval(()=>{

    angle+=2;

    rose.style.transform=

    "rotate("+Math.sin(angle/20)*8+"deg) scale("+

    (1+Math.sin(angle/30)*0.05)+")";

},40);

// ==========================
// Sparkle Particles
// ==========================

function sparkle(){

    const star=document.createElement("div");

    star.innerHTML="✨";

    star.style.position="fixed";

    star.style.left=Math.random()*window.innerWidth+"px";

    star.style.top=Math.random()*window.innerHeight+"px";

    star.style.fontSize=(10+Math.random()*20)+"px";

    star.style.opacity=.9;

    star.style.pointerEvents="none";

    star.style.transition="2s";

    document.body.appendChild(star);

    setTimeout(()=>{

        star.style.opacity=0;

        star.style.transform="translateY(-80px)";

    },50);

    setTimeout(()=>{

        star.remove();

    },2000);

}

setInterval(sparkle,1500);

// ==========================
// Button Glow
// ==========================

const buttons=document.querySelectorAll("button");

buttons.forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        if(hasGSAP){

        gsap.to(btn,{

            boxShadow:"0 0 45px hotpink",

            duration:.3

        });

        }

    });

    btn.addEventListener("mouseleave",()=>{

        if(hasGSAP){

        gsap.to(btn,{

            boxShadow:"0 0 0px hotpink",

            duration:.3

        });

        }

    });

});

// ==========================
// Typing Cursor Blink
// ==========================

let cursor = true;

setInterval(() => {
    document.getElementById("typing").style.borderRight =
        cursor ? "2px solid white" : "none";
    cursor = !cursor;
}, 500);

// ==========================
// Floating Love Words
// ==========================

const words=[

"Love ❤️",

"Forever",

"You & Me",

"Always",

"My Girl",

"My Happiness",

"Beautiful"

];

function floatingWord(){

    const w=document.createElement("div");

    w.innerText=

    words[Math.floor(Math.random()*words.length)];

    w.style.position="fixed";

    w.style.left=Math.random()*window.innerWidth+"px";

    w.style.top=(window.innerHeight+50)+"px";

    w.style.color="#ffc1da";

    w.style.fontSize=(16+Math.random()*10)+"px";

    w.style.pointerEvents="none";

    w.style.transition="8s linear";

    w.style.opacity=.8;

    document.body.appendChild(w);

    setTimeout(()=>{

        w.style.transform="translateY(-120vh)";

        w.style.opacity=0;

    },20);

    setTimeout(()=>{

        w.remove();

    },8000);

}

setInterval(floatingWord,4000);

/* ==========================================
   PART 3
   Final Premium Effects
========================================== */

// =========================================
// Fireworks
// =========================================

const fireBtn = document.getElementById("fireworks");

fireBtn.addEventListener("click", () => {

    for (let i = 0; i < 180; i++) {

        let particle = document.createElement("div");

        particle.innerHTML = "✨";

        particle.style.position = "fixed";

        particle.style.left = "50%";

        particle.style.top = "50%";

        particle.style.pointerEvents = "none";

        particle.style.fontSize = (12 + Math.random() * 18) + "px";

        particle.style.zIndex = "99999";

        particle.style.transition = "all 2s ease-out";

        document.body.appendChild(particle);

        let angle = Math.random() * Math.PI * 2;

        let distance = 200 + Math.random() * 400;

        setTimeout(() => {

            particle.style.transform =
                `translate(${Math.cos(angle) * distance}px,
                ${Math.sin(angle) * distance}px)
                rotate(${Math.random() * 720}deg)`;

            particle.style.opacity = 0;

        }, 20);

        setTimeout(() => {

            particle.remove();

        }, 2200);

    }

});

// =========================================
// Heart Rain
// =========================================

function heartRain() {

    const heart = document.createElement("div");

    heart.innerHTML = "💖";

    heart.style.position = "fixed";

    heart.style.left = Math.random() * window.innerWidth + "px";

    heart.style.top = "-50px";

    heart.style.fontSize = (20 + Math.random() * 25) + "px";

    heart.style.pointerEvents = "none";

    heart.style.transition = "10s linear";

    heart.style.zIndex = "999";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.style.transform =
            `translateY(${window.innerHeight + 150}px)
             rotate(${Math.random() * 720}deg)`;

    }, 20);

    setTimeout(() => {

        heart.remove();

    }, 10000);

}

setInterval(heartRain, 1800);

// =========================================
// Floating Glow Circles
// =========================================

function glowCircle() {

    const circle = document.createElement("div");

    circle.style.position = "fixed";

    circle.style.width = (50 + Math.random() * 120) + "px";

    circle.style.height = circle.style.width;

    circle.style.borderRadius = "50%";

    circle.style.background = "rgba(255,70,150,.12)";

    circle.style.filter = "blur(25px)";

    circle.style.left = Math.random() * window.innerWidth + "px";

    circle.style.top = Math.random() * window.innerHeight + "px";

    circle.style.pointerEvents = "none";

    circle.style.transition = "5s";

    document.body.appendChild(circle);

    setTimeout(() => {

        circle.style.opacity = "0";

        circle.style.transform = "scale(2)";

    }, 100);

    setTimeout(() => {

        circle.remove();

    }, 5000);

}

setInterval(glowCircle, 2500);

// =========================================
// Floating Title Animation
// =========================================

if(hasGSAP){

gsap.to(".hero h1", {

    y: -12,

    repeat: -1,

    yoyo: true,

    duration: 2,

    ease: "sine.inOut"

});

}

// =========================================
// Letter Glow
// =========================================

if(hasGSAP){

gsap.to(".letter", {

    boxShadow: "0 0 45px rgba(255,80,160,.5)",

    repeat: -1,

    yoyo: true,

    duration: 2

});

}

// =========================================
// Gallery Fade In
// =========================================

if(hasScrollTrigger){

gsap.from(".photos img", {

    opacity: 0,

    scale: 0.8,

    duration: 1,

    stagger: 0.25,

    immediateRender: false,

    scrollTrigger: {

        trigger: ".gallery",

        start: "top 80%",

        once: true

    }

});

}

// =========================================
// Final Message Pulse
// =========================================

if(hasGSAP){

gsap.to(".final h1", {

    scale: 1.05,

    repeat: -1,

    yoyo: true,

    duration: 1.8

});

}

// =========================================
// Console Message ❤️
// =========================================

console.log("%cHappy Girlfriend's Day ❤️",
"color:#ff4d94;font-size:26px;font-weight:bold;");

console.log("%cMade with ❤️ just for her.",
"color:pink;font-size:18px;");
