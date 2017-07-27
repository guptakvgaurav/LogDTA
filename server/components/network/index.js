import request from 'request';
import logger from '../logger';
/**
 * Determines if response has error or not.
 * @param response - Object
 * @return status - Boolean 
 */
const _isErrorResponse = (response = {}) => {
    let isErrorResponse = false;     // signifies whether response is an errored response or not.
    return isErrorResponse;
}

const ErrorType = Object.freeze({
    CustomError: 'CustomError',
    StandardError: 'StandardError'
});

/**
|--------------------------------------------------
| API gateway for all external HTTP Data sources.
|--------------------------------------------------
*/
module.exports = (requestOptions = {}) => {
    return new Promise((resolve, reject) => {
        logger.info(`[Network] Api parameters`, requestOptions);
        request(requestOptions, (err, response) => {
            if(err){
                logger.error(`[Network] Api error, Url - ${requestOptions.url} -->`, err);
                err.errorType = ErrorType.StandardError;
                return reject(err);
            }
            if(_isErrorResponse(response)){
                logger.error(`[Network] Api error, Url - ${requestOptions.url} -->`, err);
                response.errorType = ErrorType.CustomError;
                return reject(response)
            }
            logger.silly(`[Network] Api result, Url -> ${requestOptions.url} -->`, response.body);
            return resolve(response);
        });
    });
}

/**
 * === Sample usage ===
 * Network({url: 'http://www.google.com', method: 'GET'})
 *  .then(body =>   { logger.silly('Got output');               })
 *  .catch(error => { logger.silly('Caught in error', error);   });
 */