let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
    {
        name: "Chupulu Kalasina Subhavela",
        artist: "Ghantasala",
        image: "./images/song_1.jpeg",
        path: "./songs/song_1.mp3"
    },
    {
        name: "Jabilli Kosam Aakasamalle",
        artist: "S.P.Balasubrahmanyam",
        image: "./images/song_2.jpeg",
        path: "./songs/song_2.mp3"
    },
    {
        name: "Mere Samne Wali Khidki Mein",
        artist: "Kishore Kumar",
        image: "./images/song_3.jpeg",
        path: "./songs/song_3.mp3"
    },
    {
        name: "Deewana Hua Badal",
        artist: "Mohammed Rafi",
        image: "./images/song_4.jpeg",
        path: "./songs/song_4.mp3"
    },
    {
        name: "Kehna Ghalat Ghalat",
        artist: "Nusrat Fateh Ali Khan",
        image: "./images/song_5.jpeg",
        path: "./songs/song_5.mp3"
    }
];

function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();

    curr_track.src = track_list[track_index].path;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
    track_name.textContent = "Song: " + track_list[track_index].name;
    track_artist.textContent = "Artist: " + track_list[track_index].artist;
    now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

    updateTimer = setInterval(seekUpdate, 1000);
    curr_track.addEventListener("ended", nextTrack);

    random_bg_color();
}

function random_bg_color() {
    let colors = document.body.classList.contains('dark-mode') ? 
    ['#DC143C', '#C71585', '#FF8C00', '#483D8B', '#6B8E23', '#000080', '#A52A2A', '#FAEBD7'] :
    ['#FFFDD0', '#FA8072', '#FF00FF', '#32CD32', '#48D1CC', '#FFDEAD', '#20B2AA'];
    
    let randomIndex = Math.floor(Math.random() * colors.length);
    document.body.style.backgroundColor = colors[randomIndex];
}

function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    track_index++;
    if (track_index >= track_list.length) track_index = 0;
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    track_index--;
    if (track_index < 0) track_index = track_list.length - 1;
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekTo = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekTo;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
loadTrack(track_index);

document.getElementById("toggle-dark-mode").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    random_bg_color();
});
