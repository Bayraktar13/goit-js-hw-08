// import Player from '@vimeo/player';
// import { throttle } from 'lodash';

// const player = new Player(document.getElementById('vimeo-player'));

// // Событие "timeupdate" отслеживает обновление времени воспроизведения
// player.on(
//   'timeupdate',
//   throttle(async () => {
//     const currentTime = await player.getCurrentTime();
//     localStorage.setItem('videoplayer-current-time', currentTime.toString());
//   }, 1000)
// );

// // При загрузке страницы проверяем, есть ли сохраненные данные и устанавливаем время воспроизведения на плеере
// window.addEventListener('DOMContentLoaded', async () => {
//   const savedTime = localStorage.getItem('videoplayer-current-time');
//   if (savedTime) {
//     const currentTime = parseFloat(savedTime);
//     if (!isNaN(currentTime)) {
//       try {
//         await player.setCurrentTime(currentTime);
//       } catch (error) {
//         console.error('Failed to set player current time:', error);
//       }
//     }
//   }
// });

import Player from '@vimeo/player';
import { throttle } from 'lodash';

const player = new Player(document.getElementById('vimeo-player'));

// Событие "timeupdate" отслеживает обновление времени воспроизведения
player.on(
  'timeupdate',
  throttle(() => {
    player
      .getCurrentTime()
      .then(currentTime => {
        localStorage.setItem(
          'videoplayer-current-time',
          currentTime.toString()
        );
      })
      .catch(error => {
        console.error('Failed to get current time:', error);
      });
  }, 1000)
);

// При загрузке страницы проверяем, есть ли сохраненные данные и устанавливаем время воспроизведения на плеере
window.addEventListener('DOMContentLoaded', () => {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    const currentTime = parseFloat(savedTime);
    if (!isNaN(currentTime)) {
      player.setCurrentTime(currentTime).catch(error => {
        console.error('Failed to set player current time:', error);
      });
    }
  }
});
