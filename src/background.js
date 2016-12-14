import { getFromTime } from 'app/datetime.js';
import Alarms from 'app/alarms.js';

chrome.alarms.onAlarm.addListener(alarm => {
    chrome.storage.sync.get('reminders', ({ reminders }) => {
        const { name } = alarm;
        const reminder = reminders.filter(r => r.id === name).pop();
        chrome.notifications.create({
            title: 'Yo!',
            type: 'basic',
            iconUrl: 'data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7',
            message: reminder.title,
            requireInteraction: true
        });
    });
});

chrome.storage.onChanged.addListener(changes => {
    for (let key in changes) {
        if (key === 'reminders') {
            const change = changes[key];

            change.newValue.forEach(reminder => {
                const when = getFromTime(reminder.time);

                if (when > Date.now()) {
                    Alarms.create(reminder.id, { when });
                }
            });
        }
    }
});
