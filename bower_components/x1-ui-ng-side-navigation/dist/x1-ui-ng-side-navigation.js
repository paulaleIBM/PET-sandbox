/**
 *
 * Licensed Materials – Property of IBM
 *
 * side-navigation.module.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.side-navigation", [
		"pascalprecht.translate",
		"ngAnimate",
		"ui.bootstrap"
	]);
/**
 *
 * Licensed Materials – Property of IBM
 *
 * side-navigation.constant.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.side-navigation")
	.constant("x1.ui.side-navigation.constant", {
		"EVENTS": {
			"sideNavOpened": "x1.ui.side-navigation.opened",
			"sideNavClosed": "x1.ui.side-navigation.closed",
			"sideNavItemClicked": "x1.ui.side-navigation.item.clicked"
		}
	});

/**
 *
 * Licensed Materials – Property of IBM
 *
 * side-navigation.directive.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.side-navigation")
	.directive("x1SideNavigation", [
		"$state", "$stateParams", "$animate", "$rootScope", "$window", "x1.ui.side-navigation.constant",
		function($state, $stateParams, $animate, $rootScope, $window, constant) {
			"use strict";

			return {
				restrict: "EA",
				transclude: true,
				templateUrl: "side-navigation/side-navigation.html",
				scope: {
					isOpen: "=",
					items: "=?",
					isStateful: "=?",
					selectHeaderChild: "=?"
				},
				link: function($scope, element) {
					// keep track of the currently selected item
					// since this is a navigation, only 1 item is selected (ie: active) at a time
					var currentItem = {};

					// fix up the nav data items to include all the necessary params
					fixItems($scope.items);

					// when the nav data items changes, ensure the params are current
					$scope.$watch("items", function() {
						fixItems($scope.items);
					}, true);

					// hide and show the side nav according to the isOpen state
					var container = element.children();
					$scope.$watch("isOpen", function(newVal) {
						if(newVal) {
							$animate.removeClass(container, "ng-hide").then(function() {
								$rootScope.$broadcast(constant.EVENTS.sideNavOpened);
							});
						} else {
							$animate.addClass(container, "ng-hide").then(function() {
								$rootScope.$broadcast(constant.EVENTS.sideNavClosed);
							});
						}
					});

					/**
					* Called when an item is selected
					* @param {Object} $event, the event fired that triggered select()
					* @param {Object} item, the selected nav item
					*/
					$scope.select = function($event, item) {
						// prevent the DOM event from propagating to other items
						if($event !== "custom") {
							$event.stopPropagation();
						}

						// ensure this is a valid selection
						if($event === "custom" || (isThisEventSupported($event) &&
								doesItemExist(item) && isTitleClick($event))) {

							// go to the header's first child on toggle open if there is no current selection
							if(item.header && item.isOpen && !doesItemExist(currentItem) && 
									$scope.selectHeaderChild && item.items.length) {
								item = item.items[0];
							}

							// update the currently selected item
							setCurrentItem(item);

							// broadcast an event that the item has been selected
							$rootScope.$broadcast(constant.EVENTS.sideNavItemClicked, item);

							// handle reveal items
							if(item.reveal) {
								toggleRevealPanel(item, $event);
							}
							// handle external links by opening them in a new tab/window
							else if(item.externalLink) {
								$window.open(item.externalLink, item.target || "_blank");
							}
							
							// if the nav is stateful, trigger a ui router state change
							if($scope.isStateful && item.state) {
								$state.go(item.state, item.stateParams || {});
							}
						}
					};

					// START functions for $scope.select()
					/**
					* Return true if the given event is a click or the user has used the ENTER key
					* @param {Object} $event, the event fired that triggered select()
					* @return {Boolean}
					*/
					function isThisEventSupported($event) {
						return $event.type === "click" || $event.keyCode === 13;
					}

					/**
					* An item is said to exist if it is defined and has a name
					* @param {Object} item, a nav item
					* @return {Boolean}
					*/
					function doesItemExist(item) {
						return item && item.name;
					}

					/**
					* Return true if the title/header is click, not the parent panel
					* 	Clicking on the panel should not trigger the select function, esp for the reveal case
					* @param {Object} $event, the event fired that triggered select()
					* @return {Boolean}
					*/
					function isTitleClick($event) {
						return !(angular.element($event.target).hasClass("panel") ||
								 angular.element($event.target).hasClass("empty-header"));
					}
					// END functions for $scope.select()

					// on load, set the currently active item based on ui router state
					if($scope.isStateful && $state.current) {
						setActiveItem();
					}

					// on ui router state change, set the currently active item based the new state
					$scope.$on("$stateChangeSuccess", function(event, toState) {
						if($scope.isStateful && toState) {
							setActiveItem();
						}
					});

					/**
					* Fix up the given items array to avoid future errors by adding:
					*	1. a tree level to each item, starting at 1
					*	2. the validStates array, if an item has a state but no validStates
					*		(otherwise the getTrail function cannot work)
					*/
					function fixItems(items, level) {
						level = level || 1;
						angular.forEach(items, function(item) {
							
							// if the item is active, set it as the currentItem
							if(item.active) {
								setCurrentItem(item);
							}
							
							// set the item's tree level
							item.level = level;

							// set validStates array, if it does not exist
							if(item.state && !item.validStates) {
								item.validStates = [item.state];
							}

							// drill down
							if(item.items) {
								fixItems(item.items, item.reveal ? 2 : level + 1);
							}
						});
					}

					/**
					* Get current states previous validStates through nested recursive function
					* @param {Array} navItems, an array of nav items
					* @param {String} currentStateName
					* @param {Object} currentStateParams
					* @return {Array} navTree Ordered array of validStates
					*/
					function getTrail(navItems, currentStateName, currentStateParams) {
						var navTree = [];
						var stateFound = false;

						function drillDown(items) {
							for(var i = 0, len = items.length; i < len; i += 1) {
								var item = items[i];
								navTree.push(item);

								if(areStatesEqual(item, currentStateName, currentStateParams)) {
									stateFound = true;
									break;
								} else {
									if(item.hasOwnProperty("items") && item.items.length > 0) {
										drillDown(item.items);
										if(stateFound) {
											break;
										}
									}
								}
								navTree.pop();
							}
						}

						drillDown(navItems);
						return navTree;
					}

					/**
					* Check if the current state is equal to that for the given item, including state params
					* @param {Object} item, a nav item
					* @param {String} currentStateName
					* @param {Object} currentStateParams
					* @return {Boolean}
					*/
					function areStatesEqual(item, currentStateName, currentStateParams) {
						// compare state
						if(!item.validStates || item.validStates.indexOf(currentStateName) < 0) {
							return false;
						}
						// compare state parameters
						// assumption: state params is a flat associative array of primitive data types 
						//				(no functions, no arrays, no nesting, etc)
						for(var i in item.stateParams) {
							if(!currentStateParams.hasOwnProperty(i) ||
								item.stateParams[i] !== currentStateParams[i]) {
								return false;
							}
						}
						return true;
					}

					/**
					* Sets all relevant items open/active/reveal properties
					*/
                    function setActiveItem() {
						// get hierarchy of selected state
                        var trail = getTrail($scope.items, $state.current.name, $stateParams);
						var len = trail.length;

						// set currently selected item as active
						if(len > 0) {
							var newCurrentItem = trail[len-1];
							setCurrentItem(newCurrentItem);
						}

						// loop through and set open/reveal, so the selected item is in view
						for(var i = 0; i < len; i += 1) {
							var activeItem = trail[i];
							if(activeItem.reveal && !activeItem.revealOpen) {
								activeItem.revealOpen = true;
							}
							if(!activeItem.isOpen) {
	                            activeItem.isOpen = true;
	                        }
						}

						// ensure children are no longer active
						if(len > 0 && trail[len-1].items) {
							unselect(trail[len-1].items);           
						} 
                    }

					/**
					* Deactivate the current item, and activate the given item
					* @param {Object} item, a nav item
					*/
					function setCurrentItem(item) {
						if(!item.header) {
							currentItem.active = false;
							currentItem = item;
							currentItem.active = true;
						}
					}

					/**
					* Open or close a reveal panel
					* @param {Object} item, a nav item
					* @param {String} $event, the event fired that triggered select()
					*/
					function toggleRevealPanel(item, $event) {
						// toggle the reveal state
						item.revealOpen = !item.revealOpen;

						// open the panel and go to its ui router state, if applicable
						if(item.revealOpen) {
							item.active = true;
							item.isOpen = true;

							if($scope.isStateful && item.state && $event !== "custom") {
								$state.go(item.state, item.stateParams || {});
							}
						// close the panel and go to its back state, if applicable
						} else {
							item.active = false;
							item.isOpen = false;

							if($scope.isStateful && item.backState && $event !== "custom") {
								$state.go(item.backState, item.backStateParams || {});
							}
						}
					}

					/**
					* Unselect all active/open/reveal options in the given items array
					* @param {Array[Object]} items, an array of nav items
					*/
					function unselect(items) {
						angular.forEach(items, function(item) {
							if(item.active) {
								item.active = false;
							}

							var itemHasActiveChildren = hasActiveChild(item);
							if(item.isOpen && !itemHasActiveChildren) {
								item.isOpen = false;
							}

							if(item.reveal && item.revealOpen && !hasActiveChild(item)) {
								item.revealOpen = false;
							}

							// drill down into any children
							if(item.items) {
								unselect(item.items);
							}
						});
					}

					/**
					* Check if the given root item has any active children by drilling down
					* @param {Object} root, nav item to drill down from
					* @return {Boolean}
					*/
					function hasActiveChild(root) {
						var activeChild = false;
						if(root.items) {
							var items = root.items;
							// loop through all children and break if an active one is found
							for(var i = 0, len = items.length; i < len; i += 1) {
								if(items[i].active) {
									activeChild = true;
									break;
								}
								// drill down if activeChild is still false
								activeChild = activeChild || hasActiveChild(items[i]);
							}
						}
						return activeChild;
					}
				}
			};
		}
	]);

