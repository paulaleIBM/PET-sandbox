/**
 *
 * Licensed Materials - Property of IBM
 *
 * app2.module.js
 *
 * (C) Copyright IBM Corporation 2016.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.demo.app2", [
		"x1.ui.framework"
	]);
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
/**
 *
 * Licensed Materials - Property of IBM
 *
 * app2.controller.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.demo.app2")
	.config(["$urlRouterProvider", "$translateProvider",
		function($urlRouterProvider, $translateProvider) {
			"use strict";

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
	.run(["$state", "app2NavService", "frameworkHomeSrv", "x1Utils",
		function($state, app2NavService, frameworkHomeSrv, x1Utils) {
		app2NavService.configureNavigation();
		frameworkHomeSrv.setProductTitle(x1Utils.translate("app2.HEADER_TITLE"));
		//$state.go("frameworkHome.app2Nav2");
	}])
	.controller("app2Nav1Ctrl", ["$rootScope", "$scope", "$state", "x1Utils", "frameworkConstants",
		function($rootScope, $scope, $state, x1Utils, frameworkConstants) {
			$scope.app2Nav1Configs = {};

			$scope.testBanner = function(type) {
				var bannerObj = {
					"type": type
				};
				switch(type) {
					case "bg-info":
						bannerObj.message = x1Utils.translate("app2.NOTIFICATIONS.info");
					break;
					case "bg-success":
						bannerObj.message = x1Utils.translate("app2.NOTIFICATIONS.success");
						bannerObj.linkText = "Go to App2Nav2";
						bannerObj.state = "frameworkHome.app1Nav1";
					break;
					default:
						bannerObj.message = x1Utils.translate("app2.NOTIFICATIONS.info");
					break;
				}
				$rootScope.$emit(frameworkConstants.Events.SHOW_BANNER, [ bannerObj ]);
			};

			var bannerListener = $rootScope.$on(frameworkConstants.Events.BANNER_CLICKED, function(e, clickData) {
				$state.go(clickData.state);
			});

			$scope.$on("$destroy", function() {
				bannerListener();
			});
	}])
	.controller("app2Nav2Ctrl", ["$scope", "$state", function($scope, $state) {
		$scope.app2Nav2Configs = {};
		$scope.changeState = function() {
			$state.go("frameworkHome.unlistedStateParams", { someParam: 580 });
		};
	}])
	.controller("app2Apps1Ctrl", ["$scope", function($scope) {
		$scope.app2Apps1Configs = {};
	}])
	.controller("app2Build1Ctrl", ["$scope", function($scope) {
		$scope.app2Build1Configs = {};
	}])
	.controller("app2AnalyticsCtrl", ["$scope", function($scope) {
		$scope.app2AnalyticsConfigs = {};
	}])
	.controller("app2Nav3Ctrl", ["$scope", function($scope) {
		$scope.app2Nav3Configs = {};
	}])
	.controller("app2Nav4Ctrl", ["$scope", function($scope) {
		$scope.app2Nav4Configs = {};
	}])
	.service("app2NavService", ["frameworkHomeSrv", "frameworkConstants", "$log",
		function(frameworkHomeSrv, frameworkConstants, $log) {
			"use strict";

			var analyzeNavItems = [
				{
					"name": "app2-nav1",
					"state": "frameworkHome.app2Nav1",
					"validStates": ["frameworkHome.app2Nav1"],
					"stateConfig": {
						url: "/app2nav1",
						templateUrl: "app2/app2.html",
						controller: "app2Nav1Ctrl",
						data: {
							name: "app2.STATE_NAMES.app2nav1",
							children: [
								"app2-nav1.child1",
								"app2-nav1.child2",
								"app2-nav1.child3"
							]
						}
					},
					"id": "app2-nav1",
					"class": "app2-nav1"
				},
				{
					"name": "app2-nav2",
					"state": "frameworkHome.app2Nav2",
					"validStates": ["frameworkHome.app2Nav2"],
					"stateConfig": {
						url: "/app2nav2?someParam",
						template: "<div class='app2'><h1>This is App2 Nav2</h1>" +
									"<button ng-click='changeState()'>Go to next state with params</button></div>",
						controller: "app2Nav2Ctrl"
					},
					"id": "app2-nav2",
					"class": "app2-nav2"
				}
			];

			var manageNavItems = [
				{
					"name": "app2-build1",
					"state": "frameworkHome.app2Build1",
					"validStates": ["frameworkHome.app2Build1"],
					"stateConfig": {
						url: "/app2build1",
						template: "<div class='app2'><h1>This is App2 Build1</h1></div>",
						controller: "app2Build1Ctrl"
					},
					"id": "app2-build1",
					"class": "app2-build1"
				}
			];

			var limitedNavItems = [
				{
					"name": "app2-apps1",
					"state": "frameworkHome.app2apps1",
					"validStates": ["frameworkHome.app2apps1"],
					"stateConfig": {
						url: "/app2apps1",
						template: "<div class='app2'><h1>This is App2 App1</h1></div>",
						controller: "app2Apps1Ctrl"
					},
					"id": "app2-apps1",
					"class": "app2-apps1"
				}
			];

			var dashboardsNavItems = [
				{
					"name": "Dashboards",
					"state": "frameworkHome.analytics",
					"validStates": ["frameworkHome.analytics"],
					"stateConfig": {
						url: "/analytics",
						template: "<div class='app2'><h1>This is Analytics selected</h1></div>",
						controller: "app2AnalyticsCtrl"
					},
					"id": "analytics",
					"class": "analytics",
					"reveal": true,
					"backState": "frameworkHome.analytics",
					"items": [
						{
							"include": "app2/side-navigation-sub-template.html",
							"id": "analytics-template",
							"class": "dashboard",
							"name": "Analytics Template",
							"state": "frameworkHome.testCustomTemplate",
							"validStates": ["frameworkHome.testCustomTemplate"],
							"stateConfig": {
								url: "/analytics/custom",
								template: "<div class='app2'><h1>This is Analytics in action!!!</h1></div>",
								controller: "app2AnalyticsCtrl"
							}
						}
					]
				},
				{
					"name": "app2-nav3",
					"state": "frameworkHome.app2Nav3",
					"validStates": ["frameworkHome.app2Nav3"],
					"stateConfig": {
						url: "/app2nav3",
						template: "<div class='app2'><h1>This is App2 Nav3</h1></div>",
						controller: "app2Nav3Ctrl"
					},
					"id": "app2-nav3",
					"class": "app2-nav3"
				},
				{
					"name": "app2-nav4",
					"state": "frameworkHome.app2Nav4",
					"validStates": ["frameworkHome.app2Nav4"],
					"stateConfig": {
						url: "/app2nav4",
						template: "<div class='app2'><h1>This is App2 Nav4</h1></div>",
						controller: "app2Nav4Ctrl",
						data: {
							name: "app2.nav4",
							parentStates: [
								frameworkConstants.NAV_STATES.DASHBOARDS,
								"frameworkHome.unlistedChild"								
							]
						}
					},
					"id": "app2-nav4",
					"class": "app2-nav4"
				}
			];

			var unlistedStates = [
				{
					"state": "frameworkHome.unlistedStateParams",
					"stateConfig": {
						url: "/unlistedStateParams?someParam",
						template: "<div class='app1'><h1>This is unlistedStateParams</h1>",
						params: {
							"anotherParam": 4567
						},
						data: {
							name: "app2.STATE_NAMES.stateParams",
							parentStates: [
								"frameworkHome.app2Nav2"
							]
						}
					}
				}
			];

			this.configureNavigation = function(){
				frameworkHomeSrv.addToFramework(frameworkConstants.NAV_MENU.ANALYZE, analyzeNavItems);
				frameworkHomeSrv.addToFramework(frameworkConstants.NAV_MENU.MANAGE, manageNavItems);
				frameworkHomeSrv.addToFramework(frameworkConstants.NAV_MENU.DASHBOARDS, dashboardsNavItems);
				frameworkHomeSrv.addToFramework(frameworkConstants.NAV_MENU.LIMITED_AVAILABILITY, limitedNavItems);
				frameworkHomeSrv.addToFramework(frameworkConstants.NOT_ON_MENU, unlistedStates);
				$log.log("adding navItems: " + analyzeNavItems);
			};

		}
	]);
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
  $templateCache.put('app2/app2.html',
    '<div class="app2">\n' +
    '	<h1>This is App2 Nav1</h1>\n' +
    '	<button ng-click="testBanner(\'bg-info\')">Show framework banner with info class</button>\n' +
    '	<button ng-click="testBanner(\'bg-success\')">Show framework banner with success class</button>\n' +
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
  $templateCache.put('app2/side-navigation-sub-template.html',
    '<ul>\n' +
    '	<li class="sub-template">This is a placeholder for a Dashboard or list of dashboards.</li>\n' +
    '	<li class="sub-template">This is a placeholder for a Dashboard or list of dashboards.</li>\n' +
    '	<li class="sub-template">This is a placeholder for a Dashboard or list of dashboards.</li>\n' +
    '</ul>');
}]);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcDIvYXBwMi5tb2R1bGUuanMiLCJhcHAxL2FwcDEubW9kdWxlLmpzIiwidW1icmVsbGEvdW1icmVsbGEuYXBwLm1vZHVsZS5qcyIsImFwcDIvYXBwMi5jb250cm9sbGVyLmpzIiwiYXBwMS9hbm90aGVyZGlyZWN0aXZlLmRpcmVjdGl2ZS5qcyIsImFwcDEvYXBwMS5jb250cm9sbGVyLmpzIiwiYXBwMS9zb21lZGlyZWN0aXZlLmRpcmVjdGl2ZS5qcyIsImFwcDEvc3VibmF2ZGlyZWN0aXZlMS5kaXJlY3RpdmUuanMiLCJhcHAxL3N1Ym5hdmRpcmVjdGl2ZTIuZGlyZWN0aXZlLmpzIiwiYXBwMi9hcHAyLmh0bWwiLCJhcHAyL3NpZGUtbmF2aWdhdGlvbi1zdWItdGVtcGxhdGUuaHRtbCIsImFwcDEvYXBwMS5odG1sIiwiYXBwMS9zaWRlLW5hdmlnYXRpb24tc3ViLXRlbXBsYXRlLmh0bWwiLCJhcHAxL3NvbWVkaXJlY3RpdmUuaHRtbCIsInVtYnJlbGxhL3VtYnJlbGxhLnZpZXcuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZnJhbWV3b3JrLmRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBMaWNlbnNlZCBNYXRlcmlhbHMgLSBQcm9wZXJ0eSBvZiBJQk1cbiAqXG4gKiBhcHAyLm1vZHVsZS5qc1xuICpcbiAqIChDKSBDb3B5cmlnaHQgSUJNIENvcnBvcmF0aW9uIDIwMTYuXG4gKiBVLlMuIEdvdmVybm1lbnQgVXNlcnMgUmVzdHJpY3RlZCBSaWdodHM6ICBVc2UsIGR1cGxpY2F0aW9uIG9yIGRpc2Nsb3N1cmVcbiAqIHJlc3RyaWN0ZWQgYnkgR1NBIEFEUCBTY2hlZHVsZSBDb250cmFjdCB3aXRoIElCTSBDb3JwLlxuICpcbiAqL1xuXG5hbmd1bGFyXG5cdC5tb2R1bGUoXCJ4MS51aS5kZW1vLmFwcDJcIiwgW1xuXHRcdFwieDEudWkuZnJhbWV3b3JrXCJcblx0XSk7IiwiLyoqXG4gKlxuICogTGljZW5zZWQgTWF0ZXJpYWxzIC0gUHJvcGVydHkgb2YgSUJNXG4gKlxuICogYXBwMS5tb2R1bGUuanNcbiAqXG4gKiAoQykgQ29weXJpZ2h0IElCTSBDb3Jwb3JhdGlvbiAyMDE2LlxuICogVS5TLiBHb3Zlcm5tZW50IFVzZXJzIFJlc3RyaWN0ZWQgUmlnaHRzOiAgVXNlLCBkdXBsaWNhdGlvbiBvciBkaXNjbG9zdXJlXG4gKiByZXN0cmljdGVkIGJ5IEdTQSBBRFAgU2NoZWR1bGUgQ29udHJhY3Qgd2l0aCBJQk0gQ29ycC5cbiAqXG4gKi9cblxuYW5ndWxhclxuXHQubW9kdWxlKFwieDEudWkuZGVtby5hcHAxXCIsIFtcblx0XHRcIngxLnVpLmZyYW1ld29ya1wiXG5cdF0pOyIsIi8qKlxuICpcbiAqIExpY2Vuc2VkIE1hdGVyaWFscyAtIFByb3BlcnR5IG9mIElCTVxuICpcbiAqIHVtYnJlbGxhLmFwcC5tb2R1bGUuanNcbiAqXG4gKiAoQykgQ29weXJpZ2h0IElCTSBDb3Jwb3JhdGlvbiAyMDE2LlxuICogVS5TLiBHb3Zlcm5tZW50IFVzZXJzIFJlc3RyaWN0ZWQgUmlnaHRzOiAgVXNlLCBkdXBsaWNhdGlvbiBvciBkaXNjbG9zdXJlXG4gKiByZXN0cmljdGVkIGJ5IEdTQSBBRFAgU2NoZWR1bGUgQ29udHJhY3Qgd2l0aCBJQk0gQ29ycC5cbiAqXG4gKi9cblxuYW5ndWxhclxuXHQubW9kdWxlKFwidW1icmVsbGEuYXBwLmRlbW9cIiwgW1xuXHRcdFwieDEudWkuZnJhbWV3b3JrXCIsXG5cdFx0XCJ4MS51aS5kZW1vLmFwcDFcIixcblx0XHRcIngxLnVpLmRlbW8uYXBwMlwiLFxuXHRcdFwidWkucm91dGVyXCIsXG5cdFx0XCJ4MS51aS5sb2FkaW5nLWJlZVwiXG5cdF0pXG5cdC5jb25maWcoW1xuXHRcdFwiJHN0YXRlUHJvdmlkZXJcIiwgXCIkdXJsUm91dGVyUHJvdmlkZXJcIixcblx0XHRmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cdFx0XHRcInVzZSBzdHJpY3RcIjtcblxuXHRcdFx0JHN0YXRlUHJvdmlkZXJcblx0XHRcdFx0LnN0YXRlKFwiZnJhbWV3b3JrSG9tZS51bnVzZWRcIiwge1xuXHRcdFx0XHRcdHVybDogXCIvdW51c2VkXCIsXG5cdFx0XHRcdFx0dGVtcGxhdGVVcmw6IFwidW1icmVsbGEvdW1icmVsbGEudmlldy5odG1sXCIsXG5cdFx0XHRcdFx0Y29udHJvbGxlcjogXCJ1bWJyZWxsYUN0cmxcIlxuXHRcdFx0XHR9KTtcblx0XHRcdCR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoXCJmcmFtZXdvcmtIb21lLnRlc3RcIik7XG5cdH1dKVxuXHQuc2VydmljZShcInVtYnJlbGxhU2VydmljZVwiLCBbIFwiJGxvZ1wiLCBmdW5jdGlvbigkbG9nKXtcblx0XHR0aGlzLnRlc3RPcmcgPSBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHQkbG9nLmRlYnVnKFwiRG8gc29tZXRoaW5nIHdpdGggb3JnIGRhdGFcIik7XG5cdFx0XHQkbG9nLmRlYnVnKGRhdGEpO1xuXHRcdH07XG5cdH1dKVxuXHQucnVuKFtcblx0XHRcIiRzdGF0ZVwiLCBcIiRsb2dcIiwgXCJmcmFtZXdvcmtIb21lU3J2XCIsIFwiZnJhbWV3b3JrQ29uc3RhbnRzXCIsIFwiJHJvb3RTY29wZVwiLCBcIngxVXRpbHNcIiwgXCIkd2luZG93XCIsIFwiJHRyYW5zbGF0ZVwiLFxuXHRcdCBcIiRxXCIsIFwiJHRpbWVvdXRcIiwgXCJ1bWJyZWxsYVNlcnZpY2VcIixcblx0XHRmdW5jdGlvbigkc3RhdGUsICRsb2csIGZyYW1ld29ya0hvbWVTcnYsIGZyYW1ld29ya0NvbnN0YW50cywgJHJvb3RTY29wZSwgeDFVdGlscywgJHdpbmRvdywgJHRyYW5zbGF0ZSxcblx0XHRcdCRxLCAkdGltZW91dCwgdW1icmVsbGFTZXJ2aWNlKSB7XG5cdFx0XHRcInVzZSBzdHJpY3RcIjtcblxuXHRcdFx0JGxvZy5sb2coXCJydW5uaW5nIHVtYnJlbGxhIHJ1blwiKTtcblxuXHRcdFx0JHJvb3RTY29wZS5sb2FkaW5nID0gdHJ1ZTtcblxuXHRcdFx0dmFyIGRhc2hib2FyZE5hdkl0ZW1zID0gW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJuYW1lXCI6IFwiVW1icmVsbGEgVGVzdFwiLFxuXHRcdFx0XHRcdFwic3RhdGVcIjogXCJmcmFtZXdvcmtIb21lLnRlc3RcIixcblx0XHRcdFx0XHRcInZhbGlkU3RhdGVzXCI6IFtcImZyYW1ld29ya0hvbWUudGVzdFwiXSxcblx0XHRcdFx0XHRcInN0YXRlQ29uZmlnXCI6IHtcblx0XHRcdFx0XHRcdHVybDogXCIvdGVzdFwiLFxuXHRcdFx0XHRcdFx0dGVtcGxhdGVVcmw6IFwidW1icmVsbGEvdW1icmVsbGEudmlldy5odG1sXCIsXG5cdFx0XHRcdFx0XHRjb250cm9sbGVyOiBcInVtYnJlbGxhQ3RybFwiLFxuXHRcdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XHRuYW1lOiBcInVtYnJlbGxhLlNUQVRFX05BTUVcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XCJpZFwiOiBcInVtYnJlbGxhLXRlc3RcIixcblx0XHRcdFx0XHRcImNsYXNzXCI6IFwidW1icmVsbGEtdGVzdFwiXG5cdFx0XHRcdH0sXG5cdFx0XHRdO1xuXG5cdFx0XHRmcmFtZXdvcmtIb21lU3J2LnNldFByb2R1Y3RUaXRsZSh4MVV0aWxzLnRyYW5zbGF0ZShcInVtYnJlbGxhLkhFQURFUl9USVRMRVwiKSk7XG5cdFx0XHRmcmFtZXdvcmtIb21lU3J2LnNldFNob3dCZXRhQmFkZ2UodHJ1ZSk7XG5cdFx0XHRmcmFtZXdvcmtIb21lU3J2LmFkZFRvRnJhbWV3b3JrKGZyYW1ld29ya0NvbnN0YW50cy5OQVZfTUVOVS5EQVNIQk9BUkRTLCBkYXNoYm9hcmROYXZJdGVtcyk7XG5cdFx0XHQkdHJhbnNsYXRlKFwieDFVaU5nRnJhbWV3b3JrLkhFTFBfTUVOVS5QUk9EX0RPQ1wiKS50aGVuKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRmcmFtZXdvcmtIb21lU3J2LmFkZEhlbHBJdGVtKHgxVXRpbHMudHJhbnNsYXRlKFwieDFVaU5nRnJhbWV3b3JrLkhFTFBfTUVOVS5QUk9EX0RPQ1wiKSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0JHdpbmRvdy5vcGVuKFwiaHR0cDovL2RvYy51bmljYS5jb20vZG9jLnBocD9wYXNza2V5PVh4aTRNeUh0UjNtSSZjeGEmMV8yXzAmZW5fdXMmS0NfV0VMQ09NRVwiLFxuXHRcdFx0XHRcdFx0XCJDWEFfUHJvZEhlbHBcIik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRmcmFtZXdvcmtIb21lU3J2LmFkZEhlbHBJdGVtKHgxVXRpbHMudHJhbnNsYXRlKFwieDFVaU5nRnJhbWV3b3JrLkhFTFBfTUVOVS5TVVBQT1JUXCIpLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHQkd2luZG93Lm9wZW4oXCJodHRwOi8vc3VwcG9ydC5pYm1jbG91ZC5jb21cIik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0XHRmcmFtZXdvcmtIb21lU3J2LnNldE9yZ0NhbGxiYWNrKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXHRcdFx0XHQkdGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHR2YXIgb3JnQXJyYXkgPSBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFwib3JnSWRcIjogXCIwOTg3NlpcIixcblx0XHRcdFx0XHRcdFx0XCJvcmdOYW1lXCI6IFwiQ1hBIEZyYW1ld29yayB0ZXN0aW5nXCJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7IFxuXHRcdFx0XHRcdFx0XHRcIm9yZ0lkXCI6IFwiMTIzNDVBXCIsXG5cdFx0XHRcdFx0XHRcdFwib3JnTmFtZVwiOiBcIk9yZ0FcIiBcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7IFxuXHRcdFx0XHRcdFx0XHRcIm9yZ0lkXCI6IFwiMTIzNDVCXCIsXG5cdFx0XHRcdFx0XHRcdFwib3JnTmFtZVwiOiBcIk9yZ0JcIiBcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7IFxuXHRcdFx0XHRcdFx0XHRcIm9yZ0lkXCI6IFwiMTIzNDVDXCIsXG5cdFx0XHRcdFx0XHRcdFwib3JnTmFtZVwiOiBcIk9yZ0NcIiBcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7IFxuXHRcdFx0XHRcdFx0XHRcIm9yZ0lkXCI6IFwiMTIzNDVEXCIsXG5cdFx0XHRcdFx0XHRcdFwib3JnTmFtZVwiOiBcIk9yZ0RcIiBcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7IFxuXHRcdFx0XHRcdFx0XHRcIm9yZ0lkXCI6IFwiMTIzNDVFXCIsXG5cdFx0XHRcdFx0XHRcdFwib3JnTmFtZVwiOiBcIk9yZ0VcIiBcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7IFxuXHRcdFx0XHRcdFx0XHRcIm9yZ0lkXCI6IFwiMTIzNDVGXCIsXG5cdFx0XHRcdFx0XHRcdFwib3JnTmFtZVwiOiBcIk9yZ0ZcIiBcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7IFxuXHRcdFx0XHRcdFx0XHRcIm9yZ0lkXCI6IFwiMTIzNDVHXCIsXG5cdFx0XHRcdFx0XHRcdFwib3JnTmFtZVwiOiBcIk9yZ0dcIiBcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7IFxuXHRcdFx0XHRcdFx0XHRcIm9yZ0lkXCI6IFwiMTIzNDVIXCIsXG5cdFx0XHRcdFx0XHRcdFwib3JnTmFtZVwiOiBcIk9yZ0hcIiBcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7IFxuXHRcdFx0XHRcdFx0XHRcIm9yZ0lkXCI6IFwiMTIzNDVJXCIsXG5cdFx0XHRcdFx0XHRcdFwib3JnTmFtZVwiOiBcIk9yZ0lcIiBcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7IFxuXHRcdFx0XHRcdFx0XHRcIm9yZ0lkXCI6IFwiMTIzNDVKXCIsXG5cdFx0XHRcdFx0XHRcdFwib3JnTmFtZVwiOiBcIk9yZ0pcIiBcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7IFxuXHRcdFx0XHRcdFx0XHRcIm9yZ0lkXCI6IFwiMTIzNDVLXCIsXG5cdFx0XHRcdFx0XHRcdFwib3JnTmFtZVwiOiBcIk9yZ0tcIiBcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7IFxuXHRcdFx0XHRcdFx0XHRcIm9yZ0lkXCI6IFwiMTIzNDVMXCIsXG5cdFx0XHRcdFx0XHRcdFwib3JnTmFtZVwiOiBcIk9yZ0xcIiBcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7IFxuXHRcdFx0XHRcdFx0XHRcIm9yZ0lkXCI6IFwiMTIzNDVNXCIsXG5cdFx0XHRcdFx0XHRcdFwib3JnTmFtZVwiOiBcIk9yZ01cIiBcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7IFxuXHRcdFx0XHRcdFx0XHRcIm9yZ0lkXCI6IFwiMTIzNDVPXCIsXG5cdFx0XHRcdFx0XHRcdFwib3JnTmFtZVwiOiBcIk9yZ09cIiBcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7IFxuXHRcdFx0XHRcdFx0XHRcIm9yZ0lkXCI6IFwiMTIzNDVQXCIsXG5cdFx0XHRcdFx0XHRcdFwib3JnTmFtZVwiOiBcIk9yZ1BcIiBcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdO1xuXHRcdFx0XHRcdCRsb2cuZGVidWcoXCJyZXNvbHZpbmcgY2FsbGJhY2tcIik7XG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZSh7IFwiZGF0YVwiOm9yZ0FycmF5fSk7XG5cdFx0XHRcdH0sIDIwMDApO1xuXHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKipcblx0XHRcdCogU2V0IGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHVzZXIgc2VsZWN0cyBvcmcgZnJvbSBmcmFtZXdvcmsgbW9kYWxcblx0XHRcdCovXG5cdFx0XHRmcmFtZXdvcmtIb21lU3J2LnNldFNlbGVjdGVkT3JnQ2FsbGJhY2sodW1icmVsbGFTZXJ2aWNlLnRlc3RPcmcpO1xuXG5cdFx0XHRmdW5jdGlvbiBlbXVsYXRlU3RhcnR1cCgpIHtcblx0XHRcdFx0JHJvb3RTY29wZS5sb2FkaW5nID0gZmFsc2U7XG5cdFx0XHRcdC8vICRzdGF0ZS5nbyhcImZyYW1ld29ya0hvbWUudGVzdFwiKTtcblx0XHRcdH1cblx0XHRcdHNldFRpbWVvdXQoZW11bGF0ZVN0YXJ0dXAsIDEwMDApO1xuXHRcdH1dKVxuXHQuY29udHJvbGxlcihcInVtYnJlbGxhQ3RybFwiLCBbXCIkc3RhdGVcIiwgXCIkbG9nXCIsIGZ1bmN0aW9uKCRzdGF0ZSwgJGxvZykge1xuXHRcdCRsb2cubG9nKFwicnVubmluZyB1bWJyZWxsYSBjb250cm9sbGVyXCIpO1xuXHRcdCRsb2cubG9nKCRzdGF0ZS5nZXQoKSk7XG5cdFx0Ly8kc3RhdGUuZ28oXCJmcmFtZXdvcmtIb21lLnRlc3RcIik7XG5cdH1dKTsiLCIvKipcbiAqXG4gKiBMaWNlbnNlZCBNYXRlcmlhbHMgLSBQcm9wZXJ0eSBvZiBJQk1cbiAqXG4gKiBhcHAyLmNvbnRyb2xsZXIuanNcbiAqXG4gKiAoQykgQ29weXJpZ2h0IElCTSBDb3Jwb3JhdGlvbiAyMDE1LlxuICogVS5TLiBHb3Zlcm5tZW50IFVzZXJzIFJlc3RyaWN0ZWQgUmlnaHRzOiAgVXNlLCBkdXBsaWNhdGlvbiBvciBkaXNjbG9zdXJlXG4gKiByZXN0cmljdGVkIGJ5IEdTQSBBRFAgU2NoZWR1bGUgQ29udHJhY3Qgd2l0aCBJQk0gQ29ycC5cbiAqXG4gKi9cblxuYW5ndWxhclxuXHQubW9kdWxlKFwieDEudWkuZGVtby5hcHAyXCIpXG5cdC5jb25maWcoW1wiJHVybFJvdXRlclByb3ZpZGVyXCIsIFwiJHRyYW5zbGF0ZVByb3ZpZGVyXCIsXG5cdFx0ZnVuY3Rpb24oJHVybFJvdXRlclByb3ZpZGVyLCAkdHJhbnNsYXRlUHJvdmlkZXIpIHtcblx0XHRcdFwidXNlIHN0cmljdFwiO1xuXG5cdFx0XHQkdHJhbnNsYXRlUHJvdmlkZXIudXNlU3RhdGljRmlsZXNMb2FkZXIoe1xuXHRcdFx0XHRwcmVmaXg6IFwiLi4vbDEwbi9cIixcblx0XHRcdFx0c3VmZml4OiBcIi5qc29uXCJcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBUZWxsIHRoZSBtb2R1bGUgd2hhdCBsYW5ndWFnZSB0byB1c2UgYnkgZGVmYXVsdFxuXHRcdFx0JHRyYW5zbGF0ZVByb3ZpZGVyLnByZWZlcnJlZExhbmd1YWdlKFwiZW5fVVNcIik7XG5cdFx0XHQkdHJhbnNsYXRlUHJvdmlkZXIudXNlU2FuaXRpemVWYWx1ZVN0cmF0ZWd5KFwiZXNjYXBlZFwiKTtcblxuXHRcdFx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcImZyYW1ld29ya0hvbWUuYXBwMU5hdjFcIik7XG5cdFx0fVxuXHRdKVxuXHQucnVuKFtcIiRzdGF0ZVwiLCBcImFwcDJOYXZTZXJ2aWNlXCIsIFwiZnJhbWV3b3JrSG9tZVNydlwiLCBcIngxVXRpbHNcIixcblx0XHRmdW5jdGlvbigkc3RhdGUsIGFwcDJOYXZTZXJ2aWNlLCBmcmFtZXdvcmtIb21lU3J2LCB4MVV0aWxzKSB7XG5cdFx0YXBwMk5hdlNlcnZpY2UuY29uZmlndXJlTmF2aWdhdGlvbigpO1xuXHRcdGZyYW1ld29ya0hvbWVTcnYuc2V0UHJvZHVjdFRpdGxlKHgxVXRpbHMudHJhbnNsYXRlKFwiYXBwMi5IRUFERVJfVElUTEVcIikpO1xuXHRcdC8vJHN0YXRlLmdvKFwiZnJhbWV3b3JrSG9tZS5hcHAyTmF2MlwiKTtcblx0fV0pXG5cdC5jb250cm9sbGVyKFwiYXBwMk5hdjFDdHJsXCIsIFtcIiRyb290U2NvcGVcIiwgXCIkc2NvcGVcIiwgXCIkc3RhdGVcIiwgXCJ4MVV0aWxzXCIsIFwiZnJhbWV3b3JrQ29uc3RhbnRzXCIsXG5cdFx0ZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsIHgxVXRpbHMsIGZyYW1ld29ya0NvbnN0YW50cykge1xuXHRcdFx0JHNjb3BlLmFwcDJOYXYxQ29uZmlncyA9IHt9O1xuXG5cdFx0XHQkc2NvcGUudGVzdEJhbm5lciA9IGZ1bmN0aW9uKHR5cGUpIHtcblx0XHRcdFx0dmFyIGJhbm5lck9iaiA9IHtcblx0XHRcdFx0XHRcInR5cGVcIjogdHlwZVxuXHRcdFx0XHR9O1xuXHRcdFx0XHRzd2l0Y2godHlwZSkge1xuXHRcdFx0XHRcdGNhc2UgXCJiZy1pbmZvXCI6XG5cdFx0XHRcdFx0XHRiYW5uZXJPYmoubWVzc2FnZSA9IHgxVXRpbHMudHJhbnNsYXRlKFwiYXBwMi5OT1RJRklDQVRJT05TLmluZm9cIik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcImJnLXN1Y2Nlc3NcIjpcblx0XHRcdFx0XHRcdGJhbm5lck9iai5tZXNzYWdlID0geDFVdGlscy50cmFuc2xhdGUoXCJhcHAyLk5PVElGSUNBVElPTlMuc3VjY2Vzc1wiKTtcblx0XHRcdFx0XHRcdGJhbm5lck9iai5saW5rVGV4dCA9IFwiR28gdG8gQXBwMk5hdjJcIjtcblx0XHRcdFx0XHRcdGJhbm5lck9iai5zdGF0ZSA9IFwiZnJhbWV3b3JrSG9tZS5hcHAxTmF2MVwiO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRiYW5uZXJPYmoubWVzc2FnZSA9IHgxVXRpbHMudHJhbnNsYXRlKFwiYXBwMi5OT1RJRklDQVRJT05TLmluZm9cIik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0JHJvb3RTY29wZS4kZW1pdChmcmFtZXdvcmtDb25zdGFudHMuRXZlbnRzLlNIT1dfQkFOTkVSLCBbIGJhbm5lck9iaiBdKTtcblx0XHRcdH07XG5cblx0XHRcdHZhciBiYW5uZXJMaXN0ZW5lciA9ICRyb290U2NvcGUuJG9uKGZyYW1ld29ya0NvbnN0YW50cy5FdmVudHMuQkFOTkVSX0NMSUNLRUQsIGZ1bmN0aW9uKGUsIGNsaWNrRGF0YSkge1xuXHRcdFx0XHQkc3RhdGUuZ28oY2xpY2tEYXRhLnN0YXRlKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGJhbm5lckxpc3RlbmVyKCk7XG5cdFx0XHR9KTtcblx0fV0pXG5cdC5jb250cm9sbGVyKFwiYXBwMk5hdjJDdHJsXCIsIFtcIiRzY29wZVwiLCBcIiRzdGF0ZVwiLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSkge1xuXHRcdCRzY29wZS5hcHAyTmF2MkNvbmZpZ3MgPSB7fTtcblx0XHQkc2NvcGUuY2hhbmdlU3RhdGUgPSBmdW5jdGlvbigpIHtcblx0XHRcdCRzdGF0ZS5nbyhcImZyYW1ld29ya0hvbWUudW5saXN0ZWRTdGF0ZVBhcmFtc1wiLCB7IHNvbWVQYXJhbTogNTgwIH0pO1xuXHRcdH07XG5cdH1dKVxuXHQuY29udHJvbGxlcihcImFwcDJBcHBzMUN0cmxcIiwgW1wiJHNjb3BlXCIsIGZ1bmN0aW9uKCRzY29wZSkge1xuXHRcdCRzY29wZS5hcHAyQXBwczFDb25maWdzID0ge307XG5cdH1dKVxuXHQuY29udHJvbGxlcihcImFwcDJCdWlsZDFDdHJsXCIsIFtcIiRzY29wZVwiLCBmdW5jdGlvbigkc2NvcGUpIHtcblx0XHQkc2NvcGUuYXBwMkJ1aWxkMUNvbmZpZ3MgPSB7fTtcblx0fV0pXG5cdC5jb250cm9sbGVyKFwiYXBwMkFuYWx5dGljc0N0cmxcIiwgW1wiJHNjb3BlXCIsIGZ1bmN0aW9uKCRzY29wZSkge1xuXHRcdCRzY29wZS5hcHAyQW5hbHl0aWNzQ29uZmlncyA9IHt9O1xuXHR9XSlcblx0LmNvbnRyb2xsZXIoXCJhcHAyTmF2M0N0cmxcIiwgW1wiJHNjb3BlXCIsIGZ1bmN0aW9uKCRzY29wZSkge1xuXHRcdCRzY29wZS5hcHAyTmF2M0NvbmZpZ3MgPSB7fTtcblx0fV0pXG5cdC5jb250cm9sbGVyKFwiYXBwMk5hdjRDdHJsXCIsIFtcIiRzY29wZVwiLCBmdW5jdGlvbigkc2NvcGUpIHtcblx0XHQkc2NvcGUuYXBwMk5hdjRDb25maWdzID0ge307XG5cdH1dKVxuXHQuc2VydmljZShcImFwcDJOYXZTZXJ2aWNlXCIsIFtcImZyYW1ld29ya0hvbWVTcnZcIiwgXCJmcmFtZXdvcmtDb25zdGFudHNcIiwgXCIkbG9nXCIsXG5cdFx0ZnVuY3Rpb24oZnJhbWV3b3JrSG9tZVNydiwgZnJhbWV3b3JrQ29uc3RhbnRzLCAkbG9nKSB7XG5cdFx0XHRcInVzZSBzdHJpY3RcIjtcblxuXHRcdFx0dmFyIGFuYWx5emVOYXZJdGVtcyA9IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwibmFtZVwiOiBcImFwcDItbmF2MVwiLFxuXHRcdFx0XHRcdFwic3RhdGVcIjogXCJmcmFtZXdvcmtIb21lLmFwcDJOYXYxXCIsXG5cdFx0XHRcdFx0XCJ2YWxpZFN0YXRlc1wiOiBbXCJmcmFtZXdvcmtIb21lLmFwcDJOYXYxXCJdLFxuXHRcdFx0XHRcdFwic3RhdGVDb25maWdcIjoge1xuXHRcdFx0XHRcdFx0dXJsOiBcIi9hcHAybmF2MVwiLFxuXHRcdFx0XHRcdFx0dGVtcGxhdGVVcmw6IFwiYXBwMi9hcHAyLmh0bWxcIixcblx0XHRcdFx0XHRcdGNvbnRyb2xsZXI6IFwiYXBwMk5hdjFDdHJsXCIsXG5cdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdG5hbWU6IFwiYXBwMi5TVEFURV9OQU1FUy5hcHAybmF2MVwiLFxuXHRcdFx0XHRcdFx0XHRjaGlsZHJlbjogW1xuXHRcdFx0XHRcdFx0XHRcdFwiYXBwMi1uYXYxLmNoaWxkMVwiLFxuXHRcdFx0XHRcdFx0XHRcdFwiYXBwMi1uYXYxLmNoaWxkMlwiLFxuXHRcdFx0XHRcdFx0XHRcdFwiYXBwMi1uYXYxLmNoaWxkM1wiXG5cdFx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFwiaWRcIjogXCJhcHAyLW5hdjFcIixcblx0XHRcdFx0XHRcImNsYXNzXCI6IFwiYXBwMi1uYXYxXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwibmFtZVwiOiBcImFwcDItbmF2MlwiLFxuXHRcdFx0XHRcdFwic3RhdGVcIjogXCJmcmFtZXdvcmtIb21lLmFwcDJOYXYyXCIsXG5cdFx0XHRcdFx0XCJ2YWxpZFN0YXRlc1wiOiBbXCJmcmFtZXdvcmtIb21lLmFwcDJOYXYyXCJdLFxuXHRcdFx0XHRcdFwic3RhdGVDb25maWdcIjoge1xuXHRcdFx0XHRcdFx0dXJsOiBcIi9hcHAybmF2Mj9zb21lUGFyYW1cIixcblx0XHRcdFx0XHRcdHRlbXBsYXRlOiBcIjxkaXYgY2xhc3M9J2FwcDInPjxoMT5UaGlzIGlzIEFwcDIgTmF2MjwvaDE+XCIgK1xuXHRcdFx0XHRcdFx0XHRcdFx0XCI8YnV0dG9uIG5nLWNsaWNrPSdjaGFuZ2VTdGF0ZSgpJz5HbyB0byBuZXh0IHN0YXRlIHdpdGggcGFyYW1zPC9idXR0b24+PC9kaXY+XCIsXG5cdFx0XHRcdFx0XHRjb250cm9sbGVyOiBcImFwcDJOYXYyQ3RybFwiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcImlkXCI6IFwiYXBwMi1uYXYyXCIsXG5cdFx0XHRcdFx0XCJjbGFzc1wiOiBcImFwcDItbmF2MlwiXG5cdFx0XHRcdH1cblx0XHRcdF07XG5cblx0XHRcdHZhciBtYW5hZ2VOYXZJdGVtcyA9IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwibmFtZVwiOiBcImFwcDItYnVpbGQxXCIsXG5cdFx0XHRcdFx0XCJzdGF0ZVwiOiBcImZyYW1ld29ya0hvbWUuYXBwMkJ1aWxkMVwiLFxuXHRcdFx0XHRcdFwidmFsaWRTdGF0ZXNcIjogW1wiZnJhbWV3b3JrSG9tZS5hcHAyQnVpbGQxXCJdLFxuXHRcdFx0XHRcdFwic3RhdGVDb25maWdcIjoge1xuXHRcdFx0XHRcdFx0dXJsOiBcIi9hcHAyYnVpbGQxXCIsXG5cdFx0XHRcdFx0XHR0ZW1wbGF0ZTogXCI8ZGl2IGNsYXNzPSdhcHAyJz48aDE+VGhpcyBpcyBBcHAyIEJ1aWxkMTwvaDE+PC9kaXY+XCIsXG5cdFx0XHRcdFx0XHRjb250cm9sbGVyOiBcImFwcDJCdWlsZDFDdHJsXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFwiaWRcIjogXCJhcHAyLWJ1aWxkMVwiLFxuXHRcdFx0XHRcdFwiY2xhc3NcIjogXCJhcHAyLWJ1aWxkMVwiXG5cdFx0XHRcdH1cblx0XHRcdF07XG5cblx0XHRcdHZhciBsaW1pdGVkTmF2SXRlbXMgPSBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcIm5hbWVcIjogXCJhcHAyLWFwcHMxXCIsXG5cdFx0XHRcdFx0XCJzdGF0ZVwiOiBcImZyYW1ld29ya0hvbWUuYXBwMmFwcHMxXCIsXG5cdFx0XHRcdFx0XCJ2YWxpZFN0YXRlc1wiOiBbXCJmcmFtZXdvcmtIb21lLmFwcDJhcHBzMVwiXSxcblx0XHRcdFx0XHRcInN0YXRlQ29uZmlnXCI6IHtcblx0XHRcdFx0XHRcdHVybDogXCIvYXBwMmFwcHMxXCIsXG5cdFx0XHRcdFx0XHR0ZW1wbGF0ZTogXCI8ZGl2IGNsYXNzPSdhcHAyJz48aDE+VGhpcyBpcyBBcHAyIEFwcDE8L2gxPjwvZGl2PlwiLFxuXHRcdFx0XHRcdFx0Y29udHJvbGxlcjogXCJhcHAyQXBwczFDdHJsXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFwiaWRcIjogXCJhcHAyLWFwcHMxXCIsXG5cdFx0XHRcdFx0XCJjbGFzc1wiOiBcImFwcDItYXBwczFcIlxuXHRcdFx0XHR9XG5cdFx0XHRdO1xuXG5cdFx0XHR2YXIgZGFzaGJvYXJkc05hdkl0ZW1zID0gW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJuYW1lXCI6IFwiRGFzaGJvYXJkc1wiLFxuXHRcdFx0XHRcdFwic3RhdGVcIjogXCJmcmFtZXdvcmtIb21lLmFuYWx5dGljc1wiLFxuXHRcdFx0XHRcdFwidmFsaWRTdGF0ZXNcIjogW1wiZnJhbWV3b3JrSG9tZS5hbmFseXRpY3NcIl0sXG5cdFx0XHRcdFx0XCJzdGF0ZUNvbmZpZ1wiOiB7XG5cdFx0XHRcdFx0XHR1cmw6IFwiL2FuYWx5dGljc1wiLFxuXHRcdFx0XHRcdFx0dGVtcGxhdGU6IFwiPGRpdiBjbGFzcz0nYXBwMic+PGgxPlRoaXMgaXMgQW5hbHl0aWNzIHNlbGVjdGVkPC9oMT48L2Rpdj5cIixcblx0XHRcdFx0XHRcdGNvbnRyb2xsZXI6IFwiYXBwMkFuYWx5dGljc0N0cmxcIlxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XCJpZFwiOiBcImFuYWx5dGljc1wiLFxuXHRcdFx0XHRcdFwiY2xhc3NcIjogXCJhbmFseXRpY3NcIixcblx0XHRcdFx0XHRcInJldmVhbFwiOiB0cnVlLFxuXHRcdFx0XHRcdFwiYmFja1N0YXRlXCI6IFwiZnJhbWV3b3JrSG9tZS5hbmFseXRpY3NcIixcblx0XHRcdFx0XHRcIml0ZW1zXCI6IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XCJpbmNsdWRlXCI6IFwiYXBwMi9zaWRlLW5hdmlnYXRpb24tc3ViLXRlbXBsYXRlLmh0bWxcIixcblx0XHRcdFx0XHRcdFx0XCJpZFwiOiBcImFuYWx5dGljcy10ZW1wbGF0ZVwiLFxuXHRcdFx0XHRcdFx0XHRcImNsYXNzXCI6IFwiZGFzaGJvYXJkXCIsXG5cdFx0XHRcdFx0XHRcdFwibmFtZVwiOiBcIkFuYWx5dGljcyBUZW1wbGF0ZVwiLFxuXHRcdFx0XHRcdFx0XHRcInN0YXRlXCI6IFwiZnJhbWV3b3JrSG9tZS50ZXN0Q3VzdG9tVGVtcGxhdGVcIixcblx0XHRcdFx0XHRcdFx0XCJ2YWxpZFN0YXRlc1wiOiBbXCJmcmFtZXdvcmtIb21lLnRlc3RDdXN0b21UZW1wbGF0ZVwiXSxcblx0XHRcdFx0XHRcdFx0XCJzdGF0ZUNvbmZpZ1wiOiB7XG5cdFx0XHRcdFx0XHRcdFx0dXJsOiBcIi9hbmFseXRpY3MvY3VzdG9tXCIsXG5cdFx0XHRcdFx0XHRcdFx0dGVtcGxhdGU6IFwiPGRpdiBjbGFzcz0nYXBwMic+PGgxPlRoaXMgaXMgQW5hbHl0aWNzIGluIGFjdGlvbiEhITwvaDE+PC9kaXY+XCIsXG5cdFx0XHRcdFx0XHRcdFx0Y29udHJvbGxlcjogXCJhcHAyQW5hbHl0aWNzQ3RybFwiXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcIm5hbWVcIjogXCJhcHAyLW5hdjNcIixcblx0XHRcdFx0XHRcInN0YXRlXCI6IFwiZnJhbWV3b3JrSG9tZS5hcHAyTmF2M1wiLFxuXHRcdFx0XHRcdFwidmFsaWRTdGF0ZXNcIjogW1wiZnJhbWV3b3JrSG9tZS5hcHAyTmF2M1wiXSxcblx0XHRcdFx0XHRcInN0YXRlQ29uZmlnXCI6IHtcblx0XHRcdFx0XHRcdHVybDogXCIvYXBwMm5hdjNcIixcblx0XHRcdFx0XHRcdHRlbXBsYXRlOiBcIjxkaXYgY2xhc3M9J2FwcDInPjxoMT5UaGlzIGlzIEFwcDIgTmF2MzwvaDE+PC9kaXY+XCIsXG5cdFx0XHRcdFx0XHRjb250cm9sbGVyOiBcImFwcDJOYXYzQ3RybFwiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcImlkXCI6IFwiYXBwMi1uYXYzXCIsXG5cdFx0XHRcdFx0XCJjbGFzc1wiOiBcImFwcDItbmF2M1wiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcIm5hbWVcIjogXCJhcHAyLW5hdjRcIixcblx0XHRcdFx0XHRcInN0YXRlXCI6IFwiZnJhbWV3b3JrSG9tZS5hcHAyTmF2NFwiLFxuXHRcdFx0XHRcdFwidmFsaWRTdGF0ZXNcIjogW1wiZnJhbWV3b3JrSG9tZS5hcHAyTmF2NFwiXSxcblx0XHRcdFx0XHRcInN0YXRlQ29uZmlnXCI6IHtcblx0XHRcdFx0XHRcdHVybDogXCIvYXBwMm5hdjRcIixcblx0XHRcdFx0XHRcdHRlbXBsYXRlOiBcIjxkaXYgY2xhc3M9J2FwcDInPjxoMT5UaGlzIGlzIEFwcDIgTmF2NDwvaDE+PC9kaXY+XCIsXG5cdFx0XHRcdFx0XHRjb250cm9sbGVyOiBcImFwcDJOYXY0Q3RybFwiLFxuXHRcdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XHRuYW1lOiBcImFwcDIubmF2NFwiLFxuXHRcdFx0XHRcdFx0XHRwYXJlbnRTdGF0ZXM6IFtcblx0XHRcdFx0XHRcdFx0XHRmcmFtZXdvcmtDb25zdGFudHMuTkFWX1NUQVRFUy5EQVNIQk9BUkRTLFxuXHRcdFx0XHRcdFx0XHRcdFwiZnJhbWV3b3JrSG9tZS51bmxpc3RlZENoaWxkXCJcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFwiaWRcIjogXCJhcHAyLW5hdjRcIixcblx0XHRcdFx0XHRcImNsYXNzXCI6IFwiYXBwMi1uYXY0XCJcblx0XHRcdFx0fVxuXHRcdFx0XTtcblxuXHRcdFx0dmFyIHVubGlzdGVkU3RhdGVzID0gW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJzdGF0ZVwiOiBcImZyYW1ld29ya0hvbWUudW5saXN0ZWRTdGF0ZVBhcmFtc1wiLFxuXHRcdFx0XHRcdFwic3RhdGVDb25maWdcIjoge1xuXHRcdFx0XHRcdFx0dXJsOiBcIi91bmxpc3RlZFN0YXRlUGFyYW1zP3NvbWVQYXJhbVwiLFxuXHRcdFx0XHRcdFx0dGVtcGxhdGU6IFwiPGRpdiBjbGFzcz0nYXBwMSc+PGgxPlRoaXMgaXMgdW5saXN0ZWRTdGF0ZVBhcmFtczwvaDE+XCIsXG5cdFx0XHRcdFx0XHRwYXJhbXM6IHtcblx0XHRcdFx0XHRcdFx0XCJhbm90aGVyUGFyYW1cIjogNDU2N1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFx0bmFtZTogXCJhcHAyLlNUQVRFX05BTUVTLnN0YXRlUGFyYW1zXCIsXG5cdFx0XHRcdFx0XHRcdHBhcmVudFN0YXRlczogW1xuXHRcdFx0XHRcdFx0XHRcdFwiZnJhbWV3b3JrSG9tZS5hcHAyTmF2MlwiXG5cdFx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdF07XG5cblx0XHRcdHRoaXMuY29uZmlndXJlTmF2aWdhdGlvbiA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGZyYW1ld29ya0hvbWVTcnYuYWRkVG9GcmFtZXdvcmsoZnJhbWV3b3JrQ29uc3RhbnRzLk5BVl9NRU5VLkFOQUxZWkUsIGFuYWx5emVOYXZJdGVtcyk7XG5cdFx0XHRcdGZyYW1ld29ya0hvbWVTcnYuYWRkVG9GcmFtZXdvcmsoZnJhbWV3b3JrQ29uc3RhbnRzLk5BVl9NRU5VLk1BTkFHRSwgbWFuYWdlTmF2SXRlbXMpO1xuXHRcdFx0XHRmcmFtZXdvcmtIb21lU3J2LmFkZFRvRnJhbWV3b3JrKGZyYW1ld29ya0NvbnN0YW50cy5OQVZfTUVOVS5EQVNIQk9BUkRTLCBkYXNoYm9hcmRzTmF2SXRlbXMpO1xuXHRcdFx0XHRmcmFtZXdvcmtIb21lU3J2LmFkZFRvRnJhbWV3b3JrKGZyYW1ld29ya0NvbnN0YW50cy5OQVZfTUVOVS5MSU1JVEVEX0FWQUlMQUJJTElUWSwgbGltaXRlZE5hdkl0ZW1zKTtcblx0XHRcdFx0ZnJhbWV3b3JrSG9tZVNydi5hZGRUb0ZyYW1ld29yayhmcmFtZXdvcmtDb25zdGFudHMuTk9UX09OX01FTlUsIHVubGlzdGVkU3RhdGVzKTtcblx0XHRcdFx0JGxvZy5sb2coXCJhZGRpbmcgbmF2SXRlbXM6IFwiICsgYW5hbHl6ZU5hdkl0ZW1zKTtcblx0XHRcdH07XG5cblx0XHR9XG5cdF0pOyIsIihmdW5jdGlvbigpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdGFuZ3VsYXJcblx0XHQubW9kdWxlKFwieDEudWkuZGVtby5hcHAxXCIpXG5cdFx0LmRpcmVjdGl2ZShcImFub3RoZXJEaXJlY3RpdmVcIiwgYW5vdGhlckRpcmVjdGl2ZSk7XG5cblx0XHRhbm90aGVyRGlyZWN0aXZlLiRpbmplY3QgPSBbIFwiJHRpbWVvdXRcIiBdO1xuXG5cdFx0ZnVuY3Rpb24gYW5vdGhlckRpcmVjdGl2ZSgkdGltZW91dCkge1xuXHRcdFx0dmFyIGRpcmVjdGl2ZSA9IHtcblx0XHRcdFx0c2NvcGU6IGZhbHNlLFxuXHRcdFx0XHRyZXN0cmljdDogXCJFQVwiLFxuXHRcdFx0XHR0ZW1wbGF0ZTogXCI8c3BhbiBjbGFzcz0nZnJhbWV3b3JrLXdpZGdldC1iYWRnZScgbmctc2hvdz0nZGF0YS5udW1VbnJlYWQgPiAwJz57e2RhdGEubnVtVW5yZWFkfX08L3NwYW4+XCIsXG5cdFx0XHRcdGxpbms6IGxpbmtGdW5jXG5cdFx0XHR9O1xuXG5cdFx0XHRyZXR1cm4gZGlyZWN0aXZlO1xuXG5cdFx0XHRmdW5jdGlvbiBsaW5rRnVuYyhzY29wZSkge1xuXHRcdFx0XHRzY29wZS5kYXRhID0ge1xuXHRcdFx0XHRcdG51bVVucmVhZDogMFxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHNjb3BlLmRhdGEgPSB7XG5cdFx0XHRcdFx0XHRudW1VbnJlYWQ6IDRcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9LCAyMDAwKTtcdFx0XHRcdFxuXHRcdFx0fVx0XHRcdFxuXHRcdH1cbn0pKCk7IiwiLyoqXG4gKlxuICogTGljZW5zZWQgTWF0ZXJpYWxzIC0gUHJvcGVydHkgb2YgSUJNXG4gKlxuICogYXBwMS5jb250cm9sbGVyLmpzXG4gKlxuICogKEMpIENvcHlyaWdodCBJQk0gQ29ycG9yYXRpb24gMjAxNS5cbiAqIFUuUy4gR292ZXJubWVudCBVc2VycyBSZXN0cmljdGVkIFJpZ2h0czogIFVzZSwgZHVwbGljYXRpb24gb3IgZGlzY2xvc3VyZVxuICogcmVzdHJpY3RlZCBieSBHU0EgQURQIFNjaGVkdWxlIENvbnRyYWN0IHdpdGggSUJNIENvcnAuXG4gKlxuICovXG5cbmFuZ3VsYXJcblx0Lm1vZHVsZShcIngxLnVpLmRlbW8uYXBwMVwiKVxuXHQuY29uZmlnKFtcIiR1cmxSb3V0ZXJQcm92aWRlclwiLCBcIiR0cmFuc2xhdGVQcm92aWRlclwiLFxuXHRcdGZ1bmN0aW9uKCR1cmxSb3V0ZXJQcm92aWRlciwgJHRyYW5zbGF0ZVByb3ZpZGVyKSB7XG5cdFx0XHRcInVzZSBzdHJpY3RcIjtcblxuXHRcdFx0Ly8gUmVnaXN0ZXIgYSBsb2FkZXIgZm9yIHRoZSBzdGF0aWMgZmlsZXNcblx0XHRcdC8vIFNvLCB0aGUgbW9kdWxlIHdpbGwgc2VhcmNoIG1pc3NpbmcgdHJhbnNsYXRpb24gdGFibGVzIHVuZGVyIHRoZSBzcGVjaWZpZWQgdXJscy5cblx0XHRcdC8vIFRob3NlIHVybHMgYXJlIFtwcmVmaXhdW2xhbmdLZXldW3N1ZmZpeF0uXG5cdFx0XHQkdHJhbnNsYXRlUHJvdmlkZXIudXNlU3RhdGljRmlsZXNMb2FkZXIoe1xuXHRcdFx0XHRwcmVmaXg6IFwiLi4vbDEwbi9cIixcblx0XHRcdFx0c3VmZml4OiBcIi5qc29uXCJcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBUZWxsIHRoZSBtb2R1bGUgd2hhdCBsYW5ndWFnZSB0byB1c2UgYnkgZGVmYXVsdFxuXHRcdFx0JHRyYW5zbGF0ZVByb3ZpZGVyLnByZWZlcnJlZExhbmd1YWdlKFwiZW5fVVNcIik7XG5cdFx0XHQkdHJhbnNsYXRlUHJvdmlkZXIudXNlU2FuaXRpemVWYWx1ZVN0cmF0ZWd5KFwiZXNjYXBlZFwiKTtcblxuXHRcdFx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcImZyYW1ld29ya0hvbWUuYXBwMU5hdjFcIik7XG5cdFx0fVxuXHRdKVxuXG5cdC5ydW4oW1wiJHN0YXRlXCIsIFwiYXBwMU5hdlNlcnZpY2VcIiwgXCJmcmFtZXdvcmtIb21lU3J2XCIsIFwieDFVdGlsc1wiLFxuXHRcdGZ1bmN0aW9uKCRzdGF0ZSwgYXBwMU5hdlNlcnZpY2UsIGZyYW1ld29ya0hvbWVTcnYsIHgxVXRpbHMpIHtcblx0XHRhcHAxTmF2U2VydmljZS5jb25maWd1cmVOYXZpZ2F0aW9uKCk7XG5cdFx0ZnJhbWV3b3JrSG9tZVNydi5zZXRQcm9kdWN0VGl0bGUoeDFVdGlscy50cmFuc2xhdGUoXCJhcHAxLkhFQURFUl9USVRMRVwiKSk7XG5cdFx0ZnJhbWV3b3JrSG9tZVNydi5zZXRVc2VyKHtcblx0XHRcdGZpcnN0TmFtZTogXCJUd2VycFwiLFxuXHRcdFx0b3JnTmFtZTogXCJDWEEgRnJhbWV3b3JrIHRlc3RpbmdcIixcblx0XHRcdG9yZ0lkOiBcIjA5ODc2WlwiXG5cdFx0fSk7XG5cdFx0Ly9mcmFtZXdvcmtIb21lU3J2LnNldFNob3dCZXRhQmFkZ2UoZmFsc2UpO1xuXHRcdC8vJHN0YXRlLmdvKFwiZnJhbWV3b3JrSG9tZS5hcHAxTmF2MVwiKTtcblxuXHR9XSlcblx0LmNvbnRyb2xsZXIoXCJhcHAxTmF2MUN0cmxcIiwgW1wiJHNjb3BlXCIsIGZ1bmN0aW9uKCRzY29wZSkge1xuXHRcdCRzY29wZS5hcHAxTmF2MUNvbmZpZ3MgPSB7fTtcblx0fV0pXG5cdC5jb250cm9sbGVyKFwiYXBwMU5hdjJDdHJsXCIsIFtcIiRzY29wZVwiLCBmdW5jdGlvbigkc2NvcGUpIHtcblx0XHQkc2NvcGUuYXBwMU5hdjJDb25maWdzID0ge307XG5cdH1dKVxuXHQuY29udHJvbGxlcihcImFwcDFBZG1pbjFDdHJsXCIsIFtcIiRzY29wZVwiLCBmdW5jdGlvbigkc2NvcGUpIHtcblx0XHQkc2NvcGUuYXBwMUFkbWluMUNvbmZpZ3MgPSB7fTtcblx0fV0pXG5cdC5zZXJ2aWNlKFwiYXBwMU5hdlNlcnZpY2VcIiwgW1wiZnJhbWV3b3JrSG9tZVNydlwiLCBcImZyYW1ld29ya0NvbnN0YW50c1wiLCBcIiRsb2dcIixcblx0XHRmdW5jdGlvbihmcmFtZXdvcmtIb21lU3J2LCBmcmFtZXdvcmtDb25zdGFudHMsICRsb2cpIHtcblx0XHRcdFwidXNlIHN0cmljdFwiO1xuXG5cdFx0XHR2YXIgYW5hbHl6ZU5hdkl0ZW1zID0gW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJuYW1lXCI6IFwiYXBwMS1uYXYxXCIsXG5cdFx0XHRcdFx0XCJzdGF0ZVwiOiBcImZyYW1ld29ya0hvbWUuYXBwMU5hdjFcIixcblx0XHRcdFx0XHRcInZhbGlkU3RhdGVzXCI6IFtcImZyYW1ld29ya0hvbWUuYXBwMU5hdjFcIl0sXG5cdFx0XHRcdFx0XCJzdGF0ZUNvbmZpZ1wiOiB7XG5cdFx0XHRcdFx0XHR1cmw6IFwiL2FwcDFuYXYxXCIsXG5cdFx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogXCJhcHAxL2FwcDEuaHRtbFwiLFxuXHRcdFx0XHRcdFx0Y29udHJvbGxlcjogXCJhcHAxTmF2MUN0cmxcIixcblx0XHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFx0bmFtZTogXCJhcHAxLlNUQVRFX05BTUVTLmFwcDFuYXYxXCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFwiaWRcIjogXCJhcHAxLW5hdjFcIixcblx0XHRcdFx0XHRcImNsYXNzXCI6IFwiYXBwMS1uYXYxXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwibmFtZVwiOiBcImFwcDEtbmF2MlwiLFxuXHRcdFx0XHRcdFwic3RhdGVcIjogXCJmcmFtZXdvcmtIb21lLmFwcDFOYXYyXCIsXG5cdFx0XHRcdFx0XCJ2YWxpZFN0YXRlc1wiOiBbXCJmcmFtZXdvcmtIb21lLmFwcDFOYXYyXCJdLFxuXHRcdFx0XHRcdFwic3RhdGVDb25maWdcIjoge1xuXHRcdFx0XHRcdFx0dXJsOiBcIi9hcHAxbmF2MlwiLFxuXHRcdFx0XHRcdFx0dGVtcGxhdGU6IFwiPGRpdiBjbGFzcz0nYXBwMSc+PGgxPlRoaXMgaXMgQXBwMSBOYXYyPC9oMT5cIiArXG5cdFx0XHRcdFx0XHRcIjxhIHVpLXNyZWY9J2ZyYW1ld29ya0hvbWUudW5saXN0ZWRQYXJlbnQnPkdvIHRvIHVubGlzdGVkPC9hPjwvZGl2PlwiICtcblx0XHRcdFx0XHRcdFwiPGEgdWktc3JlZj0nZnJhbWV3b3JrSG9tZS51bmxpc3RlZENoaWxkJz5HbyBkaXJlY3RseSB0byB1bmxpc3RlZCBjaGlsZDwvYT48L2Rpdj5cIixcblx0XHRcdFx0XHRcdGNvbnRyb2xsZXI6IFwiYXBwMU5hdjJDdHJsXCIsXG5cdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdG5hbWU6IFwiYXBwMS5TVEFURV9OQU1FUy5hcHAxbmF2MlwiXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcImlkXCI6IFwiYXBwMS1uYXYyXCIsXG5cdFx0XHRcdFx0XCJjbGFzc1wiOiBcImFwcDEtbmF2MlwiXG5cdFx0XHRcdH1cblx0XHRcdF07XG5cblx0XHRcdHZhciBhZG1pbk5hdkl0ZW1zID0gW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJuYW1lXCI6IFwiYXBwMS1hZG1pbjFcIixcblx0XHRcdFx0XHRcInN0YXRlXCI6IFwiZnJhbWV3b3JrSG9tZS5hcHAxQWRtaW4xXCIsXG5cdFx0XHRcdFx0XCJ2YWxpZFN0YXRlc1wiOiBbXCJmcmFtZXdvcmtIb21lLmFwcDFBZG1pbjFcIl0sXG5cdFx0XHRcdFx0XCJzdGF0ZUNvbmZpZ1wiOiB7XG5cdFx0XHRcdFx0XHR1cmw6IFwiL2FwcDFhZG1pbjFcIixcblx0XHRcdFx0XHRcdHRlbXBsYXRlOiBcIjxkaXYgY2xhc3M9J2FwcDEnPjxoMT5UaGlzIGlzIEFwcDEgQWRtaW4xPC9oMT48L2Rpdj5cIixcblx0XHRcdFx0XHRcdGNvbnRyb2xsZXI6IFwiYXBwMUFkbWluMUN0cmxcIlxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XCJpZFwiOiBcImFwcDEtYWRtaW4xXCIsXG5cdFx0XHRcdFx0XCJjbGFzc1wiOiBcImFwcDEtYWRtaW4xXCJcblx0XHRcdFx0fVxuXHRcdFx0XTtcblxuXHRcdFx0dmFyIHVubGlzdGVkU3RhdGVzID0gW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJzdGF0ZVwiOiBcImZyYW1ld29ya0hvbWUudW5saXN0ZWRQYXJlbnRcIixcblx0XHRcdFx0XHRcInN0YXRlQ29uZmlnXCI6IHtcblx0XHRcdFx0XHRcdHVybDogXCIvdW5saXN0ZWRQYXJlbnRcIixcblx0XHRcdFx0XHRcdHRlbXBsYXRlOiBcIjxkaXYgY2xhc3M9J2FwcDEnPjxoMT5UaGlzIGlzIHVubGlzdGVkUGFyZW50PC9oMT5cIiArXG5cdFx0XHRcdFx0XHRcIjxhIHVpLXNyZWY9J2ZyYW1ld29ya0hvbWUudW5saXN0ZWRDaGlsZCc+R28gdG8gdW5saXN0ZWQgY2hpbGQ8L2E+PC9kaXY+XCIsXG5cdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdG5hbWU6IFwiYXBwMS5TVEFURV9OQU1FUy51bmxpc3RlZFBhcmVudFwiXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJzdGF0ZVwiOiBcImZyYW1ld29ya0hvbWUudW5saXN0ZWRDaGlsZFwiLFxuXHRcdFx0XHRcdFwic3RhdGVDb25maWdcIjoge1xuXHRcdFx0XHRcdFx0dXJsOiBcIi91bmxpc3RlZENoaWxkXCIsXG5cdFx0XHRcdFx0XHR0ZW1wbGF0ZTogXCI8ZGl2IGNsYXNzPSdhcHAxJz48aDE+VGhpcyBpcyB1bmxpc3RlZENoaWxkPC9oMT48L2Rpdj5cIiArXG5cdFx0XHRcdFx0XHRcIjxhIHVpLXNyZWY9J2ZyYW1ld29ya0hvbWUuZ3JhbmRDaGlsZCc+R28gdG8gZ3JhbmRjaGlsZDwvYT48L2Rpdj48YnI+XCIgK1xuXHRcdFx0XHRcdFx0XCI8YSB1aS1zcmVmPSdmcmFtZXdvcmtIb21lLmFwcDJOYXY0Jz5HbyB0byBhcHAyTmF2NDwvYT48L2Rpdj5cIixcblx0XHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFx0bmFtZTogXCJhcHAxLlNUQVRFX05BTUVTLnVubGlzdGVkQ2hpbGRcIixcblx0XHRcdFx0XHRcdFx0cGFyZW50U3RhdGVzOiBbXG5cdFx0XHRcdFx0XHRcdFx0XCJmcmFtZXdvcmtIb21lLmFwcDFOYXYyXCIsXG5cdFx0XHRcdFx0XHRcdFx0XCJmcmFtZXdvcmtIb21lLnVubGlzdGVkUGFyZW50XCJcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInN0YXRlXCI6IFwiZnJhbWV3b3JrSG9tZS5ncmFuZENoaWxkXCIsXG5cdFx0XHRcdFx0XCJzdGF0ZUNvbmZpZ1wiOiB7XG5cdFx0XHRcdFx0XHR1cmw6IFwiL2dyYW5kQ2hpbGRcIixcblx0XHRcdFx0XHRcdHRlbXBsYXRlOiBcIjxkaXYgY2xhc3M9J2FwcDEnPjxoMT5UaGlzIGlzIGdyYW5kQ2hpbGQ8L2gxPjwvZGl2PlwiLFxuXHRcdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XHRuYW1lOiBcImFwcDEuU1RBVEVfTkFNRVMudW5saXN0ZWRHcmFuZENoaWxkXCIsXG5cdFx0XHRcdFx0XHRcdHBhcmVudFN0YXRlczogW1xuXHRcdFx0XHRcdFx0XHRcdFwiZnJhbWV3b3JrSG9tZS51bmxpc3RlZENoaWxkXCJcblx0XHRcdFx0XHRcdFx0XVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XTtcblxuXHRcdFx0dmFyIHRvcE5hdldpZGdldHMgPSBbXG5cdFx0XHRcdFwiPHNvbWUtZGlyZWN0aXZlPjwvc29tZS1kaXJlY3RpdmU+XCJcblx0XHRcdF07XG5cblx0XHRcdHZhciBzdWJOYXZXaWRnZXRzID0gW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0d2lkZ2V0OiBcIjxzdWJuYXYtZGlyZWN0aXZlMT48L3N1Ym5hdi1kaXJlY3RpdmUxPlwiLFxuXHRcdFx0XHRcdHZhbGlkU3RhdGVzOiBbXG5cdFx0XHRcdFx0XHRcImZyYW1ld29ya0hvbWUuYXBwMU5hdjFcIixcblx0XHRcdFx0XHRcdFwiZnJhbWV3b3JrSG9tZS51bmxpc3RlZENoaWxkXCJcblx0XHRcdFx0XHRdXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR3aWRnZXQ6IFwiPHN1Ym5hdi1kaXJlY3RpdmUyPjwvc3VibmF2LWRpcmVjdGl2ZTI+XCIsXG5cdFx0XHRcdFx0dmFsaWRTdGF0ZXM6IFtcblx0XHRcdFx0XHRcdFwiZnJhbWV3b3JrSG9tZS5hcHAxTmF2MVwiLFxuXHRcdFx0XHRcdFx0XCJmcmFtZXdvcmtIb21lLmFwcDFOYXYyXCJcblx0XHRcdFx0XHRdXG5cdFx0XHRcdH1cblx0XHRcdF07XG5cblx0XHRcdHRoaXMuY29uZmlndXJlTmF2aWdhdGlvbiA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGZyYW1ld29ya0hvbWVTcnYuYWRkVG9GcmFtZXdvcmsoZnJhbWV3b3JrQ29uc3RhbnRzLk5BVl9NRU5VLkFOQUxZWkUsIGFuYWx5emVOYXZJdGVtcyk7XG5cdFx0XHRcdGZyYW1ld29ya0hvbWVTcnYuYWRkVG9GcmFtZXdvcmsoZnJhbWV3b3JrQ29uc3RhbnRzLk5BVl9NRU5VLkFETUlOLCBhZG1pbk5hdkl0ZW1zKTtcblx0XHRcdFx0ZnJhbWV3b3JrSG9tZVNydi5hZGRUb0ZyYW1ld29yayhmcmFtZXdvcmtDb25zdGFudHMuTk9UX09OX01FTlUsIHVubGlzdGVkU3RhdGVzKTtcblx0XHRcdFx0ZnJhbWV3b3JrSG9tZVNydi5hZGRUb1RvcE5hdih0b3BOYXZXaWRnZXRzKTtcblx0XHRcdFx0ZnJhbWV3b3JrSG9tZVNydi5hZGRUb1N1Yk5hdihzdWJOYXZXaWRnZXRzKTtcblx0XHRcdFx0JGxvZy5sb2coXCJhZGRpbmcgbmF2SXRlbXM6IFwiICsgYW5hbHl6ZU5hdkl0ZW1zKTtcblx0XHRcdH07XG5cblx0XHR9XG5cdF0pOyIsIihmdW5jdGlvbigpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdGFuZ3VsYXJcblx0XHQubW9kdWxlKFwieDEudWkuZGVtby5hcHAxXCIpXG5cdFx0LmRpcmVjdGl2ZShcInNvbWVEaXJlY3RpdmVcIiwgc29tZURpcmVjdGl2ZSk7XG5cblx0XHRmdW5jdGlvbiBzb21lRGlyZWN0aXZlKCkge1xuXHRcdFx0dmFyIGRpcmVjdGl2ZSA9IHtcblx0XHRcdFx0c2NvcGU6IGZhbHNlLFxuXHRcdFx0XHRyZXN0cmljdDogXCJFQVwiLFxuXHRcdFx0XHRyZXBsYWNlOiB0cnVlLFxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogXCJhcHAxL3NvbWVkaXJlY3RpdmUuaHRtbFwiXG5cdFx0XHR9O1xuXG5cdFx0XHRyZXR1cm4gZGlyZWN0aXZlO1x0XHRcdFxuXHRcdH1cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0YW5ndWxhclxuXHRcdC5tb2R1bGUoXCJ4MS51aS5kZW1vLmFwcDFcIilcblx0XHQuZGlyZWN0aXZlKFwic3VibmF2RGlyZWN0aXZlMVwiLCBzdWJuYXZEaXJlY3RpdmUxKTtcblxuXHRcdGZ1bmN0aW9uIHN1Ym5hdkRpcmVjdGl2ZTEoKSB7XG5cdFx0XHR2YXIgZGlyZWN0aXZlID0ge1xuXHRcdFx0XHRzY29wZTogZmFsc2UsXG5cdFx0XHRcdHJlcGxhY2U6IHRydWUsXG5cdFx0XHRcdHJlc3RyaWN0OiBcIkVBXCIsXG5cdFx0XHRcdHRlbXBsYXRlOiBcIjxhIGhyZWY9JyMnPlwiICtcblx0XHRcdFx0XHRcIjxzcGFuIGNsYXNzPSdnbHlwaGljb24gZ2x5cGhpY29uLWVudmVsb3BlJz48L3NwYW4+XCIrXG5cdFx0XHRcdFx0XCI8c3Bhbj5TdWJuYXYgRGlyZWN0aXZlIDE8L3NwYW4+PC9hPlwiXG5cdFx0XHR9O1xuXG5cdFx0XHRyZXR1cm4gZGlyZWN0aXZlO1x0XHRcblx0XHR9XG59KSgpOyIsIihmdW5jdGlvbigpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdGFuZ3VsYXJcblx0XHQubW9kdWxlKFwieDEudWkuZGVtby5hcHAxXCIpXG5cdFx0LmRpcmVjdGl2ZShcInN1Ym5hdkRpcmVjdGl2ZTJcIiwgc3VibmF2RGlyZWN0aXZlMik7XG5cblx0XHRmdW5jdGlvbiBzdWJuYXZEaXJlY3RpdmUyKCkge1xuXHRcdFx0dmFyIGRpcmVjdGl2ZSA9IHtcblx0XHRcdFx0c2NvcGU6IGZhbHNlLFxuXHRcdFx0XHRyZXBsYWNlOiB0cnVlLFxuXHRcdFx0XHRyZXN0cmljdDogXCJFQVwiLFxuXHRcdFx0XHR0ZW1wbGF0ZTogXCI8YSBocmVmPScjJyBzdHlsZT0ncGFkZGluZy1yaWdodDogMzBweDsgY29sb3I6ICMzMjMyMzI7Jz5cIiArXG5cdFx0XHRcdFx0XCI8c3BhbiBjbGFzcz0nZ2x5cGhpY29uIGdseXBoaWNvbi1vcHRpb24tdmVydGljYWwnIHN0eWxlPSdjb2xvcjogIzMyMzIzMjsnPjwvc3Bhbj5cIiArXG5cdFx0XHRcdFx0XCI8c3Bhbj5NZW51PC9zcGFuPjwvYT5cIlxuXHRcdFx0fTtcblxuXHRcdFx0cmV0dXJuIGRpcmVjdGl2ZTtcdFx0XG5cdFx0fVxufSkoKTsiLCI8ZGl2IGNsYXNzPVwiYXBwMlwiPlxuXHQ8aDE+VGhpcyBpcyBBcHAyIE5hdjE8L2gxPlxuXHQ8YnV0dG9uIG5nLWNsaWNrPVwidGVzdEJhbm5lcignYmctaW5mbycpXCI+U2hvdyBmcmFtZXdvcmsgYmFubmVyIHdpdGggaW5mbyBjbGFzczwvYnV0dG9uPlxuXHQ8YnV0dG9uIG5nLWNsaWNrPVwidGVzdEJhbm5lcignYmctc3VjY2VzcycpXCI+U2hvdyBmcmFtZXdvcmsgYmFubmVyIHdpdGggc3VjY2VzcyBjbGFzczwvYnV0dG9uPlxuPC9kaXY+IiwiPHVsPlxuXHQ8bGkgY2xhc3M9XCJzdWItdGVtcGxhdGVcIj5UaGlzIGlzIGEgcGxhY2Vob2xkZXIgZm9yIGEgRGFzaGJvYXJkIG9yIGxpc3Qgb2YgZGFzaGJvYXJkcy48L2xpPlxuXHQ8bGkgY2xhc3M9XCJzdWItdGVtcGxhdGVcIj5UaGlzIGlzIGEgcGxhY2Vob2xkZXIgZm9yIGEgRGFzaGJvYXJkIG9yIGxpc3Qgb2YgZGFzaGJvYXJkcy48L2xpPlxuXHQ8bGkgY2xhc3M9XCJzdWItdGVtcGxhdGVcIj5UaGlzIGlzIGEgcGxhY2Vob2xkZXIgZm9yIGEgRGFzaGJvYXJkIG9yIGxpc3Qgb2YgZGFzaGJvYXJkcy48L2xpPlxuPC91bD4iLCI8ZGl2IGNsYXNzPVwiYXBwMVwiPlxuXHQ8aDE+VGhpcyBpcyBBcHAxIE5hdjE8L2gxPlxuXHQ8cD5UaGlzIGlzIHRoZSBkZWZhdWx0IHZpZXcgd2hlbiBBcHAxIHJ1bnMgaW4gc3RhbmRhbG9uZSBtb2RlPC9wPlxuXHQ8cD48YSBocmVmPVwiaW5kZXgtYXBwMS5odG1sXCI+TG9hZCBBcHAxIGluIHN0YW5kYWxvbmUgbW9kZTwvYT48L3A+XG5cdDxwPjxhIGhyZWY9XCJpbmRleC5odG1sXCI+TG9hZCB0aGUgQWxsLWluLW9uZSBBcHA8L2E+PC9wPlxuXHQ8cD5DbGljayBvbiB0aGUgbGlua3MgYWJvdmUgYW5kIG5vdGljZSBob3cgdGhlIHNpZGUtbmF2IGNoYW5nZXMuPC9wPlxuPC9kaXY+IiwiPHAgY2xhc3M9XCJzdWItdGVtcGxhdGVcIj5UaGlzIGlzIGEgc2FtcGxlIHN1YiB0ZW1wbGF0ZSB3aGljaCBjYW4gYmUgaW5jbHVkZWQgaW5cdHRoZSBzaWRlXG5cdG5hdmlnYXRpb24uPC9wPlxuPHAgY2xhc3M9XCJzdWItdGVtcGxhdGVcIj5UaGlzIGlzIGEgc2FtcGxlIHN1YiB0ZW1wbGF0ZSB3aGljaCBjYW4gYmUgaW5jbHVkZWQgaW5cdHRoZSBzaWRlXG5cdG5hdmlnYXRpb24uPC9wPlxuPHAgY2xhc3M9XCJzdWItdGVtcGxhdGVcIj5UaGlzIGlzIGEgc2FtcGxlIHN1YiB0ZW1wbGF0ZSB3aGljaCBjYW4gYmUgaW5jbHVkZWQgaW5cdHRoZSBzaWRlXG5cdG5hdmlnYXRpb24uPC9wPiIsIjxhIGNsYXNzPSdtYWluLW1lbnUtbGluaycgcm9sZT0nYnV0dG9uJz5cblx0PHNwYW4gY2xhc3M9J2dseXBoaWNvbiBnbHlwaGljb24tZW52ZWxvcGUnPjwvc3Bhbj5cblx0PHNwYW4gc3R5bGU9XCJtYXJnaW4tbGVmdDogMTBweDtcIj5BcHAgMSBXaWRnZXQ8L3NwYW4+XG5cdDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLWRvd25cIj48L3NwYW4+XG5cdDxhbm90aGVyLWRpcmVjdGl2ZT48L2Fub3RoZXItZGlyZWN0aXZlPlxuPC9hPiIsIjxkaXYgY2xhc3M9XCJ1bWJyZWxsYVwiPlxuXHQ8aDE+VGhpcyBpcyB0aGUgVW1icmVsbGEgQXBwIExhbmRpbmcgUGFnZTwvaDE+XG5cdDxwPlRoaXMgZGVtb25zdHJhdGVzIHRoZSBmcmFtZXdvcmsgcnVubmluZyB3aXRoIHR3byBzZXBhcmF0ZSBhcHBzIGJvdW5kIHRvZ2V0aGVyIGJ5IGEgM3JkICh1bWJyZWxsYSkgYXBwLlxuXHRcdFRoZSBVbWJyZWxsYSBhcHAmYXBvcztzIHNvbGUgcHVycG9zZSBpcyB0byBpbmNsdWRlIHRoZSB0d28gc2VwYXJhdGUgYXBwcyBpbnRvIG9uZSBhcHBsaWNhdGlvbiBhbmQgc2V0IGFueVxuXHRcdGRlZmF1bHRzIG5lZWRlZC4gSXQgY291bGQgaW4gYWRkaXRpb24gZGVmaW5lIGFueSBuZXcgZnVuY3Rpb25hbGl0eSB0aGF0IGlzIG9ubHkgYXZhaWxhYmxlIHdoZW4gdGhlIHR3byBjaGlsZFxuXHRcdGFwcGxpY2F0aW9ucyBhcmUgcnVubmluZyB0b2dldGhlciBpbnNpZGUgdGhlIHVtYnJlbGxhIGFwcCBidXQgYXJlIG5vdCBhdmFpbGFibGUgd2hlbiBlaXRoZXIgb2YgdGhlIHR3byBhcHBzXG5cdFx0aXMgcnVubmluZyBzZXBhcmF0ZWx5LlxuXHQ8L3A+XG5cdDxwPkVhY2ggYXBwIGluY2x1ZGVzIHRoZSBVSSBGcmFtZXdvcmsgYXMgYSBkZXBlbmRlbmN5IGFuZCBlYWNoIGNhbGxzIHRoZSBGcmFtZXdvcmsgTmF2IFNlcnZpY2UgaW4gaXRzXG5cdFx0QW5ndWxhci5ydW4oKSBibG9jayB0byBoYXZlXHRpdHMgbmF2aWdhdGlvbiBzdHJ1Y3R1cmUgYWRkZWQgaW50byB0aGUgVUkgRnJhbWV3b3JrLiBUaGlzIGNyZWF0ZXMgYSBjb21iaW5lZFxuXHRcdG5hdmlnYXRpb24gc3RydWN0dXJlLlxuXHQ8L3A+XG5cdDxwPkNsaWNrIG9uIGl0ZW1zIGluIHRoZSBzaWRlLW5hdiB0byBzZWUgdGhhdCBzb21lIGl0ZW1zIGFyZSBwcm92aWRlZCBieSA8Yj5BcHAxPC9iPiBhbmQgc29tZSBieSA8Yj5BcHAyPC9iPi4gSWZcblx0XHR5b3UgbGF1bmNoIEFwcDEgYXMgYSBzdGFuZGFsb25lIGFwcCAobm90IGJ5IHJ1bm5pbmcgdGhlIHVtYnJlbGxhIGFwcCkgdGhlbiB0aGUgc2lkZS1uYXYgZnJvbSB0aGUgZnJhbWV3b3JrXG5cdFx0d2lsbCBzdGlsbCBiZSBhdmFpbGFibGUsIGJ1dCBub25lIG9mIEFwcDImYXBvcztzIGl0ZW1zIHdpbGwgYmUgaW4gaXQuXG5cdDwvcD5cbjwvZGl2PiJdfQ==
