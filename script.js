/* ==========================================
   GIRLFRIEND'S DAY WEBSITE
   PART 3A
========================================== */

// ----------------------------
// DOM ELEMENTS
// ----------------------------

const openBtn = document.getElementById("open");
const envelope = document.getElementById("envelope");
const typing = document.getElementById("typing");

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

const fireBtn = document.getElementById("fireworks");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const heartContainer = document.getElementById("heart-container");

// ----------------------------
// LOVE LETTER
// ----------------------------

const message = `Happy Girlfriend's Day ❤️

Thank you for being the most beautiful chapter of my life.

You are my peace.

My happiness.

My safe place.

Every smile of yours makes my world brighter.

Every hug feels like home.

I never knew someone could become my favourite person until I met you.

Thank you for loving me.

Thank you for understanding me.

Thank you for staying beside me.

No matter what happens...

I'll always choose you.

Forever ❤️


.`;

let index = 0;

// ----------------------------
// TYPEWRITER
// ----------------------------

function typeLetter(){

    if(index >= message.length) return;

    typing.innerHTML += message.charAt(index);

    index++;

    setTimeout(typeLetter,35);

}

// ----------------------------
// OPEN ENVELOPE
// ----------------------------

openBtn.addEventListener("click",()=>{

    openBtn.disabled = true;

    openBtn.innerHTML = "Opened ❤️";

    document.getElementById("letterSection").scrollIntoView({

        behavior:"smooth"

    });

    setTimeout(()=>{

        envelope.classList.add("open");

    },700);

    setTimeout(()=>{

        typing.innerHTML="";

        index=0;

        typeLetter();

    },1900);

});

// ----------------------------
// MUSIC
// ----------------------------

let playing=false;

musicBtn.addEventListener("click",()=>{

    if(!playing){

        music.play().catch(()=>{});

        playing=true;

        musicBtn.innerHTML='<i class="fa-solid fa-pause"></i>';

    }else{

        music.pause();

        playing=false;

        musicBtn.innerHTML='<i class="fa-solid fa-music"></i>';

    }

});
/* ==========================================
   PART 3B
   BACKGROUND EFFECTS
========================================== */

// ----------------------------
// CANVAS
// ----------------------------

function resizeCanvas(){

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize",resizeCanvas);

// ----------------------------
// STARS
// ----------------------------

const stars=[];

for(let i=0;i<220;i++){

    stars.push({

        x:Math.random()*canvas.width,

        y:Math.random()*canvas.height,

        r:Math.random()*2,

        alpha:Math.random(),

        speed:.2+Math.random()*.3

    });

}

function animateStars(){

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

    requestAnimationFrame(animateStars);

}

animateStars();

// ----------------------------
// FLOATING HEARTS
// ----------------------------

function createHeart(){

    const heart=document.createElement("div");

    heart.innerHTML="❤️";

    heart.className="heart";

    heart.style.position="absolute";

    heart.style.left=Math.random()*100+"vw";

    heart.style.bottom="-50px";

    heart.style.fontSize=(15+Math.random()*25)+"px";

    heart.style.opacity=.8;

    heart.style.transition="10s linear";

    heartContainer.appendChild(heart);

    setTimeout(()=>{

        heart.style.transform="translateY(-120vh)";

        heart.style.opacity=0;

    },50);

    setTimeout(()=>{

        heart.remove();

    },10000);

}

setInterval(createHeart,1000);

// ----------------------------
// ROSE
// ----------------------------

const rose=document.querySelector(".rose");

let angle=0;

setInterval(()=>{

    angle+=2;

    rose.style.transform=

    `rotate(${Math.sin(angle/20)*6}deg)
     scale(${1+Math.sin(angle/30)*0.05})`;

},40);

// ----------------------------
// SPARKLES
// ----------------------------

function sparkle(){

    const star=document.createElement("div");

    star.innerHTML="✨";

    star.style.position="fixed";

    star.style.left=Math.random()*window.innerWidth+"px";

    star.style.top=Math.random()*window.innerHeight+"px";

    star.style.fontSize=(10+Math.random()*15)+"px";

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
/* ==========================================
   PART 3C
   FINAL EFFECTS
========================================== */

// ----------------------------
// FIREWORKS
// ----------------------------

fireBtn.addEventListener("click",()=>{

    for(let i=0;i<180;i++){

        const particle=document.createElement("div");

        particle.innerHTML="✨";

        particle.style.position="fixed";

        particle.style.left="50%";

        particle.style.top="50%";

        particle.style.pointerEvents="none";

        particle.style.fontSize=(10+Math.random()*18)+"px";

        particle.style.transition="all 2s ease-out";

        particle.style.zIndex="99999";

        document.body.appendChild(particle);

        const angle=Math.random()*Math.PI*2;

        const distance=200+Math.random()*350;

        setTimeout(()=>{

            particle.style.transform=
            `translate(${Math.cos(angle)*distance}px,
            ${Math.sin(angle)*distance}px)
            rotate(${Math.random()*720}deg)`;

            particle.style.opacity=0;

        },20);

        setTimeout(()=>{

            particle.remove();

        },2200);

    }

});

// ----------------------------
// GALLERY HOVER
// ----------------------------

document.querySelectorAll(".photos img").forEach(img=>{

    img.addEventListener("mouseenter",()=>{

        img.style.transform="scale(1.05) rotate(1deg)";

    });

    img.addEventListener("mouseleave",()=>{

        img.style.transform="scale(1)";

    });

});

// ----------------------------
// HERO FLOATING
// ----------------------------

const heroTitle=document.querySelector(".hero h1");

let heroFloat=0;

setInterval(()=>{

    heroFloat+=2;

    heroTitle.style.transform=
    `translateY(${Math.sin(heroFloat/20)*8}px)`;

},40);

// ----------------------------
// BUTTON GLOW
// ----------------------------

document.querySelectorAll("button").forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.style.boxShadow="0 0 35px rgba(255,80,160,.6)";

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.boxShadow="none";

    });

});

// ----------------------------
// TYPING CURSOR
// ----------------------------

let cursor=true;

setInterval(()=>{

    typing.style.borderRight=

    cursor?"2px solid hotpink":"none";

    cursor=!cursor;

},500);

/* ==========================================
   CURSOR HEART TRAIL
========================================== */

let lastCursorHeart = 0;

document.addEventListener("mousemove", (e) => {

    if (Date.now() - lastCursorHeart < 40) return;
    lastCursorHeart = Date.now();

    const heart = document.createElement("div");

    heart.className = "cursor-heart";

    heart.style.left = e.clientX + "px";
    heart.style.top = e.clientY + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 900);

});

// ----------------------------
// CONSOLE MESSAGE
// ----------------------------

console.log("%cHappy Girlfriend's Day ❤️",
"font-size:28px;color:#ff4d94;font-weight:bold;");

console.log("%cMade with love ❤️",
"font-size:18px;color:pink;");
