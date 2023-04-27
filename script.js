const play = document.querySelectorAll('.song .fa-play')
let pauseBtn = document.querySelectorAll('.song .fa-circle-pause')
const footerPlay = document.querySelectorAll('footer .fa-play')[0]
const footerPause = document.querySelectorAll('footer .fa-circle-pause')[0]
const songs = document.querySelectorAll('.song')
let player = document.querySelectorAll('.player')[0]
let songPlay = document.querySelectorAll('.player .song-name')[0]
let gif = document.querySelectorAll('.song-play img')[0]
let prev = document.querySelectorAll('.fa-backward-step')[0]
let next = document.querySelectorAll('.fa-forward-step')[0]
let duration = document.querySelectorAll('.duration p')
let progressBar = document.querySelectorAll("#progress-bar")[0]
let time = document.querySelectorAll('.time')[0]

let songIndex;
let audio;
let active = 0;
let currentTim = 0;

// ==================================================================

// functions
// to play audio
function playAudio(num) {
    audio = new Audio(`./${num + 1}.mp3`)
    audio.play()
    if(songIndex == num) {
        audio.currentTime =  currentTim;
    }
    songIndex = num;
    songPlay.innerHTML = songs[num].children[1].innerText
    songs[num].children[1].style = `font-weight: 600`
    songs[num].classList.add('play')
    pauseBtn[num].style = `display: block;`
    play[num].style = `display: none;`
    player.children[1].style = `display: flex;`
    footerPause.style = `display: block`
    footerPlay.style = `display: none`
    gif.classList.remove('vanish-img')
    songPlay.style = 'transform: translateX(0px)'
    time.style = 'transform: translateX(0px)'
    audio.addEventListener('timeupdate', () => {
        let songPosition = parseInt(Math.floor(audio.currentTime / audio.duration * 1000))
        progressBar.value = songPosition;
        time.innerText  = secodnToMinute(Math.floor(audio.currentTime))
        duration[songIndex].innerHTML = secodnToMinute(Math.floor(audio.currentTime))
        currentTim =  audio.currentTime;
        if(audio.currentTime == audio.duration) {
            pauseAudio(songIndex);
            nextSong(songIndex);
        }
    })
    active = 1;
}

// to pause audio
function pauseAudio(num) {
    audio.pause()
    songs[num].classList.remove('play')
    pauseBtn[num].style = `display: none;`
    play[num].style = `display: block;`
    footerPause.style = `display: none`
    footerPlay.style = `display: block`
    gif.classList.add('vanish-img')
    songPlay.style = 'transform: translateX(-33px)'
    time.style = 'transform: translateX(-33px)'
    songs[num].children[1].style = `font-weight: 400`
    active = 0;
}

// to play next song
function nextSong(songIndex) {
    currentTim = 0;
    playAudio(songIndex + 1)
}

// to play previous song
function prevSong() {
    currentTim = 0;
    playAudio(songIndex - 1)
}

// to convert the seconds in the formate of minute and seconds (01:30)
function secodnToMinute(seconds) {
    for (let minute = 0; true; minute++) {
        if (seconds >= 60) {
            seconds = seconds - 60;
        } else {
            if (seconds >= 10) {
                return `${minute}:${seconds}`
            }
            else return `${minute} : 0${seconds}`
        }
    }
}

// ======================================================================

// event listener for playing song
let position = 1;
for (let i = 0; i < play.length; i++) {

    // hover effect when hovered on any song
    songs[i].addEventListener('mouseenter', () => {
        songs[i].classList.add('s-hover')
    })
    songs[i].addEventListener('mouseleave', () => {
        songs[i].classList.remove('s-hover')
    })

    // playing song when clicked on any song container
    songs[i].addEventListener('click', (e) => {
        try {
            pauseAudio(songIndex)
        }
        catch (err) {
            console.log(err)
        }
        if(position == 1) {
            playAudio(i)
            position = 0;
        } else {
            pauseAudio(i)
            position = 1;
        }
        if(i != songIndex) {
            playAudio(i)
            position = 10
        }
    })
}

// event listener for pausing the song
// for (let i = 0; i < pauseBtn.length; i++) {
//     pauseBtn[i].addEventListener('click', () => {
//         pauseAudio(i)
//     })
// }

// footer play amd pause button

footerPlay.addEventListener('click', () => {
    footerPause.style = `display: block`
    footerPlay.style = `display: none`
    if (audio == undefined) {
        playAudio(0)
    } else {
        playAudio(songIndex)
    }
})

footerPause.addEventListener("click", () => {
    footerPause.style = `display: none`
    footerPlay.style = `display: block`
    pauseAudio(songIndex)
})


// footer prev and next button

let count = 0;
count++;

next.addEventListener('click', () => {
    try {
        pauseAudio(songIndex)
    }
    catch (err) {
        console.log(err)
    }
    if (songIndex == undefined) playAudio(0)
    else if (songIndex == songs.length - 1) {
        songIndex = 0;
        playAudio(songIndex)
    }
    else nextSong(songIndex)
})

prev.addEventListener('click', () => {
    try {
        pauseAudio(songIndex)
    }
    catch (err) {
        console.log(err)
    }
    if (songIndex == undefined) playAudio(songs.length - 1)
    else if (songIndex == 0) {
        songIndex = songs.length - 1;
        playAudio(songIndex)
    }
    else prevSong(songIndex)
})


// arrow right, arrow left and space keys to play, pause and switch the songs

window.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) {
        if (active == 0) {
            footerPause.style = `display: block`
            footerPlay.style = `display: none`
            if (audio == undefined) {
                playAudio(0)
            } else {
                playAudio(songIndex)
            }
        }
        else {
            footerPause.style = `display: none`
            footerPlay.style = `display: block`
            pauseAudio(songIndex)
        }
    }
    else if (e.keyCode === 39) {
        try {
            pauseAudio(songIndex)
        }
        catch (err) {
            console.log(err)
        }
        if (songIndex == undefined) playAudio(0)
        else if (songIndex == songs.length - 1) {
            songIndex = 0;
            playAudio(songIndex)
        }
        else nextSong(songIndex)
    }
    else if (e.keyCode === 37) {
        try {
            pauseAudio(songIndex)
        }
        catch (err) {
            console.log(err)
        }
        if (songIndex == undefined) playAudio(songs.length - 1)
        else if (songIndex == 0) {
            songIndex = songs.length - 1;
            playAudio(songIndex)
        }
        else prevSong(songIndex)
    }
})

progressBar.addEventListener('change', () => {
    audio.currentTime = (progressBar.value / 1000) * audio.duration
})
