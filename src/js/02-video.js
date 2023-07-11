import Player from '@vimeo/player';
import { throttle } from 'lodash';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
player.on('play', function () {
  console.log('Воспроизведение началось');
});

player.on('pause', function () {
  console.log('Воспроизведение приостановлено');
});

player.on(
  'timeupdate',
  throttle(function (data) {
    console.log(data.seconds);
    localStorage.setItem('videoplayer-current-time', data.seconds);
  }),
  1000
);

const theme = localStorage.getItem('videoplayer-current-time') || 0;
console.log(theme);

player.setCurrentTime(theme);
