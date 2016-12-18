import Platform from 'app/platform';
// import later from 'later';

const create = (name, { when, after, every, callback }) => {
    if (Platform.is('chrome/extension')) {
        window.chrome.alarms.create(name, {
            when,
            delayInMinutes: after,
            periodInMinutes: every,
        });
    } else if (Platform.is('electron') || Platform.is('web')) {
        const now = Date.now();
        setTimeout(callback, when - now + 1000);
    }
};

const Alarms = {
    create,
};

export default Alarms;
