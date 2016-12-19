/**
 *
 * Licensed Materials - Property of IBM
 *
 * top-navigation.module.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.top-navigation", [
		"pascalprecht.translate",
		"ui.bootstrap.dropdown",
		"ngSanitize"
	]);
/**
 *
 * Licensed Materials - Property of IBM
 *
 * top-navigation.constant.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.top-navigation")
	.constant("x1.ui.top-navigation.constant", {
		"EVENTS": {
			"brandClick": "x1.ui.top-navigation.brand.click",
			"hamburgerClick": "x1.ui.top-navigation.hamburger.click",
			"hamburgerEmit": "x1.ui.top-navigation.hamburger.emit"
		}
	});
/**
 *
 * Licensed Materials - Property of IBM
 *
 * top-navigation.directive.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.top-navigation")
	.directive("x1TopNavigation", ["$rootScope", "x1.ui.top-navigation.constant",
		function($rootScope, constant) {
			"use strict";

			return {
				restrict: "EA",
				transclude: true,
				templateUrl: "top-navigation/top-navigation.html",
				scope: {
					brand: "@",
					brandBadge: "@?",
					brandHref: "@?",
					hamburger: "=?",
					isHamburgerActive: "=?",
					isMobile: "=?",
					isFixed: "=?"
				},
				link: function($scope, ele) {
					/*
					* Mobile menu
					* */
					$scope.collapsed = true;

					$scope.toggleMobileMenu = function(){
						$scope.collapsed = !$scope.collapsed;
					};

					/*
					* Hamburger settings
					* */
					$scope.hamburgerClicked = $scope.isHamburgerActive || false;
					$scope.broadcastHamburgerClick = function(){
						$rootScope.$broadcast(constant.EVENTS.hamburgerClick);
						toggleHamburger();
					};
					var hamburgerListener = $rootScope.$on(constant.EVENTS.hamburgerEmit, toggleHamburger);

					function toggleHamburger(){
						$scope.hamburgerClicked =! $scope.hamburgerClicked;
					}

					// Destroy listener on DOM destroy
					// Not a hundo percent sure if required on $rootScope listeners
					// Better safe than memory leak :#)
					ele.on("$destroy", function(){
						hamburgerListener();
					});
					/*
					 * Brand settings
					 * */
					$scope.broadcastBrandClick = function() {
						$rootScope.$broadcast(constant.EVENTS.brandClick);
					};
				}
			};
		}]);
(function(module) {
try {
  module = angular.module('x1.ui.top-navigation');
} catch (e) {
  module = angular.module('x1.ui.top-navigation', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('top-navigation/top-navigation.html',
    '<header role="banner" aria-labelledby="x1TopNavBrand" class="x1-ui-top-navigation navbar navbar-inverse" ng-class="{\'navbar-fixed-top\':isFixed}"><div class="container-fluid"><div ng-if="hamburger || brand" class="navbar-header"><button ng-if="hamburger" type="button" role="button" ng-click="broadcastHamburgerClick()" class="btn-hamburger btn btn-link btn-sm pull-left" ng-class="{\'active\':hamburgerClicked}" aria-label="{{\'x1UiNgTopNavigation.ARIA.MENU_BTN\' | translate}}"><span class="sr-only" translate="x1UiNgTopNavigation.MENU_BTN_SR_TEXT"></span> <span class="glyphicon glyphicon-md glyphicon-menu-hamburger" title="{{\'x1UiNgTopNavigation.TITLE.MENU_BTN\' | translate}}" aria-hidden="true"></span></button><h1 id="x1TopNavBrand" class="navbar-brand" ng-click="broadcastBrandClick()" ng-class="{\'no-hamburger\': !hamburger}"><a ng-if="brand" ng-href="{{brandHref ? brandHref : \'#\'}}" ng-bind-html="brand"></a> <span ng-if="brandBadge" class="badge">{{brandBadge}}</span></h1><button ng-if="isMobile" type="button" role="button" class="btn-mobile navbar-text pull-right navbar-toggle" ng-class="{\'collapsed\': collapsed}" aria-expanded="{{!collapsed}}" ng-click="toggleMobileMenu()" aria-label="{{\'x1UiNgTopNavigation.ARIA.MOBILE_BTN\' | translate}}"><span class="sr-only" translate="x1UiNgTopNavigation.MOBILE_MENU_BTN_SR_TEXT"></span> <span ng-if="!hamburger" aria-hidden="true" title="{{\'x1UiNgTopNavigation.TITLE.MOBILE_BTN\' | translate}}" class="glyphicon glyphicon-md glyphicon-menu-hamburger"></span> <span ng-if="collapsed && hamburger" translate="x1UiNgTopNavigation.MOBILE_MENU_EXPAND_TEXT"></span> <span ng-if="!collapsed && hamburger" translate="x1UiNgTopNavigation.MOBILE_MENU_COLLAPSE_TEXT"></span></button></div><nav ng-transclude="" class="collapse navbar-collapse" ng-class="{\'in\': !collapsed}" aria-expanded="{{!collapsed}}" role="navigation" aria-label="{{\'x1UiNgTopNavigation.ARIA.NAV\' | translate}}"></nav></div></header>');
}]);
})();
