/*global window */
/*global $ */
/*jslint node: true */
/*global exports */
/*global require */
/*global confirm */
/*global alert */
/*global ga */

var visitor;

exports.setup = function(trackingId, host){
  if(typeof window ==='undefined')
  {
    var ua = require('universal-analytics');
    visitor = ua(trackingId);
  }
  else
  {
    window['GoogleAnalyticsObject']='ga';
    window['ga']=window['ga'] || function(){
      (window['ga'].q=window['ga'].q||[]).push(arguments)
    },
    window['ga'].l=1*new Date();
    ga('create', trackingId, host);
  }
};

exports.setDimension = function setDimension(dimension, dimensionValue){
  ga('set', dimension, dimensionValue);
};

exports.trackEvent = function(category, action, label, value){
  "use strict";
  
  //if(process.env.ENVIRONMENT === 'production')
  //{
  
    
    if(console)
    {
      var m = 'tracking with ga: ' + Array.prototype.join.call(arguments);
      console.log(m);
    }    
    if(typeof window ==='undefined')
    {
      visitor.event(category, action, label, value);
    }
    else
    {
      if(ga)
      {
        ga('send', category, action, label, value);
      }
    }
  //}
};




