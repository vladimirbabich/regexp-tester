export class TimeFormatController {
  getModifiedTimeSpent(time: string | number) {
    const timeSpent = new Date(
      (typeof time == 'string' ? parseInt(time) : time) * 1000
    )
      .toISOString()
      .slice(11, 19);
    const [hours, minutes, seconds] = timeSpent.split(':');
    if (hours !== '00') return `${hours}:${minutes}:${seconds}`;
    if (minutes !== '00') return `${minutes}:${seconds}`;
    return `${
      seconds.startsWith('0') ? seconds.replace('0', '') : seconds
    } sec.`;
  }

  getDaysBetweenDates(str: string) {
    var dateMillis = Date.parse(str);
    const todayMillis = Date.parse(new Date().toString());
    var diffMillis = Math.abs(dateMillis - todayMillis);
    var diffDays = Math.ceil(diffMillis / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) return 'today';
    if (diffDays <= 2) return 'yesterday';
    if (diffDays < 32) return `${diffDays} day's ago`;
    return `${Math.floor(diffDays / 31)} month's ago`;
  }
}
const timeFormatController = new TimeFormatController();
export { timeFormatController };
