const playerScreensaver = document.querySelector('.player__screensaver');
const audioPlayer = document.querySelector('.player__control-block');
const previousSong = audioPlayer.querySelector('.previous-song');
const playPause = audioPlayer.querySelector('.play-pause');
const nextSong = audioPlayer.querySelector('.next-song');
const timeline = audioPlayer.querySelector('#timeline');
const currentTime = audioPlayer.querySelector('.current');
const lengthSong = audioPlayer.querySelector('.length');
const volume = audioPlayer.querySelector('.volume');
const volumeSlider = audioPlayer.querySelector('#volume-slider');

const audio = new Audio();
audio.src = './audio/beyonce.mp3';
console.log(audio);

audio.addEventListener(
  'loadeddata',
  () => {
    lengthSong.textContent = getTimeCodeFromNum(audio.duration);
    audio.volume = 0.5;
    playPause.src = './img/play.png';
    volumeSlider.value = 50;
    timeline.value = 0;
  },
  false
);

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

audioPlayer.addEventListener('click', (event) => {
  if (event.target.classList.contains('timeline')) {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek =
      (event.offsetX / parseInt(timelineWidth)) * audio.duration;
    audio.currentTime = timeToSeek;
  }
  if (event.target.classList.contains('volume-slider')) {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    let newVolume = event.offsetX / parseInt(sliderWidth);
    if (newVolume > 1) {
      newVolume = 1;
      volume.src = './img/volume.png';
    } else if (newVolume < 0) {
      newVolume = 0;
      volume.src = './img/no-volume.png';
    } else {
      volume.src = './img/volume.png';
    }
    audio.volume = newVolume;
    volumeSlider.value = newVolume * 100;
  }
  if (event.target.classList.contains('play-pause')) {
    if (audio.paused) {
      playPause.src = './img/pause.png';
      playerScreensaver.style.transform = 'scale(1.2)';
      audio.play();
    } else {
      playPause.src = './img/play.png';
      playerScreensaver.style.transform = 'scale(1)';
      audio.pause();
    }
  }
});

let intervalPlayer = setInterval(() => {
  timeline.value = (audio.currentTime / audio.duration) * 100;
  currentTime.textContent = getTimeCodeFromNum(audio.currentTime);
}, 100);

audio.addEventListener(
  'ended',
  () => {
    playPause.src = './img/play.png';
    playerScreensaver.style.transform = 'scale(1)';
    clearInterval(intervalPlayer);
    timeline.value = 0;
    currentTime.textContent = getTimeCodeFromNum(0);
  },
  false
);
