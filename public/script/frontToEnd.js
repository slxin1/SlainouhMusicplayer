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