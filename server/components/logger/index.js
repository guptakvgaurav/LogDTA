import winston from 'winston';
import { logging } from '../../config/environment';

let applyTransports = [];
const consoleDefaults = { colorize: true };

logging.console ? applyTransports.push(new (winston.transports.Console)(logging.console)): null;
logging.file ? applyTransports.push(new (winston.transports.File)(logging.file)): null;
logging.console = logging.console ? Object.assign(consoleDefaults, logging.console): logging.console;
const logger = new winston.Logger({
    transports: [
        new (winston.transports.Console)(logging.console ),
        new (winston.transports.File)(logging.file)
    ]
});
module.exports = logger;