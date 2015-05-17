'use strict';

angular.module('n', [
	'ngAnimate',
	'ngCookies',
	'ngTouch',
	'ngSanitize',
	'ui.router',
  'angularMoment',
  'duScroll'
	])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/views/frontpage.html'
      });

    $urlRouterProvider.otherwise('/');

    /*
        Use the HTML5 History API
     */
    $locationProvider.html5Mode(true);
    
  })
  .run(function(amMoment) {
    amMoment.changeLocale('pt');
  });
