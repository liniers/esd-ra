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


// Seleccionar model viewer

const modelViewer = document.getElementById('model-viewer');

let hotspot = document.querySelectorAll('.Hotspot');

let sound1 = new Audio('assets/audios/BLANCO.mp3')

hotspot[0].addEventListener('click', () => {
  sound1.play();
  sound1.currentTime = 0; // se puede empezar desde otro punto
  sound1.volume = 0.1;
  sound1.loop = false;
});