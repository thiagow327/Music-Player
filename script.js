const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const song = document.getElementById("audio");
const cover = document.getElementById("cover");
const play = document.getElementById("play");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const currentProgress = document.getElementById("current-progress");
const progressContainer = document.getElementById("progress-container");
const shuffleButton = document.getElementById("shuffle");
const repeatButton = document.getElementById("repeat");
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');

const lofi = {
  songName: "Lofi and Coffee",
  file: "Lofi and Coffee",
  artist: "Jon J. Morin",
};
const jazz = {
  songName: "F. Juice",
  file: "F. Juice",
  artist: "Jazzfixie",
};
const rock = {
  songName: "Rock N Roll",
  file: "Rock N Roll",
  artist: "Shadow",
};

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
const originalPlaylist = [lofi, jazz, rock];
let sortedPlaylist = [...originalPlaylist];
let index = 0;

function playSong() {
  play.querySelector(".bi").classList.remove("bi-play-circle-fill");
  play.querySelector(".bi").classList.add("bi-pause-circle-fill");
  song.play();
  isPlaying = true;
}

function pauseSong() {
  play.querySelector(".bi").classList.remove("bi-pause-circle-fill");
  play.querySelector(".bi").classList.add("bi-play-circle-fill");
  song.pause();
  isPlaying = false;
}

function playPauseDecider() {
  if (isPlaying === true) {
    pauseSong();
  } else {
    playSong();
  }
}

function initializeSong() {
  songName.innerText = sortedPlaylist[index].songName;
  bandName.innerText = sortedPlaylist[index].artist;
  cover.src = `/images/${sortedPlaylist[index].file}.png`;
  song.src = `/songs/${sortedPlaylist[index].file}.mp3`;
}

function previousSong() {
  if (index === 0) {
    index = sortedPlaylist.length - 1;
  } else {
    index = index - 1;
  }
  initializeSong();
  playSong();
}

function nextSong() {
  if (index === sortedPlaylist.length - 1) {
    index = 0;
  } else {
    index = index + 1;
  }
  initializeSong();
  playSong();
}

function updateProgress() {
  const barwidth = (song.currentTime / song.duration) * 100;
  currentProgress.style.setProperty('--progress', `${barwidth}%`);
  songTime.innerText = toHHMMSS(song.currentTime);
}

function jumpTo(event) {
  const widht = progressContainer.clientWidth;
  const clickPosition = event.offsetX;
  const jumpToTime = (clickPosition / widht) * song.duration;
  song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray) {
  const size = preShuffleArray.length;
  let currentIndex = size - 1;
  while (currentIndex > 0) {
    let randomIndex = Math.floor(Math.random() * size);
    let aux = preShuffleArray[currentIndex];
    preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
    preShuffleArray[randomIndex] = aux;
    currentIndex -= 1;
  }
}

function shuffleButtonClicked() {
  if (isShuffled === false) {
    isShuffled = true;
    shuffleArray(sortedPlaylist);
    shuffleButton.classList.add("button-active");
  }
  else {
    isShuffled = false;
    sortedPlaylist = [...originalPlaylist];
    shuffleButton.classList.remove("button-active");
  }
}

function repeatButtonClicked() {
  if (repeatOn === false) {
    repeatOn = true;
    repeatButton.classList.add("button-active");
  } else {
    repeatOn = false;
    repeatButton.classList.remove("button-active");
  }
}

function nextOrRepeat() {
  if (repeatOn === false) {
    nextSong();
  } else {
    playSong();
  }
}

function toHHMMSS(originalNumber) {
  let hours = Math.floor(originalNumber / 3600);
  let min = Math.floor((originalNumber - hours * 3600) / 60);
  let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

  return (`${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
}

function updateTotalTime() {
  totalTime.innerText = toHHMMSS(song.duration);
}

initializeSong();

play.addEventListener("click", playPauseDecider);
previous.addEventListener("click", previousSong);
next.addEventListener("click", nextSong);
song.addEventListener("timeupdate", updateProgress);
song.addEventListener("ended", nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener("click", jumpTo);
shuffleButton.addEventListener("click", shuffleButtonClicked);
repeatButton.addEventListener("click", repeatButtonClicked);
