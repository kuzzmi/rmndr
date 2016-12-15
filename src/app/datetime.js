import chrono from './chrono.js';
import moment from 'moment';

moment.updateLocale('en', {
    calendar : {
        sameDay : 'LT',
        nextDay : 'LT',
        nextWeek : 'dddd [at] LT',
        sameElse : 'L [at] LT'
    }
});

export const getCalendar = date => moment(new Date( date )).calendar();

export const getNow = () => {
    return Date.now();
}

export const getFromTime = (text, ref) => {
    const parsed = chrono.parse(text, ref || getNow());
    const date = parsed[0].start.date();
    return date;
};

export const parse = (text, ref) => {
    const parsed = chrono.parse(text, ref || getNow());

    if (!parsed.length) {
        return {
            title: text
        };
    }

    const title = text.replace(parsed[0].text, '').trim();

    return {
        title,
        dates: parsed
    };
};
