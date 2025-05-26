import moment from 'moment/moment';

const comma = (amount) => {
    if (typeof amount !== 'number') return amount;
    return amount.toLocaleString();
};

const KRW = (amount) => {
    if (typeof amount !== 'number') return amount;
    return `${amount.toLocaleString()}원`;
};

const slice = (text, length) => {
    return text.length > length ? text.slice(0, length) + '...' : text;
};

const parseDate =  (dateStr, format) => {
    return moment(dateStr, format ? format : 'YYYYMMDDHHmmss');
};

const convertMethod = (method) => {
    let methodKr;
    switch (method) {
        case "card"   : methodKr = '신용카드'; break;
        case "wallet" : methodKr = '간편결제'; break;
        case "eft"    : methodKr = '가상계좌'; break;
    }

    return methodKr;
};

const convertBin = (bin) => {
    if (bin.length >= 8) {
        return `${bin.slice(0,4)}-${bin.slice(4,8)}`;
    } else if (bin.length >= 6) {
        return `${bin.slice(0,4)}-${bin.slice(4,6)}**`;
    } else {
        return bin;
    }
};

const UTILS = {
    comma,
    KRW,
    slice,
    parseDate,
    convertMethod,
    convertBin,
};
export default UTILS;
