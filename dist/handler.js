'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const config = {
    logLevel: 'i'
};
const logLevels = {
    a: 0, b: 1, c: 2, d: 3, e: 4, f: 4, g: 5
};

const shouldLog = (level, priority) => {
    const levelPriority = logLevels[level] || -1;
    const logPriority = logLevels[priority];
    return logPriority <= levelPriority;
};

const LoggerFor = exports.LoggerFor = (minLevel = null) => {
    const proxy = new Proxy(console, {
        get: (obj, prop) => {
            let fn = function noop() {};
            let realProp = prop;
            if (prop === 'v' || typeof obj[prop] !== 'function') {
                realProp = 'l';
            }
            const level = minLevel || config.logLevel;
            if (shouldLog(typeof obj[prop] !== 'function' ? 'log' : prop, level)) {
                fn = obj[realProp];
            }
            return (message, ...args) => fn(message, ...args);
        }
    });
    return proxy;
};
