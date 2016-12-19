let name;

if (!window && !document) {
    name = 'node';
} else if (window.chrome && window.chrome.extension) {
    name = 'chrome/extension';
} else if (window && window.process && window.process.type) {
    name = 'electron';
} else {
    name = 'web';
}

const Platform = {
    is: check => name === check,
    name,
};

export default Platform;
