import Alarms from 'app/alarms.js';
import Notifications from 'app/notifications.js';

Alarms.addListener({ name } => {
    const parsedName = name.split('.');
    const type       = parsedName[0];
    const id         = parsedName[1];

    switch (type) {
        case 'reminder':
            window.chrome.storage.sync.get('reminders', ({ reminders }) => {
                const { name } = alarm;
                const reminder = reminders.filter(r => r.id === id).pop();
                Notifications.create({ message: reminder.title });
            });
            break;
        default:
            break;
    }
});

window.chrome.storage.onChanged.addListener(changes => {
    for (let key in changes) {
        if (key === 'reminders') {
            const change = changes[key];

            change.newValue.forEach(reminder => {
                const when = new Date(reminder.time).getTime();

                if (when > Date.now()) {
                    Alarms.create(reminder.id, { when });
                }
            });
        }
    }
});
