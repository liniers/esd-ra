// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);

// INTERACCIÓN AUDIOS 

// Seleccionar model viewer y hotspots
const modelViewer = document.getElementById('model-viewer');
let hotspot = document.querySelectorAll('.Hotspot');

const azul = hotspot[0];
const rojo = hotspot[1];
const naranja = hotspot[2];
const negro = hotspot[3];
const amarillo = hotspot[4];
const verdeClaro = hotspot[5];
const verdeOscuro = hotspot[6];
const azulMarino = hotspot[7];
const Blanco = hotspot[8];
const Morado = hotspot[9];

let azul01 = new Audio('assets/audios/AZUL.mp3')
let rojo01 = new Audio('assets/audios/ROJO.mp3')
let naranja01 = new Audio('assets/audios/NARANJA.mp3')
let negro01 = new Audio('assets/audios/NEGRO.mp3')
let amarillo01 = new Audio('assets/audios/AMARILLO.mp3')
let verdeClaro01 = new Audio('assets/audios/ALLO+VERDE.mp3')
let verdeOscuro01 = new Audio('assets/audios/VERDE OSC.mp3')
let azulMarino01 = new Audio('assets/audios/MARINO.mp3')
let blanco01 = new Audio('assets/audios/BLANCO.mp3')
let morado01 = new Audio('assets/audios/MORADO.mp3')

// Array con todos los audios
const allAudios = [azul01, rojo01, naranja01, negro01, amarillo01, verdeClaro01, verdeOscuro01, azulMarino01, blanco01, morado01];

// Función para detener todos los audios
function stopAllAudios() {
  allAudios.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
}

// Función para reproducir un audio específico
function playAudio(audio) {
  stopAllAudios();
  audio.currentTime = 0;
  audio.volume = 0.1;
  audio.loop = false;
  audio.play();
}

azul.addEventListener('click', () => {
  playAudio(azul01);
});

rojo.addEventListener('click', () => {
  playAudio(rojo01);
});

naranja.addEventListener('click', () => {
  playAudio(naranja01);
});

negro.addEventListener('click', () => {
  playAudio(negro01);
});

amarillo.addEventListener('click', () => {
  playAudio(amarillo01);
});

verdeClaro.addEventListener('click', () => {
  playAudio(verdeClaro01);
});

verdeOscuro.addEventListener('click', () => {
  playAudio(verdeOscuro01);
});

azulMarino.addEventListener('click', () => {
  const annotation = azulMarino.querySelector('.HotspotAnnotation');
  const extraContent = azulMarino.querySelector('.Hotspot-extra-content');
  
  // Si no está expandido, expandir con GSAP
  if (window.getComputedStyle(extraContent).display === 'none') {
    playAudio(azulMarino01);
    
    // Primero mostrar el elemento
    extraContent.style.display = 'block';
    
    // Animación GSAP para expandir
    const tl = gsap.timeline();
    tl.to(annotation, {
      maxWidth: 400,
      padding: '1em 1.5em',
      duration: 0.4,
      ease: 'power2.out'
    })
    .fromTo(extraContent, {
      height: 0,
      opacity: 0
    }, {
      height: 'auto',
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, 0.1); 
  }
});

// Añadir evento al botón de cerrar del azul marino
const closeButtonMarino = azulMarino.querySelector('.Hotspot-close');
if (closeButtonMarino) {
  closeButtonMarino.addEventListener('click', (e) => {
    e.stopPropagation(); // Evitar que se dispare el click del hotspot
    const annotation = azulMarino.querySelector('.HotspotAnnotation');
    const extraContent = azulMarino.querySelector('.Hotspot-extra-content');
    
    // Animación GSAP para colapsar
    const tl = gsap.timeline({
      onComplete: () => {
        extraContent.style.display = 'none';
        stopAllAudios();
      }
    });
    tl.to(extraContent, {
      height: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    })
    .to(annotation, {
      maxWidth: 300,
      padding: '0.5em 1em',
      duration: 0.3,
      ease: 'power2.in'
    }, '-=0.15');
  });
}

Blanco.addEventListener('click', () => {
  playAudio(blanco01);
});

Morado.addEventListener('click', () => {
  playAudio(morado01);
});


// Cambiar color del modelo 3D
const modelViewerColor = document.querySelector("model-viewer#modelo");

document.querySelector('#color-controls').addEventListener('click', (event) => {
  
  console.log(modelViewerColor.model.materials);
  
  const colorString = event.target.dataset.color;
  const material = modelViewerColor.model.materials;
  
  //material[3].pbrMetallicRoughness.setBaseColorFactor(colorString);

  material.forEach((material) => {
    material.pbrMetallicRoughness.setBaseColorFactor(colorString);
  });

});


/*
// Particle System

window.onload = function(){
        // Creating the Canvas
        var canvas = document.createElement("canvas"), 
            c = canvas.getContext("2d"),
            particles = {},
            particleIndex = 0,
            particleNum = 0.1;
        
        canvas.width = window.innerWidth;
        canvas.height = 1600;
        canvas.id = "motion";
        document.body.appendChild(canvas);
        // Finished Creating Canvas
        
        // Setting color which is just one big square
        c.fillStyle = "black";
        c.fillRect(0,0,canvas.width,canvas.height);
        // Finished Color
        var y_fourth = Math.floor(canvas.height / 6);
        var y_second_fourth = Math.floor(y_fourth * 2);

        function Particle(){
            var random_x = Math.floor(Math.random() * (0)) + 1;
            var random_y = Math.floor(Math.random() * y_second_fourth + y_fourth) + 1;
            this.x = random_x;
            this.y = random_y;
            this.vx = Math.random() * 5 - 2;
            this.vy = Math.random() * 2 - 1;
            this.gravity = 0;
            particleIndex++;
            particles[particleIndex] = this;
            this.id = particleIndex;
            this.size = Math.random() * 6 - 2;
            this.color = "hsla(0,0%,"+parseInt(Math.random()*100, 0)+"%,1)";
            this.color2 = "hsla(360,100%,"+parseInt(Math.random()*100, 0)+"%,1)";
            this.color3 = "hsla(210,100%,"+parseInt(Math.random()*100, 0)+"%,1)";
            this.color_selector = Math.random() * 150 - 1;

        }
       
        Particle.prototype.draw = function(){
			this.x += this.vx;
			this.y += this.vy;
			this.vy += this.gravity;
			if(this.x > canvas.width || this.y > canvas.height){
				delete particles[this.id];
			}
			
			if(this.color_selector < 30 && this.color_selector > 10){
				c.fillStyle = this.color2;
			} else if(this.color_selector < 10) {
				c.fillStyle = this.color3;
			} else {
				c.fillStyle = this.color;
			}
			c.fillRect(this.x, this.y, this.size, this.size);
		};
        
        setInterval(function(){
            c.fillStyle = "black";
            c.fillRect(0,0,canvas.width,canvas.height);
            for (var i = 0; i < particleNum; i++){
                new Particle();
            }
            for(var i in particles){
                particles[i].draw();
            }
        }, 30);
    };*/