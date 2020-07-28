import { getDates, count  } from './modules/main.mjs';

function countAge(song, name) {
    let result = getDates(song, name);
    result.then(r => { 
        var song = r.song;
        var person = r.person;
        count(song, person);
     });
}

countAge('Hot n Cold', 'Katy Perry');