let platform;

if (window.chrome.extension) {
    platform = 'chrome/extension';
} else if (window && window.process && window.process.type) {
    platform = 'electron';
} else {
    platform = 'web';
}

const Platform = {
    is: check => platform === check
}

export default Platform;
