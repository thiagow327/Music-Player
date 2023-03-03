const song = document.getElementById('audio');
const play = document.getElementById('play');
const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');

let isPlaying = false;

songName.innerText = "Lofi and Coffe";
bandName.innerText = "Jon J.Morin"


function playSong() {
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong() {
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecider(){
    if(isPlaying == true){
        pauseSong();
    }
    else {
        playSong();
    }
}

play.addEventListener('click', playPauseDecider);
