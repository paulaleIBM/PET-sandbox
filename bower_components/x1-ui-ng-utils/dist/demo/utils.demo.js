angular.module("prism", []);
angular
	.module("x1.ui.demo", [
		"prism",
		"ui.router",
		"ui.bootstrap",
		"x1.ui.utils.demo"
	]);
angular
	.module("x1.ui.utils.demo", [
		"x1.ui.utils"
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

			$stateProvider.state("utils", {
				url: "/utils",
				templateUrl: "utils/utils.demo.html",
				controller: "x1.ui.utils.demo"
			});

			$urlRouterProvider.otherwise("/utils");
		}
	])
	.controller("x1.ui.utils.demo", [
		"$scope",
		function($scope) {
			"use strict";
			window.console.log($scope);

		}
	]);
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
  module = angular.module('x1.ui.utils');
} catch (e) {
  module = angular.module('x1.ui.utils', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('utils/utils.demo.html',
    '<div class="container-fluid">\n' +
    '	<h1 class="page-header">Peretz Utilities</h1>\n' +
    '	<p class="lead">This is a collection of utilities offered as an injectable service for Peretz applications. It includes convenient\n' +
    '		directives like auto-focus as well as convenience methods for translations and for showing simple informational,\n' +
    '		error, or warning modals.</p>\n' +
    '	<tabset>\n' +
    '		<tab heading="Demo"></tab>\n' +
    '		<tab heading="Documentation"></tab>\n' +
    '		<tab heading="UX specifications"></tab>\n' +
    '		<tab heading="UX blueprint"></tab>\n' +
    '	</tabset>\n' +
    '</div>');
}]);
})();
