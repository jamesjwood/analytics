/*global window */
/*global $ */
/*jslint node: true */
/*global exports */
/*global require */
/*global confirm */
/*global alert */
/*global ga */
var utils = require('tsuju-utils');
var events = require('events');

var node = (typeof window === 'undefined');





module.exports = function(trackingId, opts) {
    "use strict";
    utils.is.string(trackingId, 'trackingId');
    var that = new events.EventEmitter();
    var log = utils.log(that);

    opts = opts || {};
    var uuid = opts.uuid || utils.uuid();
    var appName = opts.appName || 'none';
    var appVersion = opts.appVersion || 'none';

    var params = {};

    var visitor;

    that.setDimension = function setDimension(dimensionName, dimensionValue) {
        ga('set', dimensionName, dimensionValue);
    };

    if (node) {
        var ua = require('universal-analytics');
        visitor = ua(trackingId);
        params.an = appName;
        params.av = appVersion;
    } else {
        ga('create', trackingId, {
            'storage': 'none',
            'clientId': uuid,
            'siteSpeedSampleRate': 100
        });
        that.setDimension('dimension1', appVersion);
    }

    that.captureErrors = function(fromLog, then) {
        var oldError = fromLog.error;

        fromLog.error = function newError(error, path) {
            oldError.apply(this, arguments);
            if (path) {
                error.path = path;
            }
            that.error(error, function() {
                then(error);
            });
        };
    };

    that.event = function send(category, action, label, value, callback) {
        log('sending to ' + trackingId + ", " + category + ", " + action + ", " + label + ", " + value);
        if (node) {
            visitor.event(category, action, label, value, params, function(error) {
                if (error) {
                    log.warn('failed to send ga to ' + trackingId);
                    log.error(error);
                } else {
                    log.info('sent ga to ' + trackingId + ", " + category + ", " + action + ", " + label + ", " + value);
                }
                if (callback) {
                    callback();
                }
            });
        } else {
            if (ga) {
                ga('send', 'event', category, action, label, value);
                log.info('sent ga to ' + trackingId + ", " + category + ", " + action + ", " + label + ", " + value);
                if (callback) {
                    callback();
                }
            }
        }
    };

    that.pageView = function pageView(page, title, queryString) {
        log.info('pageView: ' + trackingId + ", " + page + ", " + title);
        that.setDimension('dimension2', queryString);
        ga('send', 'pageview', {
            'page': page,
            'title': title
        });
    };

    that.error = function error(err, callback) {
        var message = err.message || '(no message)';
        var path = err.path || '(no path)';
        that.event('error', message, JSON.stringify(err), null, callback);
    };

    return that;
};
