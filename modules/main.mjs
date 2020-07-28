import axios from 'axios';
import wiki from 'wikijs';
import config from '../config/config.json';

const getDates = 
    async function (songName, artistName) {
        var songNameArray = [songName.split(' ')];
        var headers = { 'Accept': 'application/json', 'authorization': `Bearer ${config.token}` };
        var songId = await axios.get(`https://api.genius.com/search?q=${songNameArray.join('%20')}`, { headers })
                .then(response => { return response.data.response.hits[0].result.id })
                .catch(error => { console.log(error) });
        var song = await axios.get(`https://api.genius.com/songs/${songId}`, { headers })
                .then(response => {
                    var date = response.data.response.song.release_date;
                    var result = { year: Number(date.slice(0, 4)), month: Number(date.slice(5, 7)), day: Number(date.slice(8, 10)) };
                    return result;
                }).catch(error => { console.log(error) });
        var person = await wiki({ apiUrl: 'https://en.wikipedia.org/w/api.php' }).page(artistName).then(page => page.info())
                .then(date => {
                    var birthday = new Date(date.birthDate.date);
                    var result = { year: birthday.getFullYear(), month: birthday.getMonth(), day: birthday.getDay() };
                    return result;
                }).catch(error => { console.log(error) });
        return { song, person };
    }

const count =   
    function (song, person) {
        if (song.month >= person.month && person.day <= song.day) {
            return console.log(song.year - person.year);
        } else {
            return console.log(song.year - person.year - 1);
        }
    }

exports.getDates = getDates;
exports.count = count;