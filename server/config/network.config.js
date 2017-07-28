// http://newers-world-oauth.qa2.tothenew.net/oauth/authorize?client_id=e6d6a83e-6c7a-11e7-9394-406186be844b
import AppSettings from './app_settings';

const MasterConfig = Object.freeze({
    protocol: 'http',
    domain: 'tothenew.net',
    subdomains: {
        newersWorld: 'newers-world-oauth.qa2'
    }
});

let NetworkConfig = {
    NW: {
        baseUrl: `${MasterConfig.protocol}://${MasterConfig.subdomains.newersWorld}.${MasterConfig.domain}`,
        clientId: process.env.NW_CLIENT_ID || AppSettings.NW_CLIENT_ID,
        Api: {}
    }
};

/**
 * Configuration for authorize api.
 */
NetworkConfig.NW.Api.Authorize = {
    url: `${NetworkConfig.NW.baseUrl}/oauth/authorize`,
    qs: {
        clientId: NetworkConfig.NW.clientId
    }
}

console.log(NetworkConfig.NW.Api.Authorize);

module.exports = Object.freeze(NetworkConfig);