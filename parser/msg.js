/**
 * msg.js
 *
 * Base module that other message modules use.
 */
'use strict';

/**
 * Base inteface for other message classes.
 */
class Message {
    /**
     * Class constructor.
     * @param {Parser} parser Parser instance
     * @param {String} raw Unparsed message from WikiaRC
     * @param {String} type Message type
     */
    constructor(parser, raw, type) {
        this._parser = parser;
        this.raw = raw;
        this.type = type;
        this.error = false;
    }
    /**
     * Marks a message as errored out.
     * @param {String} code Error code
     * @param {String} message Error message
     * @param {Object} details Error details
     * @protected
     */
    _error(code, message, details) {
        this.error = code;
        this.errmsg = message;
        this.errdetails = details;
    }
    /**
     * Starts fetching more details about the message.
     * @param {Client} client Client instance to get external clients from
     * @param {Array<String>} properties Details to fetch
     * @param {Array<String>} interested Modules interested in the message
     */
    fetch(client, properties) {
        this._client = client;
        this._properties = properties;
    }
    /**
     * Cleans up after a failed fetch.
     * Interested modules and properties to fetch should remain, as they are
     * only generated by the client once.
     */
    cleanup() {
        this.error = false;
        delete this.errmsg;
        delete this.errdetails;
        delete this._client;
        delete this._properties;
    }
    /**
     * Stringifies the object when passed through JSON.stringify.
     * @returns {Object} Object to stringify
     */
    toJSON() {
        const clone = {};
        for (const prop in this) {
            if (
                (
                    !prop.startsWith('_') ||
                    typeof this[prop] === 'string'
                ) &&
                typeof this[prop] !== 'function'
            ) {
                clone[prop] = this[prop];
            }
        }
        return clone;
    }
}

module.exports = Message;
