'use strict';

angular.module('n')
  .controller('AppCtrl', [
    '$scope',
    '$http',
    'News',
    function ($scope, $http, News) {

      /*
          Gets sources 
       */

      News.getSources().then(
        function success(data) {
          $scope.sources = data;
        });

       /*
          Get news given a source obj.
        */
       
      $scope.getNews = function(source) {
        News.getFeed(source.url).then(
          function success(news) {
            $scope.news = news.data.responseData.feed.entries;
            $scope.source = source;
          },
          function error(e) {
            console.log('Error getting news for ' + source.name, e);
          }
        );
      };

  }]);
