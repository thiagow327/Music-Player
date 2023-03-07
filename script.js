const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const song = document.getElementById("audio");
const cover = document.getElementById("cover");
const play = document.getElementById("play");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const currentProgress = document.getElementById("current-progress");
const progressContainer = document.getElementById("progress-container");


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
const playlist = [lofi, jazz, rock];
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
  songName.innerText = playlist[index].songName;
  bandName.innerText = playlist[index].artist;
  cover.src = `/images/${playlist[index].file}.png`;
  song.src = `/songs/${playlist[index].file}.mp3`;
}

function previousSong() {
  if (index === 0) {
    index = playlist.length - 1;
  } else {
    index = index - 1;
  }
  initializeSong();
  playSong();
}

function nextSong() {
  if (index === playlist.length - 1) {
    index = 0;
  } else {
    index = index + 1;
  }
  initializeSong();
  playSong();
}

function updateProgressBar() {
  const barwidth = (song.currentTime / song.duration) * 100;
  currentProgress.style.setProperty('--progress', `${barwidth}%`);
}

function jumpTo(event) {
  const widht = progressContainer.clientWidth;
  const clickPosition = event.offsetX;
  const jumpToTime = (clickPosition / widht) * song.duration;
  song.currentTime = jumpToTime;
}

initializeSong();


play.addEventListener("click", playPauseDecider);
previous.addEventListener("click", previousSong);
next.addEventListener("click", nextSong);
song.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", jumpTo);
