let convert_button = document.getElementById('convert-button');
let URLinput = document.getElementById('input-URL');

convert_button.addEventListener('click', () => {
    console.log(`URL: ${URLinput.value}`)
    search(URLinput.value);
    return false;
});

// function prevent() {
//     event.preventDefault();
// }

function search(name) {
    window.location.href = `http://localhost:4000/search?name=${name}`;
}

/* Set the width of the side navigation to 250px */
let nav = document.getElementById("sidebar");

nav.addEventListener("mouseover", function( event ) {
  document.getElementById("sidebar").style.paddingRight = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.getElementById("skip").style.left = "240px";
  document.getElementById("play").style.left = "115px";
  document.getElementById("previous").style.left = "0px";
  document.getElementById("song_played").style.width = "300px";
  document.getElementById("player_cover").style.left = "2%";
  document.getElementById("user").style.left = "15%";
  document.getElementById("namesong").style.display = "block";
  document.getElementById("namesong").style.left = "5%";
})

nav.addEventListener("mouseout", function( event ) {
  document.getElementById("sidebar").style.paddingRight= "0px";
  document.getElementById("main").style.marginLeft = "0px";
  document.getElementById("skip").style.left = "-2%";
  document.getElementById("play").style.left = "-2%";
  document.getElementById("previous").style.left = "-2%";
  document.getElementById("player_cover").style.left = "0px";
  document.getElementById("song_played").style.width = "80px";
  document.getElementById("user").style.left = "2%";
  document.getElementById("namesong").style.left = "0%";
  document.getElementById("namesong").style.display = "none";
})


  
  /* Set the width of the side navigation to 0 */
