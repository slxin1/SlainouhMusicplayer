// Variables
const button_play = document.getElementById("play")
const button_skip = document.getElementById("skip")
const button_previous = document.getElementById("previous")
let song_name = document.getElementById("namesong")
let playlist = ["playlist"] 
let song_played = ["song_played"]

let sound = new Audio()
let number = 0
let can = 0

// Prevent

// Actions 
button_play.addEventListener('click', btnplay);
button_skip.addEventListener('click', btnskip);
button_previous.addEventListener('click', btnprevious);
// sound.addEventListener('ended', btnskip);


// Fonctions
function nameSong() {
    fetch('../history.json')
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        song_name.innerHTML = (json.first_song[0].title)
        playlist.push(json.first_song[0].file)
        if(playlist[1] == song_played[1]) {
            console.log("Pas possible")
        } else {
            console.log('Possible.')
            song_played.push(json.first_song[0].file)
            console.log(playlist[1])
            sound = new Audio(playlist[1])
        }
    });
}



function initialisation() {
    sound.pause()
    sound.currentTime = 0;
}
function btnplay() {
    if (button_play.value === 'Play') {

        sound.play()
        button_play.value = "Pause";
        document.getElementById('play').style.backgroundImage="url(src/icon/white_pause.png)"
        nameSong();
    } else {                                        //              BOUTON PLAY - PAUSE 
        button_play.value = "Play";
        sound.pause();
        document.getElementById('play').style.backgroundImage="url(src/icon/white-play-button.png)"
    }
}

function btnskip() {
    initialisation();
    //if (sound === playlist[0]) {
        //sound = new Audio(playlist[1])
        //sound.play();
        //console.log(playlist)
    //} else {                                              version pas très fonctionnelle.
        //sound = new Audio(playlist[0])
        //sound.play();
        //console.log(playlist)
    //}
    if (number == playlist.length) {
        button_play.value = "Play";
        number = 0
        can = 0
        console.log(can)
    } else {
        can = 1
        console.log(can)
        ++number
    }

    sound = new Audio(playlist[number])                     // BOUTON SKIP - Fonctionnel.
    sound.play();

    // if (can == 1) {
    //     sound.play();
    // } else if(can == 0) {
    //     sound.pause();
    // }

    button_play.value = "Pause";
    document.getElementById('play').style.backgroundImage="url(src/icon/white-pause.png)"
    console.log(number)
    }


function btnprevious() {
    initialisation();
    // sound = new Audio(playlist[1])
    // sound.play();                            // Ancienne Version - non fonctionnelle.
    // console.log(sound)
    if (number == 0) {
        number = playlist.length
        sound.play()
    } else {                                    // BOUTON RETOUR - Fonctionnel.
        number -= 1
        sound = new Audio(playlist[number])
        sound.play()
    }
    button_play.value = "Pause";
    document.getElementById('play').style.backgroundImage="url(src/icon/white-pause.png)"
}

// const button_play = document.getElementById("play")
// button_play.addEventListener('click', btnplay);
// let song = new Audio("./songs/song.mp3")

// function btnplay() {
//     var playPromise = song.play();
//     // In browsers that don’t yet support this functionality,
//     // playPromise won’t be defined.
//     if (playPromise !== undefined) {
//     playPromise.then(function() {
//       // Automatic playback started!
//     }).catch(function(error) {
//       // Automatic playback failed.
//       // Show a UI element to let the user manually start playback.
//     });
//   }
// }

