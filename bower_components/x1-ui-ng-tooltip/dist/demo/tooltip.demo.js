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
		"x1.ui.tooltip.demo"
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

			$urlRouterProvider.otherwise("/tooltip");
		}
	]);
/**
 *
 * Licensed Materials – Property of IBM
 *
 * tooltip.demo.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.tooltip.demo", [
		"prism",
		"ui.bootstrap.tabs",
		"ui.bootstrap.tpls",
		"x1.ui.demo-generator",
		"x1.ui.tooltip"
	])
	.config(["$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider.state("tooltip", {
				url: "/tooltip",
				templateUrl: "tooltip/tooltip.demo.html"
			});
		}
	]);
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
  module = angular.module('x1.ui.tooltip');
} catch (e) {
  module = angular.module('x1.ui.tooltip', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tooltip/index.rtl.html',
    '<!DOCTYPE html><html ng-app="x1.ui.demo"><head><meta charset="utf-8"><title>IBM Commerce Product UI Tooltip Demo</title><link rel="stylesheet" href="vendor/vendor.css"><link rel="stylesheet" href="../x1-ui-ng-tooltip.css"><link rel="stylesheet" href="../x1-ui-ng-tooltip.rtl.css"></head><body dir="rtl"><section ui-view="" class="container"></section><script type="text/javascript" src="vendor/vendor.js"></script><script type="text/javascript" src="../x1-ui-ng-tooltip.js"></script><script type="text/javascript" src="tooltip.demo.js"></script></body></html>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.tooltip');
} catch (e) {
  module = angular.module('x1.ui.tooltip', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tooltip/tooltip.demo.html',
    '<x1-demo-generator doc-src="\'tooltip/tooltip.doc.html\'" repo-name="x1-ui-ng-tooltip" class="x1-tooltip-demo"><div class="bs-callout bs-callout-danger"><h4>Unstable</h4><p>Not all properties are listed - some of them are not properly working or not completely tested.</p></div><h3 class="page-header">Tooltip (default hover trigger)</h3><p>All possible placements and default hover trigger.</p><div class="bs-example"><a id="btn5" class="btn btn-link" type="button" x1-tooltip="" data-placement="top" data-title="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">Top</a> <a id="btn6" class="btn btn-link" type="button" x1-tooltip="" data-placement="bottom" data-title="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">Bottom</a> <a id="btn7" class="btn btn-link" type="button" x1-tooltip="" data-placement="left" data-title="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">Left</a> <a id="btn8" class="btn btn-link" type="button" x1-tooltip="" data-placement="right" data-title="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">Right</a></div><div class="highlight"><pre>\n' +
    '			<code class="language-markup" prism="">&lt;a id=&quot;btn5&quot; class=&quot;btn btn-link&quot; type=&quot;button&quot; x1-tooltip data-placement=&quot;top&quot;\n' +
    '		data-title=&quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit.&quot;&gt;Top&lt;/a&gt;\n' +
    '&lt;a id=&quot;btn6&quot; class=&quot;btn btn-link&quot; type=&quot;button&quot; x1-tooltip data-placement=&quot;bottom&quot;\n' +
    '		data-title=&quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit.&quot;&gt;Bottom&lt;/a&gt;\n' +
    '&lt;a id=&quot;btn7&quot; class=&quot;btn btn-link&quot; type=&quot;button&quot; x1-tooltip data-placement=&quot;left&quot;\n' +
    '		data-title=&quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit.&quot;&gt;Left&lt;/a&gt;\n' +
    '&lt;a id=&quot;btn8&quot; class=&quot;btn btn-link&quot; type=&quot;button&quot; x1-tooltip data-placement=&quot;right&quot;\n' +
    '		data-title=&quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit.&quot;&gt;Right&lt;/a&gt;</code>\n' +
    '		</pre></div><h3 class="page-header">Tooltip placements (trigger click)</h3><p>All possible placements and trigger click.</p><div class="bs-example"><button id="btn1" class="btn btn-default" type="button" x1-tooltip="" data-title="Lorem ipsum dolor sit amet, consectetur adipiscing elit." data-trigger="click" data-placement="top">Top Click</button> <button id="btn2" class="btn btn-default" type="button" x1-tooltip="" data-title="Lorem ipsum dolor sit amet, consectetur adipiscing elit." data-trigger="click" data-placement="bottom" data-close-icon="false">Bottom Click</button> <button id="btn3" class="btn btn-default" type="button" x1-tooltip="" data-title="Lorem ipsum dolor sit amet, consectetur adipiscing elit." data-trigger="click" data-placement="left">Left Click</button> <button id="btn4" class="btn btn-default" type="button" x1-tooltip="" data-title="Lorem ipsum dolor sit amet, consectetur adipiscing elit." data-trigger="click" data-placement="right" data-close-icon="false">Right Click</button></div><div class="highlight"><pre>\n' +
    '			<code class="language-markup" prism="">&lt;button id=&quot;btn1&quot; class=&quot;btn btn-default&quot; type=&quot;button&quot; x1-tooltip data-trigger=&quot;click&quot; data-placement=&quot;top&quot;\n' +
    '		data-title=&quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit.&quot;&gt;Top Click&lt;/button&gt;\n' +
    '&lt;button id=&quot;btn2&quot; class=&quot;btn btn-default&quot; type=&quot;button&quot; x1-tooltip data-trigger=&quot;click&quot; data-placement=&quot;bottom&quot;\n' +
    '		data-title=&quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit.&quot; data-close-icon=&quot;false&quot;&gt;Bottom Click&lt;/button&gt;\n' +
    '&lt;button id=&quot;btn3&quot; class=&quot;btn btn-default&quot; type=&quot;button&quot; x1-tooltip data-trigger=&quot;click&quot; data-placement=&quot;left&quot;\n' +
    '		data-title=&quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit.&quot;&gt;Left Click&lt;/button&gt;\n' +
    '&lt;button id=&quot;btn4&quot; class=&quot;btn btn-default&quot; type=&quot;button&quot; x1-tooltip data-trigger=&quot;click&quot; data-placement=&quot;right&quot;\n' +
    '		data-title=&quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit.&quot; data-close-icon=&quot;false&quot;&gt;Right Click&lt;/button&gt;</code>\n' +
    '		</pre></div><h3 class="page-header">Show HTML in tooltip content</h3><p>Tooltip supports custom html message (trigger click only).</p><div class="bs-example"><button id="btn9" class="btn btn-default" type="button" x1-tooltip="" data-title="Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/><a href=\'#\'>Learn more</a>" data-placement="right" data-html="true" data-trigger="click" outside-click="true">HTML Content</button></div><div class="highlight"><pre>\n' +
    '			<code class="language-markup" prism="">&lt;button id=&quot;btn9&quot; class=&quot;btn btn-default&quot; type=&quot;button&quot; x1-tooltip\n' +
    '		data-title=&quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit.&lt;br/&gt;&lt;a href=&#39;#&#39;&gt;Learn more&lt;/a&gt;&quot;\n' +
    '		data-placement=&quot;right&quot; data-html=&quot;true&quot; data-trigger=&quot;click&quot; outside-click=&quot;true&quot; &gt;HTML Content&lt;/button&gt;</code>\n' +
    '		</pre></div></x1-demo-generator>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.tooltip');
} catch (e) {
  module = angular.module('x1.ui.tooltip', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tooltip/tooltip.doc.html',
    '<h3 class="page-header">Bower dependencies</h3><ul><li>angular</li><li>angular-bootstrap</li><li>angular-translate</li><li>angular-translate-loader-static-files</li><li>x1-ui-bootstrap</li></ul><h3 class="page-header">Attribute options for <code>x1-tooltip=""</code></h3><p>Prefix all properties below with <code>data-</code> if directive is used as an attribute.</p><table class="table table-condensed table-striped"><thead><tr><th>Property</th><th>Description</th><th>Required</th><th>Default value</th><th>Accepted value(s)/type</th></tr></thead><tbody><tr><td>title</td><td>Tooltip\'s content.</td><td>true</td><td>none</td><td>string</td></tr><tr><td>trigger</td><td>How to trigger tooltip\'s visibility.</td><td>false</td><td>"mouseenter"</td><td>"manual" | "click" | "hover"</td></tr><tr><td>outsideClick</td><td>Hide tooltip when anything else is clicked.</td><td>false</td><td>false</td><td>boolean</td></tr><tr><td>placement</td><td>How to position the tooltip.</td><td>false</td><td>"top"</td><td>"top" | "right" | "bottom" | "left" | "top-right" | "top-left" | "bottom-right" | "bottom-left"</td></tr><tr><td>close-icon</td><td>Toggle close icon visibility.</td><td>false</td><td>true</td><td>boolean</td></tr><tr><td>html</td><td>Allow for HTML to be passed into the content.</td><td>false</td><td>false</td><td>boolean</td></tr><tr><td>template</td><td>Pass in a custom template path.</td><td>false</td><td>(Refer to default template below.)</td><td>string</td></tr></tbody></table><h3 class="page-header">Defaults</h3><tabset><tab heading="Template"><div class="highlight"><pre>\n' +
    '				<code class="language-markup" prism="">&lt;div ng-show=&quot;title&quot; role=&quot;tooltip&quot; class=&quot;x1-ui-tooltip tooltip in&quot;&gt;\n' +
    '	&lt;div class=&quot;tooltip-arrow&quot; aria-hidden=&quot;true&quot;&gt;&lt;/div&gt;\n' +
    '	&lt;div class=&quot;tooltip-inner&quot; ng-class=&quot;{&#39;closable&#39;: closeIcon}&quot; ng-bind=&quot;title&quot;&gt;&lt;/div&gt;\n' +
    '	&lt;button ng-if=&quot;closeIcon&quot; type=&quot;button&quot; class=&quot;close&quot; ng-click=&quot;close()&quot; tabindex=&quot;0&quot;\n' +
    '			name=&quot;tooltipCloseIcon&quot; aria-label=&quot;{&#39;x1UiNgTooltip.CLOSE&#39; | translate}&quot;&gt;\n' +
    '		&lt;span class=&quot;glyphicon glyphicon-remove&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;\n' +
    '	&lt;/button&gt;\n' +
    '&lt;/div&gt;</code>\n' +
    '			</pre></div></tab><tab heading="Options"><div class="highlight"><pre>\n' +
    '				<code class="language-javascript" prism="">angular\n' +
    '	.module(&quot;x1.ui.tooltip&quot;)\n' +
    '	.constant(&quot;tooltipDefaults&quot;, {\n' +
    '		animation: false,\n' +
    '		prefixClass: &quot;tooltip&quot;,\n' +
    '		prefixEvent: &quot;tooltip&quot;,\n' +
    '		container: false,\n' +
    '		target: false,\n' +
    '		placement: &quot;top&quot;,\n' +
    '		template: &quot;tooltip/tooltip.html&quot;,\n' +
    '		contentTemplate: false,\n' +
    '		trigger: &quot;hover focus&quot;,\n' +
    '		keyboard: false,\n' +
    '		html: false,\n' +
    '		show: false,\n' +
    '		title: &quot;&quot;,\n' +
    '		type: &quot;&quot;,\n' +
    '		delay: 0,\n' +
    '		closeIcon: &quot;true&quot;\n' +
    '	});</code>\n' +
    '			</pre></div></tab></tabset>');
}]);
})();
