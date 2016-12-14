import chrono from 'chrono-node';

export const getFromTime = time => {
    return chrono.parse(time)[0].start.date().getTime();
};
