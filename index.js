// burger open and close
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
function toggleBurger() {
  if (nav.classList.contains("open")) {
    nav.className = "nav";
  } else {
    nav.className = "nav open";
  }
}
burger.addEventListener("click", () => {
  toggleBurger();
});


const lidiv = document.querySelectorAll(".li");
const planetName = document.querySelectorAll(".planet-name");
const types = document.querySelectorAll(".types");

// fetch data 
const title = document.querySelector(".h3");
const text = document.querySelector(".text");
const facts = document.querySelectorAll(".data");
const planetImage = document.querySelector(".planet-image");
const geology  = document.querySelector(".geology");
const link = document.querySelector(".link")

const url = "https://planets-api.vercel.app/api/v1/planets";
async function getData(number, type) {
  const res = await fetch(url);
  const data = await res.json();
  const name = data[number].name;
  const rotation = data[number].rotation;
  const revulution = data[number].revolution;
  const radius = data[number].radius;
  const temperature = data[number].temperature;
  const planet = data[number].images.planet;
  const planetInternal = data[number].images.internal;
  const surface = data[number].images.geology
  title.innerHTML = name;
  facts[0].innerHTML = rotation
  facts[1].innerHTML = revulution
  facts[2].innerHTML = radius
  facts[3].innerHTML = temperature
  const colorHover = data[number].color;
  line[0].style.backgroundColor = colorHover
  line[1].style.backgroundColor = colorHover
  line[2].style.backgroundColor = colorHover
  line[3].style.backgroundColor = colorHover
  line[4].style.backgroundColor = colorHover
  line[5].style.backgroundColor = colorHover
  line[6].style.backgroundColor = colorHover
  line[7].style.backgroundColor = colorHover


  if(type == 0){
    text.innerHTML = data[number].overview.content
    planetImage.src = planet;
    geology.style.display = "none"
    link.href = data[number].overview.source
  }
  if(type == 1){
    text.innerHTML = data[number].structure.content
    planetImage.src = planetInternal;
    geology.style.display = "none"
    link.href = data[number].structure.source
  }
  if(type == 2){
    text.innerHTML = data[number].geology.content
    planetImage.src = planet;
    geology.style.display = "inline"
    geology.src = surface
    link.href = data[number].geology.source
  }
  }


// set defaults
let hasRun = false;
let color = "";
function runCodeOnce() {
  if (!hasRun) {
    planetName[0].classList = "planet-name white";
    types[0].classList = "types MERCURY";
    color = "MERCURY"
    getData(0, 0);
    hasRun = true;
  }
}

runCodeOnce();

function choosePlanet(i){
  if (planetName[i].classList.contains("white")) {
  } else {
    planetName[i].classList = "planet-name white";
    number = i
    color = planetName[i].textContent.toLocaleUpperCase();
    getData(number, type)
  }
  for (let k = 0; k < planetName.length; k++) {
    if (
      planetName[k].classList.contains("white") &&
      planetName[k] !== planetName[i]
    ) {
      planetName[k].classList = "planet-name";
    }
  }
}
// choose planets
const line = document.querySelectorAll(".hover-line");
const mediaQuery = window.matchMedia("(max-width: 767px)");
let number = 0
let type = 0
for (let i = 0; i < lidiv.length; i++) {
  lidiv[i].addEventListener("click", () => {
    type = 0
    choosePlanet(i)
    typesChoice(0)
    if(mediaQuery.matches){
    toggleBurger();
    }
    types[1].classList = "types";
    types[2].classList = "types";
  });
}

// choose information


function typesChoice(num){
  if (types[num].classList.contains(color)) {
  } else {
    types[num].classList = "types" + " " + color
  }
  for (let k = 0; k < types.length; k++) {
    if (
      types[k].classList.contains(color) &&
      types[k] !== types[num]
    ) {
      types[k].classList = "types";
    }
  }
}

for (let i = 0; i < types.length; i++) {
  types[i].addEventListener("click", () => {
     type = i
     typesChoice(i)
     getData(number, type)
  });
}
