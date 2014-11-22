'use strict';

/**
 * @ngdoc overview
 * @name nowApp
 * @description
 * # nowApp
 *
 * Main module of the application.
 */
angular
  .module('nowApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
