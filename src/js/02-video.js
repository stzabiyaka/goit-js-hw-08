import Player from '@vimeo/player';

const throttle = require('lodash.throttle');

const LOCALSTORAGE_KEY = "videoplayer-current-time";

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

initPlayerStartTime();

player.on('timeupdate', throttle(updateLocalStorage, 1000));

function updateLocalStorage () {
    player.getCurrentTime().then(function(seconds) {    
        localStorage.setItem(LOCALSTORAGE_KEY, seconds);
    }).catch(function(error) {
        console.log('Error occured:', error.name);
    });
}

function initPlayerStartTime () {
    const localStorageValue = localStorage.getItem(LOCALSTORAGE_KEY);

    if (!localStorageValue) {
        return;
    }

        player.setCurrentTime(localStorageValue).then(function(seconds) {}).catch(function(error) {
            switch (error.name) {
                case 'RangeError':
                    console.log('The time was less than 0 or greater than the video’s duration');
                    break;
        
                default:
                    console.log('Error occured:', error.name);
                    break;
            }
        });
    }
