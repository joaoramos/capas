'use strict';

/**
 * @ngdoc function
 * @name n.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the n
 */
angular.module('n')
  .controller('MainCtrl', ['$scope', '$http', 'NewsFactory', function ($scope, $http, News) {

    $scope.toggleSelectSource = function() {
      $scope.selectSource = !$scope.selectSource;
    }

    $scope.sources = [
      {
      	name: 'Público',
      	url: 'http://feeds.feedburner.com/PublicoRSS'
      },
      {
      	name: 'iOnline',
      	url: 'http://feeds.feedburner.com/jornali'
      },
      {
      	name: 'Expresso',
      	url: 'http://expresso.sapo.pt/static/rss/atualidade--arquivo_23412.xml'
      },
      {
      	name: 'Observador',
      	url: 'http://observador.pt/feed/'
      },
      {
        name: 'Abola',
        url: 'http://rss.feedsportal.com/c/32502/f/480420/index.rss'
      }
    ];

    $scope.weather = {}, $scope.main = {}, $scope.wind = {};

    $http.get('http://api.openweathermap.org/data/2.5/weather?q=berlin,de&lang=pt')
      .success(function(data, status, headers, config) {
        $scope.weather = data.weather[0];
        $scope.main = data.main;
      })
      .error(function(data, status, headers, config) {
        alert('No weather information.');
      });

    $scope.currentSource = $scope.sources[0];
    $scope.selectSource = false;

    $scope.fetchSource = function(source) {
      News.parseFeed(source.url).then(function(fetched) {
        // console.log(fetched.data.responseData.feed.entries);
        $scope.news = fetched.data.responseData.feed.entries;
        $scope.currentSource = source;
        $scope.selectSource = false;
      });
    };
  }])
  .directive('silent', function() {
    // Prevents anchor jumping
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        if(attrs.ngClick || attrs.href === '' || attrs.href === '#'){
          elem.on('click', function(e){
              e.preventDefault();
          });
        }
      }
   };
  })
  .filter('trim', function() {
    // Strips away all HTML
    return function(text) {
      return String(text).replace(/<[^>]+>/gm, '');
    };
  })
  .filter('temp', function() {
    // Gets Kelvin to Celsius and rounds the total
    return function(text) {
      return Math.round(text-273.15);
    };
  })
  .filter('speed', function() {
    // Gets mps to kmh
    return function(text) {
      return Math.round(text*3.6);
    };
  })
  .factory('NewsFactory', ['$http', function($http) {
    // Runs RSS feeds through Google Feed API
    return {
      parseFeed : function(sourceUrl){
        return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(sourceUrl));
      }
    };
  }]);
