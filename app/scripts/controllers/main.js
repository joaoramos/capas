'use strict';

/**
 * @ngdoc function
 * @name nowApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nowApp
 */
angular.module('nowApp')
  .controller('MainCtrl', ['$scope', 'NewsFactory', function ($scope, News) {

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
      	url: 'http://rss.feedsportal.com/c/32433/f/469897/index.rss'
      },
      {
      	name: 'Observador',
      	url: 'http://observador.pt/feed/'
      }
    ];

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
  .filter('trim', function() {
    return function(text) {
      return String(text).replace(/<[^>]+>/gm, '');
    };
  })
  .factory('NewsFactory', ['$http', function($http) {
    return {
      parseFeed : function(sourceUrl){
        return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(sourceUrl));
      }
    };
  }]);
