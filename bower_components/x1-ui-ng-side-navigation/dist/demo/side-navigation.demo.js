/**
 *
 * Licensed Materials – Property of IBM
 *
 * demo.module.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.demo", [
		"ui.router",
		"x1.ui.side-navigation.demo"
	]);
/**
 *
 * Licensed Materials – Property of IBM
 *
 * side-navigation.demo.module.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.side-navigation.demo", [
		"prism",
		"x1.ui.demo-generator",
		"x1.ui.side-navigation"
	])
	.config(["$stateProvider", "$urlRouterProvider", "$translateProvider",
		function($stateProvider, $urlRouterProvider, $translateProvider) {
			"use strict";

			// Register a loader for the static files
			// So, the module will search missing translation tables under the specified urls.
			// Those urls are [prefix][langKey][suffix].
			$translateProvider.useStaticFilesLoader({
				prefix: "l10n/",
				suffix: ".json"
			});

			// Tell the module what language to use by default
			$translateProvider.preferredLanguage("en_US");
			$translateProvider.useSanitizeValueStrategy("escaped");

			$stateProvider.state("side-navigation", {
				url: "/side-navigation",
				templateUrl: "side-navigation/side-navigation.demo.html",
				controller: "sideNavDemoCtrl"
			});

			$urlRouterProvider.otherwise("/side-navigation");
		}
	])
	.controller("sideNavDemoCtrl", ["$scope", "$filter", "x1.ui.side-navigation.constant",
		function($scope, $filter, sideNavConstants) {
			"use strict";

			$scope.isSideNavOpen = true;
			$scope.clickItemName = "<TBD>";

			$scope.toggleMenu = function() {
				$scope.isSideNavOpen = !$scope.isSideNavOpen;
			};
			
			$scope.$on(sideNavConstants.EVENTS.sideNavItemClicked, function(e, item) {
				$scope.clickItemName = item.name;
			});	 

			$scope.navItems = [
				{
					"name": $filter("translate")("x1UiNgSideNavigationDemo.EXAMPLE1.UNDERSTAND"),
					"id": "understand",
					"class": "understand",
					"icon": "lightbulb",
					"header": true,
					"isOpen": true,
					"active": true,
					"items": [
						{
							"name": "Lorem ipsum 1 long title test example",
							"state": "loremipsum1",
							"stateParams": {"param1": "1", "param2": "2"},
							"id": "loremipsum1",
							"class": "loremipsum1",
							"validStates" : ["loremipsum1"]
						},
						{
							"name": "Lorem ipsum 2",
							"state": "loremipsum2",
							"stateParams": {"param1": "uno", "param2": "dos"},
							"id": "loremipsum2",
							"class": "loremipsum2",
							"validStates" : ["loremipsum2"],
							"items": [
								{
									"name": "Child 1",
									"state": "child1",
									"id": "child1",
									"class": "child1",
									"items": [
										{
											"name": "Grandchild 1",
											"state": "grandchild1",
											"id": "grandchild1",
											"class": "grandchild1"
										},
										{
											"name": "Grandchild 2",
											"state": "grandchild2",
											"id": "grandchild2",
											"class": "grandchild2"
										}
									]
								},
								{
									"name": "Child 2",
									"state": "child2",
									"id": "child2",
									"class": "child2",
									"items": [
										{
											"name": "Grandchild 3",
											"state": "grandchild3",
											"id": "grandchild3",
											"class": "grandchild3"
										}
									]
								},
								{
									"name": "Child 3",
									"state": "child3",
									"id": "child3",
									"class": "child3"
								}
							]
						},
						{
							"name": "Lorem ipsum 3",
							"state": "loremipsum3",
							"id": "loremipsum3",
							"class": "loremipsum3",
							"validStates" : ["loremipsum3"]
						}
					]
				},
				{
					"name": $filter("translate")("x1UiNgSideNavigationDemo.EXAMPLE1.PLAN"),
					"id": "plan",
					"class": "plan",
					"icon": "gears-fill",
					"header": true,
					"isOpen": true,
					"items": [
						{
							"name": "Lorem ipsum 4",
							"state": "loremipsum4",
							"id": "loremipsum4",
							"class": "loremipsum4"
						},
						{
							"name": "Lorem ipsum 5",
							"state": "loremipsum5",
							"id": "loremipsum5",
							"class": "loremipsum5"
						},
						{
							"name": "External link",
							"externalLink": "http://www.ibm.com",
							"id": "externallink1",
							"class": "externallink1"
						}
					]
				},
				{
					"name": $filter("translate")("x1UiNgSideNavigationDemo.EXAMPLE1.DESIGN"),
					"id": "design",
					"class": "design",
					"icon": "lightbulb",
					"header": true,
					"items": [
						{
							"name": "Lorem ipsum 6",
							"state": "loremipsum6",
							"id": "loremipsum6",
							"class": "loremipsum6"
						}
					]
				},
				{
					"name": $filter("translate")("x1UiNgSideNavigationDemo.EXAMPLE1.BUILD"),
					"id": "build",
					"class": "build",
					"icon": "tools-fill",
					"header": true,
					"items": [
						{
							"name": "Lorem ipsum 7",
							"state": "loremipsum7",
							"id": "loremipsum7",
							"class": "loremipsum7"
						}
					]
				},
				{
					"name": $filter("translate")("x1UiNgSideNavigationDemo.EXAMPLE1.OPTIMIZE"),
					"state": "optimize",
					"stateParams": {"param1": "ein", "param2": "zwei"},
					"id": "optimize",
					"class": "optimize",
					"icon": "stats",
					"header": true,
					"items": [
						{
							"name": "Analytics",
							"state": "optimize.analytics",
							"id": "analytics",
							"class": "analytics",
							"reveal": true,
							"backState": "optimize",
							"backStateParams": {"param1": "ein", "param2": "zwei"},
							"items": [
								{
									"include": "side-navigation/side-navigation-sub-template.html",
									"id": "analytics-template",
									"name": "Analytics Template"
								}
							]
						},
						{
							"name": "Reveal with children",
							"state": "optimize.reveal",
							"id": "reveal",
							"class": "reveal",
							"reveal": true,
							"backState": "optimize",
							"backStateParams": {"param1": "ein", "param2": "zwei"},
							"items": [
								{
									"name": "Reveal child 1",
									"state": "revealchild1",
									"id": "revealchild1",
									"class": "revealchild1",
									"items": [
										{
											"name": "Reveal grandchild 1",
											"state": "revealgrandchild1",
											"id": "revealgrandchild1",
											"class": "revealgrandchild1"
										}
									]
								},
								{
									"name": "Reveal child 2",
									"state": "revealchild2",
									"id": "revealchild2",
									"class": "revealchild2"
								},
								{
									"name": "Reveal child 3",
									"state": "revealchild3",
									"id": "revealchild3",
									"class": "revealchild3"
								}
							]
						},
						{
							"name": "Lorem ipsum 8",
							"state": "loremipsum8",
							"id": "loremipsum8",
							"class": "loremipsum8"
						},
						{
							"name": "Lorem ipsum 9",
							"state": "loremipsum9",
							"id": "loremipsum9",
							"class": "loremipsum9"
						},
						{
							"name": "Lorem ipsum 10",
							"state": "loremipsum10",
							"id": "loremipsum10",
							"class": "loremipsum10"
						}
					]
				}
			];
		}
	]);

angular
	.module("prism", [])
	.directive("prism", [function() {
			return {
				restrict: "A",
				link: function($scope, element) {
					element.ready(function() {
						Prism.highlightElement(element[0]);
					});
				}
			};
		}]
	);
(function(module) {
try {
  module = angular.module('x1.ui.side-navigation');
} catch (e) {
  module = angular.module('x1.ui.side-navigation', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('side-navigation/index.rtl.html',
    '<!DOCTYPE html>\n' +
    '<html ng-app="x1.ui.demo">\n' +
    '<head>\n' +
    '	<title>Side Navigation</title>\n' +
    '	<link rel="stylesheet" href="vendor/vendor.css">\n' +
    '	<link rel="stylesheet" href="../x1-ui-ng-side-navigation.css">\n' +
    '	<link rel="stylesheet" href="../x1-ui-ng-side-navigation.rtl.css">\n' +
    '	<link rel="stylesheet" href="side-navigation.demo.css">\n' +
    '</head>\n' +
    '<body dir="rtl">\n' +
    '<section ui-view class="container"></section>\n' +
    '<script type="text/javascript" src="vendor/vendor.js"></script>\n' +
    '<script type="text/javascript" src="../x1-ui-ng-side-navigation.js"></script>\n' +
    '<script type="text/javascript" src="side-navigation.demo.js"></script>\n' +
    '</body>\n' +
    '</html>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.side-navigation');
} catch (e) {
  module = angular.module('x1.ui.side-navigation', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('side-navigation/side-navigation-sub-template.html',
    '<p class="sub-template">This is a sample sub template which can be included in	the side\n' +
    '	navigation.</p>\n' +
    '<p class="sub-template">This is a sample sub template which can be included in	the side\n' +
    '	navigation.</p>\n' +
    '<p class="sub-template">This is a sample sub template which can be included in	the side\n' +
    '	navigation.</p>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.side-navigation');
} catch (e) {
  module = angular.module('x1.ui.side-navigation', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('side-navigation/side-navigation.demo.html',
    '<x1-demo-generator doc-src="\'side-navigation/side-navigation.doc.html\'" repo-name="x1-ui-ng-side-navigation" class="x1-ui-side-navigation-demo">\n' +
    '	<div class="row">\n' +
    '		<div class="col-sm-6" ng-include="\'side-navigation/examples/basic.demo.html\'"></div>\n' +
    '		<div class="col-sm-6" ng-include="\'side-navigation/examples/custom.demo.html\'"></div>\n' +
    '	</div>\n' +
    '	<div class="row">\n' +
    '		<div class="col-sm-12" ng-include="\'side-navigation/examples/stateful.demo.html\'"></div>\n' +
    '	</div>\n' +
    '</x1-demo-generator>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.side-navigation');
} catch (e) {
  module = angular.module('x1.ui.side-navigation', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('side-navigation/side-navigation.doc.html',
    '<h3 class="page-header">Bower dependencies</h3>\n' +
    '<ul>\n' +
    '	<li>angular</li>\n' +
    '	<li>angular-animate</li>\n' +
    '	<li>angular-bootstrap</li>\n' +
    '	<li>angular-ui-router</li>\n' +
    '	<li>angular-translate</li>\n' +
    '	<li>angular-translate-loader-static-files</li>\n' +
    '	<li>x1-ui-bootstrap</li>\n' +
    '</ul>\n' +
    '\n' +
    '<h3 class="page-header">Attribute options for <code>&lt;x1-side-navigation&gt;</code></h3>\n' +
    '<div class="table-responsive">\n' +
    '	<table class="table table-striped table-condensed">\n' +
    '		<thead>\n' +
    '		<tr>\n' +
    '			<th>Property</th>\n' +
    '			<th>Description</th>\n' +
    '			<th>Required</th>\n' +
    '			<th>Default value</th>\n' +
    '			<th>Accepted values/type</th>\n' +
    '		</tr>\n' +
    '		</thead>\n' +
    '		<tbody>\n' +
    '		<tr>\n' +
    '			<td>is-open</td>\n' +
    '			<td>Toggles the visibility with a slide animation.</td>\n' +
    '			<td>true</td>\n' +
    '			<td>false</td>\n' +
    '			<td>boolean</td>\n' +
    '		</tr>\n' +
    '		<tr>\n' +
    '			<td>items</td>\n' +
    '			<td>Navigation/tree items displayed.</td>\n' +
    '			<td>false</td>\n' +
    '			<td>undefined</td>\n' +
    '			<td>array</td>\n' +
    '		</tr>\n' +
    '		<tr>\n' +
    '			<td>is-stateful</td>\n' +
    '			<td>Listens to the router state change and selects the appropriate\n' +
    '				side navigation item.</td>\n' +
    '			<td>false</td>\n' +
    '			<td>false</td>\n' +
    '			<td>boolean</td>\n' +
    '		</tr>\n' +
    '		<tr>\n' +
    '			<td>select-header-child</td>\n' +
    '			<td>If set, when a header item is opened and there is no current selection, \n' +
    '				the header\'s first child will automatically be selected.</td>\n' +
    '			<td>false</td>\n' +
    '			<td>false</td>\n' +
    '			<td>boolean</td>\n' +
    '		</tr>\n' +
    '		</tbody>\n' +
    '	</table>\n' +
    '</div>\n' +
    '\n' +
    '<h3 class="page-header">Events</h3>\n' +
    '<p>Include <code>x1.ui.side-navigation.constant</code> in your controller to access the events\n' +
    '	listed below.</p>\n' +
    '<div class="table-responsive">\n' +
    '	<table class="table table-striped table-condensed">\n' +
    '		<thead>\n' +
    '		<tr>\n' +
    '			<th>Constant</th>\n' +
    '			<th>Name</th>\n' +
    '			<th>Description</th>\n' +
    '		</tr>\n' +
    '		</thead>\n' +
    '		<tbody>\n' +
    '		<tr>\n' +
    '			<td>[yourSideNavConstantRef].EVENTS.sideNavOpened</td>\n' +
    '			<td>"x1.ui.side-navigation.opened"</td>\n' +
    '			<td>Event that will <code>$rootScope.$broadcast</code> when the side\n' +
    '				navigation has been made visible to the user (after animation is\n' +
    '				complete).</td>\n' +
    '		</tr>\n' +
    '		<tr>\n' +
    '			<td>[yourSideNavConstantRef].EVENTS.sideNavClosed</td>\n' +
    '			<td>"x1.ui.side-navigation.closed"</td>\n' +
    '			<td>Event that will <code>$rootScope.$broadcast</code> when the side\n' +
    '				navigation has been made hidden from the user (after animation is\n' +
    '				complete).</td>\n' +
    '		</tr>\n' +
    '		<tr>\n' +
    '			<td>[yourSideNavConstantRef].EVENTS.sideNavItemClicked</td>\n' +
    '			<td>"x1.ui.side-navigation.item.clicked"</td>\n' +
    '			<td>Event that will <code>$rootScope.$broadcast</code> when a side\n' +
    '				navigation item has been clicked. The payload is the item object.</td>\n' +
    '		</tr>\n' +
    '		</tbody>\n' +
    '	</table>\n' +
    '</div>\n' +
    '\n' +
    '<h3 class="page-header">Internationalization variables</h3>\n' +
    '<div class="highlight">\n' +
    '	<pre>\n' +
    '		<code class="language-javascript" prism>{\n' +
    '	&quot;x1UiNgSideNavigation&quot;: {\n' +
    '		&quot;ASIDE_SR_TEXT&quot;: &quot;Secondary navigation&quot;,\n' +
    '		&quot;ARIA&quot;: {\n' +
    '			&quot;NAV&quot;: &quot;Secondary navigation menu&quot;\n' +
    '		}\n' +
    '	}\n' +
    '}</code>\n' +
    '	</pre>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.side-navigation');
} catch (e) {
  module = angular.module('x1.ui.side-navigation', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('side-navigation/examples/basic.demo.html',
    '<h3 class="page-header">Basic Side Navigation</h3>\n' +
    '<p>Include an array of navigation items and a toggle variable to create an animating tree\n' +
    '	navigation component. Selecting a header will activate the first child (ie: select-header-child is true).</p>\n' +
    '<div class="bs-example">\n' +
    '	<button class="nav-demo-btn btn btn-primary" ng-click="toggleMenu()" translate="x1UiNgSideNavigationDemo.EXAMPLE1.TOGGLE_BTN"></button>\n' +
    '	<span class="nav-demo-click-event">"item.clicked" event triggered on item with name: <b>{{clickItemName | translate}}</b></span>\n' +
    '	<div class="x1-navigation-wrap">\n' +
    '		<x1-side-navigation is-open="isSideNavOpen" items="navItems" select-header-child="true"></x1-side-navigation>\n' +
    '	</div>\n' +
    '</div>\n' +
    '<tabset>\n' +
    '	<tab heading="HTML">\n' +
    '		<div class="highlight">\n' +
    '			<pre>\n' +
    '				<code class="language-markup" prism>&lt;button class=&quot;nav-demo-btn btn btn-primary&quot; ng-click=&quot;toggleMenu()&quot;\n' +
    '		translate=&quot;x1UiNgSideNavigationDemo.EXAMPLE1.TOGGLE_BTN&quot;&gt;&lt;/button&gt;\n' +
    '&lt;div class=&quot;x1-navigation-wrap&quot;&gt;\n' +
    '	&lt;x1-side-navigation is-open=&quot;isSideNavOpen&quot; items=&quot;navItems&quot; select-header-child=&quot;true&quot;&gt;&lt;/x1-side-navigation&gt;\n' +
    '&lt;/div&gt;</code>\n' +
    '			</pre>\n' +
    '		</div>\n' +
    '	</tab>\n' +
    '	<tab heading="JS">\n' +
    '		<div class="highlight">\n' +
    '			<pre>\n' +
    '				<code class="language-javascript" prism>angular\n' +
    '	.module(&quot;x1.ui.side-navigation.demo&quot;)\n' +
    '	.controller(&quot;sideNavigationDemoCtrl&quot;, [&quot;$scope&quot;, &quot;$filter&quot;,\n' +
    '		function($scope, $filter) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			$scope.isSideNavOpen = true;\n' +
    '\n' +
    '			$scope.toggleMenu = function() {\n' +
    '				$scope.isSideNavOpen = !$scope.isSideNavOpen;\n' +
    '			};\n' +
    '\n' +
    '			$scope.navItems = [\n' +
    '				{\n' +
    '					&quot;name&quot;: $filter(&quot;translate&quot;)(&quot;x1UiNgSideNavigationDemo.EXAMPLE1.UNDERSTAND&quot;),\n' +
    '					&quot;id&quot;: &quot;understand&quot;,\n' +
    '					&quot;class&quot;: &quot;understand&quot;,\n' +
    '					&quot;icon&quot;: &quot;lightbulb&quot;,\n' +
    '					&quot;header&quot;: true,\n' +
    '					&quot;isOpen&quot;: true,\n' +
    '					&quot;active&quot;: true,\n' +
    '					&quot;items&quot;: [\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Lorem ipsum 1 long title test example&quot;,\n' +
    '							&quot;state&quot;: &quot;loremipsum1&quot;,\n' +
    '							&quot;stateParams&quot;: {&quot;param1&quot;: &quot;1&quot;, &quot;param2&quot;: &quot;2&quot;},\n' +
    '							&quot;id&quot;: &quot;loremipsum1&quot;,\n' +
    '							&quot;class&quot;: &quot;loremipsum1&quot;,\n' +
    '							&quot;validStates&quot; : [&quot;loremipsum1&quot;]\n' +
    '						},\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Lorem ipsum 2&quot;,\n' +
    '							&quot;state&quot;: &quot;loremipsum2&quot;,\n' +
    '							&quot;stateParams&quot;: {&quot;param1&quot;: &quot;uno&quot;, &quot;param2&quot;: &quot;dos&quot;},\n' +
    '							&quot;id&quot;: &quot;loremipsum2&quot;,\n' +
    '							&quot;class&quot;: &quot;loremipsum2&quot;,\n' +
    '							&quot;validStates&quot; : [&quot;loremipsum2&quot;],\n' +
    '							&quot;items&quot;: [\n' +
    '								{\n' +
    '									&quot;name&quot;: &quot;Child 1&quot;,\n' +
    '									&quot;state&quot;: &quot;child1&quot;,\n' +
    '									&quot;id&quot;: &quot;child1&quot;,\n' +
    '									&quot;class&quot;: &quot;child1&quot;,\n' +
    '									&quot;items&quot;: [\n' +
    '										{\n' +
    '											&quot;name&quot;: &quot;Grandchild 1&quot;,\n' +
    '											&quot;state&quot;: &quot;grandchild1&quot;,\n' +
    '											&quot;id&quot;: &quot;grandchild1&quot;,\n' +
    '											&quot;class&quot;: &quot;grandchild1&quot;\n' +
    '										},\n' +
    '										{\n' +
    '											&quot;name&quot;: &quot;Grandchild 2&quot;,\n' +
    '											&quot;state&quot;: &quot;grandchild2&quot;,\n' +
    '											&quot;id&quot;: &quot;grandchild2&quot;,\n' +
    '											&quot;class&quot;: &quot;grandchild2&quot;\n' +
    '										}\n' +
    '									]\n' +
    '								},\n' +
    '								{\n' +
    '									&quot;name&quot;: &quot;Child 2&quot;,\n' +
    '									&quot;state&quot;: &quot;child2&quot;,\n' +
    '									&quot;id&quot;: &quot;child2&quot;,\n' +
    '									&quot;class&quot;: &quot;child2&quot;,\n' +
    '									&quot;items&quot;: [\n' +
    '										{\n' +
    '											&quot;name&quot;: &quot;Grandchild 3&quot;,\n' +
    '											&quot;state&quot;: &quot;grandchild3&quot;,\n' +
    '											&quot;id&quot;: &quot;grandchild3&quot;,\n' +
    '											&quot;class&quot;: &quot;grandchild3&quot;\n' +
    '										}\n' +
    '									]\n' +
    '								},\n' +
    '								{\n' +
    '									&quot;name&quot;: &quot;Child 3&quot;,\n' +
    '									&quot;state&quot;: &quot;child3&quot;,\n' +
    '									&quot;id&quot;: &quot;child3&quot;,\n' +
    '									&quot;class&quot;: &quot;child3&quot;\n' +
    '								}\n' +
    '							]\n' +
    '						},\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Lorem ipsum 3&quot;,\n' +
    '							&quot;state&quot;: &quot;loremipsum3&quot;,\n' +
    '							&quot;id&quot;: &quot;loremipsum3&quot;,\n' +
    '							&quot;class&quot;: &quot;loremipsum3&quot;,\n' +
    '							&quot;validStates&quot; : [&quot;loremipsum3&quot;]\n' +
    '						}\n' +
    '					]\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;name&quot;: $filter(&quot;translate&quot;)(&quot;x1UiNgSideNavigationDemo.EXAMPLE1.PLAN&quot;),\n' +
    '					&quot;id&quot;: &quot;plan&quot;,\n' +
    '					&quot;class&quot;: &quot;plan&quot;,\n' +
    '					&quot;icon&quot;: &quot;gears-fill&quot;,\n' +
    '					&quot;header&quot;: true,\n' +
    '					&quot;isOpen&quot;: true,\n' +
    '					&quot;items&quot;: [\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Lorem ipsum 4&quot;,\n' +
    '							&quot;state&quot;: &quot;loremipsum4&quot;,\n' +
    '							&quot;id&quot;: &quot;loremipsum4&quot;,\n' +
    '							&quot;class&quot;: &quot;loremipsum4&quot;\n' +
    '						},\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Lorem ipsum 5&quot;,\n' +
    '							&quot;state&quot;: &quot;loremipsum5&quot;,\n' +
    '							&quot;id&quot;: &quot;loremipsum5&quot;,\n' +
    '							&quot;class&quot;: &quot;loremipsum5&quot;\n' +
    '						},\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;External link&quot;,\n' +
    '							&quot;externalLink&quot;: &quot;http://www.ibm.com&quot;,\n' +
    '							&quot;id&quot;: &quot;externallink1&quot;,\n' +
    '							&quot;class&quot;: &quot;externallink1&quot;\n' +
    '						}\n' +
    '					]\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;name&quot;: $filter(&quot;translate&quot;)(&quot;x1UiNgSideNavigationDemo.EXAMPLE1.DESIGN&quot;),\n' +
    '					&quot;id&quot;: &quot;design&quot;,\n' +
    '					&quot;class&quot;: &quot;design&quot;,\n' +
    '					&quot;icon&quot;: &quot;lightbulb&quot;,\n' +
    '					&quot;header&quot;: true,\n' +
    '					&quot;items&quot;: [\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Lorem ipsum 6&quot;,\n' +
    '							&quot;state&quot;: &quot;loremipsum6&quot;,\n' +
    '							&quot;id&quot;: &quot;loremipsum6&quot;,\n' +
    '							&quot;class&quot;: &quot;loremipsum6&quot;\n' +
    '						}\n' +
    '					]\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;name&quot;: $filter(&quot;translate&quot;)(&quot;x1UiNgSideNavigationDemo.EXAMPLE1.BUILD&quot;),\n' +
    '					&quot;id&quot;: &quot;build&quot;,\n' +
    '					&quot;class&quot;: &quot;build&quot;,\n' +
    '					&quot;icon&quot;: &quot;tools-fill&quot;,\n' +
    '					&quot;header&quot;: true,\n' +
    '					&quot;items&quot;: [\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Lorem ipsum 7&quot;,\n' +
    '							&quot;state&quot;: &quot;loremipsum7&quot;,\n' +
    '							&quot;id&quot;: &quot;loremipsum7&quot;,\n' +
    '							&quot;class&quot;: &quot;loremipsum7&quot;\n' +
    '						}\n' +
    '					]\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;name&quot;: $filter(&quot;translate&quot;)(&quot;x1UiNgSideNavigationDemo.EXAMPLE1.OPTIMIZE&quot;),\n' +
    '					&quot;state&quot;: &quot;optimize&quot;,\n' +
    '					&quot;stateParams&quot;: {&quot;param1&quot;: &quot;ein&quot;, &quot;param2&quot;: &quot;zwei&quot;},\n' +
    '					&quot;id&quot;: &quot;optimize&quot;,\n' +
    '					&quot;class&quot;: &quot;optimize&quot;,\n' +
    '					&quot;icon&quot;: &quot;stats&quot;,\n' +
    '					&quot;header&quot;: true,\n' +
    '					&quot;items&quot;: [\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Analytics&quot;,\n' +
    '							&quot;state&quot;: &quot;optimize.analytics&quot;,\n' +
    '							&quot;id&quot;: &quot;analytics&quot;,\n' +
    '							&quot;class&quot;: &quot;analytics&quot;,\n' +
    '							&quot;reveal&quot;: true,\n' +
    '							&quot;backState&quot;: &quot;optimize&quot;,\n' +
    '							&quot;backStateParams&quot;: {&quot;param1&quot;: &quot;ein&quot;, &quot;param2&quot;: &quot;zwei&quot;},\n' +
    '							&quot;items&quot;: [\n' +
    '								{\n' +
    '									&quot;include&quot;: &quot;side-navigation/side-navigation-sub-template.html&quot;,\n' +
    '									&quot;id&quot;: &quot;analytics-template&quot;,\n' +
    '									&quot;name&quot;: &quot;Analytics Template&quot;\n' +
    '								}\n' +
    '							]\n' +
    '						},\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Reveal with children&quot;,\n' +
    '							&quot;state&quot;: &quot;optimize.reveal&quot;,\n' +
    '							&quot;id&quot;: &quot;reveal&quot;,\n' +
    '							&quot;class&quot;: &quot;reveal&quot;,\n' +
    '							&quot;reveal&quot;: true,\n' +
    '							&quot;backState&quot;: &quot;optimize&quot;,\n' +
    '							&quot;backStateParams&quot;: {&quot;param1&quot;: &quot;ein&quot;, &quot;param2&quot;: &quot;zwei&quot;},\n' +
    '							&quot;items&quot;: [\n' +
    '								{\n' +
    '									&quot;name&quot;: &quot;Reveal child 1&quot;,\n' +
    '									&quot;state&quot;: &quot;revealchild1&quot;,\n' +
    '									&quot;id&quot;: &quot;revealchild1&quot;,\n' +
    '									&quot;class&quot;: &quot;revealchild1&quot;,\n' +
    '									&quot;items&quot;: [\n' +
    '										{\n' +
    '											&quot;name&quot;: &quot;Reveal grandchild 1&quot;,\n' +
    '											&quot;state&quot;: &quot;revealgrandchild1&quot;,\n' +
    '											&quot;id&quot;: &quot;revealgrandchild1&quot;,\n' +
    '											&quot;class&quot;: &quot;revealgrandchild1&quot;\n' +
    '										}\n' +
    '									]\n' +
    '								},\n' +
    '								{\n' +
    '									&quot;name&quot;: &quot;Reveal child 2&quot;,\n' +
    '									&quot;state&quot;: &quot;revealchild2&quot;,\n' +
    '									&quot;id&quot;: &quot;revealchild2&quot;,\n' +
    '									&quot;class&quot;: &quot;revealchild2&quot;\n' +
    '								},\n' +
    '								{\n' +
    '									&quot;name&quot;: &quot;Reveal child 3&quot;,\n' +
    '									&quot;state&quot;: &quot;revealchild3&quot;,\n' +
    '									&quot;id&quot;: &quot;revealchild3&quot;,\n' +
    '									&quot;class&quot;: &quot;revealchild3&quot;\n' +
    '								}\n' +
    '							]\n' +
    '						},\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Lorem ipsum 8&quot;,\n' +
    '							&quot;state&quot;: &quot;loremipsum8&quot;,\n' +
    '							&quot;id&quot;: &quot;loremipsum8&quot;,\n' +
    '							&quot;class&quot;: &quot;loremipsum8&quot;\n' +
    '						},\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Lorem ipsum 9&quot;,\n' +
    '							&quot;state&quot;: &quot;loremipsum9&quot;,\n' +
    '							&quot;id&quot;: &quot;loremipsum9&quot;,\n' +
    '							&quot;class&quot;: &quot;loremipsum9&quot;\n' +
    '						},\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Lorem ipsum 10&quot;,\n' +
    '							&quot;state&quot;: &quot;loremipsum10&quot;,\n' +
    '							&quot;id&quot;: &quot;loremipsum10&quot;,\n' +
    '							&quot;class&quot;: &quot;loremipsum10&quot;\n' +
    '						}\n' +
    '					]\n' +
    '				}\n' +
    '			];\n' +
    '		}]);</code>\n' +
    '			</pre>\n' +
    '		</div>\n' +
    '	</tab>\n' +
    '</tabset>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.side-navigation');
} catch (e) {
  module = angular.module('x1.ui.side-navigation', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('side-navigation/examples/custom.demo.html',
    '<h3 class="page-header">Side Navigation with custom content</h3>\n' +
    '<p>Opt out of the built-in tree navigation design by transcluding custom content to display\n' +
    '	inside the side navigation container.</p>\n' +
    '<div class="bs-example">\n' +
    '	<div class="x1-navigation-wrap">\n' +
    '		<x1-side-navigation is-open="true">\n' +
    '			<p class="sub-template-2" translate="x1UiNgSideNavigationDemo.EXAMPLE2.TEXT"></p>\n' +
    '		</x1-side-navigation>\n' +
    '	</div>\n' +
    '</div>\n' +
    '<div class="highlight">\n' +
    '	<pre>\n' +
    '		<code class="language-markup" prism>&lt;div class=&quot;x1-navigation-wrap&quot;&gt;\n' +
    '	&lt;x1-side-navigation is-open=&quot;true&quot;&gt;\n' +
    '		&lt;p class=&quot;sub-template-2&quot; translate=&quot;x1UiNgSideNavigationDemo.EXAMPLE2.TEXT&quot;&gt;&lt;/p&gt;\n' +
    '	&lt;/x1-side-navigation&gt;\n' +
    '&lt;/div&gt;</code>\n' +
    '	</pre>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.side-navigation');
} catch (e) {
  module = angular.module('x1.ui.side-navigation', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('side-navigation/examples/stateful.demo.html',
    '<h3 class="page-header">Stateful Side Navigation</h3>\n' +
    '<p>The stateful side navigation listens to the changes in the router state and selects the\n' +
    '	appropriate item in the side navigation.</p>\n' +
    '<div class="bs-example">\n' +
    '	<div class="x1-navigation-wrap">\n' +
    '		<x1-side-navigation is-open="true" items="navItems" is-stateful="true"></x1-side-navigation>\n' +
    '	</div>\n' +
    '</div>\n' +
    '<tabset>\n' +
    '	<tab heading="HTML">\n' +
    '		<div class="highlight">\n' +
    '			<pre>\n' +
    '				<code class="language-markup" prism>&lt;div class=&quot;x1-navigation-wrap&quot;&gt;\n' +
    '	&lt;x1-side-navigation is-open=&quot;true&quot; items=&quot;navItems&quot; is-stateful=&quot;true&quot;&gt;&lt;/x1-side-navigation&gt;\n' +
    '&lt;/div&gt;</code>\n' +
    '			</pre>\n' +
    '		</div>\n' +
    '	</tab>\n' +
    '	<tab heading="JS">\n' +
    '		<div class="highlight">\n' +
    '			<pre>\n' +
    '				<code class="language-javascript" prism>angular\n' +
    '	.module(&quot;x1.ui.side-navigation.demo&quot;)\n' +
    '	.controller(&quot;sideNavigationDemoCtrl&quot;, [&quot;$scope&quot;, &quot;$filter&quot;,\n' +
    '		function($scope, $filter) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			$scope.navItems = [\n' +
    '				{\n' +
    '					&quot;name&quot;: $filter(&quot;translate&quot;)(&quot;x1UiNgSideNavigationDemo.EXAMPLE1.UNDERSTAND&quot;),\n' +
    '					&quot;id&quot;: &quot;understand&quot;,\n' +
    '					&quot;class&quot;: &quot;understand&quot;,\n' +
    '					&quot;icon&quot;: &quot;lightbulb&quot;,\n' +
    '					&quot;header&quot;: true,\n' +
    '					&quot;isOpen&quot;: true,\n' +
    '					&quot;active&quot;: true,\n' +
    '					&quot;items&quot;: [\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Lorem ipsum 1 long title test example&quot;,\n' +
    '							&quot;state&quot;: &quot;loremipsum1&quot;,\n' +
    '							&quot;stateParams&quot;: {&quot;param1&quot;: &quot;1&quot;, &quot;param2&quot;: &quot;2&quot;},\n' +
    '							&quot;id&quot;: &quot;loremipsum1&quot;,\n' +
    '							&quot;class&quot;: &quot;loremipsum1&quot;,\n' +
    '							&quot;validStates&quot; : [&quot;loremipsum1&quot;]\n' +
    '						},\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Lorem ipsum 2&quot;,\n' +
    '							&quot;state&quot;: &quot;loremipsum2&quot;,\n' +
    '							&quot;stateParams&quot;: {&quot;param1&quot;: &quot;uno&quot;, &quot;param2&quot;: &quot;dos&quot;},\n' +
    '							&quot;id&quot;: &quot;loremipsum2&quot;,\n' +
    '							&quot;class&quot;: &quot;loremipsum2&quot;,\n' +
    '							&quot;validStates&quot; : [&quot;loremipsum2&quot;],\n' +
    '							&quot;items&quot;: [\n' +
    '								{\n' +
    '									&quot;name&quot;: &quot;Child 1&quot;,\n' +
    '									&quot;state&quot;: &quot;child1&quot;,\n' +
    '									&quot;id&quot;: &quot;child1&quot;,\n' +
    '									&quot;class&quot;: &quot;child1&quot;,\n' +
    '									&quot;items&quot;: [\n' +
    '										{\n' +
    '											&quot;name&quot;: &quot;Grandchild 1&quot;,\n' +
    '											&quot;state&quot;: &quot;grandchild1&quot;,\n' +
    '											&quot;id&quot;: &quot;grandchild1&quot;,\n' +
    '											&quot;class&quot;: &quot;grandchild1&quot;\n' +
    '										},\n' +
    '										{\n' +
    '											&quot;name&quot;: &quot;Grandchild 2&quot;,\n' +
    '											&quot;state&quot;: &quot;grandchild2&quot;,\n' +
    '											&quot;id&quot;: &quot;grandchild2&quot;,\n' +
    '											&quot;class&quot;: &quot;grandchild2&quot;\n' +
    '										}\n' +
    '									]\n' +
    '								},\n' +
    '								{\n' +
    '									&quot;name&quot;: &quot;Child 2&quot;,\n' +
    '									&quot;state&quot;: &quot;child2&quot;,\n' +
    '									&quot;id&quot;: &quot;child2&quot;,\n' +
    '									&quot;class&quot;: &quot;child2&quot;,\n' +
    '									&quot;items&quot;: [\n' +
    '										{\n' +
    '											&quot;name&quot;: &quot;Grandchild 3&quot;,\n' +
    '											&quot;state&quot;: &quot;grandchild3&quot;,\n' +
    '											&quot;id&quot;: &quot;grandchild3&quot;,\n' +
    '											&quot;class&quot;: &quot;grandchild3&quot;\n' +
    '										}\n' +
    '									]\n' +
    '								},\n' +
    '								{\n' +
    '									&quot;name&quot;: &quot;Child 3&quot;,\n' +
    '									&quot;state&quot;: &quot;child3&quot;,\n' +
    '									&quot;id&quot;: &quot;child3&quot;,\n' +
    '									&quot;class&quot;: &quot;child3&quot;\n' +
    '								}\n' +
    '							]\n' +
    '						},\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Lorem ipsum 3&quot;,\n' +
    '							&quot;state&quot;: &quot;loremipsum3&quot;,\n' +
    '							&quot;id&quot;: &quot;loremipsum3&quot;,\n' +
    '							&quot;class&quot;: &quot;loremipsum3&quot;,\n' +
    '							&quot;validStates&quot; : [&quot;loremipsum3&quot;]\n' +
    '						}\n' +
    '					]\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;name&quot;: $filter(&quot;translate&quot;)(&quot;x1UiNgSideNavigationDemo.EXAMPLE1.PLAN&quot;),\n' +
    '					&quot;id&quot;: &quot;plan&quot;,\n' +
    '					&quot;class&quot;: &quot;plan&quot;,\n' +
    '					&quot;icon&quot;: &quot;gears-fill&quot;,\n' +
    '					&quot;header&quot;: true,\n' +
    '					&quot;isOpen&quot;: true,\n' +
    '					&quot;items&quot;: [\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Lorem ipsum 4&quot;,\n' +
    '							&quot;state&quot;: &quot;loremipsum4&quot;,\n' +
    '							&quot;id&quot;: &quot;loremipsum4&quot;,\n' +
    '							&quot;class&quot;: &quot;loremipsum4&quot;\n' +
    '						},\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Lorem ipsum 5&quot;,\n' +
    '							&quot;state&quot;: &quot;loremipsum5&quot;,\n' +
    '							&quot;id&quot;: &quot;loremipsum5&quot;,\n' +
    '							&quot;class&quot;: &quot;loremipsum5&quot;\n' +
    '						},\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;External link&quot;,\n' +
    '							&quot;externalLink&quot;: &quot;http://www.ibm.com&quot;,\n' +
    '							&quot;id&quot;: &quot;externallink1&quot;,\n' +
    '							&quot;class&quot;: &quot;externallink1&quot;\n' +
    '						}\n' +
    '					]\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;name&quot;: $filter(&quot;translate&quot;)(&quot;x1UiNgSideNavigationDemo.EXAMPLE1.DESIGN&quot;),\n' +
    '					&quot;id&quot;: &quot;design&quot;,\n' +
    '					&quot;class&quot;: &quot;design&quot;,\n' +
    '					&quot;icon&quot;: &quot;lightbulb&quot;,\n' +
    '					&quot;header&quot;: true,\n' +
    '					&quot;items&quot;: [\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Lorem ipsum 6&quot;,\n' +
    '							&quot;state&quot;: &quot;loremipsum6&quot;,\n' +
    '							&quot;id&quot;: &quot;loremipsum6&quot;,\n' +
    '							&quot;class&quot;: &quot;loremipsum6&quot;\n' +
    '						}\n' +
    '					]\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;name&quot;: $filter(&quot;translate&quot;)(&quot;x1UiNgSideNavigationDemo.EXAMPLE1.BUILD&quot;),\n' +
    '					&quot;id&quot;: &quot;build&quot;,\n' +
    '					&quot;class&quot;: &quot;build&quot;,\n' +
    '					&quot;icon&quot;: &quot;tools-fill&quot;,\n' +
    '					&quot;header&quot;: true,\n' +
    '					&quot;items&quot;: [\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Lorem ipsum 7&quot;,\n' +
    '							&quot;state&quot;: &quot;loremipsum7&quot;,\n' +
    '							&quot;id&quot;: &quot;loremipsum7&quot;,\n' +
    '							&quot;class&quot;: &quot;loremipsum7&quot;\n' +
    '						}\n' +
    '					]\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;name&quot;: $filter(&quot;translate&quot;)(&quot;x1UiNgSideNavigationDemo.EXAMPLE1.OPTIMIZE&quot;),\n' +
    '					&quot;state&quot;: &quot;optimize&quot;,\n' +
    '					&quot;stateParams&quot;: {&quot;param1&quot;: &quot;ein&quot;, &quot;param2&quot;: &quot;zwei&quot;},\n' +
    '					&quot;id&quot;: &quot;optimize&quot;,\n' +
    '					&quot;class&quot;: &quot;optimize&quot;,\n' +
    '					&quot;icon&quot;: &quot;stats&quot;,\n' +
    '					&quot;header&quot;: true,\n' +
    '					&quot;items&quot;: [\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Analytics&quot;,\n' +
    '							&quot;state&quot;: &quot;optimize.analytics&quot;,\n' +
    '							&quot;id&quot;: &quot;analytics&quot;,\n' +
    '							&quot;class&quot;: &quot;analytics&quot;,\n' +
    '							&quot;reveal&quot;: true,\n' +
    '							&quot;backState&quot;: &quot;optimize&quot;,\n' +
    '							&quot;backStateParams&quot;: {&quot;param1&quot;: &quot;ein&quot;, &quot;param2&quot;: &quot;zwei&quot;},\n' +
    '							&quot;items&quot;: [\n' +
    '								{\n' +
    '									&quot;include&quot;: &quot;side-navigation/side-navigation-sub-template.html&quot;,\n' +
    '									&quot;id&quot;: &quot;analytics-template&quot;,\n' +
    '									&quot;name&quot;: &quot;Analytics Template&quot;\n' +
    '								}\n' +
    '							]\n' +
    '						},\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Reveal with children&quot;,\n' +
    '							&quot;state&quot;: &quot;optimize.reveal&quot;,\n' +
    '							&quot;id&quot;: &quot;reveal&quot;,\n' +
    '							&quot;class&quot;: &quot;reveal&quot;,\n' +
    '							&quot;reveal&quot;: true,\n' +
    '							&quot;backState&quot;: &quot;optimize&quot;,\n' +
    '							&quot;backStateParams&quot;: {&quot;param1&quot;: &quot;ein&quot;, &quot;param2&quot;: &quot;zwei&quot;},\n' +
    '							&quot;items&quot;: [\n' +
    '								{\n' +
    '									&quot;name&quot;: &quot;Reveal child 1&quot;,\n' +
    '									&quot;state&quot;: &quot;revealchild1&quot;,\n' +
    '									&quot;id&quot;: &quot;revealchild1&quot;,\n' +
    '									&quot;class&quot;: &quot;revealchild1&quot;,\n' +
    '									&quot;items&quot;: [\n' +
    '										{\n' +
    '											&quot;name&quot;: &quot;Reveal grandchild 1&quot;,\n' +
    '											&quot;state&quot;: &quot;revealgrandchild1&quot;,\n' +
    '											&quot;id&quot;: &quot;revealgrandchild1&quot;,\n' +
    '											&quot;class&quot;: &quot;revealgrandchild1&quot;\n' +
    '										}\n' +
    '									]\n' +
    '								},\n' +
    '								{\n' +
    '									&quot;name&quot;: &quot;Reveal child 2&quot;,\n' +
    '									&quot;state&quot;: &quot;revealchild2&quot;,\n' +
    '									&quot;id&quot;: &quot;revealchild2&quot;,\n' +
    '									&quot;class&quot;: &quot;revealchild2&quot;\n' +
    '								},\n' +
    '								{\n' +
    '									&quot;name&quot;: &quot;Reveal child 3&quot;,\n' +
    '									&quot;state&quot;: &quot;revealchild3&quot;,\n' +
    '									&quot;id&quot;: &quot;revealchild3&quot;,\n' +
    '									&quot;class&quot;: &quot;revealchild3&quot;\n' +
    '								}\n' +
    '							]\n' +
    '						},\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Lorem ipsum 8&quot;,\n' +
    '							&quot;state&quot;: &quot;loremipsum8&quot;,\n' +
    '							&quot;id&quot;: &quot;loremipsum8&quot;,\n' +
    '							&quot;class&quot;: &quot;loremipsum8&quot;\n' +
    '						},\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Lorem ipsum 9&quot;,\n' +
    '							&quot;state&quot;: &quot;loremipsum9&quot;,\n' +
    '							&quot;id&quot;: &quot;loremipsum9&quot;,\n' +
    '							&quot;class&quot;: &quot;loremipsum9&quot;\n' +
    '						},\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Lorem ipsum 10&quot;,\n' +
    '							&quot;state&quot;: &quot;loremipsum10&quot;,\n' +
    '							&quot;id&quot;: &quot;loremipsum10&quot;,\n' +
    '							&quot;class&quot;: &quot;loremipsum10&quot;\n' +
    '						}\n' +
    '					]\n' +
    '				}\n' +
    '			];\n' +
    '		}]);</code>\n' +
    '			</pre>\n' +
    '		</div>\n' +
    '	</tab>\n' +
    '</tabset>\n' +
    '');
}]);
})();
