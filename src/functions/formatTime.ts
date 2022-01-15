export const formatTime = (secondsTotal: number): string => {
  const hours = Math.floor(secondsTotal / 3600);
  const minutes = Math.floor((secondsTotal - hours * 3600) / 60);
  const seconds = secondsTotal - hours * 3600 - minutes * 60;

  let hoursText = hours.toString().padStart(2, '0');
  hoursText = hoursText === '00' ? '' : `${hoursText}:`;

  const minutesText = minutes.toString().padStart(2, '0');
  const secondsText = seconds.toString().padStart(2, '0');

  return `${hoursText}${minutesText}:${secondsText}`;
};

export const getElapsedTime = (
  currentTime: number,
  duration: number
): string => {
  let elapsed = currentTime;

  if (!duration) {
    return '';
  }

  if (elapsed > duration) {
    elapsed = duration;
  }

  return formatTime(elapsed);
};

export function getTimePercentage(elapsed: number, duration: number): number {
  if (!duration) {
    return 0;
  }
  if (elapsed > duration) {
    return 100;
  }

  return (elapsed / duration) * 100;
}

// time_percent(np_elapsed) {
//   let totalTime = this.np.now_playing.duration;

//   if (!totalTime) {
//     return 0;
//   }
//   if (np_elapsed > totalTime) {
//     return 100;
//   }

//   return (np_elapsed / totalTime) * 100;
// }
// iterateTimer() {
//   let current_time = Math.floor(Date.now() / 1000);
//   let np_elapsed = current_time - this.np.now_playing.played_at;

//   if (np_elapsed < 0) {
//     np_elapsed = 0;
//   } else if (np_elapsed >= this.np.now_playing.duration) {
//     np_elapsed = this.np.now_playing.duration;
//   }

//   this.displayElapsed = this.time_display_played(np_elapsed);
//   this.displayProgress = this.time_percent(np_elapsed);
// },
// formatTime(time) {
//   let secondsTotal = parseInt(time, 10);

//   let hours = Math.floor(secondsTotal / 3600);
//   let minutes = Math.floor((secondsTotal - hours * 3600) / 60);
//   let seconds = secondsTotal - hours * 3600 - minutes * 60;

//   if (hours < 10) {
//     hours = '0' + hours;
//   }
//   if (minutes < 10) {
//     minutes = '0' + minutes;
//   }
//   if (seconds < 10) {
//     seconds = '0' + seconds;
//   }
//   return (hours !== '00' ? hours + ':' : '') + minutes + ':' + seconds;
// },
