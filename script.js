const song = document.getElementById("audio");
const cover = document.getElementById("cover");
const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const play = document.getElementById("play");
const next = document.getElementById("next");
const previous = document.getElementById("previous");

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
  isPlaying = true;
  play.querySelector(".bi").classList.remove("bi-play-circle-fill");
  play.querySelector(".bi").classList.add("bi-pause-circle-fill");
  song.play();
}

function pauseSong() {
  isPlaying = false;
  play.querySelector(".bi").classList.remove("bi-pause-circle-fill");
  play.querySelector(".bi").classList.add("bi-play-circle-fill");
  song.pause();
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

initializeSong();


play.addEventListener("click", playPauseDecider);
previous.addEventListener("click", previousSong);
next.addEventListener("click", nextSong);
