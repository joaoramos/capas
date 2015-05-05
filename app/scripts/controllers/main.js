'use strict';

angular.module('n')
  .controller('MainCtrl', ['$scope', '$http', 'NewsFactory', function ($scope, $http, News) {

    $scope.toggleSelectSource = function() {
      $scope.selectSource = !$scope.selectSource;
    };

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

    $scope.currentSource = $scope.sources[0];
    $scope.selectSource = false;

    $scope.fetchSource = function(source) {
      News.parseFeed(source.url).then(function(fetched) {

        // Get news data
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
  .factory('NewsFactory', ['$http', function($http) {

    // Runs RSS feeds through Google Feed API
    return {
      parseFeed: function(sourceUrl){
        return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(sourceUrl));
      }
    };
  }]);
