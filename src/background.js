chrome.alarms.onAlarm.addListener(({ name }) => {
    chrome.storage.sync.get('reminders', ({ reminders }) => {
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
