export const formatComma = (amount) => {
    if (typeof amount !== 'number') return amount;
    return amount.toLocaleString();
};

export const formatKRW = (amount) => {
    if (typeof amount !== 'number') return amount;
    return `${amount.toLocaleString()}원`;
};

export const formatSlice = (text, length) => {
    return text.length > length ? text.slice(0, length) + '...' : text;
};

const FORMAT = {
    formatComma,
    formatKRW,
    formatSlice,
};
export default FORMAT;
