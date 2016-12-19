/**
 *
 * Licensed Materials – Property of IBM
 *
 * left-navigation.demo.module.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular.module("x1.ui.left-navigation.demo", [
	"prism",
	"x1.ui.left-navigation"
]);
angular.module("prism", []);
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

angular.module("x1.ui.demo", [
	"ui.router",
	"ui.bootstrap",
	"x1.ui.left-navigation.demo"
]);
/**
 *
 * Licensed Materials – Property of IBM
 *
 * left-navigation.demo.config.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.left-navigation.demo")
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

			$stateProvider.state("left-navigation", {
				url: "/left-navigation",
				templateUrl: "left-navigation/left-navigation.demo.html",
				controller: "LeftNavigationDemoCtrl"
			});

			$urlRouterProvider.otherwise("/left-navigation");
		}]);

/**
 *
 * Licensed Materials – Property of IBM
 *
 * left-navigation.demo.controller.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.left-navigation.demo")
	.controller("LeftNavigationDemoCtrl", ["$scope", "$filter",
		function($scope, $filter) {
			"use strict";

		$scope.isSideNavOpen = true;

		$scope.toggleMenu = function() {
			$scope.isSideNavOpen = !$scope.isSideNavOpen;
		};

		$scope.navItems = [
			{
				"name": $filter("translate")("x1UiNgLeftNavigationDemo.EXAMPLE1.UNDERSTAND"),
				"state": "understand",
				"validStates" : ["understand"],
				"id": "understand",
				"class": "understand",
				"icon": "lightbulb",
				"isOpen": true,
				"active": true,
				"items": [
					{
						"name": "Lorem ipsum 1 long title test example",
						"state": "loremipsum1",
						"id": "loremipsum1",
						"class": "loremipsum1",
						"validStates" : ["loremipsum1"]
					},
					{
						"name": "Lorem ipsum 2",
						"state": "loremipsum2",
						"id": "loremipsum2",
						"class": "loremipsum2",
						"validStates" : ["loremipsum2"]
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
				"name": $filter("translate")("x1UiNgLeftNavigationDemo.EXAMPLE1.PLAN"),
				"state": "plan",
				"id": "plan",
				"class": "plan",
				"icon": "gears-fill",
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
					}
				]
			},
			{
				"name": $filter("translate")("x1UiNgLeftNavigationDemo.EXAMPLE1.DESIGN"),
				"state": "design",
				"id": "design",
				"class": "design",
				"icon": "lightbulb",
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
				"name": $filter("translate")("x1UiNgLeftNavigationDemo.EXAMPLE1.BUILD"),
				"state": "build",
				"id": "build",
				"class": "build",
				"icon": "tools-fill",
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
				"name": $filter("translate")("x1UiNgLeftNavigationDemo.EXAMPLE1.OPTIMIZE"),
				"state": "optimize",
				"id": "optimize",
				"class": "optimize",
				"icon": "stats",
				"items": [
					{
						"name": "Analytics",
						"state": "optimize.analytics",
						"id": "analytics",
						"class": "analytics",
						"reveal": true,
						"backState": "optimize",
						"items": [
							{
								"include": "left-navigation/left-navigation-sub-template.html",
								"id": "analytics-template",
								"name": "Analytics Template"
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
	}]);
angular
	.module("prism")
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
  module = angular.module('x1.ui.left-navigation');
} catch (e) {
  module = angular.module('x1.ui.left-navigation', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('left-navigation/index.rtl.html',
    '<!DOCTYPE html><html ng-app="x1.ui.demo"><head><title>Left Navigation</title><link rel="stylesheet" href="vendor/vendor.css"><link rel="stylesheet" href="x1-ui-ng-left-navigation.demo.css"><link rel="stylesheet" href="../x1-ui-ng-left-navigation.css"><link rel="stylesheet" href="../x1-ui-ng-left-navigation.rtl.css"></head><body dir="rtl"><ui-view></ui-view><script type="text/javascript" src="vendor/vendor.js"></script><script type="text/javascript" src="../x1-ui-ng-left-navigation.js"></script><script type="text/javascript" src="left-navigation.demo.js"></script></body></html>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.left-navigation');
} catch (e) {
  module = angular.module('x1.ui.left-navigation', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('left-navigation/left-navigation-sub-template.html',
    '<p class="sub-template">This is a sample sub template which can be included in the left navigation.</p><p class="sub-template">This is a sample sub template which can be included in the left navigation.</p><p class="sub-template">This is a sample sub template which can be included in the left navigation.</p>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.left-navigation');
} catch (e) {
  module = angular.module('x1.ui.left-navigation', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('left-navigation/left-navigation.demo.html',
    '<div class="container-fluid"><h1 class="page-header">Left Navigation</h1><p class="lead">This component allows you to easily add a left navigation menu to your application with an infinitely nested list of accordion style menu items.</p><tabset><tab heading="Demo"><div class="row"><div class="col-sm-6" ng-include="\'left-navigation/examples/basic.demo.html\'"></div><div class="col-sm-6" ng-include="\'left-navigation/examples/custom.demo.html\'"></div></div><div class="row"><div class="col-sm-12" ng-include="\'left-navigation/examples/stateful.demo.html\'"></div></div></tab><tab heading="Documentation"><h2>Attribute Options</h2><p>Insert the properties below (separated by "-") as attributes for the <code>&lt;x1-left-navigation&gt;&lt;/x1-left-navigation&gt;</code> element.</p><div class="table-responsive"><table class="table table-striped table-condensed"><thead><tr><th>Property</th><th>Description</th><th>Required</th><th>Default Value</th><th>Accepted Values/Type</th></tr></thead><tbody><tr><td>isOpen</td><td>Toggles the visibility with a slide animation.</td><td>true</td><td>false</td><td>boolean</td></tr><tr><td>items</td><td>Navigation/tree items displayed.</td><td>false</td><td>undefined</td><td>array</td></tr><tr><td>stateful</td><td>Listens to the router state change and selects the appropriate left navigation item.</td><td>false</td><td>false</td><td>boolean</td></tr></tbody></table></div><h2>Events</h2><p>Include <code>x1.ui.left-navigation.constant</code> in your controller to access the events listed below.</p><div class="table-responsive"><table class="table table-striped table-condensed"><thead><tr><th>Constant</th><th>Name</th><th>Description</th></tr></thead><tbody><tr><td>[yourLeftNavConstantRef].EVENTS.leftNavOpened</td><td>"x1.ui.left-navigation.opened"</td><td>Event that will <code>$rootScope.$broadcast</code> when the left navigation has been made visible to the user (after animation is complete).</td></tr><tr><td>[yourLeftNavConstantRef].EVENTS.leftNavClosed</td><td>"x1.ui.left-navigation.closed"</td><td>Event that will <code>$rootScope.$broadcast</code> when the left navigation has been made hidden from the user (after animation is complete).</td></tr></tbody></table></div><h2>Internationalization Variables</h2><div class="highlight"><pre><code class="language-javascript" prism="">{\n' +
    '	&quot;x1UiNgLeftNavigation&quot;: {\n' +
    '		&quot;ASIDE_SR_TEXT&quot;: &quot;Secondary navigation&quot;,\n' +
    '		&quot;ARIA&quot;: {\n' +
    '			&quot;NAV&quot;: &quot;Secondary navigation menu&quot;\n' +
    '		}\n' +
    '	}\n' +
    '}</code></pre></div></tab><tab heading="Blueprint"><img src="images/left-navigation_bp.jpg"></tab></tabset></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.left-navigation');
} catch (e) {
  module = angular.module('x1.ui.left-navigation', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('left-navigation/examples/basic.demo.html',
    '<h3>Basic Left Navigation</h3><p>Include an array of navigation items and a toggle variable to create an animating tree navigation component.</p><div class="bs-example"><button class="nav-demo-btn btn btn-primary" ng-click="toggleMenu()" translate="x1UiNgLeftNavigationDemo.EXAMPLE1.TOGGLE_BTN"></button><div class="x1-navigation-wrap"><x1-left-navigation is-open="isSideNavOpen" items="navItems"></x1-left-navigation></div></div><tabset><tab heading="HTML"><div class="highlight"><pre><code class="language-markup" prism="">&lt;button class=&quot;nav-demo-btn btn btn-primary&quot; ng-click=&quot;toggleMenu()&quot;\n' +
    '		translate=&quot;x1UiNgLeftNavigationDemo.EXAMPLE1.TOGGLE_BTN&quot;&gt;&lt;/button&gt;\n' +
    '&lt;div class=&quot;x1-navigation-wrap&quot;&gt;\n' +
    '	&lt;x1-left-navigation is-open=&quot;isSideNavOpen&quot; items=&quot;navItems&quot;&gt;&lt;/x1-left-navigation&gt;\n' +
    '&lt;/div&gt;</code></pre></div></tab><tab heading="JS"><div class="highlight"><pre><code class="language-javascript" prism="">angular\n' +
    '	.module(&quot;x1.ui.left-navigation.demo&quot;)\n' +
    '	.controller(&quot;LeftNavigationDemoCtrl&quot;, [&quot;$scope&quot;, &quot;$filter&quot;,\n' +
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
    '					&quot;name&quot;: $filter(&quot;translate&quot;)(&quot;x1UiNgLeftNavigationDemo.EXAMPLE1.UNDERSTAND&quot;),\n' +
    '					&quot;state&quot;: &quot;understand&quot;,\n' +
    '					&quot;validStates&quot; : [&quot;understand&quot;],\n' +
    '					&quot;id&quot;: &quot;understand&quot;,\n' +
    '					&quot;class&quot;: &quot;understand&quot;,\n' +
    '					&quot;icon&quot;: &quot;lightbulb&quot;,\n' +
    '					&quot;isOpen&quot;: true,\n' +
    '					&quot;active&quot;: true,\n' +
    '					&quot;items&quot;: [\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Lorem ipsum 1 long title test example&quot;,\n' +
    '							&quot;state&quot;: &quot;loremipsum1&quot;,\n' +
    '							&quot;id&quot;: &quot;loremipsum1&quot;,\n' +
    '							&quot;class&quot;: &quot;loremipsum1&quot;,\n' +
    '							&quot;validStates&quot; : [&quot;loremipsum1&quot;]\n' +
    '						},\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Lorem ipsum 2&quot;,\n' +
    '							&quot;state&quot;: &quot;loremipsum2&quot;,\n' +
    '							&quot;id&quot;: &quot;loremipsum2&quot;,\n' +
    '							&quot;class&quot;: &quot;loremipsum2&quot;,\n' +
    '							&quot;validStates&quot; : [&quot;loremipsum2&quot;]\n' +
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
    '					&quot;name&quot;: $filter(&quot;translate&quot;)(&quot;x1UiNgLeftNavigationDemo.EXAMPLE1.PLAN&quot;),\n' +
    '					&quot;state&quot;: &quot;plan&quot;,\n' +
    '					&quot;id&quot;: &quot;plan&quot;,\n' +
    '					&quot;class&quot;: &quot;plan&quot;,\n' +
    '					&quot;icon&quot;: &quot;gears-fill&quot;,\n' +
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
    '						}\n' +
    '					]\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;name&quot;: $filter(&quot;translate&quot;)(&quot;x1UiNgLeftNavigationDemo.EXAMPLE1.DESIGN&quot;),\n' +
    '					&quot;state&quot;: &quot;design&quot;,\n' +
    '					&quot;id&quot;: &quot;design&quot;,\n' +
    '					&quot;class&quot;: &quot;design&quot;,\n' +
    '					&quot;icon&quot;: &quot;lightbulb&quot;,\n' +
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
    '					&quot;name&quot;: $filter(&quot;translate&quot;)(&quot;x1UiNgLeftNavigationDemo.EXAMPLE1.BUILD&quot;),\n' +
    '					&quot;state&quot;: &quot;build&quot;,\n' +
    '					&quot;id&quot;: &quot;build&quot;,\n' +
    '					&quot;class&quot;: &quot;build&quot;,\n' +
    '					&quot;icon&quot;: &quot;tools-fill&quot;,\n' +
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
    '					&quot;name&quot;: $filter(&quot;translate&quot;)(&quot;x1UiNgLeftNavigationDemo.EXAMPLE1.OPTIMIZE&quot;),\n' +
    '					&quot;state&quot;: &quot;optimize&quot;,\n' +
    '					&quot;id&quot;: &quot;optimize&quot;,\n' +
    '					&quot;class&quot;: &quot;optimize&quot;,\n' +
    '					&quot;icon&quot;: &quot;stats&quot;,\n' +
    '					&quot;items&quot;: [\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Analytics&quot;,\n' +
    '							&quot;state&quot;: &quot;optimize.analytics&quot;,\n' +
    '							&quot;id&quot;: &quot;analytics&quot;,\n' +
    '							&quot;class&quot;: &quot;analytics&quot;,\n' +
    '							&quot;reveal&quot;: true,\n' +
    '							&quot;backState&quot;: &quot;optimize&quot;,\n' +
    '							&quot;items&quot;: [\n' +
    '								{\n' +
    '									&quot;include&quot;: &quot;left-navigation/left-navigation-sub-template.html&quot;,\n' +
    '									&quot;id&quot;: &quot;analytics-template&quot;,\n' +
    '									&quot;name&quot;: &quot;Analytics Template&quot;\n' +
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
    '		}]);</code></pre></div></tab></tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.left-navigation');
} catch (e) {
  module = angular.module('x1.ui.left-navigation', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('left-navigation/examples/custom.demo.html',
    '<h3>Left Navigation with custom content</h3><p>Opt out of the built-in tree navigation design by transcluding custom content to display inside the left navigation container.</p><div class="bs-example"><div class="x1-navigation-wrap"><x1-left-navigation is-open="true"><p class="sub-template" translate="x1UiNgLeftNavigationDemo.EXAMPLE2.TEXT"></p></x1-left-navigation></div></div><div class="highlight"><pre><code class="language-markup" prism="">&lt;div class=&quot;x1-navigation-wrap&quot;&gt;\n' +
    '	&lt;x1-left-navigation is-open=&quot;true&quot;&gt;\n' +
    '		&lt;p class=&quot;sub-template&quot; translate=&quot;x1UiNgLeftNavigationDemo.EXAMPLE2.TEXT&quot;&gt;&lt;/p&gt;\n' +
    '	&lt;/x1-left-navigation&gt;\n' +
    '&lt;/div&gt;</code></pre></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.left-navigation');
} catch (e) {
  module = angular.module('x1.ui.left-navigation', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('left-navigation/examples/stateful.demo.html',
    '<h3>Stateful Left Navigation</h3><p>The stateful left navigation listens to the changes in the router state and selects the appropriate item in the left navigation.</p><div class="bs-example"><div class="x1-navigation-wrap"><x1-left-navigation is-open="true" items="navItems" is-stateful="true"></x1-left-navigation></div></div><tabset><tab heading="HTML"><div class="highlight"><pre><code class="language-markup" prism="">&lt;div class=&quot;x1-navigation-wrap&quot;&gt;\n' +
    '	&lt;x1-left-navigation is-open=&quot;true&quot; items=&quot;navItems&quot; is-stateful=&quot;true&quot;&gt;&lt;/x1-left-navigation&gt;\n' +
    '&lt;/div&gt;</code></pre></div></tab><tab heading="JS"><div class="highlight"><pre><code class="language-javascript" prism="">angular\n' +
    '	.module(&quot;x1.ui.left-navigation.demo&quot;)\n' +
    '	.controller(&quot;LeftNavigationDemoCtrl&quot;, [&quot;$scope&quot;, &quot;$filter&quot;,\n' +
    '		function($scope, $filter) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			$scope.navItems = [\n' +
    '				{\n' +
    '					&quot;name&quot;: $filter(&quot;translate&quot;)(&quot;x1UiNgLeftNavigationDemo.EXAMPLE1.UNDERSTAND&quot;),\n' +
    '					&quot;state&quot;: &quot;understand&quot;,\n' +
    '					&quot;validStates&quot; : [&quot;understand&quot;],\n' +
    '					&quot;id&quot;: &quot;understand&quot;,\n' +
    '					&quot;class&quot;: &quot;understand&quot;,\n' +
    '					&quot;icon&quot;: &quot;lightbulb&quot;,\n' +
    '					&quot;isOpen&quot;: true,\n' +
    '					&quot;active&quot;: true,\n' +
    '					&quot;items&quot;: [\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Lorem ipsum 1 long title test example&quot;,\n' +
    '							&quot;state&quot;: &quot;loremipsum1&quot;,\n' +
    '							&quot;id&quot;: &quot;loremipsum1&quot;,\n' +
    '							&quot;class&quot;: &quot;loremipsum1&quot;,\n' +
    '							&quot;validStates&quot; : [&quot;loremipsum1&quot;]\n' +
    '						},\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Lorem ipsum 2&quot;,\n' +
    '							&quot;state&quot;: &quot;loremipsum2&quot;,\n' +
    '							&quot;id&quot;: &quot;loremipsum2&quot;,\n' +
    '							&quot;class&quot;: &quot;loremipsum2&quot;,\n' +
    '							&quot;validStates&quot; : [&quot;loremipsum2&quot;]\n' +
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
    '					&quot;name&quot;: $filter(&quot;translate&quot;)(&quot;x1UiNgLeftNavigationDemo.EXAMPLE1.PLAN&quot;),\n' +
    '					&quot;state&quot;: &quot;plan&quot;,\n' +
    '					&quot;id&quot;: &quot;plan&quot;,\n' +
    '					&quot;class&quot;: &quot;plan&quot;,\n' +
    '					&quot;icon&quot;: &quot;gears-fill&quot;,\n' +
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
    '						}\n' +
    '					]\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;name&quot;: $filter(&quot;translate&quot;)(&quot;x1UiNgLeftNavigationDemo.EXAMPLE1.DESIGN&quot;),\n' +
    '					&quot;state&quot;: &quot;design&quot;,\n' +
    '					&quot;id&quot;: &quot;design&quot;,\n' +
    '					&quot;class&quot;: &quot;design&quot;,\n' +
    '					&quot;icon&quot;: &quot;lightbulb&quot;,\n' +
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
    '					&quot;name&quot;: $filter(&quot;translate&quot;)(&quot;x1UiNgLeftNavigationDemo.EXAMPLE1.BUILD&quot;),\n' +
    '					&quot;state&quot;: &quot;build&quot;,\n' +
    '					&quot;id&quot;: &quot;build&quot;,\n' +
    '					&quot;class&quot;: &quot;build&quot;,\n' +
    '					&quot;icon&quot;: &quot;tools-fill&quot;,\n' +
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
    '					&quot;name&quot;: $filter(&quot;translate&quot;)(&quot;x1UiNgLeftNavigationDemo.EXAMPLE1.OPTIMIZE&quot;),\n' +
    '					&quot;state&quot;: &quot;optimize&quot;,\n' +
    '					&quot;id&quot;: &quot;optimize&quot;,\n' +
    '					&quot;class&quot;: &quot;optimize&quot;,\n' +
    '					&quot;icon&quot;: &quot;stats&quot;,\n' +
    '					&quot;items&quot;: [\n' +
    '						{\n' +
    '							&quot;name&quot;: &quot;Analytics&quot;,\n' +
    '							&quot;state&quot;: &quot;optimize.analytics&quot;,\n' +
    '							&quot;id&quot;: &quot;analytics&quot;,\n' +
    '							&quot;class&quot;: &quot;analytics&quot;,\n' +
    '							&quot;reveal&quot;: true,\n' +
    '							&quot;backState&quot;: &quot;optimize&quot;,\n' +
    '							&quot;items&quot;: [\n' +
    '								{\n' +
    '									&quot;include&quot;: &quot;left-navigation/left-navigation-sub-template.html&quot;,\n' +
    '									&quot;id&quot;: &quot;analytics-template&quot;,\n' +
    '									&quot;name&quot;: &quot;Analytics Template&quot;\n' +
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
    '		}]);</code></pre></div></tab></tabset>');
}]);
})();
