import chrono from 'chrono-node';

export const getFromTime = time => {
    const date = chrono.parse(time)[0].start.date();
    return date.getTime();
};
