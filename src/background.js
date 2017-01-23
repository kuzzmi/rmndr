import Alarms from './app/alarms';
import Storage from './app/storage';
import Notifications from './app/notifications';

Alarms.init();

const notify = reminder => Notifications.create({ message: reminder.title });

Alarms.addListener('reminder', ({ name }) => {
    Storage.get('reminders', ({ reminders }) => {
        const reminder = reminders.filter(r => r.id === name).pop();
        notify(reminder);
    });
});

window.chrome.notifications.onClicked.addListener(window.chrome.notifications.clear);

window.chrome.storage.onChanged.addListener(changes => {
    for (let key in changes) {
        if (key === 'reminders') {
            const change = changes[key];

            change.newValue.forEach(reminder => {
                const when = new Date(reminder.time).getTime();
                const callback = () => notify(reminder);

                if (when > Date.now()) {
                    Alarms.create({
                        type: 'reminder',
                        name: reminder.id,
                        when,
                        callback,
                    });
                }
            });
        }
    }
});
