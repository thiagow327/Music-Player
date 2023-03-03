const song = document.getElementById('audio');
const play = document.getElementById('play');
const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');

songName.innerText = "Lofi and Coffe";
bandName.innerText = "Jon J.Morin"

function playSong() {
    song.play();
}

play.addEventListener('click', playSong);
