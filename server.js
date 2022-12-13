const express = require('express');
const fs = require('fs');

const cors = require('cors');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr')
const path = require('path');

// let can = false;
// let downloaded = Promise.resolve(false);
// let last_and_up = [ ]


/// SERVEUR SSE : EVENEMENT ENVOYE PAR LE SERVEUR

run().catch(err => console.log(err));

async function run() {
  const app = express();
  app.use(express.static(path.join("./public")));
  app.use("/public", express.static("/public" + "/script"));

  app.get('/events', async function(req, res) {
    console.log('Got /events');
    res.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive'
    });
    res.flushHeaders();

    // Reconnection toutes les 10 secondes si la connection au serveur est perdue
    res.write('retry: 10000\n\n');
    let count = 0;

    while (true) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Emit', ++count);
      // Emit an SSE that contains the current 'count' as a string
      res.write(`data: ${count}\n\n`);
      // check()
  }
  });

  const index = fs.readFileSync('./public/main.html', 'utf8');
  app.get('/', (req, res) => res.send(index));

  await app.listen(4000);
  console.log('Connecté au port 4000');

  // function check() {
  //   if (can === true) {
  //     let stats = fs.statSync("./public/songs/song.mp3")
  //     let fileSizeInBytes = stats.size;
  //     let fileSizeInMegabytes = fileSizeInBytes / (1024*1024);
      
  //     last_and_up.push(fileSizeInMegabytes)

  //     console.log(fileSizeInMegabytes)
  //     console.log("last_and_up égale : " + last_and_up)
  //     if(last_and_up[0] === last_and_up[2]  && fileSizeInMegabytes !== 0) {
  //       console.log("téléchargé")
  //       downloaded = true;
  //       console.log("downloaded actuellement : " + downloaded)
  //       can = false
  //     } else {
  //       console.log("Pas téléchargé")
  //     }

  //     if(last_and_up.length == 3) {
  //       last_and_up.shift()
  //     }
  //   }
  // } 

/// SERVEUR SSE : EVENEMENT ENVOYE PAR LE SERVEUR

  app.get('/search', (req, res) => {
    // downloaded = false;
    // let currentpage = true;
    let songSearch = req.query.name;
    console.log(songSearch)
    console.log('demande reçu')
    // res.header('Content-Disposition', 'attachment; filename="song.mp3"');
    searching(songSearch)

    async function searching(name)  {
    
      const filters1 = await ytsr.getFilters(name);
      const filter1 = filters1.get('Type').get('Video');
      const searchResult = await ytsr(filter1.url)
  
      console.log(searchResult);
      console.log(`Résulat pour ${name} : ${searchResult.items[0].url} thumbnail : ${searchResult.items[0].thumbnails[0].url}`)
      convert(searchResult.items[0].url)
  }

    function convert(URL) {
      last_and_up = [ ]

        ytdl(URL, {
            format: 'mp3',
            filter: 'audioonly'
        }).on('info', (info) => {
          let musicTitle = info.videoDetails.title
          console.log(musicTitle)
          let jsonData = `{"first_song":[{"title":"${musicTitle}","url":"${URL}","file":"./songs/${songSearch}.mp3"}]}`
        let jsonObj = JSON.parse(jsonData)

        let jsonContent = JSON.stringify(jsonObj)
        fs.writeFile('./public/history.json', jsonContent, 'utf-8', function (err) {
        if (err) {
          console.log("Erreur avec le JSON")
        } else {
          console.log("C'est réussi")
        }})
        }).pipe(fs.createWriteStream(`./public/songs/`+ songSearch +`.mp3`))
        
        .on('finish', function(){
          res.redirect('back');
        })
      }

});

}
























































// app.use(cors());

// app.listen(4000, () => {
//     console.log('Connected. | Connecté.')
// });

// app.get('/download', (req, res) => {
//     let main_song = 1
//     console.log(main_song)
//     // Check if the song file is here

//     fs.readdir('./songs/', (err, files) => {
//       files.forEach(file => {
//         console.log(main_song)
//         console.log(file);
//         if (file == "song.mp3") {
//             let main_song = 1
//         } else {
//             let main_song = 0
//         }
//       });
//     });

//     let URL = req.query.URL;
//     ytdl.getInfo(URL)
//     // res.header('Content-Disposition', 'attachment; filename="song.mp3"');

//     if (main_song == 1) {
//         ytdl(URL, {
//             format: 'mp3'
//         }).pipe(fs.createWriteStream('./songs/next_song.mp3'));
//     }

//     if (main_song == 0) {
//         ytdl(URL, {
//             format: 'mp3'
//         }).pipe(fs.createWriteStream('./songs/song.mp3'));
//     }
// res.redirect()
// })

// let main_song = 0;
// let next_song = 0;
// Check if the song file is here

// fs.readdir('./public/songs/', (err, files) => {
//   files.forEach(file => {
//     if (file === "song.mp3") {
//         main_song = 1
//     } else {
//         main_song = 0
//     }
//     // if (file === "next_song.mp3") {
//     //   let next_song = 1
//     // } else {
//     //   let next_song = 0
//     // }
//     console.log("La valeur de main_song est : " + main_song)
//     console.log(file);
//   });
// });

// let URL = req.query.URL;
// ytdl.getInfo(URL)
/// res.header('Content-Disposition', 'attachment; filename="song.mp3"');

// if (main_song === 1) {
//   console.log("CANT")
// } else {
//   ytdl(URL, {
//     format: 'mp3'
//   }).pipe(fs.createWriteStream('./public/songs/song.mp3'));
// }
// // else {
//     if (next_song === 1) {
//       ytdl(URL, {
//         format: 'mp3'
//       }).pipe(fs.createWriteStream('./public/songs/previous_song.mp3'));
//     } else {
//       ytdl(URL, {
//         format: 'mp3'
//       }).pipe(fs.createWriteStream('./public/songs/next_song.mp3'));
//     }
