/**
 *
 * Licensed Materials – Property of IBM
 *
 * left-navigation.module.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular.module("x1.ui.left-navigation", [
	"pascalprecht.translate",
	"ngAnimate",
	"ui.bootstrap"
]);
/**
 *
 * Licensed Materials – Property of IBM
 *
 * left-navigation.constant.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.left-navigation")
	.constant("x1.ui.left-navigation.constant", {
		"EVENTS": {
			"leftNavOpened": "x1.ui.left-navigation.opened",
			"leftNavClosed": "x1.ui.left-navigation.closed"
		}
	});
/**
 *
 * Licensed Materials – Property of IBM
 *
 * left-navigation.directive.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.left-navigation")
	.directive("x1LeftNavigation", ["$state", "$animate", "$rootScope", "x1.ui.left-navigation.constant",
		function($state, $animate, $rootScope, constant) {
			"use strict";

			return {
				restrict: "EA",
				transclude: true,
				templateUrl: "left-navigation/left-navigation.html",
				scope: {
					isOpen: "=",
					items: "=?",
					isStateful: "=?"
				},
				link: function($scope, element) {
					var container = element.children();

					$scope.$watch("isOpen", function(newVal) {
						if (newVal) {
							$animate.removeClass(container, "ng-hide").then(function() {
								$rootScope.$broadcast(constant.events.leftNavOpened);
							});
						} else {
							$animate.addClass(container, "ng-hide").then(function() {
								$rootScope.$broadcast(constant.events.leftNavClosed);
							});
						}
					});

					$scope.select = function($event, item) {
						if ($event === "custom" || (isThisEventSupported($event) &&
							(doesItemExist(item) && doesElementHaveItemClass($event, item)))) {
							unselect($scope.items);

							if (item.reveal) {
								revealItem(item, $event);
								return;
							} else {
								item.active = true;
							}

							if (item.state && $event !== "custom") {
								$state.go(item.state);
								item.active = true;
							}
						}
					};

					// functions for $scope.select()
					function isThisEventSupported($event) {
						return $event.type === "click" || $event.keyCode === 13;
					}
					function doesItemExist(item) {
						return item && item.name;
					}
					function doesElementHaveItemClass($event, item) {
						return $event && $event.target &&
							((" " + $event.target.className + " ").indexOf(item.class + "-click") > -1 ||
							(" " + $event.target.firstChild.className + " ").indexOf(item.class + "-click") > -1);
					}

					if ($scope.isStateful && $state.current) {
						var found = false;
						selectState($scope.items, $state.current.name);
					}

					function selectState(items, currentStateName) {
						for (var i = 0; items && i < items.length; i++) {
							var item = items[i];

							if (item.validStates && item.validStates.indexOf(currentStateName) >= 0) {
								$scope.select("custom", item);
								found = true;
								break;
							}

							if (item.items) {
								selectState(item.items, currentStateName);
								if (found) {
									item.isOpen = true;
								}
							}
						}
					}

					function revealItem(item, $event) {
						item.revealOpen = !item.revealOpen;

						if (item.revealOpen) {
							item.active = true;
							item.isOpen = true;

							if (item.state && $event !== "custom") {
								$state.go(item.state);
							}
						} else {
							item.active = false;
							item.isOpen = false;

							if (item.backState && $event !== "custom") {
								$state.go(item.backState);
							}
						}
					}

					function unselect(items) {
						angular.forEach(items, function(item) {
							if (item.active) {
								item.active = false;
							}

							if (item.reveal && item.isOpen) {
								item.isOpen = false;
							}

							if (item.items) {
								unselect(item.items);
							}
						});
					}
				}
			};
		}]);
(function(module) {
try {
  module = angular.module('x1.ui.left-navigation');
} catch (e) {
  module = angular.module('x1.ui.left-navigation', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('left-navigation/left-navigation.html',
    '<aside ng-show="isOpen" role="complementary" aria-labelledby="x1LeftNavSecondary" class="x1-ui-left-navigation" aria-expanded="{{isOpen}}"><h2 id="x1LeftNavSecondary" class="sr-only" translate="x1UiNgLeftNavigation.ASIDE_SR_TEXT"></h2><nav role="navigation" aria-label="{{\'x1UiNgLeftNavigation.ARIA.NAV\' | translate}}" ng-include="\'left-navigation/left-navigation.items.html\'" onload="items=items"></nav><ng-transclude></ng-transclude></aside>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.left-navigation');
} catch (e) {
  module = angular.module('x1.ui.left-navigation', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('left-navigation/left-navigation.items.html',
    '<accordion close-others="false" role="tablist"><accordion-group ng-repeat="item in items" role="tabpanel" class="{{item.class}}" ng-class="{\'active\': item.items ? item.isOpen : item.active, \'reveal\': item.reveal, \'reveal-open\': item.revealOpen, \'include\': item.include}" is-open="item.isOpen" ng-click="select($event, item)" ng-keydown="select($event, item)" aria-label="{{item.name}}" aria-expanded="{{item.isOpen || false}}"><accordion-heading role="tab" tabindex="0" aria-labelledby="{{item.id}}"><span class="heading-icon text-center {{item.class}} {{item.class}}-click" ng-class="{\'glyphicon glyphicon-{{item.icon}} glyphicon-lg\': item.icon, \'glyphicon glyphicon-chevron-left\': item.revealOpen}" aria-hidden="true"></span> <span ng-hide="item.include" id="{{item.id}}" class="name {{item.class}} {{item.class}}-click" title="{{item.name | translate}}">{{item.name | translate}}</span> <span ng-if="item.reveal && !item.revealOpen" aria-hidden="true" class="right-icon glyphicon glyphicon-chevron-right {{item.class}} {{item.class}}-click"></span><ng-include ng-if="item.include" src="item.include"></ng-include></accordion-heading><ng-include ng-if="item.items" onload="items=item.items" src="\'left-navigation/left-navigation.items.html\'"></ng-include></accordion-group></accordion>');
}]);
})();
