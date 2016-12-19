/**
 *
 * Licensed Materials - Property of IBM
 *
 * app1.module.js
 *
 * (C) Copyright IBM Corporation 2016.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.demo.app1", [
		"x1.ui.framework"
	]);
/**
 *
 * Licensed Materials - Property of IBM
 *
 * umbrella.app.module.js
 *
 * (C) Copyright IBM Corporation 2016.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("umbrella.app.demo", [
		"x1.ui.framework",
		"x1.ui.demo.app1",
		"x1.ui.demo.app2",
		"ui.router",
		"x1.ui.loading-bee"
	])
	.config([
		"$stateProvider", "$urlRouterProvider",
		function($stateProvider, $urlRouterProvider) {
			"use strict";

			$stateProvider
				.state("frameworkHome.unused", {
					url: "/unused",
					templateUrl: "umbrella/umbrella.view.html",
					controller: "umbrellaCtrl"
				});
			$urlRouterProvider.otherwise("frameworkHome.test");
	}])
	.service("umbrellaService", [ "$log", function($log){
		this.testOrg = function(data) {
			$log.debug("Do something with org data");
			$log.debug(data);
		};
	}])
	.run([
		"$state", "$log", "frameworkHomeSrv", "frameworkConstants", "$rootScope", "x1Utils", "$window", "$translate",
		 "$q", "$timeout", "umbrellaService",
		function($state, $log, frameworkHomeSrv, frameworkConstants, $rootScope, x1Utils, $window, $translate,
			$q, $timeout, umbrellaService) {
			"use strict";

			$log.log("running umbrella run");

			$rootScope.loading = true;

			var dashboardNavItems = [
				{
					"name": "Umbrella Test",
					"state": "frameworkHome.test",
					"validStates": ["frameworkHome.test"],
					"stateConfig": {
						url: "/test",
						templateUrl: "umbrella/umbrella.view.html",
						controller: "umbrellaCtrl",
						data: {
							name: "umbrella.STATE_NAME"
						}
					},
					"id": "umbrella-test",
					"class": "umbrella-test"
				},
			];

			frameworkHomeSrv.setProductTitle(x1Utils.translate("umbrella.HEADER_TITLE"));
			frameworkHomeSrv.setShowBetaBadge(true);
			frameworkHomeSrv.addToFramework(frameworkConstants.NAV_MENU.DASHBOARDS, dashboardNavItems);
			$translate("x1UiNgFramework.HELP_MENU.PROD_DOC").then(function() {
				frameworkHomeSrv.addHelpItem(x1Utils.translate("x1UiNgFramework.HELP_MENU.PROD_DOC"), function() {
					$window.open("http://doc.unica.com/doc.php?passkey=Xxi4MyHtR3mI&cxa&1_2_0&en_us&KC_WELCOME",
						"CXA_ProdHelp");
				});
				frameworkHomeSrv.addHelpItem(x1Utils.translate("x1UiNgFramework.HELP_MENU.SUPPORT"), function() {
					$window.open("http://support.ibmcloud.com");
				});
			});
			frameworkHomeSrv.setOrgCallback(function() {
				var deferred = $q.defer();
				$timeout(function() {
					var orgArray = [
						{
							"orgId": "09876Z",
							"orgName": "CXA Framework testing"
						},
						{ 
							"orgId": "12345A",
							"orgName": "OrgA" 
						},
						{ 
							"orgId": "12345B",
							"orgName": "OrgB" 
						},
						{ 
							"orgId": "12345C",
							"orgName": "OrgC" 
						},
						{ 
							"orgId": "12345D",
							"orgName": "OrgD" 
						},
						{ 
							"orgId": "12345E",
							"orgName": "OrgE" 
						},
						{ 
							"orgId": "12345F",
							"orgName": "OrgF" 
						},
						{ 
							"orgId": "12345G",
							"orgName": "OrgG" 
						},
						{ 
							"orgId": "12345H",
							"orgName": "OrgH" 
						},
						{ 
							"orgId": "12345I",
							"orgName": "OrgI" 
						},
						{ 
							"orgId": "12345J",
							"orgName": "OrgJ" 
						},
						{ 
							"orgId": "12345K",
							"orgName": "OrgK" 
						},
						{ 
							"orgId": "12345L",
							"orgName": "OrgL" 
						},
						{ 
							"orgId": "12345M",
							"orgName": "OrgM" 
						},
						{ 
							"orgId": "12345O",
							"orgName": "OrgO" 
						},
						{ 
							"orgId": "12345P",
							"orgName": "OrgP" 
						}
					];
					$log.debug("resolving callback");
					deferred.resolve({ "data":orgArray});
				}, 2000);
				return deferred.promise;
			});

			/**
			* Set function to be called when user selects org from framework modal
			*/
			frameworkHomeSrv.setSelectedOrgCallback(umbrellaService.testOrg);

			function emulateStartup() {
				$rootScope.loading = false;
				// $state.go("frameworkHome.test");
			}
			setTimeout(emulateStartup, 1000);
		}])
	.controller("umbrellaCtrl", ["$state", "$log", function($state, $log) {
		$log.log("running umbrella controller");
		$log.log($state.get());
		//$state.go("frameworkHome.test");
	}]);
