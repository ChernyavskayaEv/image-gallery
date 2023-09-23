const wholescreen = document.querySelector('.wholescreen');
const playerScreensaver = document.querySelector('.player__screensaver');
const audioPlayer = document.querySelector('.player__control-block');
const songArtist = audioPlayer.querySelector('.song-artist');
const songTitle = audioPlayer.querySelector('.song-title');
const playPause = audioPlayer.querySelector('.play-pause');
const timeline = audioPlayer.querySelector('#timeline');
const currentTime = audioPlayer.querySelector('.current');
const lengthSong = audioPlayer.querySelector('.length');
const volume = audioPlayer.querySelector('.volume');
const volumeSlider = audioPlayer.querySelector('#volume-slider');

const trackList = [
  [
    'Beyonce',
    "Don't Hurt Yourself",
    './audio/beyonce.mp3',
    './img/lemonade.png',
  ],
  [
    'Dua Lipa',
    "Don't Start Now",
    './audio/dontstartnow.mp3',
    './img/dontstartnow.png',
  ],
  ['Miley Cyrus', 'Flowers', './audio/flowers.mp3', './img/flowers.png'],
  [
    'Billie Eilish',
    'Bellyache',
    './audio/bellyache.mp3',
    './img/bellyache.png',
  ],
];

let newVolume = 0.5;

const audio = new Audio();

let numberOfTrack = 0;
fillData(trackList[numberOfTrack]);

function fillData([artist, track, audioTrack, imgTrack]) {
  audio.src = audioTrack;
  songArtist.textContent = artist;
  songTitle.textContent = track;
  playerScreensaver.src = imgTrack;
  playerScreensaver.alt = `${artist}: ${track}`;
  wholescreen.style.backgroundImage = `url(${imgTrack})`;
}

audio.addEventListener(
  'loadeddata',
  () => {
    lengthSong.textContent = getTimeCodeFromNum(audio.duration);
    playPause.src = './img/play.png';
    audio.volume = newVolume;
    volumeSlider.value = newVolume * 100;
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
    newVolume = event.offsetX / parseInt(sliderWidth);
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
  if (event.target.classList.contains('previous-song')) {
    numberOfTrack === 0
      ? (numberOfTrack = trackList.length - 1)
      : numberOfTrack--;
    fillData(trackList[numberOfTrack]);
  }
  if (event.target.classList.contains('next-song')) {
    numberOfTrack === trackList.length - 1
      ? (numberOfTrack = 0)
      : numberOfTrack++;
    fillData(trackList[numberOfTrack]);
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
