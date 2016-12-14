import Platform from 'app/platform';

const create = (name, { when, after, every }) => {
    if (Platform.is('chrome/extension')) {
        chrome.alarms.create(name, { when, delayInMinutes: after, periodInMinutes: every });
    }
};

const Alarms = {
    create,
};

export default Alarms;
