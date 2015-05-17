'use strict';

angular.module('n')
	.directive('toggle', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {

				element.bind('click', function() {
					element.toggleClass('toggle-view');
				});

			}
		};
	});
