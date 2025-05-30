const LOG = {
    INFO: (message) => {
        if (E2U?.DEBUG) console.log(message);
    },
    WARN: (message) => {
        if (E2U?.DEBUG) console.warn(message);
    },
    ERROR: (message) => {
        if (E2U?.DEBUG) console.error(message);
    }
};

export default LOG;
