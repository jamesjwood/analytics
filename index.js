/*global window */
/*global $ */
/*jslint node: true */
/*global exports */
/*global require */
/*global confirm */
/*global alert */
/*global _gaq */

var setup = false;
var ua = "UA-38794735-1";
var host = 'collaborlist.com';
var ga;

if(typeof window ==='undefined')
{
  var GoogleAnalytics = require('ga');
  ga = new GoogleAnalytics(ua, host);
}
else
{
  window._gaq = window._gaq || [];
  window._gaq.push(['_setAccount', ua]);
  window._gaq.push(['_trackPageview']);
}
exports.trackEvent = function(category, action, label, value){
  "use strict";
  console.log('tracking with ga: ' + category + action + label);
  if(process.env.ENVIRONMENT === 'production')
  {
  if(typeof window ==='undefined')
  {
    ga.trackEvent({category: category, action: action, label: label, value: value});
  }
  else
  {
    var pushArgs = ['_trackEvent'].concat(arguments);
    window._gaq.push(pushArgs);
  }
    }
};




