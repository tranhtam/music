const song = document.getElementById("song");
const playBtn = document.querySelector(".play-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTimer = document.querySelector(".duration");
const remainingTimer = document.querySelector(".remaining");
const rangeBar = document.querySelector(".range");
let isPlaying = true;
let indexSong = 0;
const musics = ["chiecdenongsao.mp3", "matnai.mp3", "phuongbuon.mp3"];
displayTimer();
let timer = setInterval(displayTimer, 500);
song.setAttribute("src", `./music/${musics[indexSong]}`);

nextBtn.addEventListener("click", function(){
    changeSong(1);
});

prevBtn.addEventListener("click", function(){
    changeSong(-1);
});
song.addEventListener("ended", handleEndedSong);
function handleEndedSong(){
    changeSong(1);
}
function changeSong(dir){
    if (dir === 1){
        indexSong ++;
        if (indexSong >= musics.length){
            indexSong = 0;
        }
        isPlaying = true;
    }else if(dir === -1){
        indexSong--;
        if(indexSong < 0){
            indexSong = musics.length - 1;
        }
        isPlaying = true;
    }
    song.setAttribute("src", `./music/${musics[indexSong]}`);
    playPause();
}

playBtn.addEventListener("click", playPause);
function playPause(){
    if (isPlaying){
        song.play();
        playBtn.innerHTML = `<ion-icon name="pause"></ion-icon>`;
        isPlaying = false;
        timer = setInterval(displayTimer, 500);
    } else {
        song.pause();
        playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
        isPlaying = true;
        clearInterval(timer);
    }
}

function displayTimer(){
    const {duration, currentTime} = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    remainingTimer.textContent = formatTimer(currentTime);
    if(! duration){
        durationTimer.textContent = "00:00";
    } else {
        durationTimer.textContent = formatTimer(duration);//duration tính ra giây
    }
}

function formatTimer(number){
    const minutes = Math.floor(number / 60); // floor làm tròn 
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? '0' + minutes: minutes}:${
        seconds < 10 ? '0' + seconds: seconds}`;
}

rangeBar.addEventListener("change", handleChangeBar);
function handleChangeBar (){
    song.currentTime = rangeBar.value;
}