const words = ["CS Student.", "Problem Solver.", "Internship-Seeking."];
const typedEl = document.querySelector(".typed");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
    const currentWord = words[wordIndex];

    if (deleting){
        charIndex--;
    } else {
        charIndex++;
    }
    typedEl.textContent = currentWord.substring(0, charIndex);

    let speed = deleting ? 40 : 90;

    if (!deleting && charIndex === currentWord.length){
        speed = 1400;
        deleting = true;
    } else if (deleting && charIndex === 0){
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 300;
    }
    setTimeout(type, speed)
}

type();

document.getElementById("year").textContent = new Date().getFullYear();