import _chrono from 'chrono-node';

const nextDayRefiner = new _chrono.Refiner();
nextDayRefiner.refine = (text, results) => {
    results.forEach(result => {
        const ref = new Date(result.ref);

        const date    = ref.getDate();
        const hours   = ref.getHours();
        const minutes = ref.getMinutes();
        const seconds = ref.getSeconds();

        // When the closest date is in the past, we need to make it
        // in the future
        if (!result.start.isCertain('day') &&
            result.start.isCertain('weekday') &&
            result.start.get('day') < date) {
            const nextWeekday = result.start.date();
            nextWeekday.setDate(result.start.get('day') + 7);
            const month = nextWeekday.getMonth() + 1;
            const nextDate = nextWeekday.getDate();
            result.start.assign('month', month);
            result.start.assign('day', nextDate);
        } else if (!result.start.isCertain('day') &&
            result.start.get('hour') <= hours &&
            result.start.get('minute') <= minutes &&
            result.start.get('second') <= seconds) {
            // When the time was specified only, but it's closer to earlier
            // time today, than it should be
            result.start.assign('day', date + 1);
        }
    });

    return results;
};

const chrono = new _chrono.Chrono();
chrono.refiners.push(nextDayRefiner);

export default chrono;
