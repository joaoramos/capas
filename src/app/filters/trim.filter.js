'use strict';

angular.module('n')
	.filter('trim', function() {

    /*
    	Strips away any HTML
     */
    
    return function(text) {
      return String(text).replace(/<[^>]+>/gm, '');
    };
  });
