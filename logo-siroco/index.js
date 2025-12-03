 
let isotipo = document.getElementById("isotipo");
let grupo = document.getElementById("grupo");
let siroco = document.getElementById("siroco");


const tl = gsap.timeline();

tl.from(isotipo, {
  opacity: 0,
  duration: 1,
  scale: 0.5,
  rotation: 90,
  transformOrigin: "center center",
  ease: "circ.out",
});

tl.from(grupo, {
  opacity: 0,
  duration: 1,
  x: -12,
  ease: "circ.out",
}, "-=0.4");

tl.from(siroco, {
  opacity: 0,
  duration: 1,
  x: -12,
  ease: "circ.out",
}, "-=0.9");