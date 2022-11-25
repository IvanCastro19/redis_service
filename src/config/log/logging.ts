import moment from "moment-timezone";

const getTimeStamp = (): string => {
    return moment.tz('America/mexico_city').format('HH:mm:ss')
}

type LoggingType = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'


const info = (namespace: string, message: string, object?: any) => {
    let typelog: LoggingType = 'INFO';
    if (object) {
        console.info(`[${getTimeStamp()}][${typelog}][${namespace}] ${message}`, object);
    } else {
        console.info(`[${getTimeStamp()}][${typelog}][${namespace}] ${message}`);
    }
}

const warn = (namespace: string, message: string, object?: any) => {
    let typelog: LoggingType = 'WARN';
    if (object) {
        console.warn(`[${getTimeStamp()}][${typelog}][${namespace}] ${message}`, object);
    } else {
        console.warn(`[${getTimeStamp()}][${typelog}][${namespace}] ${message}`);
    }
}

const error = (namespace: string, message: string, object?: any) => {
    let typelog: LoggingType = 'ERROR';
    if (object) {
        console.error(`[${getTimeStamp()}][${typelog}][${namespace}] ${message}`, object);
    } else {
        console.error(`[${getTimeStamp()}][${typelog}][${namespace}] ${message}`);
    }
}

const debug = (namespace: string, message: string, object?: any) => {
    let typelog: LoggingType = 'DEBUG';
        if (object) {
            console.debug(`[${getTimeStamp()}][${typelog}][${namespace}] ${message}`, object);
        } else {
            console.debug(`[${getTimeStamp()}][${typelog}][${namespace}] ${message}`);
        }
}


export default {
    info,
    warn,
    error,
    debug
}