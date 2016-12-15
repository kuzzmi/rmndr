import _chrono from 'chrono-node';

const nextDayRefiner = new _chrono.Refiner();
nextDayRefiner.refine = (text, results, opt) => {
    const now = new Date();
    const date = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    results.forEach(result => {
        if (!result.start.isCertain('day') &&
            result.start.get('hour') <= hours &&
            result.start.get('minute') <= minutes &&
            result.start.get('second') <= seconds) {
            result.start.assign('day', date + 1);
        }
    });

    return results;
}

const chrono = new _chrono.Chrono();
chrono.refiners.push(nextDayRefiner);

export default chrono;
