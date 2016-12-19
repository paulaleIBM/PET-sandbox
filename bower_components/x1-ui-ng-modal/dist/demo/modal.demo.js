angular
	.module("x1.ui.demo", [
		"ui.router",
		"x1.ui.modal.demo"
	])
	.config(["$urlRouterProvider", "$translateProvider",
		function($urlRouterProvider, $translateProvider) {
			"use strict";

			$urlRouterProvider.otherwise("/modal");

			// Register a loader for the static files
			// So, the module will search missing translation tables under the specified urls.
			// Those urls are [prefix][langKey][suffix].
			$translateProvider.useStaticFilesLoader({
				prefix: "l10n/",
				suffix: ".json"
			});

			// Tell the module what language to use by default
			$translateProvider.preferredLanguage("en_US");
		}
	]);
angular
	.module("x1.ui.modal.demo", [
		"prism",
		"x1.ui.demo-generator",
		"x1.ui.modal"
	])
	.config(["$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider.state("modal", {
				url: "/modal",
				templateUrl: "modal/modal.demo.html",
				controller: "modalDemoCtrl"
			});
		}
	])
	.controller("modalDemoCtrl", ["$scope", "x1Modal",
		function($scope, modal) {
			"use strict";

			/**
			 * open modal function
			 */
			var data;
			$scope.openModal = function(option) {
				modal.show(option).then(function(result) {
					data = result;
				});
			};

			/**
			 * Define simple modal
			 */
			$scope.simple = {
				options: {
					headerText: "Minimum Setup Modal",
					actionButtonText: "Done!",
					showCloseButton: false
				},
				settings: {
					size: "sm"
				},
				data: {
					text: "This text, the dialog type, and headerText are all you have to set."
				}
			};

			/**
			 * Define size modals
			 */
			$scope.xLargeModal = {
				options: {
					headerText: "Extra Large Modal",
					showCloseButton: true
				},
				settings: {
					contentTemplate: "modal/examples/modal-form.html",
					size: "xl"
				}
			};
			$scope.largeModal = {
				options: {
					headerText: "Large Modal",
					showCloseButton: true
				},
				settings: {
					contentTemplate: "modal/examples/modal-form.html",
					size: "lg"
				}
			};
			$scope.mediumModal = {
				options: {
					headerText: "Medium Modal",
					showCloseButton: true
				},
				settings: {
					contentTemplate: "modal/examples/modal-sample.html",
					size: "md"
				}
			};
            $scope.smallModal = {
                options: {
                    headerText: "Small Modal",
                    showCloseButton: true
                },
                settings: {
                    contentTemplate: "modal/examples/modal-sample.html",
                    size: "sm"
                }
            };

			/**
			 * Define contextual message modals
			 */
			$scope.info = {
				options: {
					headerText: "Information",
					actionButtonText: "Close",
					showCloseButton: false
				},
				settings: {
					contentTemplate: "modal/examples/modal-prompt.html",
					size: "sm",
					type: "information"
				},
				data: {
					text: "New report data is available."
				}
			};
			$scope.warning = {
				options: {
					headerText: "Warning",
					actionButtonText: "Close",
					showCloseButton: false
				},
				settings: {
					contentTemplate: "modal/examples/modal-prompt.html",
					size: "sm",
					type: "warning"
				},
                data: {
                    text: "Your battery is running low. Recharge it soon."
                }
			};
			$scope.error = {
				options: {
					headerText: "Error",
					actionButtonText: "Close",
					showCloseButton: false
				},
				settings: {
					contentTemplate: "modal/examples/modal-prompt.html",
					size: "sm",
					type: "error"
				},
				data: {
					text: "The connection was lost.  Try to log in again."
				}
			};
			$scope.confirmation = {
				options: {
					headerText: "Confirmation",
					actionButtonText: "Delete",
					showCloseButton: true
				},
				settings: {
					contentTemplate: "modal/examples/modal-prompt.html",
					size: "sm",
					type: "confirmation"
				},
				data: {
					text: "Do you want to delete this file?",
					file: "STYLE_GUIDE.psd"
				}
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
	}]);
(function(module) {
try {
  module = angular.module('x1.ui.modal');
} catch (e) {
  module = angular.module('x1.ui.modal', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modal/index.rtl.html',
    '<!DOCTYPE html>\n' +
    '<html ng-app="x1.ui.demo">\n' +
    '<head>\n' +
    '	<title translate="x1UiNgModalDemo.TITLE"></title>\n' +
    '	<link rel="stylesheet" href="vendor/vendor.css">\n' +
    '	<link rel="stylesheet" href="../x1-ui-ng-modal.css">\n' +
    '	<link rel="stylesheet" href="../x1-ui-ng-modal.rtl.css">\n' +
    '</head>\n' +
    '<body dir="rtl">\n' +
    '<section ui-view class="container"></section>\n' +
    '<script type="text/javascript" src="vendor/vendor.js"></script>\n' +
    '<script type="text/javascript" src="../x1-ui-ng-modal.js"></script>\n' +
    '<script type="text/javascript" src="modal.demo.js"></script>\n' +
    '</body>\n' +
    '</html>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.modal');
} catch (e) {
  module = angular.module('x1.ui.modal', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modal/modal.demo.html',
    '<x1-demo-generator doc-src="\'modal/modal.doc.html\'" repo-name="x1-ui-ng-modal">\n' +
    '	<ng-include src="\'modal/examples/simple.demo.html\'"></ng-include>\n' +
    '	<ng-include src="\'modal/examples/sizes.demo.html\'"></ng-include>\n' +
    '	<ng-include src="\'modal/examples/contextual.demo.html\'"></ng-include>\n' +
    '</x1-demo-generator>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.modal');
} catch (e) {
  module = angular.module('x1.ui.modal', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modal/modal.doc.html',
    '<h3 class="page-header">Bower dependencies</h3>\n' +
    '<ul>\n' +
    '	<li>angular</li>\n' +
    '	<li>angular-translate</li>\n' +
    '	<li>angular-translate-loader-static-files</li>\n' +
    '	<li>x1-ui-bootstrap</li>\n' +
    '</ul>\n' +
    '\n' +
    '<h3 class="page-header">Component options</h3>\n' +
    '<table class="table table-condensed table-striped">\n' +
    '	<thead>\n' +
    '	<tr>\n' +
    '		<th>Property</th>\n' +
    '		<th>Description</th>\n' +
    '		<th>Required</th>\n' +
    '		<th>Default Value</th>\n' +
    '		<th>Accepted Values/Type</th>\n' +
    '	</tr>\n' +
    '	</thead>\n' +
    '	<tbody>\n' +
    '	<tr>\n' +
    '		<td>templateUrl</td>\n' +
    '		<td>A path to a template representing modal\'s content (headers, footers, buttons, everything)</td>\n' +
    '		<td>false</td>\n' +
    '		<td>none</td>\n' +
    '		<td>string</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>template</td>\n' +
    '		<td>Inline template representing the modal\'s content</td>\n' +
    '		<td>false</td>\n' +
    '		<td>none</td>\n' +
    '		<td>string</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>contentTemplate</td>\n' +
    '		<td>A path to a template representing content inside modal (just the modal body)</td>\n' +
    '		<td>*true</td>\n' +
    '		<td>true</td>\n' +
    '		<td>string</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>size</td>\n' +
    '		<td>Size of modal window</td>\n' +
    '		<td>none</td>\n' +
    '		<td>md</td>\n' +
    '		<td>sm(320px), md(640px), lg(900px), xl(980px)</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>windowClass</td>\n' +
    '		<td>additional CSS class(es) to be added to a modal window template</td>\n' +
    '		<td>false</td>\n' +
    '		<td>x1-ui-ng-modal</td>\n' +
    '		<td>-</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>type</td>\n' +
    '		<td>Type of modal window</td>\n' +
    '		<td>false</td>\n' +
    '		<td>default</td>\n' +
    '		<td>default, success, information, error, warning</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>backdrop</td>\n' +
    '		<td>Сontrols presence of a backdrop</td>\n' +
    '		<td>false</td>\n' +
    '		<td>true</td>\n' +
    '		<td>true, false, \'static\' - backdrop is present but modal window is not closed when clicking outside of the modal window.</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>keyboard</td>\n' +
    '		<td>Indicates whether the dialog should be closable by hitting the ESC key, defaults\n' +
    '			to true</td>\n' +
    '		<td>false</td>\n' +
    '		<td>true</td>\n' +
    '		<td>boolean</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>modalFade</td>\n' +
    '		<td>Fade for modal window</td>\n' +
    '		<td>false</td>\n' +
    '		<td>true</td>\n' +
    '		<td>boolean</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>showCloseButton</td>\n' +
    '		<td>Defines if close button will be shown or not</td>\n' +
    '		<td>false</td>\n' +
    '		<td>true</td>\n' +
    '		<td>boolean</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>showActionButton</td>\n' +
    '		<td>Defines if ok button will be shown or not</td>\n' +
    '		<td>false</td>\n' +
    '		<td>true</td>\n' +
    '		<td>boolean</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>additionalButtons</td>\n' +
    '		<td>Defines the array of additional buttons which will be displayed except to\n' +
    '			\'ok\' and \'cancel\' buttons. Every item of array must have such\n' +
    '			properties as \'elementClass\', \'disableElement\', \'text\' and \'eventName\'.</td>\n' +
    '		<td>false</td>\n' +
    '		<td>[]</td>\n' +
    '		<td>array</td>\n' +
    '	</tr>\n' +
    '	</tbody>\n' +
    '</table>\n' +
    '\n' +
    '<h3 class="page-header">Service methods:</h3>\n' +
    '<p>dismissAll - this call will close all the currently opened modals.</p>\n' +
    '\n' +
    '<h3 class="page-header">Defaults</h3>\n' +
    '<tabset>\n' +
    '	<tab heading="Template">\n' +
    '		<div class="highlight">\n' +
    '			<pre>\n' +
    '				<code class="language-markup" prism>&lt;p translate=&quot;{{<span>data.text</span>}}&quot;&gt;&lt;/p&gt;</code>\n' +
    '			</pre>\n' +
    '		</div>\n' +
    '	</tab>\n' +
    '	<tab heading="Options">\n' +
    '		<div class="highlight">\n' +
    '			<pre>\n' +
    '				<code class="language-javascript" prism>angular\n' +
    '	.module("x1.ui.modal")\n' +
    '	.value("options", {\n' +
    '		actionButtonText: "x1UiNgModal.BTN.primary",\n' +
    '		closeButtonText: "x1UiNgModal.BTN.secondary",\n' +
    '		headerText: "x1UiNgModal.headerText",\n' +
    '		showCloseButton: true\n' +
    '	});</code>\n' +
    '			</pre>\n' +
    '		</div>\n' +
    '	</tab>\n' +
    '	<tab heading="Settings">\n' +
    '		<div class="highlight">\n' +
    '			<pre>\n' +
    '				<code class="language-javascript" prism>angular\n' +
    '	.module("x1.ui.modal")\n' +
    '	.value("settings", {\n' +
    '		size: "md",\n' +
    '		type: "default",\n' +
    '		backdrop: true,\n' +
    '		keyboard: true,\n' +
    '		modalFade: true,\n' +
    '		contentTemplate: "modal/modal.default.html"\n' +
    '	});</code>\n' +
    '			</pre>\n' +
    '		</div>\n' +
    '	</tab>\n' +
    '</tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.modal');
} catch (e) {
  module = angular.module('x1.ui.modal', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modal/examples/contextual.demo.html',
    '<h3 class="page-header">Contextual</h3>\n' +
    '<p>Because modals interrupt the user, they are used for error, warning and confirmation messages\n' +
    '	that require immediate interaction with the user.</p>\n' +
    '<div class="bs-example">\n' +
    '	<button class="btn btn-primary" type="button" ng-click="openModal(confirmation)">Confirmation</button>\n' +
    '	<button class="btn btn-danger" type="button" ng-click="openModal(error)">Error</button>\n' +
    '	<button class="btn btn-warning" type="button" ng-click="openModal(warning)">Warning</button>\n' +
    '	<button class="btn btn-info" type="button" ng-click="openModal(info)">Information</button>\n' +
    '</div>\n' +
    '<tabset>\n' +
    '	<tab heading="HTML">\n' +
    '		<div class="highlight">\n' +
    '			<pre>\n' +
    '				<code class="language-markup" prism>&lt;button class=&quot;btn btn-primary&quot; type=&quot;button&quot; ng-click=&quot;openModal(confirmation)&quot;&gt;Confirmation&lt;/button&gt;\n' +
    '&lt;button class=&quot;btn btn-danger&quot; type=&quot;button&quot; ng-click=&quot;openModal(error)&quot;&gt;Error&lt;/button&gt;\n' +
    '&lt;button class=&quot;btn btn-warning&quot; type=&quot;button&quot; ng-click=&quot;openModal(warning)&quot;&gt;Warning&lt;/button&gt;\n' +
    '&lt;button class=&quot;btn btn-info&quot; type=&quot;button&quot; ng-click=&quot;openModal(info)&quot;&gt;Information&lt;/button&gt;</code>\n' +
    '			</pre>\n' +
    '		</div>\n' +
    '	</tab>\n' +
    '	<tab heading="JS">\n' +
    '		<div class="highlight">\n' +
    '			<pre>\n' +
    '				<code class="language-javascript" prism>angular\n' +
    '	.module(&quot;x1.ui.modal.demo&quot;, [\n' +
    '		&quot;x1.ui.modal&quot;\n' +
    '	])\n' +
    '	.controller(&quot;modalDemoCtrl&quot;, [&quot;$scope&quot;, &quot;x1Modal&quot;,\n' +
    '		function($scope, modal) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			/**\n' +
    '			* open modal function\n' +
    '			*/\n' +
    '			var data;\n' +
    '			$scope.openModal = function(option) {\n' +
    '				modal.show(option).then(function(result) {\n' +
    '					data = result;\n' +
    '				});\n' +
    '			};\n' +
    '\n' +
    '			/**\n' +
    '			* Define contextual message modals\n' +
    '			*/\n' +
    '			$scope.info = {\n' +
    '				options: {\n' +
    '					headerText: &quot;Information&quot;,\n' +
    '					actionButtonText: &quot;Close&quot;,\n' +
    '					showCloseButton: false\n' +
    '				},\n' +
    '				settings: {\n' +
    '					contentTemplate: &quot;modal/examples/modal-prompt.html&quot;,\n' +
    '					size: &quot;sm&quot;,\n' +
    '					type: &quot;information&quot;\n' +
    '				},\n' +
    '				data: {\n' +
    '					text: &quot;New report data is available.&quot;\n' +
    '				}\n' +
    '			};\n' +
    '			$scope.warning = {\n' +
    '				options: {\n' +
    '					headerText: &quot;Warning&quot;,\n' +
    '					actionButtonText: &quot;Close&quot;,\n' +
    '					showCloseButton: false\n' +
    '				},\n' +
    '				settings: {\n' +
    '					contentTemplate: &quot;modal/examples/modal-prompt.html&quot;,\n' +
    '					size: &quot;sm&quot;,\n' +
    '					type: &quot;warning&quot;\n' +
    '				},\n' +
    '				data: {\n' +
    '					text: &quot;Your battery is running low. Recharge it soon.&quot;\n' +
    '				}\n' +
    '			};\n' +
    '			$scope.error = {\n' +
    '				options: {\n' +
    '					headerText: &quot;Error&quot;,\n' +
    '					actionButtonText: &quot;Close&quot;,\n' +
    '					showCloseButton: false\n' +
    '				},\n' +
    '				settings: {\n' +
    '					contentTemplate: &quot;modal/examples/modal-prompt.html&quot;,\n' +
    '					size: &quot;sm&quot;,\n' +
    '					type: &quot;error&quot;\n' +
    '				},\n' +
    '				data: {\n' +
    '					text: &quot;The connection was lost. Try to log in again.&quot;\n' +
    '				}\n' +
    '			};\n' +
    '			$scope.confirmation = {\n' +
    '				options: {\n' +
    '					headerText: &quot;Confirmation&quot;,\n' +
    '					actionButtonText: &quot;Delete&quot;,\n' +
    '					showCloseButton: true\n' +
    '				},\n' +
    '				settings: {\n' +
    '					contentTemplate: &quot;modal/examples/modal-prompt.html&quot;,\n' +
    '					size: &quot;sm&quot;,\n' +
    '					type: &quot;confirmation&quot;\n' +
    '				},\n' +
    '				data: {\n' +
    '					text: &quot;Do you want to delete this file?&quot;,\n' +
    '					file: &quot;STYLE_GUIDE.psd&quot;\n' +
    '				}\n' +
    '			};\n' +
    '		}\n' +
    '	]);</code>\n' +
    '			</pre>\n' +
    '		</div>\n' +
    '	</tab>\n' +
    '</tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.modal');
} catch (e) {
  module = angular.module('x1.ui.modal', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modal/examples/modal-form.html',
    '<form role="form" class="form-horizontal" aria-labelledby="x1ModalTitle">\n' +
    '	<div class="form-group">\n' +
    '		<label for="orgName" class="col-sm-2">Org Name</label>\n' +
    '		<div class="col-sm-10">\n' +
    '			<input type="text" id="orgName" name="orgName" class="form-control">\n' +
    '		</div>\n' +
    '	</div>\n' +
    '	<div class="form-group">\n' +
    '		<label for="industry" class="col-sm-2">Industry</label>\n' +
    '		<div class="col-sm-10">\n' +
    '			<input type="text" id="industry" name="industry" class="form-control">\n' +
    '		</div>\n' +
    '	</div>\n' +
    '	<div class="form-group">\n' +
    '		<label for="country" class="col-sm-2">Country</label>\n' +
    '		<div class="col-sm-10">\n' +
    '			<input type="text" id="country" name="country" class="form-control">\n' +
    '		</div>\n' +
    '	</div>\n' +
    '	<div class="form-group">\n' +
    '		<label for="city" class="col-sm-2">City</label>\n' +
    '		<div class="col-sm-10">\n' +
    '			<input type="text" id="city" name="city" class="form-control">\n' +
    '		</div>\n' +
    '	</div>\n' +
    '	<div class="form-group">\n' +
    '		<label for="notes" class="col-sm-2">Notes</label>\n' +
    '		<div class="col-sm-10">\n' +
    '			<textarea id="notes" name="notes" class="form-control"></textarea>\n' +
    '		</div>\n' +
    '	</div>\n' +
    '</form>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.modal');
} catch (e) {
  module = angular.module('x1.ui.modal', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modal/examples/modal-prompt.html',
    '<p>{{data.text}}</p>\n' +
    '<p><strong>{{data.file}}</strong></p>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.modal');
} catch (e) {
  module = angular.module('x1.ui.modal', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modal/examples/modal-sample.html',
    '<p>Just a sample template, that defined with contentTemplate.</p>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.modal');
} catch (e) {
  module = angular.module('x1.ui.modal', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modal/examples/simple.demo.html',
    '<h3 class="page-header">Simple</h3>\n' +
    '<p>Modals are streamlined, but flexible, dialog prompts with the minimum required functionality\n' +
    '	and smart defaults.</p>\n' +
    '<div class="bs-example">\n' +
    '	<button class="btn btn-default" type="button" ng-click="openModal(simple)">Quick and\n' +
    '		Easy</button>\n' +
    '</div>\n' +
    '<tabset>\n' +
    '	<tab heading="HTML">\n' +
    '		<div class="highlight">\n' +
    '			<pre>\n' +
    '				<code class="language-markup" prism>&lt;button class=&quot;btn btn-default&quot; type=&quot;button&quot; ng-click=&quot;openModal(simple)&quot;&gt;Quick and Easy&lt;/button&gt;</code>\n' +
    '			</pre>\n' +
    '		</div>\n' +
    '	</tab>\n' +
    '	<tab heading="JS">\n' +
    '		<div class="highlight">\n' +
    '			<pre>\n' +
    '				<code class="language-javascript" prism>angular\n' +
    '	.module(&quot;x1.ui.modal.demo&quot;, [\n' +
    '		&quot;x1.ui.modal&quot;\n' +
    '	])\n' +
    '	.controller(&quot;modalDemoCtrl&quot;, [&quot;$scope&quot;, &quot;x1Modal&quot;,\n' +
    '		function($scope, modal) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			/**\n' +
    '			* open modal function\n' +
    '			*/\n' +
    '			var data;\n' +
    '			$scope.openModal = function(option) {\n' +
    '				modal.show(option).then(function(result) {\n' +
    '					data = result;\n' +
    '				});\n' +
    '			};\n' +
    '\n' +
    '			/**\n' +
    '			* Define simple modal\n' +
    '			*/\n' +
    '			$scope.simple = {\n' +
    '				options: {\n' +
    '					headerText: &quot;Minimum Setup Modal&quot;,\n' +
    '					actionButtonText: &quot;Done!&quot;,\n' +
    '					showCloseButton: false\n' +
    '				},\n' +
    '				settings: { size: &quot;sm&quot; },\n' +
    '				data: { text: &quot;This text, the dialog type, and headerText are all you have to set.&quot; }\n' +
    '			};\n' +
    '		}\n' +
    '	]);</code>\n' +
    '			</pre>\n' +
    '		</div>\n' +
    '	</tab>\n' +
    '</tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.modal');
} catch (e) {
  module = angular.module('x1.ui.modal', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modal/examples/sizes.demo.html',
    '<h3 class="page-header">Sizes</h3>\n' +
    '<div class="bs-example">\n' +
    '	<button class="btn btn-default" type="button" ng-click="openModal(smallModal)">\n' +
    '		Small modal - 320px wide</button>\n' +
    '	<button class="btn btn-default" type="button" ng-click="openModal(mediumModal)">\n' +
    '		Medium (Default) modal - 640px wide</button>\n' +
    '	<button class="btn btn-default" type="button" ng-click="openModal(largeModal)">\n' +
    '		Large modal - 900px wide</button>\n' +
    '	<button id="xLargePopover" class="btn btn-default" type="button" ng-click="openModal(xLargeModal)">X-Large modal - 980px wide</button>\n' +
    '</div>\n' +
    '<tabset>\n' +
    '	<tab heading="HTML">\n' +
    '		<div class="highlight">\n' +
    '			<pre>\n' +
    '				<code class="language-markup" prism>&lt;button class=&quot;btn btn-default&quot; type=&quot;button&quot; ng-click=&quot;openModal(smallModal)&quot;&gt;Small modal - 320px wide&lt;/button&gt;\n' +
    '&lt;button class=&quot;btn btn-default&quot; type=&quot;button&quot; ng-click=&quot;openModal(mediumModal)&quot;&gt;Medium modal (Default) - 640px wide&lt;/button&gt;\n' +
    '&lt;button class=&quot;btn btn-default&quot; type=&quot;button&quot; ng-click=&quot;openModal(largeModal)&quot;&gt;Large modal - 900px wide&lt;/button&gt;\n' +
    '&lt;button class=&quot;btn btn-default&quot; type=&quot;button&quot; ng-click=&quot;openModal(xLargeModal)&quot;&gt;X-Large modal - 980px wide&lt;/button&gt;</code>\n' +
    '			</pre>\n' +
    '		</div>\n' +
    '	</tab>\n' +
    '	<tab heading="JS">\n' +
    '		<div class="highlight">\n' +
    '			<pre>\n' +
    '				<code class="language-javascript" prism>angular\n' +
    '	.module(&quot;x1.ui.modal.demo&quot;, [\n' +
    '		&quot;x1.ui.modal&quot;\n' +
    '	])\n' +
    '	.controller(&quot;modalDemoCtrl&quot;, [&quot;$scope&quot;, &quot;x1Modal&quot;,\n' +
    '		function($scope, modal) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			/**\n' +
    '			* open modal function\n' +
    '			*/\n' +
    '			var data;\n' +
    '			$scope.openModal = function(option) {\n' +
    '				modal.show(option).then(function(result) {\n' +
    '					data = result;\n' +
    '				});\n' +
    '			};\n' +
    '\n' +
    '			/**\n' +
    '			* Define size modals\n' +
    '			*/\n' +
    '			$scope.xLargeModal = {\n' +
    '				options: {\n' +
    '					headerText: &quot;Extra Large Modal&quot;,\n' +
    '					showCloseButton: true\n' +
    '				},\n' +
    '				settings: {\n' +
    '					contentTemplate: &quot;modal/examples/modal-form.html&quot;,\n' +
    '					size: &quot;xl&quot;\n' +
    '				}\n' +
    '			};\n' +
    '			$scope.largeModal = {\n' +
    '				options: {\n' +
    '					headerText: &quot;Large Modal&quot;,\n' +
    '					showCloseButton: true\n' +
    '				},\n' +
    '				settings: {\n' +
    '					contentTemplate: &quot;modal/examples/modal-form.html&quot;,\n' +
    '					size: &quot;lg&quot;\n' +
    '				}\n' +
    '			};\n' +
    '			$scope.mediumModal = {\n' +
    '				options: {\n' +
    '					headerText: &quot;Medium Modal&quot;,\n' +
    '					showCloseButton: true\n' +
    '				},\n' +
    '				settings: {\n' +
    '					contentTemplate: &quot;modal/examples/modal-sample.html&quot;,\n' +
    '					size: &quot;md&quot;\n' +
    '				}\n' +
    '			};\n' +
    '			$scope.smallModal = {\n' +
    '				options: {\n' +
    '					headerText: &quot;Small Modal&quot;,\n' +
    '					showCloseButton: true\n' +
    '				},\n' +
    '				settings: {\n' +
    '					contentTemplate: &quot;modal/examples/modal-sample.html&quot;,\n' +
    '					size: &quot;sm&quot;\n' +
    '				}\n' +
    '			};\n' +
    '		}\n' +
    '	]);</code>\n' +
    '			</pre>\n' +
    '		</div>\n' +
    '	</tab>\n' +
    '</tabset>');
}]);
})();
