angular
	.module("x1.ui.demo", [
		"ui.router",
		"x1.ui.popover.demo"
	])
	.config(["$urlRouterProvider", "$translateProvider",
		function($urlRouterProvider, $translateProvider) {
			"use strict";

			$urlRouterProvider.otherwise("/popover");

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
		}
	]);
/*-----------------------------------------------------------------------------/
 /                                                                             /
 / Licensed Materials – Property of IBM                                        /
 /                                                                             /
 / popover.demo.js                                                             /
 /                                                                             /
 /(C) Copyright IBM Corporation 2015.                                          /
 / U.S. Government Users Restricted Rights:  Use, duplication or disclosure    /
 / restricted by GSA ADP Schedule Contract with IBM Corp.                      /
 /                                                                             /
 /*---------------------------------------------------------------------------*/

angular
	.module("x1.ui.popover.demo", [
		"prism",
		"ui.bootstrap.tabs",
		"ui.bootstrap.tpls",
		"x1.ui.demo-generator",
		"x1.ui.popover"
	])
	.config(["$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider.state("popover", {
				url: "/popover",
				templateUrl: "popover/popover.demo.html",
				controller: "x1PopoverDemoCtrl"
			});
		}
	])
	.controller("x1PopoverDemoCtrl", [
		"$scope", "x1.ui.popover.events",
		function($scope, popoverEvents) {
			//"use strict";

			var items = [
				{
					"name": "Save",
					"icon": "save",
					"rarr": false,
					"handleClick": handleItemClick
				},
				{
					"name": "Save As",
					"icon": "save-as",
					"rarr": true,
					"handleClick": handleItemClick
				},
				{
					"name": "Settings",
					"icon": "tools",
					"rarr": true,
					"disabled": true
				},
				{
					"name": "Share",
					"icon": "share",
					"rarr": false,
					"handleClick": handleItemClick
				}
			];

			function handleItemClick() {
				$scope.selectedItem = "Clicked on item name: " + this.name;
			}

			$scope.defaultPopover = {
				"placement": "bottom-right",
				"items": items
			};

			$scope.customPopover = {
				"title": "Test template",
				"placement": "bottom",
				"contentTemplate": "popover/examples/popover-custom-content.html"
			};

			$scope.cancelPopover = function() {
				$scope.$broadcast(popoverEvents.CANCEL_POPOVER);
			};
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
  module = angular.module('x1.ui.popover');
} catch (e) {
  module = angular.module('x1.ui.popover', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('popover/index.rtl.html',
    '<!DOCTYPE html><html ng-app="x1.ui.demo"><head><meta charset="utf-8"><title>IBM Commerce Product UI Popover Demo</title><link rel="stylesheet" href="vendor/vendor.css"><link rel="stylesheet" href="../x1-ui-ng-popover.css"><link rel="stylesheet" href="../x1-ui-ng-popover.rtl.css"><link rel="stylesheet" href="popover.demo.css"></head><body dir="rtl"><section ui-view="" class="container"></section><script type="text/javascript" src="vendor/vendor.js"></script><script type="text/javascript" src="../x1-ui-ng-popover.js"></script><script type="text/javascript" src="popover.demo.js"></script></body></html>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.popover');
} catch (e) {
  module = angular.module('x1.ui.popover', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('popover/popover.demo.html',
    '<x1-demo-generator doc-src="\'popover/popover.doc.html\'" repo-name="x1-ui-ng-popover" class="x1-ui-popover-demo"><div class="bs-callout bs-callout-danger"><h4>Unstable</h4><p>Not all properties are listed - some of them are not properly working or not completely tested.</p></div><ng-include src="\'popover/examples/default.demo.html\'"></ng-include><ng-include src="\'popover/examples/custom.demo.html\'"></ng-include><ng-include src="\'popover/examples/placement.demo.html\'"></ng-include></x1-demo-generator>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.popover');
} catch (e) {
  module = angular.module('x1.ui.popover', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('popover/popover.doc.html',
    '<h3 class="page-header">Bower dependencies</h3><ul><li>angular</li><li>angular-translate</li><li>angular-translate-loader-static-files</li><li>x1-ui-bootstrap</li><li>x1-ui-ng-tooltip</li></ul><h3 class="page-header">Component options</h3><table class="table table-condensed table-striped"><thead><tr><th>Property</th><th>Description</th><th>Required</th><th>Default value</th><th>Accepted values/type</th></tr></thead><tbody><tr><td>title</td><td>Popover title</td><td>true</td><td>none</td><td>string</td></tr><tr><td>customTitle</td><td>Defines if popover has custom title</td><td>false</td><td>false</td><td>boolean</td></tr><tr><td>content</td><td>Popover simple text content</td><td>false</td><td>none</td><td>string</td></tr><tr><td>content-html</td><td>Popover simple html content</td><td>false</td><td>none</td><td>html markup</td></tr><tr><td>placement</td><td>Popover placement</td><td>true</td><td>"bottom"</td><td>string: "bottom", "top", "right", "left", "bottom-right", "bottom-left", "top-right", "top-left"</td></tr><tr><td>template</td><td>Popover template</td><td>false</td><td>"popover/popover.html"</td><td>string: Path to html template</td></tr><tr><td>contentTemplate</td><td>Popover template only for content part (without header)</td><td>false</td><td>"popover/popover-content.html"</td><td>string: Path to html template - If it is set, then "items" array is ignored</td></tr><tr><td>items</td><td>Array of menu items. Each object should have properties: "name" - item name, "icon" - glyphicon icons, "rarr" - show/hide right arrow, "handleClick" - item click handler</td><td>false</td><td>[]</td><td>array</td></tr><tr><td>data-container</td><td>Element to which popover will be appended (for example "body")</td><td>false</td><td>none</td><td>string: css selector</td></tr><tr><td>scrollable-container</td><td>Elements, scrolling of which affect the position of popover (If we have more than one we should separate them by space)</td><td>false</td><td>none</td><td>string: css class name</td></tr><tr><td>keyboard</td><td>Defines if popover will be closed after user pressed escape button</td><td>false</td><td>false</td><td>boolean</td></tr><tr><td>outside-click</td><td>Defines if popover will be closed after user clicked outside popover</td><td>false</td><td>false</td><td>boolean</td></tr><tr><td>multiple</td><td>Defines if popover will be closed after user opened another popover</td><td>false</td><td>none</td><td>boolean</td></tr><tr><td>class-name</td><td>Defines HTML class attribute for popover element</td><td>false</td><td>false</td><td>string</td></tr></tbody></table><h3 class="page-header">Events</h3><p>Include <code>x1.ui.popover.events</code> in your controller to access the events listed below.</p><table class="table table-condensed table-striped"><thead><tr><th>Event</th><th>Name</th><th>Description</th><th>Arguments</th></tr></thead><tbody><tr><td>[yourPopoverEventsRef].APPLY_POPOVER</td><td>"x1.ui.apply-popover</td><td></td><td></td></tr><tr><td>[yourPopoverEventsRef].CANCEL_POPOVER</td><td>"x1.ui.cancel-popover"</td><td></td><td></td></tr><tr><td>[yourPopoverEventsRef].APPLY_PLACEMENT</td><td>"x1.ui.apply-placement"</td><td></td><td></td></tr><tr><td>[yourPopoverEventsRef].POPOVER_CLOSED</td><td>"x1.ui.popover.closed"</td><td></td><td></td></tr><tr><td>[yourPopoverEventsRef].CLOSED_POPOVER</td><td>"x1.ui.closed.popover"</td><td></td><td></td></tr></tbody></table><h3 class="page-header">Defaults</h3><tabset><tab heading="Template"><div class="highlight"><pre>\n' +
    '				<code class="language-javascript" prism="">&lt;div role=&quot;menu&quot; class=&quot;list-group&quot; aria-label=&quot;{{title}} {{&#39;x1UiNgPopover.ARIA.MENU&#39; | translate}}&quot;&gt;\n' +
    '	&lt;a ng-repeat=&quot;item in items&quot; class=&quot;list-group-item&quot; name=&quot;{{<span>item.name</span>}}&quot;\n' +
    '			ng-class=&quot;{&#39;disabled&#39;: item.disabled, &#39;active&#39;: item.active}&quot; role=&quot;menuitem&quot; aria-label=&quot;{{<span>item.name</span>}}&quot;\n' +
    '			ng-click=&quot;item.handleClick()&quot; ng-keydown=&quot;accessibleClick(item, $event)&quot;&gt;\n' +
    '		&lt;span class=&quot;menu-icon glyphicon glyphicon-{{<span>item.icon</span>}}&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;\n' +
    '		&lt;span class=&quot;item-name&quot;&gt;{{<span>item.name</span>}}&lt;/span&gt;\n' +
    '		&lt;span ng-if=&quot;item.rarr&quot; aria-hidden=&quot;true&quot; class=&quot;next-icon glyphicon glyphicon-chevron-right&quot;&gt;&lt;/span&gt;\n' +
    '	&lt;/a&gt;\n' +
    '&lt;/div&gt;</code>\n' +
    '			</pre></div></tab><tab heading="Constant"><div class="highlight"><pre>\n' +
    '				<code class="language-javascript" prism="">angular\n' +
    '	.module("x1.ui.popover")\n' +
    '	.constant("x1.ui.popover.defaults", {\n' +
    '		animation: false,\n' +
    '		container: false,\n' +
    '		scrollableContainer: false,\n' +
    '		target: false,\n' +
    '		placement: "bottom",\n' +
    '		template: "popover/popover.html",\n' +
    '		contentTemplate: "popover/popover-content.html",\n' +
    '		trigger: "click",\n' +
    '		html: false,\n' +
    '		title: "",\n' +
    '		content: "",\n' +
    '		delay: 0,\n' +
    '		multiple: false,\n' +
    '		className: ""\n' +
    '	});</code>\n' +
    '			</pre></div></tab></tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.popover');
} catch (e) {
  module = angular.module('x1.ui.popover', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('popover/examples/custom.demo.html',
    '<h3 class="page-header">Popover custom template</h3><p>Using custom templates inside popover content.</p><div class="bs-example"><button id="btn2" type="button" class="btn btn-primary" x1-popover="customPopover" content-template="popover/examples/popover-custom-content.html" translate="x1UiNgPopoverDemo.custom.BTN"></button></div><tabset><tab heading="HTML"><div class="highlight"><pre>\n' +
    '				<code class="language-markup" prism="">&lt;button id=&quot;btn2&quot; type=&quot;button&quot; class=&quot;btn btn-primary&quot; x1-popover=&quot;customPopover&quot;\n' +
    '		content-template=&quot;popover/examples/popover-custom-content.html&quot; translate=&quot;x1UiNgPopoverDemo.custom.BTN&quot;&gt;&lt;/button&gt;</code>\n' +
    '			</pre></div></tab><tab heading="JS"><div class="highlight"><pre>\n' +
    '				<code class="language-javascript" prism="">angular\n' +
    '	.module(&quot;x1.ui.popover.demo&quot;, [\n' +
    '		&quot;x1.ui.popover&quot;\n' +
    '	])\n' +
    '	.controller(&quot;x1PopoverDemoCtrl&quot;, [&quot;$scope&quot;,\n' +
    '		function($scope) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			$scope.customPopover = {\n' +
    '				&quot;title&quot;: &quot;Test template&quot;,\n' +
    '				&quot;placement&quot;: &quot;bottom&quot;,\n' +
    '				&quot;contentTemplate&quot;: &quot;popover/examples/popover-custom-content.html&quot;\n' +
    '			};\n' +
    '		}\n' +
    '	]);</code>\n' +
    '			</pre></div></tab><tab heading="Template"><div class="highlight"><pre>\n' +
    '				<code class="language-markup" prism="">&lt;p&gt;This is an example of a popover with a custom content template.&lt;/p&gt;</code>\n' +
    '			</pre></div></tab></tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.popover');
} catch (e) {
  module = angular.module('x1.ui.popover', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('popover/examples/default.demo.html',
    '<h3 class="page-header">Popover default behavior</h3><p>List items are shown in popover by default. User has to specify array of items and pass to popover.</p><div class="bs-example"><p>{{selectedItem}}</p><button id="btn1" type="button" class="btn btn-primary" x1-popover="defaultPopover" aria-haspopup="true" translate="x1UiNgPopoverDemo.default.BTN"></button></div><tabset><tab heading="HTML"><div class="highlight"><pre>\n' +
    '				<code class="language-markup" prism="">&lt;p&gt;{{<span>selectedItem</span>}}&lt;/p&gt;\n' +
    '&lt;button id=&quot;btn1&quot; type=&quot;button&quot; class=&quot;btn btn-primary&quot; x1-popover=&quot;defaultPopover&quot; aria-haspopup=&quot;true&quot;\n' +
    '		translate=&quot;x1UiNgPopoverDemo.default.BTN&quot;&gt;&lt;/button&gt;</code>\n' +
    '			</pre></div></tab><tab heading="JS"><div class="highlight"><pre>\n' +
    '				<code class="language-javascript" prism="">angular\n' +
    '	.module(&quot;x1.ui.popover.demo&quot;, [\n' +
    '		&quot;x1.ui.popover&quot;\n' +
    '	])\n' +
    '	.controller(&quot;x1PopoverDemoCtrl&quot;, [&quot;$scope&quot;,\n' +
    '		function($scope) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			var items = [\n' +
    '				{&quot;name&quot;: &quot;Save&quot;, &quot;icon&quot;: &quot;save&quot;, &quot;rarr&quot;: false, &quot;handleClick&quot;: handleItemClick},\n' +
    '				{&quot;name&quot;: &quot;Save As&quot;, &quot;icon&quot;: &quot;save-as&quot;, &quot;rarr&quot;: true, &quot;handleClick&quot;: handleItemClick},\n' +
    '				{&quot;name&quot;: &quot;Settings&quot;, &quot;icon&quot;: &quot;tools&quot;, &quot;rarr&quot;: true, &quot;disabled&quot;: true},\n' +
    '				{&quot;name&quot;: &quot;Share&quot;, &quot;icon&quot;: &quot;share&quot;, &quot;rarr&quot;: false, &quot;handleClick&quot;: handleItemClick}\n' +
    '			];\n' +
    '\n' +
    '			function handleItemClick() {\n' +
    '				$scope.selectedItem = &quot;Clicked on item name: &quot; + this.name;\n' +
    '			}\n' +
    '\n' +
    '			$scope.defaultPopover = {\n' +
    '				&quot;placement&quot;: &quot;bottom-right&quot;,\n' +
    '				&quot;items&quot;: items\n' +
    '			};\n' +
    '		}\n' +
    '	]);</code>\n' +
    '			</pre></div></tab></tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.popover');
} catch (e) {
  module = angular.module('x1.ui.popover', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('popover/examples/placement.demo.html',
    '<h3 class="page-header">Popover specific placements</h3><p>Users can use specific positions like bottom-right and bottom-left to set appropriate popover placement.</p><div class="bs-example"><button id="btn3" type="button" class="btn btn-primary" x1-popover="" placement="bottom-right" content="Bottom right positioned." translate="x1UiNgPopoverDemo.placement.BTN1"></button> <button id="btn4" type="button" class="btn btn-primary" x1-popover="" placement="bottom-left" content="Bottom left positioned." translate="x1UiNgPopoverDemo.placement.BTN2"></button> <button id="btn5" type="button" class="btn btn-primary" x1-popover="" placement="left" content="Left positioned." translate="x1UiNgPopoverDemo.placement.BTN3"></button> <button id="btn6" type="button" class="btn btn-primary" x1-popover="" placement="right" content="Right positioned." translate="x1UiNgPopoverDemo.placement.BTN4"></button> <button id="btn7" type="button" class="btn btn-primary" x1-popover="" placement="top" content="Top positioned." translate="x1UiNgPopoverDemo.placement.BTN5"></button></div><div class="highlight"><pre>\n' +
    '		<code class="language-markup" prism="">&lt;button id=&quot;btn3&quot; type=&quot;button&quot; class=&quot;btn btn-primary&quot; x1-popover placement=&quot;bottom-right&quot;\n' +
    '		content=&quot;Bottom right positioned.&quot; translate=&quot;x1UiNgPopoverDemo.placement.BTN1&quot;&gt;&lt;/button&gt;\n' +
    '&lt;button id=&quot;btn4&quot; type=&quot;button&quot; class=&quot;btn btn-primary&quot; x1-popover placement=&quot;bottom-left&quot;\n' +
    '		content=&quot;Bottom left positioned.&quot; translate=&quot;x1UiNgPopoverDemo.placement.BTN2&quot;&gt;&lt;/button&gt;\n' +
    '&lt;button id=&quot;btn5&quot; type=&quot;button&quot; class=&quot;btn btn-primary&quot; x1-popover placement=&quot;left&quot;\n' +
    '		content=&quot;Left positioned.&quot; translate=&quot;x1UiNgPopoverDemo.placement.BTN3&quot;&gt;&lt;/button&gt;\n' +
    '&lt;button id=&quot;btn6&quot; type=&quot;button&quot; class=&quot;btn btn-primary&quot; x1-popover placement=&quot;right&quot;\n' +
    '		content=&quot;Right positioned.&quot; translate=&quot;x1UiNgPopoverDemo.placement.BTN4&quot;&gt;&lt;/button&gt;\n' +
    '&lt;button id=&quot;btn7&quot; type=&quot;button&quot; class=&quot;btn btn-primary&quot; x1-popover placement=&quot;top&quot;\n' +
    '		content=&quot;Top positioned.&quot; translate=&quot;x1UiNgPopoverDemo.placement.BTN5&quot;&gt;&lt;/button&gt;</code>\n' +
    '	</pre></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.popover');
} catch (e) {
  module = angular.module('x1.ui.popover', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('popover/examples/popover-custom-content.html',
    '<p>This is an example of a popover with a custom content template.</p>');
}]);
})();