(function() {
	"use strict";
	angular
		.module("x1.ui.demo.app1")
		.directive("anotherDirective", anotherDirective);

		anotherDirective.$inject = [ "$timeout" ];

		function anotherDirective($timeout) {
			var directive = {
				scope: false,
				restrict: "EA",
				template: "<span class='framework-widget-badge' ng-show='data.numUnread > 0'>{{data.numUnread}}</span>",
				link: linkFunc
			};

			return directive;

			function linkFunc(scope) {
				scope.data = {
					numUnread: 0
				};

				$timeout(function() {
					scope.data = {
						numUnread: 4
					};
				}, 2000);				
			}			
		}
})();
/**
 *
 * Licensed Materials - Property of IBM
 *
 * app1.controller.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.demo.app1")
	.config(["$urlRouterProvider", "$translateProvider",
		function($urlRouterProvider, $translateProvider) {
			"use strict";

			// Register a loader for the static files
			// So, the module will search missing translation tables under the specified urls.
			// Those urls are [prefix][langKey][suffix].
			$translateProvider.useStaticFilesLoader({
				prefix: "../l10n/",
				suffix: ".json"
			});

			// Tell the module what language to use by default
			$translateProvider.preferredLanguage("en_US");
			$translateProvider.useSanitizeValueStrategy("escaped");

			$urlRouterProvider.otherwise("frameworkHome.app1Nav1");
		}
	])

	.run(["$state", "app1NavService", "frameworkHomeSrv", "x1Utils",
		function($state, app1NavService, frameworkHomeSrv, x1Utils) {
		app1NavService.configureNavigation();
		frameworkHomeSrv.setProductTitle(x1Utils.translate("app1.HEADER_TITLE"));
		frameworkHomeSrv.setUser({
			firstName: "Twerp",
			orgName: "CXA Framework testing",
			orgId: "09876Z"
		});
		//frameworkHomeSrv.setShowBetaBadge(false);
		//$state.go("frameworkHome.app1Nav1");

	}])
	.controller("app1Nav1Ctrl", ["$scope", function($scope) {
		$scope.app1Nav1Configs = {};
	}])
	.controller("app1Nav2Ctrl", ["$scope", function($scope) {
		$scope.app1Nav2Configs = {};
	}])
	.controller("app1Admin1Ctrl", ["$scope", function($scope) {
		$scope.app1Admin1Configs = {};
	}])
	.service("app1NavService", ["frameworkHomeSrv", "frameworkConstants", "$log",
		function(frameworkHomeSrv, frameworkConstants, $log) {
			"use strict";

			var analyzeNavItems = [
				{
					"name": "app1-nav1",
					"state": "frameworkHome.app1Nav1",
					"validStates": ["frameworkHome.app1Nav1"],
					"stateConfig": {
						url: "/app1nav1",
						templateUrl: "app1/app1.html",
						controller: "app1Nav1Ctrl",
						data: {
							name: "app1.STATE_NAMES.app1nav1"
						}
					},
					"id": "app1-nav1",
					"class": "app1-nav1"
				},
				{
					"name": "app1-nav2",
					"state": "frameworkHome.app1Nav2",
					"validStates": ["frameworkHome.app1Nav2"],
					"stateConfig": {
						url: "/app1nav2",
						template: "<div class='app1'><h1>This is App1 Nav2</h1>" +
						"<a ui-sref='frameworkHome.unlistedParent'>Go to unlisted</a></div>" +
						"<a ui-sref='frameworkHome.unlistedChild'>Go directly to unlisted child</a></div>",
						controller: "app1Nav2Ctrl",
						data: {
							name: "app1.STATE_NAMES.app1nav2"
						}
					},
					"id": "app1-nav2",
					"class": "app1-nav2"
				}
			];

			var adminNavItems = [
				{
					"name": "app1-admin1",
					"state": "frameworkHome.app1Admin1",
					"validStates": ["frameworkHome.app1Admin1"],
					"stateConfig": {
						url: "/app1admin1",
						template: "<div class='app1'><h1>This is App1 Admin1</h1></div>",
						controller: "app1Admin1Ctrl"
					},
					"id": "app1-admin1",
					"class": "app1-admin1"
				}
			];

			var unlistedStates = [
				{
					"state": "frameworkHome.unlistedParent",
					"stateConfig": {
						url: "/unlistedParent",
						template: "<div class='app1'><h1>This is unlistedParent</h1>" +
						"<a ui-sref='frameworkHome.unlistedChild'>Go to unlisted child</a></div>",
						data: {
							name: "app1.STATE_NAMES.unlistedParent"
						}
					}
				},
				{
					"state": "frameworkHome.unlistedChild",
					"stateConfig": {
						url: "/unlistedChild",
						template: "<div class='app1'><h1>This is unlistedChild</h1></div>" +
						"<a ui-sref='frameworkHome.grandChild'>Go to grandchild</a></div><br>" +
						"<a ui-sref='frameworkHome.app2Nav4'>Go to app2Nav4</a></div>",
						data: {
							name: "app1.STATE_NAMES.unlistedChild",
							parentStates: [
								"frameworkHome.app1Nav2",
								"frameworkHome.unlistedParent"								
							]
						}
					}
				},
				{
					"state": "frameworkHome.grandChild",
					"stateConfig": {
						url: "/grandChild",
						template: "<div class='app1'><h1>This is grandChild</h1></div>",
						data: {
							name: "app1.STATE_NAMES.unlistedGrandChild",
							parentStates: [
								"frameworkHome.unlistedChild"
							]
						}
					}
				}
			];

			var topNavWidgets = [
				"<some-directive></some-directive>"
			];

			var subNavWidgets = [
				{
					widget: "<subnav-directive1></subnav-directive1>",
					validStates: [
						"frameworkHome.app1Nav1",
						"frameworkHome.unlistedChild"
					]
				},
				{
					widget: "<subnav-directive2></subnav-directive2>",
					validStates: [
						"frameworkHome.app1Nav1",
						"frameworkHome.app1Nav2"
					]
				}
			];

			this.configureNavigation = function(){
				frameworkHomeSrv.addToFramework(frameworkConstants.NAV_MENU.ANALYZE, analyzeNavItems);
				frameworkHomeSrv.addToFramework(frameworkConstants.NAV_MENU.ADMIN, adminNavItems);
				frameworkHomeSrv.addToFramework(frameworkConstants.NOT_ON_MENU, unlistedStates);
				frameworkHomeSrv.addToTopNav(topNavWidgets);
				frameworkHomeSrv.addToSubNav(subNavWidgets);
				$log.log("adding navItems: " + analyzeNavItems);
			};

		}
	]);
(function() {
	"use strict";
	angular
		.module("x1.ui.demo.app1")
		.directive("someDirective", someDirective);

		function someDirective() {
			var directive = {
				scope: false,
				restrict: "EA",
				replace: true,
				templateUrl: "app1/somedirective.html"
			};

			return directive;			
		}
})();
(function() {
	"use strict";
	angular
		.module("x1.ui.demo.app1")
		.directive("subnavDirective1", subnavDirective1);

		function subnavDirective1() {
			var directive = {
				scope: false,
				replace: true,
				restrict: "EA",
				template: "<a href='#'>" +
					"<span class='glyphicon glyphicon-envelope'></span>"+
					"<span>Subnav Directive 1</span></a>"
			};

			return directive;		
		}
})();
(function() {
	"use strict";
	angular
		.module("x1.ui.demo.app1")
		.directive("subnavDirective2", subnavDirective2);

		function subnavDirective2() {
			var directive = {
				scope: false,
				replace: true,
				restrict: "EA",
				template: "<a href='#' style='padding-right: 30px; color: #323232;'>" +
					"<span class='glyphicon glyphicon-option-vertical' style='color: #323232;'></span>" +
					"<span>Menu</span></a>"
			};

			return directive;		
		}
})();
(function(module) {
try {
  module = angular.module('x1.ui.framework');
} catch (e) {
  module = angular.module('x1.ui.framework', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app1/app1.html',
    '<div class="app1">\n' +
    '	<h1>This is App1 Nav1</h1>\n' +
    '	<p>This is the default view when App1 runs in standalone mode</p>\n' +
    '	<p><a href="index-app1.html">Load App1 in standalone mode</a></p>\n' +
    '	<p><a href="index.html">Load the All-in-one App</a></p>\n' +
    '	<p>Click on the links above and notice how the side-nav changes.</p>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.framework');
} catch (e) {
  module = angular.module('x1.ui.framework', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app1/side-navigation-sub-template.html',
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
  module = angular.module('x1.ui.framework');
} catch (e) {
  module = angular.module('x1.ui.framework', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app1/somedirective.html',
    '<a class="main-menu-link" role="button">\n' +
    '	<span class="glyphicon glyphicon-envelope"></span>\n' +
    '	<span style="margin-left: 10px">App 1 Widget</span>\n' +
    '	<span class="glyphicon glyphicon-chevron-down"></span>\n' +
    '	<another-directive></another-directive>\n' +
    '</a>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.framework');
} catch (e) {
  module = angular.module('x1.ui.framework', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('umbrella/umbrella.view.html',
    '<div class="umbrella">\n' +
    '	<h1>This is the Umbrella App Landing Page</h1>\n' +
    '	<p>This demonstrates the framework running with two separate apps bound together by a 3rd (umbrella) app.\n' +
    '		The Umbrella app&apos;s sole purpose is to include the two separate apps into one application and set any\n' +
    '		defaults needed. It could in addition define any new functionality that is only available when the two child\n' +
    '		applications are running together inside the umbrella app but are not available when either of the two apps\n' +
    '		is running separately.\n' +
    '	</p>\n' +
    '	<p>Each app includes the UI Framework as a dependency and each calls the Framework Nav Service in its\n' +
    '		Angular.run() block to have	its navigation structure added into the UI Framework. This creates a combined\n' +
    '		navigation structure.\n' +
    '	</p>\n' +
    '	<p>Click on items in the side-nav to see that some items are provided by <b>App1</b> and some by <b>App2</b>. If\n' +
    '		you launch App1 as a standalone app (not by running the umbrella app) then the side-nav from the framework\n' +
    '		will still be available, but none of App2&apos;s items will be in it.\n' +
    '	</p>\n' +
    '</div>');
}]);
})();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcDEvYXBwMS5tb2R1bGUuanMiLCJ1bWJyZWxsYS91bWJyZWxsYS5hcHAubW9kdWxlLmpzIiwiYXBwMS9hbm90aGVyZGlyZWN0aXZlLmRpcmVjdGl2ZS5qcyIsImFwcDEvYXBwMS5jb250cm9sbGVyLmpzIiwiYXBwMS9zb21lZGlyZWN0aXZlLmRpcmVjdGl2ZS5qcyIsImFwcDEvc3VibmF2ZGlyZWN0aXZlMS5kaXJlY3RpdmUuanMiLCJhcHAxL3N1Ym5hdmRpcmVjdGl2ZTIuZGlyZWN0aXZlLmpzIiwiYXBwMS9hcHAxLmh0bWwiLCJhcHAxL3NpZGUtbmF2aWdhdGlvbi1zdWItdGVtcGxhdGUuaHRtbCIsImFwcDEvc29tZWRpcmVjdGl2ZS5odG1sIiwidW1icmVsbGEvdW1icmVsbGEudmlldy5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcDEuZGVtby5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIExpY2Vuc2VkIE1hdGVyaWFscyAtIFByb3BlcnR5IG9mIElCTVxuICpcbiAqIGFwcDEubW9kdWxlLmpzXG4gKlxuICogKEMpIENvcHlyaWdodCBJQk0gQ29ycG9yYXRpb24gMjAxNi5cbiAqIFUuUy4gR292ZXJubWVudCBVc2VycyBSZXN0cmljdGVkIFJpZ2h0czogIFVzZSwgZHVwbGljYXRpb24gb3IgZGlzY2xvc3VyZVxuICogcmVzdHJpY3RlZCBieSBHU0EgQURQIFNjaGVkdWxlIENvbnRyYWN0IHdpdGggSUJNIENvcnAuXG4gKlxuICovXG5cbmFuZ3VsYXJcblx0Lm1vZHVsZShcIngxLnVpLmRlbW8uYXBwMVwiLCBbXG5cdFx0XCJ4MS51aS5mcmFtZXdvcmtcIlxuXHRdKTsiLCIvKipcbiAqXG4gKiBMaWNlbnNlZCBNYXRlcmlhbHMgLSBQcm9wZXJ0eSBvZiBJQk1cbiAqXG4gKiB1bWJyZWxsYS5hcHAubW9kdWxlLmpzXG4gKlxuICogKEMpIENvcHlyaWdodCBJQk0gQ29ycG9yYXRpb24gMjAxNi5cbiAqIFUuUy4gR292ZXJubWVudCBVc2VycyBSZXN0cmljdGVkIFJpZ2h0czogIFVzZSwgZHVwbGljYXRpb24gb3IgZGlzY2xvc3VyZVxuICogcmVzdHJpY3RlZCBieSBHU0EgQURQIFNjaGVkdWxlIENvbnRyYWN0IHdpdGggSUJNIENvcnAuXG4gKlxuICovXG5cbmFuZ3VsYXJcblx0Lm1vZHVsZShcInVtYnJlbGxhLmFwcC5kZW1vXCIsIFtcblx0XHRcIngxLnVpLmZyYW1ld29ya1wiLFxuXHRcdFwieDEudWkuZGVtby5hcHAxXCIsXG5cdFx0XCJ4MS51aS5kZW1vLmFwcDJcIixcblx0XHRcInVpLnJvdXRlclwiLFxuXHRcdFwieDEudWkubG9hZGluZy1iZWVcIlxuXHRdKVxuXHQuY29uZmlnKFtcblx0XHRcIiRzdGF0ZVByb3ZpZGVyXCIsIFwiJHVybFJvdXRlclByb3ZpZGVyXCIsXG5cdFx0ZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXHRcdFx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0XHRcdCRzdGF0ZVByb3ZpZGVyXG5cdFx0XHRcdC5zdGF0ZShcImZyYW1ld29ya0hvbWUudW51c2VkXCIsIHtcblx0XHRcdFx0XHR1cmw6IFwiL3VudXNlZFwiLFxuXHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBcInVtYnJlbGxhL3VtYnJlbGxhLnZpZXcuaHRtbFwiLFxuXHRcdFx0XHRcdGNvbnRyb2xsZXI6IFwidW1icmVsbGFDdHJsXCJcblx0XHRcdFx0fSk7XG5cdFx0XHQkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiZnJhbWV3b3JrSG9tZS50ZXN0XCIpO1xuXHR9XSlcblx0LnNlcnZpY2UoXCJ1bWJyZWxsYVNlcnZpY2VcIiwgWyBcIiRsb2dcIiwgZnVuY3Rpb24oJGxvZyl7XG5cdFx0dGhpcy50ZXN0T3JnID0gZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0JGxvZy5kZWJ1ZyhcIkRvIHNvbWV0aGluZyB3aXRoIG9yZyBkYXRhXCIpO1xuXHRcdFx0JGxvZy5kZWJ1ZyhkYXRhKTtcblx0XHR9O1xuXHR9XSlcblx0LnJ1bihbXG5cdFx0XCIkc3RhdGVcIiwgXCIkbG9nXCIsIFwiZnJhbWV3b3JrSG9tZVNydlwiLCBcImZyYW1ld29ya0NvbnN0YW50c1wiLCBcIiRyb290U2NvcGVcIiwgXCJ4MVV0aWxzXCIsIFwiJHdpbmRvd1wiLCBcIiR0cmFuc2xhdGVcIixcblx0XHQgXCIkcVwiLCBcIiR0aW1lb3V0XCIsIFwidW1icmVsbGFTZXJ2aWNlXCIsXG5cdFx0ZnVuY3Rpb24oJHN0YXRlLCAkbG9nLCBmcmFtZXdvcmtIb21lU3J2LCBmcmFtZXdvcmtDb25zdGFudHMsICRyb290U2NvcGUsIHgxVXRpbHMsICR3aW5kb3csICR0cmFuc2xhdGUsXG5cdFx0XHQkcSwgJHRpbWVvdXQsIHVtYnJlbGxhU2VydmljZSkge1xuXHRcdFx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0XHRcdCRsb2cubG9nKFwicnVubmluZyB1bWJyZWxsYSBydW5cIik7XG5cblx0XHRcdCRyb290U2NvcGUubG9hZGluZyA9IHRydWU7XG5cblx0XHRcdHZhciBkYXNoYm9hcmROYXZJdGVtcyA9IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwibmFtZVwiOiBcIlVtYnJlbGxhIFRlc3RcIixcblx0XHRcdFx0XHRcInN0YXRlXCI6IFwiZnJhbWV3b3JrSG9tZS50ZXN0XCIsXG5cdFx0XHRcdFx0XCJ2YWxpZFN0YXRlc1wiOiBbXCJmcmFtZXdvcmtIb21lLnRlc3RcIl0sXG5cdFx0XHRcdFx0XCJzdGF0ZUNvbmZpZ1wiOiB7XG5cdFx0XHRcdFx0XHR1cmw6IFwiL3Rlc3RcIixcblx0XHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBcInVtYnJlbGxhL3VtYnJlbGxhLnZpZXcuaHRtbFwiLFxuXHRcdFx0XHRcdFx0Y29udHJvbGxlcjogXCJ1bWJyZWxsYUN0cmxcIixcblx0XHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFx0bmFtZTogXCJ1bWJyZWxsYS5TVEFURV9OQU1FXCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFwiaWRcIjogXCJ1bWJyZWxsYS10ZXN0XCIsXG5cdFx0XHRcdFx0XCJjbGFzc1wiOiBcInVtYnJlbGxhLXRlc3RcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XTtcblxuXHRcdFx0ZnJhbWV3b3JrSG9tZVNydi5zZXRQcm9kdWN0VGl0bGUoeDFVdGlscy50cmFuc2xhdGUoXCJ1bWJyZWxsYS5IRUFERVJfVElUTEVcIikpO1xuXHRcdFx0ZnJhbWV3b3JrSG9tZVNydi5zZXRTaG93QmV0YUJhZGdlKHRydWUpO1xuXHRcdFx0ZnJhbWV3b3JrSG9tZVNydi5hZGRUb0ZyYW1ld29yayhmcmFtZXdvcmtDb25zdGFudHMuTkFWX01FTlUuREFTSEJPQVJEUywgZGFzaGJvYXJkTmF2SXRlbXMpO1xuXHRcdFx0JHRyYW5zbGF0ZShcIngxVWlOZ0ZyYW1ld29yay5IRUxQX01FTlUuUFJPRF9ET0NcIikudGhlbihmdW5jdGlvbigpIHtcblx0XHRcdFx0ZnJhbWV3b3JrSG9tZVNydi5hZGRIZWxwSXRlbSh4MVV0aWxzLnRyYW5zbGF0ZShcIngxVWlOZ0ZyYW1ld29yay5IRUxQX01FTlUuUFJPRF9ET0NcIiksIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdCR3aW5kb3cub3BlbihcImh0dHA6Ly9kb2MudW5pY2EuY29tL2RvYy5waHA/cGFzc2tleT1YeGk0TXlIdFIzbUkmY3hhJjFfMl8wJmVuX3VzJktDX1dFTENPTUVcIixcblx0XHRcdFx0XHRcdFwiQ1hBX1Byb2RIZWxwXCIpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0ZnJhbWV3b3JrSG9tZVNydi5hZGRIZWxwSXRlbSh4MVV0aWxzLnRyYW5zbGF0ZShcIngxVWlOZ0ZyYW1ld29yay5IRUxQX01FTlUuU1VQUE9SVFwiKSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0JHdpbmRvdy5vcGVuKFwiaHR0cDovL3N1cHBvcnQuaWJtY2xvdWQuY29tXCIpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdFx0ZnJhbWV3b3JrSG9tZVNydi5zZXRPcmdDYWxsYmFjayhmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblx0XHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0dmFyIG9yZ0FycmF5ID0gW1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcIm9yZ0lkXCI6IFwiMDk4NzZaXCIsXG5cdFx0XHRcdFx0XHRcdFwib3JnTmFtZVwiOiBcIkNYQSBGcmFtZXdvcmsgdGVzdGluZ1wiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0eyBcblx0XHRcdFx0XHRcdFx0XCJvcmdJZFwiOiBcIjEyMzQ1QVwiLFxuXHRcdFx0XHRcdFx0XHRcIm9yZ05hbWVcIjogXCJPcmdBXCIgXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0eyBcblx0XHRcdFx0XHRcdFx0XCJvcmdJZFwiOiBcIjEyMzQ1QlwiLFxuXHRcdFx0XHRcdFx0XHRcIm9yZ05hbWVcIjogXCJPcmdCXCIgXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0eyBcblx0XHRcdFx0XHRcdFx0XCJvcmdJZFwiOiBcIjEyMzQ1Q1wiLFxuXHRcdFx0XHRcdFx0XHRcIm9yZ05hbWVcIjogXCJPcmdDXCIgXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0eyBcblx0XHRcdFx0XHRcdFx0XCJvcmdJZFwiOiBcIjEyMzQ1RFwiLFxuXHRcdFx0XHRcdFx0XHRcIm9yZ05hbWVcIjogXCJPcmdEXCIgXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0eyBcblx0XHRcdFx0XHRcdFx0XCJvcmdJZFwiOiBcIjEyMzQ1RVwiLFxuXHRcdFx0XHRcdFx0XHRcIm9yZ05hbWVcIjogXCJPcmdFXCIgXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0eyBcblx0XHRcdFx0XHRcdFx0XCJvcmdJZFwiOiBcIjEyMzQ1RlwiLFxuXHRcdFx0XHRcdFx0XHRcIm9yZ05hbWVcIjogXCJPcmdGXCIgXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0eyBcblx0XHRcdFx0XHRcdFx0XCJvcmdJZFwiOiBcIjEyMzQ1R1wiLFxuXHRcdFx0XHRcdFx0XHRcIm9yZ05hbWVcIjogXCJPcmdHXCIgXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0eyBcblx0XHRcdFx0XHRcdFx0XCJvcmdJZFwiOiBcIjEyMzQ1SFwiLFxuXHRcdFx0XHRcdFx0XHRcIm9yZ05hbWVcIjogXCJPcmdIXCIgXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0eyBcblx0XHRcdFx0XHRcdFx0XCJvcmdJZFwiOiBcIjEyMzQ1SVwiLFxuXHRcdFx0XHRcdFx0XHRcIm9yZ05hbWVcIjogXCJPcmdJXCIgXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0eyBcblx0XHRcdFx0XHRcdFx0XCJvcmdJZFwiOiBcIjEyMzQ1SlwiLFxuXHRcdFx0XHRcdFx0XHRcIm9yZ05hbWVcIjogXCJPcmdKXCIgXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0eyBcblx0XHRcdFx0XHRcdFx0XCJvcmdJZFwiOiBcIjEyMzQ1S1wiLFxuXHRcdFx0XHRcdFx0XHRcIm9yZ05hbWVcIjogXCJPcmdLXCIgXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0eyBcblx0XHRcdFx0XHRcdFx0XCJvcmdJZFwiOiBcIjEyMzQ1TFwiLFxuXHRcdFx0XHRcdFx0XHRcIm9yZ05hbWVcIjogXCJPcmdMXCIgXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0eyBcblx0XHRcdFx0XHRcdFx0XCJvcmdJZFwiOiBcIjEyMzQ1TVwiLFxuXHRcdFx0XHRcdFx0XHRcIm9yZ05hbWVcIjogXCJPcmdNXCIgXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0eyBcblx0XHRcdFx0XHRcdFx0XCJvcmdJZFwiOiBcIjEyMzQ1T1wiLFxuXHRcdFx0XHRcdFx0XHRcIm9yZ05hbWVcIjogXCJPcmdPXCIgXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0eyBcblx0XHRcdFx0XHRcdFx0XCJvcmdJZFwiOiBcIjEyMzQ1UFwiLFxuXHRcdFx0XHRcdFx0XHRcIm9yZ05hbWVcIjogXCJPcmdQXCIgXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XTtcblx0XHRcdFx0XHQkbG9nLmRlYnVnKFwicmVzb2x2aW5nIGNhbGxiYWNrXCIpO1xuXHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUoeyBcImRhdGFcIjpvcmdBcnJheX0pO1xuXHRcdFx0XHR9LCAyMDAwKTtcblx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyoqXG5cdFx0XHQqIFNldCBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB1c2VyIHNlbGVjdHMgb3JnIGZyb20gZnJhbWV3b3JrIG1vZGFsXG5cdFx0XHQqL1xuXHRcdFx0ZnJhbWV3b3JrSG9tZVNydi5zZXRTZWxlY3RlZE9yZ0NhbGxiYWNrKHVtYnJlbGxhU2VydmljZS50ZXN0T3JnKTtcblxuXHRcdFx0ZnVuY3Rpb24gZW11bGF0ZVN0YXJ0dXAoKSB7XG5cdFx0XHRcdCRyb290U2NvcGUubG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0XHQvLyAkc3RhdGUuZ28oXCJmcmFtZXdvcmtIb21lLnRlc3RcIik7XG5cdFx0XHR9XG5cdFx0XHRzZXRUaW1lb3V0KGVtdWxhdGVTdGFydHVwLCAxMDAwKTtcblx0XHR9XSlcblx0LmNvbnRyb2xsZXIoXCJ1bWJyZWxsYUN0cmxcIiwgW1wiJHN0YXRlXCIsIFwiJGxvZ1wiLCBmdW5jdGlvbigkc3RhdGUsICRsb2cpIHtcblx0XHQkbG9nLmxvZyhcInJ1bm5pbmcgdW1icmVsbGEgY29udHJvbGxlclwiKTtcblx0XHQkbG9nLmxvZygkc3RhdGUuZ2V0KCkpO1xuXHRcdC8vJHN0YXRlLmdvKFwiZnJhbWV3b3JrSG9tZS50ZXN0XCIpO1xuXHR9XSk7IiwiKGZ1bmN0aW9uKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0YW5ndWxhclxuXHRcdC5tb2R1bGUoXCJ4MS51aS5kZW1vLmFwcDFcIilcblx0XHQuZGlyZWN0aXZlKFwiYW5vdGhlckRpcmVjdGl2ZVwiLCBhbm90aGVyRGlyZWN0aXZlKTtcblxuXHRcdGFub3RoZXJEaXJlY3RpdmUuJGluamVjdCA9IFsgXCIkdGltZW91dFwiIF07XG5cblx0XHRmdW5jdGlvbiBhbm90aGVyRGlyZWN0aXZlKCR0aW1lb3V0KSB7XG5cdFx0XHR2YXIgZGlyZWN0aXZlID0ge1xuXHRcdFx0XHRzY29wZTogZmFsc2UsXG5cdFx0XHRcdHJlc3RyaWN0OiBcIkVBXCIsXG5cdFx0XHRcdHRlbXBsYXRlOiBcIjxzcGFuIGNsYXNzPSdmcmFtZXdvcmstd2lkZ2V0LWJhZGdlJyBuZy1zaG93PSdkYXRhLm51bVVucmVhZCA+IDAnPnt7ZGF0YS5udW1VbnJlYWR9fTwvc3Bhbj5cIixcblx0XHRcdFx0bGluazogbGlua0Z1bmNcblx0XHRcdH07XG5cblx0XHRcdHJldHVybiBkaXJlY3RpdmU7XG5cblx0XHRcdGZ1bmN0aW9uIGxpbmtGdW5jKHNjb3BlKSB7XG5cdFx0XHRcdHNjb3BlLmRhdGEgPSB7XG5cdFx0XHRcdFx0bnVtVW5yZWFkOiAwXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0c2NvcGUuZGF0YSA9IHtcblx0XHRcdFx0XHRcdG51bVVucmVhZDogNFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH0sIDIwMDApO1x0XHRcdFx0XG5cdFx0XHR9XHRcdFx0XG5cdFx0fVxufSkoKTsiLCIvKipcbiAqXG4gKiBMaWNlbnNlZCBNYXRlcmlhbHMgLSBQcm9wZXJ0eSBvZiBJQk1cbiAqXG4gKiBhcHAxLmNvbnRyb2xsZXIuanNcbiAqXG4gKiAoQykgQ29weXJpZ2h0IElCTSBDb3Jwb3JhdGlvbiAyMDE1LlxuICogVS5TLiBHb3Zlcm5tZW50IFVzZXJzIFJlc3RyaWN0ZWQgUmlnaHRzOiAgVXNlLCBkdXBsaWNhdGlvbiBvciBkaXNjbG9zdXJlXG4gKiByZXN0cmljdGVkIGJ5IEdTQSBBRFAgU2NoZWR1bGUgQ29udHJhY3Qgd2l0aCBJQk0gQ29ycC5cbiAqXG4gKi9cblxuYW5ndWxhclxuXHQubW9kdWxlKFwieDEudWkuZGVtby5hcHAxXCIpXG5cdC5jb25maWcoW1wiJHVybFJvdXRlclByb3ZpZGVyXCIsIFwiJHRyYW5zbGF0ZVByb3ZpZGVyXCIsXG5cdFx0ZnVuY3Rpb24oJHVybFJvdXRlclByb3ZpZGVyLCAkdHJhbnNsYXRlUHJvdmlkZXIpIHtcblx0XHRcdFwidXNlIHN0cmljdFwiO1xuXG5cdFx0XHQvLyBSZWdpc3RlciBhIGxvYWRlciBmb3IgdGhlIHN0YXRpYyBmaWxlc1xuXHRcdFx0Ly8gU28sIHRoZSBtb2R1bGUgd2lsbCBzZWFyY2ggbWlzc2luZyB0cmFuc2xhdGlvbiB0YWJsZXMgdW5kZXIgdGhlIHNwZWNpZmllZCB1cmxzLlxuXHRcdFx0Ly8gVGhvc2UgdXJscyBhcmUgW3ByZWZpeF1bbGFuZ0tleV1bc3VmZml4XS5cblx0XHRcdCR0cmFuc2xhdGVQcm92aWRlci51c2VTdGF0aWNGaWxlc0xvYWRlcih7XG5cdFx0XHRcdHByZWZpeDogXCIuLi9sMTBuL1wiLFxuXHRcdFx0XHRzdWZmaXg6IFwiLmpzb25cIlxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIFRlbGwgdGhlIG1vZHVsZSB3aGF0IGxhbmd1YWdlIHRvIHVzZSBieSBkZWZhdWx0XG5cdFx0XHQkdHJhbnNsYXRlUHJvdmlkZXIucHJlZmVycmVkTGFuZ3VhZ2UoXCJlbl9VU1wiKTtcblx0XHRcdCR0cmFuc2xhdGVQcm92aWRlci51c2VTYW5pdGl6ZVZhbHVlU3RyYXRlZ3koXCJlc2NhcGVkXCIpO1xuXG5cdFx0XHQkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiZnJhbWV3b3JrSG9tZS5hcHAxTmF2MVwiKTtcblx0XHR9XG5cdF0pXG5cblx0LnJ1bihbXCIkc3RhdGVcIiwgXCJhcHAxTmF2U2VydmljZVwiLCBcImZyYW1ld29ya0hvbWVTcnZcIiwgXCJ4MVV0aWxzXCIsXG5cdFx0ZnVuY3Rpb24oJHN0YXRlLCBhcHAxTmF2U2VydmljZSwgZnJhbWV3b3JrSG9tZVNydiwgeDFVdGlscykge1xuXHRcdGFwcDFOYXZTZXJ2aWNlLmNvbmZpZ3VyZU5hdmlnYXRpb24oKTtcblx0XHRmcmFtZXdvcmtIb21lU3J2LnNldFByb2R1Y3RUaXRsZSh4MVV0aWxzLnRyYW5zbGF0ZShcImFwcDEuSEVBREVSX1RJVExFXCIpKTtcblx0XHRmcmFtZXdvcmtIb21lU3J2LnNldFVzZXIoe1xuXHRcdFx0Zmlyc3ROYW1lOiBcIlR3ZXJwXCIsXG5cdFx0XHRvcmdOYW1lOiBcIkNYQSBGcmFtZXdvcmsgdGVzdGluZ1wiLFxuXHRcdFx0b3JnSWQ6IFwiMDk4NzZaXCJcblx0XHR9KTtcblx0XHQvL2ZyYW1ld29ya0hvbWVTcnYuc2V0U2hvd0JldGFCYWRnZShmYWxzZSk7XG5cdFx0Ly8kc3RhdGUuZ28oXCJmcmFtZXdvcmtIb21lLmFwcDFOYXYxXCIpO1xuXG5cdH1dKVxuXHQuY29udHJvbGxlcihcImFwcDFOYXYxQ3RybFwiLCBbXCIkc2NvcGVcIiwgZnVuY3Rpb24oJHNjb3BlKSB7XG5cdFx0JHNjb3BlLmFwcDFOYXYxQ29uZmlncyA9IHt9O1xuXHR9XSlcblx0LmNvbnRyb2xsZXIoXCJhcHAxTmF2MkN0cmxcIiwgW1wiJHNjb3BlXCIsIGZ1bmN0aW9uKCRzY29wZSkge1xuXHRcdCRzY29wZS5hcHAxTmF2MkNvbmZpZ3MgPSB7fTtcblx0fV0pXG5cdC5jb250cm9sbGVyKFwiYXBwMUFkbWluMUN0cmxcIiwgW1wiJHNjb3BlXCIsIGZ1bmN0aW9uKCRzY29wZSkge1xuXHRcdCRzY29wZS5hcHAxQWRtaW4xQ29uZmlncyA9IHt9O1xuXHR9XSlcblx0LnNlcnZpY2UoXCJhcHAxTmF2U2VydmljZVwiLCBbXCJmcmFtZXdvcmtIb21lU3J2XCIsIFwiZnJhbWV3b3JrQ29uc3RhbnRzXCIsIFwiJGxvZ1wiLFxuXHRcdGZ1bmN0aW9uKGZyYW1ld29ya0hvbWVTcnYsIGZyYW1ld29ya0NvbnN0YW50cywgJGxvZykge1xuXHRcdFx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0XHRcdHZhciBhbmFseXplTmF2SXRlbXMgPSBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcIm5hbWVcIjogXCJhcHAxLW5hdjFcIixcblx0XHRcdFx0XHRcInN0YXRlXCI6IFwiZnJhbWV3b3JrSG9tZS5hcHAxTmF2MVwiLFxuXHRcdFx0XHRcdFwidmFsaWRTdGF0ZXNcIjogW1wiZnJhbWV3b3JrSG9tZS5hcHAxTmF2MVwiXSxcblx0XHRcdFx0XHRcInN0YXRlQ29uZmlnXCI6IHtcblx0XHRcdFx0XHRcdHVybDogXCIvYXBwMW5hdjFcIixcblx0XHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBcImFwcDEvYXBwMS5odG1sXCIsXG5cdFx0XHRcdFx0XHRjb250cm9sbGVyOiBcImFwcDFOYXYxQ3RybFwiLFxuXHRcdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XHRuYW1lOiBcImFwcDEuU1RBVEVfTkFNRVMuYXBwMW5hdjFcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XCJpZFwiOiBcImFwcDEtbmF2MVwiLFxuXHRcdFx0XHRcdFwiY2xhc3NcIjogXCJhcHAxLW5hdjFcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJuYW1lXCI6IFwiYXBwMS1uYXYyXCIsXG5cdFx0XHRcdFx0XCJzdGF0ZVwiOiBcImZyYW1ld29ya0hvbWUuYXBwMU5hdjJcIixcblx0XHRcdFx0XHRcInZhbGlkU3RhdGVzXCI6IFtcImZyYW1ld29ya0hvbWUuYXBwMU5hdjJcIl0sXG5cdFx0XHRcdFx0XCJzdGF0ZUNvbmZpZ1wiOiB7XG5cdFx0XHRcdFx0XHR1cmw6IFwiL2FwcDFuYXYyXCIsXG5cdFx0XHRcdFx0XHR0ZW1wbGF0ZTogXCI8ZGl2IGNsYXNzPSdhcHAxJz48aDE+VGhpcyBpcyBBcHAxIE5hdjI8L2gxPlwiICtcblx0XHRcdFx0XHRcdFwiPGEgdWktc3JlZj0nZnJhbWV3b3JrSG9tZS51bmxpc3RlZFBhcmVudCc+R28gdG8gdW5saXN0ZWQ8L2E+PC9kaXY+XCIgK1xuXHRcdFx0XHRcdFx0XCI8YSB1aS1zcmVmPSdmcmFtZXdvcmtIb21lLnVubGlzdGVkQ2hpbGQnPkdvIGRpcmVjdGx5IHRvIHVubGlzdGVkIGNoaWxkPC9hPjwvZGl2PlwiLFxuXHRcdFx0XHRcdFx0Y29udHJvbGxlcjogXCJhcHAxTmF2MkN0cmxcIixcblx0XHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFx0bmFtZTogXCJhcHAxLlNUQVRFX05BTUVTLmFwcDFuYXYyXCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFwiaWRcIjogXCJhcHAxLW5hdjJcIixcblx0XHRcdFx0XHRcImNsYXNzXCI6IFwiYXBwMS1uYXYyXCJcblx0XHRcdFx0fVxuXHRcdFx0XTtcblxuXHRcdFx0dmFyIGFkbWluTmF2SXRlbXMgPSBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcIm5hbWVcIjogXCJhcHAxLWFkbWluMVwiLFxuXHRcdFx0XHRcdFwic3RhdGVcIjogXCJmcmFtZXdvcmtIb21lLmFwcDFBZG1pbjFcIixcblx0XHRcdFx0XHRcInZhbGlkU3RhdGVzXCI6IFtcImZyYW1ld29ya0hvbWUuYXBwMUFkbWluMVwiXSxcblx0XHRcdFx0XHRcInN0YXRlQ29uZmlnXCI6IHtcblx0XHRcdFx0XHRcdHVybDogXCIvYXBwMWFkbWluMVwiLFxuXHRcdFx0XHRcdFx0dGVtcGxhdGU6IFwiPGRpdiBjbGFzcz0nYXBwMSc+PGgxPlRoaXMgaXMgQXBwMSBBZG1pbjE8L2gxPjwvZGl2PlwiLFxuXHRcdFx0XHRcdFx0Y29udHJvbGxlcjogXCJhcHAxQWRtaW4xQ3RybFwiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcImlkXCI6IFwiYXBwMS1hZG1pbjFcIixcblx0XHRcdFx0XHRcImNsYXNzXCI6IFwiYXBwMS1hZG1pbjFcIlxuXHRcdFx0XHR9XG5cdFx0XHRdO1xuXG5cdFx0XHR2YXIgdW5saXN0ZWRTdGF0ZXMgPSBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInN0YXRlXCI6IFwiZnJhbWV3b3JrSG9tZS51bmxpc3RlZFBhcmVudFwiLFxuXHRcdFx0XHRcdFwic3RhdGVDb25maWdcIjoge1xuXHRcdFx0XHRcdFx0dXJsOiBcIi91bmxpc3RlZFBhcmVudFwiLFxuXHRcdFx0XHRcdFx0dGVtcGxhdGU6IFwiPGRpdiBjbGFzcz0nYXBwMSc+PGgxPlRoaXMgaXMgdW5saXN0ZWRQYXJlbnQ8L2gxPlwiICtcblx0XHRcdFx0XHRcdFwiPGEgdWktc3JlZj0nZnJhbWV3b3JrSG9tZS51bmxpc3RlZENoaWxkJz5HbyB0byB1bmxpc3RlZCBjaGlsZDwvYT48L2Rpdj5cIixcblx0XHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFx0bmFtZTogXCJhcHAxLlNUQVRFX05BTUVTLnVubGlzdGVkUGFyZW50XCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInN0YXRlXCI6IFwiZnJhbWV3b3JrSG9tZS51bmxpc3RlZENoaWxkXCIsXG5cdFx0XHRcdFx0XCJzdGF0ZUNvbmZpZ1wiOiB7XG5cdFx0XHRcdFx0XHR1cmw6IFwiL3VubGlzdGVkQ2hpbGRcIixcblx0XHRcdFx0XHRcdHRlbXBsYXRlOiBcIjxkaXYgY2xhc3M9J2FwcDEnPjxoMT5UaGlzIGlzIHVubGlzdGVkQ2hpbGQ8L2gxPjwvZGl2PlwiICtcblx0XHRcdFx0XHRcdFwiPGEgdWktc3JlZj0nZnJhbWV3b3JrSG9tZS5ncmFuZENoaWxkJz5HbyB0byBncmFuZGNoaWxkPC9hPjwvZGl2Pjxicj5cIiArXG5cdFx0XHRcdFx0XHRcIjxhIHVpLXNyZWY9J2ZyYW1ld29ya0hvbWUuYXBwMk5hdjQnPkdvIHRvIGFwcDJOYXY0PC9hPjwvZGl2PlwiLFxuXHRcdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XHRuYW1lOiBcImFwcDEuU1RBVEVfTkFNRVMudW5saXN0ZWRDaGlsZFwiLFxuXHRcdFx0XHRcdFx0XHRwYXJlbnRTdGF0ZXM6IFtcblx0XHRcdFx0XHRcdFx0XHRcImZyYW1ld29ya0hvbWUuYXBwMU5hdjJcIixcblx0XHRcdFx0XHRcdFx0XHRcImZyYW1ld29ya0hvbWUudW5saXN0ZWRQYXJlbnRcIlx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwic3RhdGVcIjogXCJmcmFtZXdvcmtIb21lLmdyYW5kQ2hpbGRcIixcblx0XHRcdFx0XHRcInN0YXRlQ29uZmlnXCI6IHtcblx0XHRcdFx0XHRcdHVybDogXCIvZ3JhbmRDaGlsZFwiLFxuXHRcdFx0XHRcdFx0dGVtcGxhdGU6IFwiPGRpdiBjbGFzcz0nYXBwMSc+PGgxPlRoaXMgaXMgZ3JhbmRDaGlsZDwvaDE+PC9kaXY+XCIsXG5cdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdG5hbWU6IFwiYXBwMS5TVEFURV9OQU1FUy51bmxpc3RlZEdyYW5kQ2hpbGRcIixcblx0XHRcdFx0XHRcdFx0cGFyZW50U3RhdGVzOiBbXG5cdFx0XHRcdFx0XHRcdFx0XCJmcmFtZXdvcmtIb21lLnVubGlzdGVkQ2hpbGRcIlxuXHRcdFx0XHRcdFx0XHRdXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRdO1xuXG5cdFx0XHR2YXIgdG9wTmF2V2lkZ2V0cyA9IFtcblx0XHRcdFx0XCI8c29tZS1kaXJlY3RpdmU+PC9zb21lLWRpcmVjdGl2ZT5cIlxuXHRcdFx0XTtcblxuXHRcdFx0dmFyIHN1Yk5hdldpZGdldHMgPSBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR3aWRnZXQ6IFwiPHN1Ym5hdi1kaXJlY3RpdmUxPjwvc3VibmF2LWRpcmVjdGl2ZTE+XCIsXG5cdFx0XHRcdFx0dmFsaWRTdGF0ZXM6IFtcblx0XHRcdFx0XHRcdFwiZnJhbWV3b3JrSG9tZS5hcHAxTmF2MVwiLFxuXHRcdFx0XHRcdFx0XCJmcmFtZXdvcmtIb21lLnVubGlzdGVkQ2hpbGRcIlxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHdpZGdldDogXCI8c3VibmF2LWRpcmVjdGl2ZTI+PC9zdWJuYXYtZGlyZWN0aXZlMj5cIixcblx0XHRcdFx0XHR2YWxpZFN0YXRlczogW1xuXHRcdFx0XHRcdFx0XCJmcmFtZXdvcmtIb21lLmFwcDFOYXYxXCIsXG5cdFx0XHRcdFx0XHRcImZyYW1ld29ya0hvbWUuYXBwMU5hdjJcIlxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fVxuXHRcdFx0XTtcblxuXHRcdFx0dGhpcy5jb25maWd1cmVOYXZpZ2F0aW9uID0gZnVuY3Rpb24oKXtcblx0XHRcdFx0ZnJhbWV3b3JrSG9tZVNydi5hZGRUb0ZyYW1ld29yayhmcmFtZXdvcmtDb25zdGFudHMuTkFWX01FTlUuQU5BTFlaRSwgYW5hbHl6ZU5hdkl0ZW1zKTtcblx0XHRcdFx0ZnJhbWV3b3JrSG9tZVNydi5hZGRUb0ZyYW1ld29yayhmcmFtZXdvcmtDb25zdGFudHMuTkFWX01FTlUuQURNSU4sIGFkbWluTmF2SXRlbXMpO1xuXHRcdFx0XHRmcmFtZXdvcmtIb21lU3J2LmFkZFRvRnJhbWV3b3JrKGZyYW1ld29ya0NvbnN0YW50cy5OT1RfT05fTUVOVSwgdW5saXN0ZWRTdGF0ZXMpO1xuXHRcdFx0XHRmcmFtZXdvcmtIb21lU3J2LmFkZFRvVG9wTmF2KHRvcE5hdldpZGdldHMpO1xuXHRcdFx0XHRmcmFtZXdvcmtIb21lU3J2LmFkZFRvU3ViTmF2KHN1Yk5hdldpZGdldHMpO1xuXHRcdFx0XHQkbG9nLmxvZyhcImFkZGluZyBuYXZJdGVtczogXCIgKyBhbmFseXplTmF2SXRlbXMpO1xuXHRcdFx0fTtcblxuXHRcdH1cblx0XSk7IiwiKGZ1bmN0aW9uKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0YW5ndWxhclxuXHRcdC5tb2R1bGUoXCJ4MS51aS5kZW1vLmFwcDFcIilcblx0XHQuZGlyZWN0aXZlKFwic29tZURpcmVjdGl2ZVwiLCBzb21lRGlyZWN0aXZlKTtcblxuXHRcdGZ1bmN0aW9uIHNvbWVEaXJlY3RpdmUoKSB7XG5cdFx0XHR2YXIgZGlyZWN0aXZlID0ge1xuXHRcdFx0XHRzY29wZTogZmFsc2UsXG5cdFx0XHRcdHJlc3RyaWN0OiBcIkVBXCIsXG5cdFx0XHRcdHJlcGxhY2U6IHRydWUsXG5cdFx0XHRcdHRlbXBsYXRlVXJsOiBcImFwcDEvc29tZWRpcmVjdGl2ZS5odG1sXCJcblx0XHRcdH07XG5cblx0XHRcdHJldHVybiBkaXJlY3RpdmU7XHRcdFx0XG5cdFx0fVxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXHRhbmd1bGFyXG5cdFx0Lm1vZHVsZShcIngxLnVpLmRlbW8uYXBwMVwiKVxuXHRcdC5kaXJlY3RpdmUoXCJzdWJuYXZEaXJlY3RpdmUxXCIsIHN1Ym5hdkRpcmVjdGl2ZTEpO1xuXG5cdFx0ZnVuY3Rpb24gc3VibmF2RGlyZWN0aXZlMSgpIHtcblx0XHRcdHZhciBkaXJlY3RpdmUgPSB7XG5cdFx0XHRcdHNjb3BlOiBmYWxzZSxcblx0XHRcdFx0cmVwbGFjZTogdHJ1ZSxcblx0XHRcdFx0cmVzdHJpY3Q6IFwiRUFcIixcblx0XHRcdFx0dGVtcGxhdGU6IFwiPGEgaHJlZj0nIyc+XCIgK1xuXHRcdFx0XHRcdFwiPHNwYW4gY2xhc3M9J2dseXBoaWNvbiBnbHlwaGljb24tZW52ZWxvcGUnPjwvc3Bhbj5cIitcblx0XHRcdFx0XHRcIjxzcGFuPlN1Ym5hdiBEaXJlY3RpdmUgMTwvc3Bhbj48L2E+XCJcblx0XHRcdH07XG5cblx0XHRcdHJldHVybiBkaXJlY3RpdmU7XHRcdFxuXHRcdH1cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0YW5ndWxhclxuXHRcdC5tb2R1bGUoXCJ4MS51aS5kZW1vLmFwcDFcIilcblx0XHQuZGlyZWN0aXZlKFwic3VibmF2RGlyZWN0aXZlMlwiLCBzdWJuYXZEaXJlY3RpdmUyKTtcblxuXHRcdGZ1bmN0aW9uIHN1Ym5hdkRpcmVjdGl2ZTIoKSB7XG5cdFx0XHR2YXIgZGlyZWN0aXZlID0ge1xuXHRcdFx0XHRzY29wZTogZmFsc2UsXG5cdFx0XHRcdHJlcGxhY2U6IHRydWUsXG5cdFx0XHRcdHJlc3RyaWN0OiBcIkVBXCIsXG5cdFx0XHRcdHRlbXBsYXRlOiBcIjxhIGhyZWY9JyMnIHN0eWxlPSdwYWRkaW5nLXJpZ2h0OiAzMHB4OyBjb2xvcjogIzMyMzIzMjsnPlwiICtcblx0XHRcdFx0XHRcIjxzcGFuIGNsYXNzPSdnbHlwaGljb24gZ2x5cGhpY29uLW9wdGlvbi12ZXJ0aWNhbCcgc3R5bGU9J2NvbG9yOiAjMzIzMjMyOyc+PC9zcGFuPlwiICtcblx0XHRcdFx0XHRcIjxzcGFuPk1lbnU8L3NwYW4+PC9hPlwiXG5cdFx0XHR9O1xuXG5cdFx0XHRyZXR1cm4gZGlyZWN0aXZlO1x0XHRcblx0XHR9XG59KSgpOyIsIjxkaXYgY2xhc3M9XCJhcHAxXCI+XG5cdDxoMT5UaGlzIGlzIEFwcDEgTmF2MTwvaDE+XG5cdDxwPlRoaXMgaXMgdGhlIGRlZmF1bHQgdmlldyB3aGVuIEFwcDEgcnVucyBpbiBzdGFuZGFsb25lIG1vZGU8L3A+XG5cdDxwPjxhIGhyZWY9XCJpbmRleC1hcHAxLmh0bWxcIj5Mb2FkIEFwcDEgaW4gc3RhbmRhbG9uZSBtb2RlPC9hPjwvcD5cblx0PHA+PGEgaHJlZj1cImluZGV4Lmh0bWxcIj5Mb2FkIHRoZSBBbGwtaW4tb25lIEFwcDwvYT48L3A+XG5cdDxwPkNsaWNrIG9uIHRoZSBsaW5rcyBhYm92ZSBhbmQgbm90aWNlIGhvdyB0aGUgc2lkZS1uYXYgY2hhbmdlcy48L3A+XG48L2Rpdj4iLCI8cCBjbGFzcz1cInN1Yi10ZW1wbGF0ZVwiPlRoaXMgaXMgYSBzYW1wbGUgc3ViIHRlbXBsYXRlIHdoaWNoIGNhbiBiZSBpbmNsdWRlZCBpblx0dGhlIHNpZGVcblx0bmF2aWdhdGlvbi48L3A+XG48cCBjbGFzcz1cInN1Yi10ZW1wbGF0ZVwiPlRoaXMgaXMgYSBzYW1wbGUgc3ViIHRlbXBsYXRlIHdoaWNoIGNhbiBiZSBpbmNsdWRlZCBpblx0dGhlIHNpZGVcblx0bmF2aWdhdGlvbi48L3A+XG48cCBjbGFzcz1cInN1Yi10ZW1wbGF0ZVwiPlRoaXMgaXMgYSBzYW1wbGUgc3ViIHRlbXBsYXRlIHdoaWNoIGNhbiBiZSBpbmNsdWRlZCBpblx0dGhlIHNpZGVcblx0bmF2aWdhdGlvbi48L3A+IiwiPGEgY2xhc3M9J21haW4tbWVudS1saW5rJyByb2xlPSdidXR0b24nPlxuXHQ8c3BhbiBjbGFzcz0nZ2x5cGhpY29uIGdseXBoaWNvbi1lbnZlbG9wZSc+PC9zcGFuPlxuXHQ8c3BhbiBzdHlsZT1cIm1hcmdpbi1sZWZ0OiAxMHB4O1wiPkFwcCAxIFdpZGdldDwvc3Bhbj5cblx0PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWNoZXZyb24tZG93blwiPjwvc3Bhbj5cblx0PGFub3RoZXItZGlyZWN0aXZlPjwvYW5vdGhlci1kaXJlY3RpdmU+XG48L2E+IiwiPGRpdiBjbGFzcz1cInVtYnJlbGxhXCI+XG5cdDxoMT5UaGlzIGlzIHRoZSBVbWJyZWxsYSBBcHAgTGFuZGluZyBQYWdlPC9oMT5cblx0PHA+VGhpcyBkZW1vbnN0cmF0ZXMgdGhlIGZyYW1ld29yayBydW5uaW5nIHdpdGggdHdvIHNlcGFyYXRlIGFwcHMgYm91bmQgdG9nZXRoZXIgYnkgYSAzcmQgKHVtYnJlbGxhKSBhcHAuXG5cdFx0VGhlIFVtYnJlbGxhIGFwcCZhcG9zO3Mgc29sZSBwdXJwb3NlIGlzIHRvIGluY2x1ZGUgdGhlIHR3byBzZXBhcmF0ZSBhcHBzIGludG8gb25lIGFwcGxpY2F0aW9uIGFuZCBzZXQgYW55XG5cdFx0ZGVmYXVsdHMgbmVlZGVkLiBJdCBjb3VsZCBpbiBhZGRpdGlvbiBkZWZpbmUgYW55IG5ldyBmdW5jdGlvbmFsaXR5IHRoYXQgaXMgb25seSBhdmFpbGFibGUgd2hlbiB0aGUgdHdvIGNoaWxkXG5cdFx0YXBwbGljYXRpb25zIGFyZSBydW5uaW5nIHRvZ2V0aGVyIGluc2lkZSB0aGUgdW1icmVsbGEgYXBwIGJ1dCBhcmUgbm90IGF2YWlsYWJsZSB3aGVuIGVpdGhlciBvZiB0aGUgdHdvIGFwcHNcblx0XHRpcyBydW5uaW5nIHNlcGFyYXRlbHkuXG5cdDwvcD5cblx0PHA+RWFjaCBhcHAgaW5jbHVkZXMgdGhlIFVJIEZyYW1ld29yayBhcyBhIGRlcGVuZGVuY3kgYW5kIGVhY2ggY2FsbHMgdGhlIEZyYW1ld29yayBOYXYgU2VydmljZSBpbiBpdHNcblx0XHRBbmd1bGFyLnJ1bigpIGJsb2NrIHRvIGhhdmVcdGl0cyBuYXZpZ2F0aW9uIHN0cnVjdHVyZSBhZGRlZCBpbnRvIHRoZSBVSSBGcmFtZXdvcmsuIFRoaXMgY3JlYXRlcyBhIGNvbWJpbmVkXG5cdFx0bmF2aWdhdGlvbiBzdHJ1Y3R1cmUuXG5cdDwvcD5cblx0PHA+Q2xpY2sgb24gaXRlbXMgaW4gdGhlIHNpZGUtbmF2IHRvIHNlZSB0aGF0IHNvbWUgaXRlbXMgYXJlIHByb3ZpZGVkIGJ5IDxiPkFwcDE8L2I+IGFuZCBzb21lIGJ5IDxiPkFwcDI8L2I+LiBJZlxuXHRcdHlvdSBsYXVuY2ggQXBwMSBhcyBhIHN0YW5kYWxvbmUgYXBwIChub3QgYnkgcnVubmluZyB0aGUgdW1icmVsbGEgYXBwKSB0aGVuIHRoZSBzaWRlLW5hdiBmcm9tIHRoZSBmcmFtZXdvcmtcblx0XHR3aWxsIHN0aWxsIGJlIGF2YWlsYWJsZSwgYnV0IG5vbmUgb2YgQXBwMiZhcG9zO3MgaXRlbXMgd2lsbCBiZSBpbiBpdC5cblx0PC9wPlxuPC9kaXY+Il19
