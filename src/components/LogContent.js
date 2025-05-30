const LOG = {
    INFO: (message) => {
        if (global.E2U?.DEBUG) console.log(message);
    },
    WARN: (message) => {
        if (global.E2U?.DEBUG) console.warn(message);
    },
    ERROR: (message) => {
        if (global.E2U?.DEBUG) console.error(message);
    }
};

export default LOG;
