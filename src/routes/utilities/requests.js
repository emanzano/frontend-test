// Requests Module
module.exports = (function () {
    // Private Members

    // HTTP Status Codes
    let _STATUS_CODES = {};

    // Returns the requested module (HTTP OR HTTPS)
    const _protocolSelector = {
        // HTTP
        http: () => {
            const http = require('http');
            _STATUS_CODES = http.STATUS_CODES;
            return http;
        },

        //HTTPS
        https: () => {
            const https = require('https');
            const http = require('http');
            _STATUS_CODES = http.STATUS_CODES;
            return https;
        },

        get: (protocol) => (_protocolSelector[protocol] && _protocolSelector[protocol].apply( _protocolSelector, [].slice.call(arguments, 1) ))
    };

    // Public Members

    /**
     * Recieves the protocol and the url, returns a promise that resolves to the string response of that request.
     */
    const get = (url) => {
        const returnPromise = new Promise((resolve, reject) => {

            if (typeof url !== 'string' || url.length === 0){
                const urlError = new Error(`There was an error in the URL provided. "${url}"`);
                reject(urlError);
            }

            // Checks that the url has the protocol
            if (url.indexOf('http') > 0){
                const urlError = new Error(`No protocol (HTTP|HTTPS) detected in url: ${url}`);
                reject(urlError);
            }

            try {
                // Checks protocol, defaults to HTTPS
                let protocol = url.substring(0, 5);
                
                protocol = protocol.charAt(4) === ':'? 'http' : protocol;

                const request = _protocolSelector.get(protocol.toLowerCase());

                request.get(url, (res) => {
                    if (res.statusCode === 200) {

                        let body = '';

                        res.on('data', chunk => {
                            body += chunk;
                        });

                        res.on('end', () => {
                            resolve(body);
                        });
                    
                    } else {
                        // Status Code Error
                        const statusCodeError = new Error(`There was an error getting ${url}. (${_STATUS_CODES[res.statusCode]})`);
                        reject(statusCodeError);
                    }
                }).on('error', (error) => {
                    reject(error);
                });

            } catch (err) {
                reject(err);
            }
        });

        return returnPromise;
    };

    return {
        get: get
    };
})();