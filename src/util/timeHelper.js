import R from 'ramda';

const times = {
    minutes_in_miliseconds: 60000,
    hours_in_miliseconds: 3600000,
    days_in_seconds: 86400000,
    months_in_miliseconds: 2592000000,
    years_in_seconds: 31536000000,
};

const getPhrase = (divisor, unit) => delta => {
    const ago = parseInt(delta / divisor);
    return `${ago} ${unit}${ago > 1 ? 's' : ''} ago`;
};

const map = R.cond([
    [R.isNil, R.always('Never')],
    [R.gt(times.minutes_in_miliseconds), R.always('Less than a minute ago')],
    [R.gt(times.hours_in_miliseconds), getPhrase(times.minutes_in_miliseconds, 'minute')],
    [R.gt(times.days_in_seconds), getPhrase(times.hours_in_miliseconds, 'hour')],
    [R.gt(times.months_in_miliseconds), getPhrase(times.days_in_seconds, 'day')],
    [R.gt(times.years_in_seconds), getPhrase(times.months_in_miliseconds, 'month')],
    [R.T, getPhrase(times.years_in_seconds, 'year')]
]);

export const getTimeAgo = time => map(time ? Date.now() - time : null);
