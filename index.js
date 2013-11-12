/*global window */
/*global $ */
/*jslint node: true */
/*global exports */
/*global require */
/*global confirm */
/*global alert */
/*global _gaq */

var visitor;

exports.setup = function(trackingId, host){
  if(typeof window ==='undefined')
  {
      var ua = require('universal-analytics');
     visitor = ua(trackingId);
  }
  else
  {
    ga('create', trackingId);
  }
};


exports.trackEvent = function(category, action, label, value){
  "use strict";
  console.log('tracking with ga: ' + category + action + label);
  if(process.env.ENVIRONMENT === 'production')
  {
    if(typeof window ==='undefined')
    {

    }
    else
    {
      ga.send(category, action, label, value);
    }
  }
};