(function(module) {
try {
  module = angular.module('x1.ui.side-navigation');
} catch (e) {
  module = angular.module('x1.ui.side-navigation', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('side-navigation/side-navigation.html',
    '<aside ng-show="isOpen" role="complementary" aria-labelledby="x1SideNavSecondary" class="x1-ui-side-navigation" aria-expanded="{{isOpen}}">\n' +
    '	<h2 id="x1SideNavSecondary" class="sr-only" translate="x1UiNgSideNavigation.ASIDE_SR_TEXT"></h2>\n' +
    '	<nav role="navigation" aria-label="{{\'x1UiNgSideNavigation.ARIA.NAV\' | translate}}" ng-include="\'side-navigation/side-navigation.items.html\'" onload="items=items"></nav>\n' +
    '	<ng-transclude></ng-transclude>\n' +
    '</aside>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.side-navigation');
} catch (e) {
  module = angular.module('x1.ui.side-navigation', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('side-navigation/side-navigation.items.html',
    '<accordion close-others="false" role="tablist">\n' +
    '	<accordion-group ng-if="!(item.header && item.items.length < 1)" ng-repeat="item in items" role="tabpanel" class="{{item.class}}" ng-class="{\'active\': item.items && item.level == 1 ? item.isOpen : item.active, \'reveal\': item.reveal,\n' +
    '			\'reveal-open\': item.revealOpen, \'include\': item.include, \'is-stateful\': $state.current.name === item.state}" is-open="item.isOpen" ng-click="select($event, item)" ng-keydown="select($event, item)" aria-label="{{item.name}}" aria-expanded="{{item.isOpen || false}}">\n' +
    '\n' +
    '		<accordion-heading role="tab" tabindex="0" aria-labelledby="{{item.id}}">\n' +
    '			<span ng-if="item.icon || item.revealOpen" aria-hidden="true" class="heading-icon text-center {{item.class}}">\n' +
    '				<span ng-class="{\'glyphicon glyphicon-{{item.icon}}\': item.icon,\n' +
    '						\'glyphicon glyphicon-chevron-left\': item.revealOpen}"></span>\n' +
    '			</span>\n' +
    '			<span ng-if="item.items && item.level > 1 && !item.reveal" aria-hidden="true" class="left-icon level{{item.level}} {{item.class}}">\n' +
    '				<span ng-class="{\'glyphicon glyphicon-chevron-right\': !item.isOpen, \n' +
    '						\'glyphicon glyphicon-chevron-down\': item.isOpen}"></span>\n' +
    '			</span>\n' +
    '			<span ng-if="!item.include" id="{{item.id}}" class="name level{{item.level}} {{item.class}}" title="{{item.name | translate}}">{{item.name | translate}}</span>\n' +
    '			<span ng-if="item.items && (item.reveal || item.level < 2) && !item.revealOpen && !item.include" aria-hidden="true" class="right-icon {{item.class}}">\n' +
    '				<span ng-class="{\'glyphicon glyphicon-chevron-down\': !item.isOpen && !item.reveal, \n' +
    '						\'glyphicon glyphicon-chevron-up\': item.isOpen, \n' +
    '						\'glyphicon glyphicon-chevron-right\': item.reveal}"></span>\n' +
    '			</span>\n' +
    '			<ng-include ng-if="item.include" src="item.include"></ng-include>\n' +
    '		</accordion-heading>\n' +
    '\n' +
    '		<ng-include ng-if="item.items" onload="items=item.items" src="\'side-navigation/side-navigation.items.html\'"></ng-include>\n' +
    '	</accordion-group>\n' +
    '</accordion>\n' +
    '');
}]);
})();
