import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

function saveTimeToLocalStorage(time) {
  localStorage.setItem('videoplayer-current-time', time);
}

function restoreTimeFromLocalStorage() {
  return localStorage.getItem('videoplayer-current-time') ?? 0;
}

player.on(
  'timeupdate',
  throttle(data => {
    saveTimeToLocalStorage(data.seconds);
  }, 1000) // save video timecode to Local Storage every second
);

player.setCurrentTime(restoreTimeFromLocalStorage());
