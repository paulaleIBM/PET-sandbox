/**
 *
 * Licensed Materials – Property of IBM
 *
 * demo.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.demo", [
		"ui.router",
		"x1.ui.loading-bee.demo"
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

			$urlRouterProvider.otherwise("/loading-bee");
		}
	]);
/**
 *
 * Licensed Materials – Property of IBM
 *
 * loading-bee.demo.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.loading-bee.demo", [
		"prism",
		"ui.bootstrap.tabs",
		"ui.bootstrap.tpls",
		"x1.ui.demo-generator",
		"x1.ui.loading-bee"
	])
	.config(["$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider.state("loading-bee", {
				url: "/loading-bee",
				templateUrl: "loading-bee/loading-bee.demo.html"
			});
	}]);
/**
 *
 * Licensed Materials - Property of IBM
 *
 * prism.js
 *
 * (C) Copyright IBM Corporation 2016.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("prism", [])
	.directive("prism",
		function() {
			"use strict";

			return {
				restrict: "A",
				link: function($scope, element) {
					element.ready(function() {
						Prism.highlightElement(element[0]);
					});
				}
			};
		}
	);
(function(module) {
try {
  module = angular.module('x1.ui.loading-bee');
} catch (e) {
  module = angular.module('x1.ui.loading-bee', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('loading-bee/loading-bee.demo.html',
    '<x1-demo-generator doc-src="\'loading-bee/loading-bee.docs.html\'" repo-name="x1-ui-ng-loading-bee"><ng-include src="\'loading-bee/examples/color.html\'"></ng-include><ng-include src="\'loading-bee/examples/size.html\'"></ng-include><ng-include src="\'loading-bee/examples/animation.html\'"></ng-include></x1-demo-generator>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.loading-bee');
} catch (e) {
  module = angular.module('x1.ui.loading-bee', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('loading-bee/loading-bee.docs.html',
    '<h3 class="page-header">Bower dependencies</h3><ul><li>angular</li><li>angular-translate</li><li>angular-translate-loader-static-files</li><li>x1-ui-bootstrap</li></ul><h3 class="page-header">Component options</h3><div class="bs-callout bs-callout-warning"><h4>*Color property</h4><p>All color values are converted to rgb format by the browser.</p></div><table class="table table-condensed table-striped"><thead><tr><th>Property</th><th>Description</th><th>Required</th><th>Default value</th><th>Accepted values/type</th></tr></thead><tbody><tr><td>size</td><td>The height and width of the svg element.</td><td>false</td><td>32px</td><td>string</td></tr><tr><td>color*</td><td>The color of all paths inside the svg element.</td><td>false</td><td>$brand-primary (#4178BE)</td><td>string</td></tr><tr><td>animation</td><td>The type of animation applied to the svg element.</td><td>false</td><td>static</td><td>string</td></tr></tbody></table>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.loading-bee');
} catch (e) {
  module = angular.module('x1.ui.loading-bee', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('loading-bee/examples/animation.html',
    '<h3 class="page-header">Busy Animation</h3><p>This example demonstrates set size and animation with default color.</p><div class="bs-example"><x1-loading-bee id="bee-example-3" size="150px" animation="busy"></x1-loading-bee></div><div class="highlight"><pre>\n' +
    '		<code class="language-markup" prism="">&lt;x1-loading-bee id=&quot;bee-example-3&quot; size=&quot;150px&quot; animation=&quot;busy&quot;&gt;&lt;/x1-loading-bee&gt;</code>\n' +
    '	</pre></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.loading-bee');
} catch (e) {
  module = angular.module('x1.ui.loading-bee', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('loading-bee/examples/color.html',
    '<h3 class="page-header">Custom Colors</h3><p>This example demonstrates set colors with default size and animation.</p><div class="bs-example"><x1-loading-bee id="bee-example-1" color="rgb(56, 146, 198)"></x1-loading-bee><x1-loading-bee color="#754d88"></x1-loading-bee><x1-loading-bee color="red"></x1-loading-bee></div><div class="highlight"><pre>\n' +
    '		<code class="language-markup" prism="">&lt;x1-loading-bee id=&quot;bee-example-1&quot; color=&quot;rgb(56, 146, 198)&quot;&gt;&lt;/x1-loading-bee&gt;\n' +
    '&lt;x1-loading-bee color=&quot;#754d88&quot;&gt;&lt;/x1-loading-bee&gt;\n' +
    '&lt;x1-loading-bee color=&quot;red&quot;&gt;&lt;/x1-loading-bee&gt;</code>\n' +
    '	</pre></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.loading-bee');
} catch (e) {
  module = angular.module('x1.ui.loading-bee', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('loading-bee/examples/size.html',
    '<h3 class="pahe-header">Custom Sizes</h3><p>This example demonstrates set size with default color and animation.</p><div class="bs-example"><x1-loading-bee id="bee-example-2" size="50px"></x1-loading-bee><x1-loading-bee size="100px"></x1-loading-bee><x1-loading-bee size="200px"></x1-loading-bee></div><div class="highlight"><pre>\n' +
    '		<code class="language-markup" prism="">&lt;x1-loading-bee id=&quot;bee-example-2&quot; size=&quot;50px&quot;&gt;&lt;/x1-loading-bee&gt;\n' +
    '&lt;x1-loading-bee size=&quot;100px&quot;&gt;&lt;/x1-loading-bee&gt;\n' +
    '&lt;x1-loading-bee size=&quot;200px&quot;&gt;&lt;/x1-loading-bee&gt;</code>\n' +
    '	</pre></div>');
}]);
})();
