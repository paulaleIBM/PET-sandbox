/**
 *
 * Licensed Materials - Property of IBM
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
		"x1.ui.top-navigation.demo"
	]);
/**
 *
 * Licensed Materials - Property of IBM
 *
 * top-navigation.demo.module.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.top-navigation.demo", [
		"prism",
		"ui.bootstrap.tabs",
		"ui.bootstrap.tpls",
		"x1.ui.demo-generator",
		"x1.ui.top-navigation"
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

			$stateProvider.state("top-navigation", {
				url: "/top-navigation",
				templateUrl: "top-navigation/top-navigation.demo.html",
				controller: "x1.ui.top-navigation.demo"
			});

			$urlRouterProvider.otherwise("/top-navigation");
		}
	])
	.controller("x1.ui.top-navigation.demo", [
		"$scope", "x1.ui.top-navigation.constant", "$rootScope",
		function($scope, topNavConstant, $rootScope) {
			"use strict";

			$scope.events = [];

			$scope.emitHamburgerClick = function(){
				$rootScope.$broadcast(topNavConstant.EVENTS.hamburgerEmit);
			};

			$rootScope.$on(topNavConstant.EVENTS.hamburgerClick, function(event) {
				$scope.events.push("Event " + event.name + " captured!");
			});
			$rootScope.$on(topNavConstant.EVENTS.brandClick, function(event) {
				$scope.events.push("Event " + event.name + " captured!");
			});
			$rootScope.$on(topNavConstant.EVENTS.hamburgerEmit, function(event) {
				$scope.events.push("Event " + event.name + " captured!");
			});
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
  module = angular.module('x1.ui.top-navigation');
} catch (e) {
  module = angular.module('x1.ui.top-navigation', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('top-navigation/index.rtl.html',
    '<!DOCTYPE html><html ng-app="x1.ui.demo"><head><meta charset="utf-8"><title>IBM Commerce Product UI Top Navigation Demo</title><link rel="stylesheet" href="vendor/vendor.css"><link rel="stylesheet" href="../x1-ui-ng-top-navigation.css"><link rel="stylesheet" href="../x1-ui-ng-top-navigation.rtl.css"></head><body dir="rtl"><section ui-view="" role="main" class="container"></section><script type="text/javascript" src="vendor/vendor.js"></script><script type="text/javascript" src="../x1-ui-ng-top-navigation.js"></script><script type="text/javascript" src="top-navigation.demo.js"></script></body></html>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.top-navigation');
} catch (e) {
  module = angular.module('x1.ui.top-navigation', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('top-navigation/top-navigation.demo.html',
    '<x1-demo-generator doc-src="\'top-navigation/top-navigation.docs.html\'" repo-name="x1-ui-ng-top-navigation"><div class="bs-callout bs-callout-warning"><h4><strong>Accessibility notes</strong></h4><ul><li>In order to be <a href="http://w3-03.ibm.com/able/devtest/webnavmain.html">Navigable</a>, make sure to include the ability to skip over navigational links and Web page header information to get directly to the main content.<pre><code class="language-markup" prism="">&lt;a href=&quot;#main-content&quot; class=&quot;sr-only&quot;&gt;Skip to main content&lt;/a&gt;</code></pre></li><li>This component includes <code>&lt;header>&lt;/header></code> in it\'s template - <strong>do not</strong> include a header element in the transclude or as a sibling to this directive, or it will <strong>not</strong> be accessible.</li><li>In order to be <a href="http://w3-03.ibm.com/able/devtest/webkeyboard.html">Keyboard Accessible</a> for 3rd level nesting, use <code>ng-focus=""</code> and <code>ng-blur=""</code> on the anchor element to toggle <code>ng-class="{\n' +
    '					\'open\':hasFocus}"</code> on the list element - refer to <strong>Top Nav <i>without</i> Hamburger Icon</strong> demo.</li><li>Add <code>role="menu"</code> to all <code>&lt;ul&gt;&lt;/ul&gt;</code> elements.</li><li>Add <code>role="menuitem"</code> to all <code>&lt;li&gt;&lt;/li&gt;</code> elements.</li><li>Add <code>aria-hidden="true"</code> to all <code>.glyphicon</code> elements.</li></ul></div><div class="bs-callout bs-callout-info"><h4><strong>Inherit styles</strong></h4><p>In order to inherit styles properly for the navigation list(s), dropdowns, IBM logo, mobile menu, glyphicons, and breadcrumbs, follow the classes and element hierarchy in the demo code examples below.</p></div><ng-include src="\'top-navigation/examples/example1.demo.html\'"></ng-include><ng-include src="\'top-navigation/examples/example2.demo.html\'"></ng-include></x1-demo-generator>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.top-navigation');
} catch (e) {
  module = angular.module('x1.ui.top-navigation', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('top-navigation/top-navigation.docs.html',
    '<h3 class="page-header">Bower dependencies</h3><p>Refer to this component\'s gulpfile.js for the list of file paths (associated with the list below) to include in your application.</p><ul><li>angular</li><li>angular-bootstrap</li><li>angular-translate</li><li>angular-translate-loader-static-files</li><li>angular-sanitize</li><li>x1-ui-bootstrap</li></ul><h3 class="page-header">Attribute options for <code>&lt;x1-top-navigation&gt;</code></h3><table class="table table-condensed table-striped"><thead><tr><th>Property</th><th>Description</th><th>Required</th><th>Default value</th><th>Accepted values/type</th></tr></thead><tbody><tr><td>brand</td><td>Product name or trademark.</td><td>true</td><td>none</td><td>html string</td></tr><tr><td>brand-badge</td><td>Trailing badge styled text.</td><td>false</td><td>none</td><td>string</td></tr><tr><td>brand-href</td><td>The target URL for brand.</td><td>false</td><td>none</td><td>string</td></tr><tr><td>hamburger</td><td>Toggle hamburger/menu icon visibility.</td><td>false</td><td>false</td><td>boolean</td></tr><tr><td>is-hamburger-active</td><td>Sets hamburger/menu icon active state.</td><td>false</td><td>false</td><td>boolean</td></tr><tr><td>is-mobile</td><td>Enables responsive UX. Supports tablet view ONLY.</td><td>false</td><td>false</td><td>boolean</td></tr><tr><td>is-fixed</td><td>Positions the navbar fixed to the top.</td><td>false</td><td>false</td><td>boolean</td></tr></tbody></table><div class="bs-callout bs-callout-danger"><h4>Body padding required for is-fixed="true"</h4><p>The fixed navbar will overlay your other content, unless you add <code>padding</code> to the top of the <code>&lt;body&gt;</code>. Try out your own values or use our snippet below. Tip: By default, the navbar is 40px high.</p><div class="highlight"><pre>\n' +
    '			<code class="language-css" prism="">body { padding-top: 60px; }</code>\n' +
    '		</pre></div></div><h3 class="page-header">Events</h3><p>Include <code>x1.ui.top-navigation.constant</code> in your controller to access the events listed below.</p><table class="table table-condensed table-striped"><thead><tr><th>Constant</th><th>Name</th><th>Description</th></tr></thead><tbody><tr><td>[yourTopNavConstantRef].EVENTS.hamburgerClick</td><td>"x1.ui.top-navigation.hamburger.click"</td><td>Event that will <code>$rootScope.$broadcast</code> after a click action occurs on the hamburger glyphicon.</td></tr><tr><td>[yourTopNavConstantRef].EVENTS.brandClick</td><td>"x1.ui.top-navigation.brand.click"</td><td>Event that will <code>$rootScope.$broadcast</code> after a click action occurs on the brand name.</td></tr><tr><td>[yourTopNavConstantRef].EVENTS.hamburgerEmit</td><td>"x1.ui.top-navigation.hamburger.emit"</td><td>Emit this to <code>$rootScope</code> to trigger the hamburger button without clicking it.</td></tr></tbody></table><h3 class="page-header">Top navigation template</h3><div class="highlight"><pre>\n' +
    '		<code class="language-markup" prism="">&lt;header role=&quot;banner&quot; aria-labelledby=&quot;x1TopNavBrand&quot;\n' +
    '		class=&quot;x1-ui-top-navigation navbar navbar-inverse&quot;\n' +
    '		ng-class=&quot;{\'navbar-fixed-top\':isFixed}&quot;&gt;\n' +
    '	&lt;div class=&quot;container-fluid&quot;&gt;\n' +
    '		&lt;div ng-if=&quot;hamburger || brand&quot; class=&quot;navbar-header&quot;&gt;\n' +
    '			&lt;button ng-if=&quot;hamburger&quot; type=&quot;button&quot; role=&quot;button&quot;\n' +
    '					ng-click=&quot;broadcastHamburgerClick()&quot;\n' +
    '					class=&quot;btn-hamburger btn btn-link btn-sm pull-left&quot;\n' +
    '					ng-class=&quot;{\'active\':hamburgerClicked}&quot;\n' +
    '					aria-label=&quot;{{<span>\'x1UiNgTopNavigation.ARIA.MENU_BTN\'</span> | translate}}&quot;&gt;\n' +
    '				&lt;span class=&quot;sr-only&quot; translate=&quot;x1UiNgTopNavigation.MENU_BTN_SR_TEXT&quot;&gt;&lt;/span&gt;\n' +
    '	&lt;span class=&quot;glyphicon glyphicon-md glyphicon-menu-hamburger&quot;\n' +
    '			title=&quot;{{<span>\'x1UiNgTopNavigation.TITLE.MENU_BTN\'</span> | translate}}&quot;\n' +
    '			aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;\n' +
    '			&lt;/button&gt;\n' +
    '			&lt;h1 id=&quot;x1TopNavBrand&quot; class=&quot;navbar-brand&quot; ng-click=&quot;broadcastBrandClick()&quot;\n' +
    '					ng-class=&quot;{\'no-hamburger\': !hamburger}&quot;&gt;\n' +
    '				&lt;a ng-if=&quot;brand&quot; ng-href=&quot;{{<span>brandHref</span> ? brandHref : \'#\'}}&quot; ng-bind-html=&quot;brand&quot;&gt;&lt;/a&gt;\n' +
    '				&lt;span ng-if=&quot;brandBadge&quot; class=&quot;badge&quot;&gt;{{<span>brandBadge</span>}}&lt;/span&gt;\n' +
    '			&lt;/h1&gt;\n' +
    '			&lt;button ng-if=&quot;isMobile&quot; type=&quot;button&quot; role=&quot;button&quot;\n' +
    '					class=&quot;btn-mobile navbar-text pull-right navbar-toggle&quot;\n' +
    '					ng-class=&quot;{\'collapsed\': collapsed}&quot; aria-expanded=&quot;{{<span>!collapsed</span>}}&quot;\n' +
    '					ng-click=&quot;toggleMobileMenu()&quot; aria-label=&quot;{{<span>\'x1UiNgTopNavigation.ARIA.MOBILE_BTN\'</span> | translate}}&quot;&gt;\n' +
    '				&lt;span class=&quot;sr-only&quot; translate=&quot;x1UiNgTopNavigation.MOBILE_MENU_BTN_SR_TEXT&quot;&gt;&lt;/span&gt;\n' +
    '	&lt;span ng-if=&quot;!hamburger&quot; aria-hidden=&quot;true&quot;\n' +
    '			title=&quot;{{<span>\'x1UiNgTopNavigation.TITLE.MOBILE_BTN\'</span> | translate}}&quot;\n' +
    '			class=&quot;glyphicon glyphicon-md glyphicon-menu-hamburger&quot;&gt;&lt;/span&gt;\n' +
    '	&lt;span ng-if=&quot;collapsed &amp;&amp; hamburger&quot;\n' +
    '			translate=&quot;x1UiNgTopNavigation.MOBILE_MENU_EXPAND_TEXT&quot;&gt;&lt;/span&gt;\n' +
    '	&lt;span ng-if=&quot;!collapsed &amp;&amp; hamburger&quot;\n' +
    '			translate=&quot;x1UiNgTopNavigation.MOBILE_MENU_COLLAPSE_TEXT&quot;&gt;&lt;/span&gt;\n' +
    '			&lt;/button&gt;\n' +
    '		&lt;/div&gt;\n' +
    '		&lt;nav ng-transclude class=&quot;collapse navbar-collapse&quot; ng-class=&quot;{\'in\': !collapsed}&quot;\n' +
    '				aria-expanded=&quot;{{<span>!collapsed</span>}}&quot; role=&quot;navigation&quot;\n' +
    '				aria-label=&quot;{{<span>\'x1UiNgTopNavigation.ARIA.NAV\'</span> | translate}}&quot;&gt;&lt;/nav&gt;\n' +
    '	&lt;/div&gt;\n' +
    '&lt;/header&gt;</code>\n' +
    '	</pre></div><h3 class="page-header">Internationalization variables</h3><div class="highlight"><pre>\n' +
    '		<code prism="" class="language-javascript">{\n' +
    '	&quot;x1UiNgTopNavigation&quot;: {\n' +
    '		&quot;MENU_BTN_SR_TEXT&quot;: &quot;Toggle primary navigation&quot;,\n' +
    '		&quot;MOBILE_MENU_BTN_SR_TEXT&quot;: &quot;Toggle navigation&quot;,\n' +
    '		&quot;MOBILE_MENU_EXPAND_TEXT&quot;: &quot;More&quot;,\n' +
    '		&quot;MOBILE_MENU_COLLAPSE_TEXT&quot;: &quot;Less&quot;,\n' +
    '		&quot;TITLE&quot;: {\n' +
    '			&quot;MENU_BTN&quot;: &quot;Primary navigation menu&quot;,\n' +
    '			&quot;MOBILE_BTN&quot;: &quot;Navigation menu&quot;\n' +
    '		},\n' +
    '		&quot;ARIA&quot;: {\n' +
    '			&quot;MENU_BTN&quot;: &quot;toggle primary navigation menu&quot;,\n' +
    '			&quot;BREADCRUMBS&quot;: &quot;breadcrumbs&quot;,\n' +
    '			&quot;MOBILE_BTN&quot;: &quot;collapsible navigation menu&quot;,\n' +
    '			&quot;NAV&quot;: &quot;navigation&quot;\n' +
    '		}\n' +
    '	}\n' +
    '}</code>\n' +
    '	</pre></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.top-navigation');
} catch (e) {
  module = angular.module('x1.ui.top-navigation', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('top-navigation/examples/example1.demo.html',
    '<h3 class="page-header">With hamburger icon & badge</h3><p>Click on the hamburger icon or brand name to demonstrate an event capture.</p><div class="bs-example"><button class="btn btn-secondary" ng-click="emitHamburgerClick()">Emit <code>x1.ui.top-navigation.hamburger.emit</code> Event</button><x1-top-navigation brand="{{\'x1UiNgTopNavigationDemo.IBM\' | translate}} <strong>{{\'x1UiNgTopNavigationDemo.TITLE\' | translate}}</strong>" brand-href="#/top-navigation" hamburger="true" is-mobile="true" brand-badge="{{\'x1UiNgTopNavigationDemo.EXAMPLE1.BADGE\' | translate}}"><h2 id="x1TopNavSecondary" class="sr-only" translate="x1UiNgTopNavigationDemo.NAV2_SR_TEXT"></h2><ul class="nav navbar-nav navbar-right" role="menu" aria-labelledby="x1TopNavSecondary"><li role="menuitem"><a href=""><span class="glyphicon glyphicon-md glyphicon-calendar pull-left" aria-hidden="true"></span> <span translate="x1UiNgTopNavigationDemo.EXAMPLE1.CALENDAR"></span></a></li><li role="menuitem"><a href=""><span class="glyphicon glyphicon-md glyphicon-envelope pull-left" aria-hidden="true"></span> <span translate="x1UiNgTopNavigationDemo.EXAMPLE1.MESSAGES"></span></a></li><li role="menuitem" class="dropdown" dropdown=""><a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" dropdown-toggle=""><span class="glyphicon glyphicon-md glyphicon-user pull-left" aria-hidden="true"></span> <span id="userDropdown" translate="x1UiNgTopNavigationDemo.USER"></span> <span class="glyphicon glyphicon-chevron-down pull-right" aria-hidden="true"></span></a><ul class="dropdown-menu" role="menu" aria-labelledby="userDropdown"><li role="menuitem"><a href="" translate="x1UiNgTopNavigationDemo.PROFILE"></a></li><li role="menuitem"><a href="" translate="x1UiNgTopNavigationDemo.LOGOUT"></a></li></ul></li><li role="menuitem"><a href=""><span class="glyphicon glyphicon-md glyphicon-question-circle pull-left" aria-hidden="true"></span> <span translate="x1UiNgTopNavigationDemo.HELP"></span></a></li><li role="menuitem"><span class="sr-only" translate="x1UiNgTopNavigationDemo.IBM"></span> <span ng-include="\'images/top-nav-ibm-logo.svg\'" class="navbar-brand" title="{{\'x1UiNgTopNavigationDemo.IBM\' | translate}}"></span></li></ul></x1-top-navigation><br><pre ng-repeat="event in events track by $index">{{event}}</pre></div><tabset><tab heading="HTML"><div class="highlight"><pre>\n' +
    '				<code class="language-markup" prism="">&lt;button class=&quot;btn btn-secondary&quot; ng-click=&quot;emitHamburgerClick()&quot;&gt;Emit &lt;code&gt;x1.ui.top-navigation.hamburger.emit&lt;/code&gt; Event&lt;/button&gt;\n' +
    '&lt;x1-top-navigation brand=&quot;{{<span>\'x1UiNgTopNavigationDemo.IBM\'</span> | translate}} &lt;strong&gt;{{<span>\'x1UiNgTopNavigationDemo.TITLE\'</span> | translate}}&lt;/strong&gt;&quot;\n' +
    '		brand-href=&quot;#/top-navigation&quot; hamburger=&quot;true&quot; is-mobile=&quot;true&quot;\n' +
    '		brand-badge=&quot;{{<span>\'x1UiNgTopNavigationDemo.EXAMPLE1.BADGE\'</span> | translate}}&quot;&gt;\n' +
    '	&lt;h2 id=&quot;x1TopNavSecondary&quot; class=&quot;sr-only&quot; translate=&quot;x1UiNgTopNavigationDemo.NAV2_SR_TEXT&quot;&gt;&lt;/h2&gt;\n' +
    '	&lt;ul class=&quot;nav navbar-nav navbar-right&quot; role=&quot;menu&quot;\n' +
    '			aria-labelledby=&quot;x1TopNavSecondary&quot;&gt;\n' +
    '		&lt;li role=&quot;menuitem&quot;&gt;&lt;a href&gt;\n' +
    '			&lt;span class=&quot;glyphicon glyphicon-md glyphicon-calendar pull-left&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;\n' +
    '			&lt;span translate=&quot;x1UiNgTopNavigationDemo.EXAMPLE1.CALENDAR&quot;&gt;&lt;/span&gt;\n' +
    '		&lt;/a&gt;&lt;/li&gt;\n' +
    '		&lt;li role=&quot;menuitem&quot;&gt;&lt;a href&gt;\n' +
    '			&lt;span class=&quot;glyphicon glyphicon-md glyphicon-envelope pull-left&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;\n' +
    '			&lt;span translate=&quot;x1UiNgTopNavigationDemo.EXAMPLE1.MESSAGES&quot;&gt;&lt;/span&gt;\n' +
    '		&lt;/a&gt;&lt;/li&gt;\n' +
    '		&lt;li role=&quot;menuitem&quot; class=&quot;dropdown&quot; dropdown&gt;\n' +
    '			&lt;a href class=&quot;dropdown-toggle&quot; data-toggle=&quot;dropdown&quot; role=&quot;button&quot;\n' +
    '					aria-haspopup=&quot;true&quot; aria-expanded=&quot;false&quot; dropdown-toggle&gt;\n' +
    '				&lt;span class=&quot;glyphicon glyphicon-md glyphicon-user pull-left&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;\n' +
    '				&lt;span id=&quot;userDropdown&quot; translate=&quot;x1UiNgTopNavigationDemo.USER&quot;&gt;&lt;/span&gt;\n' +
    '				&lt;span class=&quot;glyphicon glyphicon-chevron-down pull-right&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;\n' +
    '			&lt;/a&gt;\n' +
    '			&lt;ul class=&quot;dropdown-menu&quot; role=&quot;menu&quot; aria-labelledby=&quot;userDropdown&quot;&gt;\n' +
    '				&lt;li role=&quot;menuitem&quot;&gt;&lt;a href translate=&quot;x1UiNgTopNavigationDemo.PROFILE&quot;&gt;&lt;/a&gt;&lt;/li&gt;\n' +
    '				&lt;li role=&quot;menuitem&quot;&gt;&lt;a href translate=&quot;x1UiNgTopNavigationDemo.LOGOUT&quot;&gt;&lt;/a&gt;&lt;/li&gt;\n' +
    '			&lt;/ul&gt;\n' +
    '		&lt;/li&gt;\n' +
    '		&lt;li role=&quot;menuitem&quot;&gt;&lt;a href&gt;\n' +
    '			&lt;span class=&quot;glyphicon glyphicon-md glyphicon-question-circle pull-left&quot;\n' +
    '				aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;\n' +
    '			&lt;span translate=&quot;x1UiNgTopNavigationDemo.HELP&quot;&gt;&lt;/span&gt;\n' +
    '		&lt;/a&gt;&lt;/li&gt;\n' +
    '		&lt;li role=&quot;menuitem&quot;&gt;\n' +
    '			&lt;span class=&quot;sr-only&quot; translate=&quot;x1UiNgTopNavigationDemo.IBM&quot;&gt;&lt;/span&gt;\n' +
    '			&lt;span ng-include=&quot;\'images/top-nav-ibm-logo.svg\'&quot; class=&quot;navbar-brand&quot;\n' +
    '				title=&quot;{{<span>\'x1UiNgTopNavigationDemo.IBM\'</span> | translate}}&quot;&gt;&lt;/span&gt;\n' +
    '		&lt;/li&gt;\n' +
    '	&lt;/ul&gt;\n' +
    '&lt;/x1-top-navigation&gt;\n' +
    '&lt;br/&gt;\n' +
    '&lt;pre ng-repeat=&quot;event in events track by $index&quot;&gt;{{<span>event</span>}}&lt;/pre&gt;</code>\n' +
    '			</pre></div></tab><tab heading="JS"><div class="highlight"><pre>\n' +
    '				<code class="language-js" prism="">angular\n' +
    '	.module("x1.ui.top-navigation.demo", [\n' +
    '		"prism",\n' +
    '		"ui.bootstrap.tabs",\n' +
    '		"ui.bootstrap.tpls",\n' +
    '		"x1.ui.demo-generator",\n' +
    '		"x1.ui.top-navigation"\n' +
    '	])\n' +
    '	.controller("x1.ui.top-navigation.demo", [\n' +
    '		"$scope", "x1.ui.top-navigation.constant", "$rootScope",\n' +
    '		function($scope, topNavConstant, $rootScope) {\n' +
    '			"use strict";\n' +
    '\n' +
    '			$scope.events = [];\n' +
    '\n' +
    '			$scope.emitHamburgerClick = function(){\n' +
    '				$rootScope.$broadcast(topNavConstant.EVENTS.hamburgerEmit);\n' +
    '			};\n' +
    '\n' +
    '			$rootScope.$on(topNavConstant.EVENTS.hamburgerClick, function(event) {\n' +
    '				$scope.events.push("Event " + event.name + " captured!");\n' +
    '			});\n' +
    '			$rootScope.$on(topNavConstant.EVENTS.brandClick, function(event) {\n' +
    '				$scope.events.push("Event " + event.name + " captured!");\n' +
    '			});\n' +
    '			$rootScope.$on(topNavConstant.EVENTS.hamburgerEmit, function(event) {\n' +
    '				$scope.events.push("Event " + event.name + " captured!");\n' +
    '			});\n' +
    '		}\n' +
    '	]);</code>\n' +
    '			</pre></div></tab></tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.top-navigation');
} catch (e) {
  module = angular.module('x1.ui.top-navigation', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('top-navigation/examples/example2.demo.html',
    '<h3 class="page-header">Without hamburger icon</h3><div class="bs-example"><x1-top-navigation brand="{{\'x1UiNgTopNavigationDemo.IBM\' | translate}} <strong>{{\'x1UiNgTopNavigationDemo.TITLE\' | translate}}" brand-href="#/top-navigation" is-mobile="true"><h2 id="x1TopNavPrimary" class="sr-only" translate="x1UiNgTopNavigationDemo.NAV1_SR_TEXT"></h2><ul class="nav navbar-nav" role="menu" aria-labelledby="x1TopNavPrimary"><li role="menuitem"><a href="" translate="x1UiNgTopNavigationDemo.DASH"></a></li><li role="menuitem"><a href="" translate="x1UiNgTopNavigationDemo.REPORTS"></a></li><li role="menuitem" class="dropdown" dropdown=""><a id="analyzeDropdown" href="" class="dropdown-toggle" data-toggle="dropdown" role="button" dropdown-toggle="" aria-haspopup="true" aria-expanded="false" translate="x1UiNgTopNavigationDemo.ANALYZE"></a><ul class="dropdown-menu" role="menu" aria-labelledby="analyzeDropdown"><li role="menuitem"><a href="" translate="x1UiNgTopNavigationDemo.EXAMPLE2.RB"></a></li><li role="menuitem"><a href="" translate="x1UiNgTopNavigationDemo.EXAMPLE2.MOVERS"></a></li><li role="menuitem"><a href="" translate="x1UiNgTopNavigationDemo.EXAMPLE2.EVENTS"></a></li><li role="separator" class="divider" aria-label="{{\'x1UiNgTopNavigationDemo.ARIA.DIVIDER\' | translate}}"></li><li role="menuitem" class="dropdown" dropdown="" ng-class="{\'open\':hasFocus}" ng-mouseenter="hasFocus=true" ng-mouseleave="hasFocus=false"><a id="segmentsDropdown" href="" aria-haspopup="true" ng-focus="hasFocus=true" ng-blur="hasFocus=false"><span class="pull-left" translate="x1UiNgTopNavigationDemo.EXAMPLE2.SEGMENTS"></span> <span class="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span></a><ul class="dropdown-menu" role="menu" aria-labelledby="segmentsDropdown"><li role="menuitem"><a href="" ng-focus="hasFocus=true" ng-blur="hasFocus=false" translate="x1UiNgTopNavigationDemo.EXAMPLE2.MANAGE"></a></li></ul></li></ul></li><li role="menuitem"><a href="" translate="x1UiNgTopNavigationDemo.CONFIG"></a></li></ul><h2 id="x1TopNavSecondary" class="sr-only" translate="x1UiNgTopNavigationDemo.NAV2_SR_TEXT"></h2><ul class="nav navbar-nav navbar-right" role="menu" aria-labelledby="x1TopNavSecondary"><li role="menuitem"><a href=""><span class="glyphicon glyphicon-md glyphicon-user pull-left" aria-hidden="true"></span> <span translate="x1UiNgTopNavigationDemo.USER"></span></a></li><li role="menuitem"><a href=""><span class="glyphicon glyphicon-md glyphicon-question-circle pull-left" aria-hidden="true"></span> <span translate="x1UiNgTopNavigationDemo.HELP"></span></a></li><li role="menuitem"><span class="sr-only" translate="x1UiNgTopNavigationDemo.IBM"></span> <span ng-include="\'images/top-nav-ibm-logo.svg\'" class="navbar-brand" title="{{\'x1UiNgTopNavigationDemo.IBM\' | translate}}"></span></li></ul></x1-top-navigation></div><div class="highlight"><pre>\n' +
    '		<code class="language-markup" prism="">&lt;x1-top-navigation brand=&quot;{{<span>\'x1UiNgTopNavigationDemo.IBM\'</span> | translate}} &lt;strong&gt;{{<span>\'x1UiNgTopNavigationDemo.TITLE\'</span> | translate}}&quot;\n' +
    '		brand-href=&quot;#/top-navigation&quot; is-mobile=&quot;true&quot;&gt;\n' +
    '	&lt;h2 id=&quot;x1TopNavPrimary&quot; class=&quot;sr-only&quot; translate=&quot;x1UiNgTopNavigationDemo.NAV1_SR_TEXT&quot;&gt;&lt;/h2&gt;\n' +
    '	&lt;ul class=&quot;nav navbar-nav&quot; role=&quot;menu&quot; aria-labelledby=&quot;x1TopNavPrimary&quot;&gt;\n' +
    '		&lt;li role=&quot;menuitem&quot;&gt;&lt;a href translate=&quot;x1UiNgTopNavigationDemo.DASH&quot;&gt;&lt;/a&gt;&lt;/li&gt;\n' +
    '		&lt;li role=&quot;menuitem&quot;&gt;&lt;a href translate=&quot;x1UiNgTopNavigationDemo.REPORTS&quot;&gt;&lt;/a&gt;&lt;/li&gt;\n' +
    '		&lt;li role=&quot;menuitem&quot; class=&quot;dropdown&quot; dropdown&gt;\n' +
    '			&lt;a id=&quot;analyzeDropdown&quot; href class=&quot;dropdown-toggle&quot;\n' +
    '					data-toggle=&quot;dropdown&quot; role=&quot;button&quot; dropdown-toggle\n' +
    '					aria-haspopup=&quot;true&quot; aria-expanded=&quot;false&quot;\n' +
    '					translate=&quot;x1UiNgTopNavigationDemo.ANALYZE&quot;&gt;&lt;/a&gt;\n' +
    '			&lt;ul class=&quot;dropdown-menu&quot; role=&quot;menu&quot; aria-labelledby=&quot;analyzeDropdown&quot;&gt;\n' +
    '				&lt;li role=&quot;menuitem&quot;&gt;&lt;a href translate=&quot;x1UiNgTopNavigationDemo.EXAMPLE2.RB&quot;&gt;&lt;/a&gt;&lt;/li&gt;\n' +
    '				&lt;li role=&quot;menuitem&quot;&gt;&lt;a href translate=&quot;x1UiNgTopNavigationDemo.EXAMPLE2.MOVERS&quot;&gt;&lt;/a&gt;&lt;/li&gt;\n' +
    '				&lt;li role=&quot;menuitem&quot;&gt;&lt;a href translate=&quot;x1UiNgTopNavigationDemo.EXAMPLE2.EVENTS&quot;&gt;&lt;/a&gt;&lt;/li&gt;\n' +
    '				&lt;li role=&quot;separator&quot; class=&quot;divider&quot;\n' +
    '						aria-label=&quot;{{<span>\'x1UiNgTopNavigationDemo.ARIA.DIVIDER\'</span> | translate}}&quot;&gt;&lt;/li&gt;\n' +
    '				&lt;li role=&quot;menuitem&quot; class=&quot;dropdown&quot; dropdown ng-class=&quot;{\'open\':hasFocus}&quot;\n' +
    '						ng-mouseenter=&quot;hasFocus=true&quot; ng-mouseleave=&quot;hasFocus=false&quot;&gt;\n' +
    '					&lt;a id=&quot;segmentsDropdown&quot; href aria-haspopup=&quot;true&quot;\n' +
    '							ng-focus=&quot;hasFocus=true&quot; ng-blur=&quot;hasFocus=false&quot;&gt;\n' +
    '						&lt;span class=&quot;pull-left&quot; translate=&quot;x1UiNgTopNavigationDemo.EXAMPLE2.SEGMENTS&quot;&gt;&lt;/span&gt;\n' +
    '						&lt;span class=&quot;glyphicon glyphicon-chevron-right pull-right&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;\n' +
    '					&lt;/a&gt;\n' +
    '					&lt;ul class=&quot;dropdown-menu&quot; role=&quot;menu&quot; aria-labelledby=&quot;segmentsDropdown&quot;&gt;\n' +
    '						&lt;li role=&quot;menuitem&quot;&gt;&lt;a href ng-focus=&quot;hasFocus=true&quot; ng-blur=&quot;hasFocus=false&quot;\n' +
    '								translate=&quot;x1UiNgTopNavigationDemo.EXAMPLE2.MANAGE&quot;&gt;&lt;/a&gt;&lt;/li&gt;\n' +
    '					&lt;/ul&gt;\n' +
    '				&lt;/li&gt;\n' +
    '			&lt;/ul&gt;\n' +
    '		&lt;/li&gt;\n' +
    '		&lt;li role=&quot;menuitem&quot;&gt;&lt;a href=&quot;&quot; translate=&quot;x1UiNgTopNavigationDemo.CONFIG&quot;&gt;&lt;/a&gt;&lt;/li&gt;\n' +
    '	&lt;/ul&gt;\n' +
    '	&lt;h2 id=&quot;x1TopNavSecondary&quot; class=&quot;sr-only&quot; translate=&quot;x1UiNgTopNavigationDemo.NAV2_SR_TEXT&quot;&gt;&lt;/h2&gt;\n' +
    '	&lt;ul class=&quot;nav navbar-nav navbar-right&quot; role=&quot;menu&quot; aria-labelledby=&quot;x1TopNavSecondary&quot;&gt;\n' +
    '		&lt;li role=&quot;menuitem&quot;&gt;&lt;a href&gt;\n' +
    '			&lt;span class=&quot;glyphicon glyphicon-md glyphicon-user pull-left&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;\n' +
    '			&lt;span translate=&quot;x1UiNgTopNavigationDemo.USER&quot;&gt;&lt;/span&gt;\n' +
    '		&lt;/a&gt;&lt;/li&gt;\n' +
    '		&lt;li role=&quot;menuitem&quot;&gt;&lt;a href&gt;\n' +
    '			&lt;span class=&quot;glyphicon glyphicon-md glyphicon-question-circle pull-left&quot;\n' +
    '				aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;\n' +
    '			&lt;span translate=&quot;x1UiNgTopNavigationDemo.HELP&quot;&gt;&lt;/span&gt;\n' +
    '		&lt;/a&gt;&lt;/li&gt;\n' +
    '		&lt;li role=&quot;menuitem&quot;&gt;\n' +
    '			&lt;span class=&quot;sr-only&quot; translate=&quot;x1UiNgTopNavigationDemo.IBM&quot;&gt;&lt;/span&gt;\n' +
    '			&lt;span ng-include=&quot;\'images/top-nav-ibm-logo.svg\'&quot; class=&quot;navbar-brand&quot;\n' +
    '				title=&quot;{{<span>\'x1UiNgTopNavigationDemo.IBM\'</span> | translate}}&quot;&gt;&lt;/span&gt;\n' +
    '		&lt;/li&gt;\n' +
    '	&lt;/ul&gt;\n' +
    '&lt;/x1-top-navigation&gt;</code>\n' +
    '	</pre></div>');
}]);
})();
