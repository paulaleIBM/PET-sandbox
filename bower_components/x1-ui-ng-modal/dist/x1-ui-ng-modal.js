angular
	.module("x1.ui.modal", [
		"pascalprecht.translate",
		"ui.bootstrap"
	]);
angular
	.module("x1.ui.modal")
	.service("x1Modal", ["$modal", "options", "settings", "$templateCache",
		function($modal, defaultOptions, defaultSettings, $templateCache) {
			"use strict";

			var cancel = false;

			this.getCancel = function() {
			 	return cancel;
			};

			var modalInstances = [];
			/**
			 * open is for convention, show is for backwards compatibility
			 */
			this.open = this.show = function(customOptions) {
				/**
				 * create private versions of options and settings
				 */
				var options = getUserOptions(customOptions, "options");
				var settings = getUserOptions(customOptions, "settings");
				var data = getUserOptions(customOptions, "data");
				var modalInstance;

                if (settings.windowClass) {
                    settings.windowClass += " " + defaultSettings.windowClass;
                }
                else {
                    settings.windowClass = defaultSettings.windowClass;
                }

                extendConfigs(options, defaultOptions);
				extendConfigs(settings, defaultSettings);

				/**
				 * set contentTemplate
				 */
				options.contentTemplate = settings.contentTemplate;

				/**
				 * override class
				 */
				var settingsType = new RegExp(settings.type, "g");
				var settingsSize = new RegExp(settings.size, "g");
				settings.windowClass = settings.windowClass
					.replace(settingsType, "")
					.replace(settingsSize, "");
				settings.windowClass += " " + settings.type;
				settings.windowClass += " " + settings.size;

				/**
				 * define modal template
				 */
				if (!settings.templateUrl) {
					settings.template = settings.template || $templateCache.get("modal/modal.html");
				}

				/**
				 * define modal controller
				 */
				settings.controller = function($scope, $modalInstance) {
					/**
					 * click on ADDITIONAL buttons
					 */
					$scope.additionalButtonClickHandler = function(index) {
						$scope.$broadcast(options.additionalButtons[index].eventName);
					};

					/**
					 * click on OK button
					 */
					$scope.ok = function() {
						cancel = false;
						$modalInstance.close($scope.data);
					};

					/**
					 * click on CANCEL button
					 */
					$scope.close = function() {
						cancel = true;
						$modalInstance.dismiss("cancel");
					};

					$scope.$on("$destroy", function() {
						removeModalInstance(modalInstance);
					});

					/**
					 * bind properties
					 */
					$scope.options = options;
					$scope.data = data;
				};

				/**
				 * extend result with helper methods
				 */
				modalInstance = $modal.open(settings);
				modalInstance.result.close = modalInstance.close;
				modalInstance.result.dismiss = modalInstance.dismiss;
				modalInstance.result.opened = modalInstance.opened;
				modalInstances.push(modalInstance);

				return modalInstance.result;
			};

			/**
			 * close all opened modal
			 */
			this.dismissAll = function() {
				modalInstances.forEach(function(modalInstance) {
					modalInstance.dismiss();
				});
				modalInstances.length = 0;
			};

			function removeModalInstance(modalInstance) {
				var index = modalInstances.indexOf(modalInstance);
				modalInstances.splice(index, 1);
			}

			function extendConfigs(options, defaults) {
				//user may not have defined custom settings
				options = options || {};
				for (var prop in defaults) {
					if (!options.hasOwnProperty(prop) && defaults.hasOwnProperty(prop)) {
						options[prop] = defaults[prop];
					}
				}
			}

			function getUserOptions(configs, data) {
				configs = configs || {};

				if (typeof configs[data] === "undefined") {
					configs[data] = {};
				}
				return configs[data];
			}
		}
	]);
angular
	.module("x1.ui.modal")
	.value("options", {
		actionButtonText: "x1UiNgModal.BTN.primary",
		closeButtonText: "x1UiNgModal.BTN.secondary",
		headerText: "x1UiNgModal.headerText",
		showCloseButton: true,
		showActionButton: true,
		additionalButtons: []
	});
angular
	.module("x1.ui.modal")
	.value("settings", {
        windowClass: "x1-ui-modal",
		size: "md",
		type: "default",
		backdrop: true,
		keyboard: true,
		modalFade: true,
		contentTemplate: "modal/modal.default.html"
	});
(function(module) {
try {
  module = angular.module('x1.ui.modal');
} catch (e) {
  module = angular.module('x1.ui.modal', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modal/modal.default.html',
    '<p translate="{{data.text}}"></p>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.modal');
} catch (e) {
  module = angular.module('x1.ui.modal', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modal/modal.html',
    '<header role="banner" class="modal-header" aria-labelledby="x1ModalTitle">\n' +
    '	<h3 id="x1ModalTitle" class="modal-title" translate="{{options.headerText}}"></h3>\n' +
    '	<button type="button" class="close" ng-click="close()" aria-label="{{\'x1UiNgModal.ARIA.modalClose\' | translate}}" title="{{\'x1UiNgModal.ARIA.modalClose\' | translate}}">\n' +
    '		<span class="sr-only" translate="x1UiNgModal.ARIA.modalClose"></span>\n' +
    '		<span class="glyphicon glyphicon-xs glyphicon-remove" aria-hidden="true"></span>\n' +
    '	</button>\n' +
    '</header>\n' +
    '<section role="main" class="modal-body" ng-include="options.contentTemplate" aria-label="{{\'x1UiNgModal.ARIA.modalBody\' | translate}}"></section>\n' +
    '<footer role="contentinfo" class="modal-footer" aria-label="{{\'x1UiNgModal.ARIA.modalFooter\' | translate}}">\n' +
    '	<button ng-repeat="additionalButton in options.additionalButtons" class="{{additionalButton.elementClass}}" ng-disabled="additionalButton.disableElement" ng-click="additionalButtonClickHandler($index)" translate="{{additionalButton.text}}"></button>\n' +
    '	<button ng-if="options.showActionButton" class="btn btn-primary modal-ok" ng-disabled="options.actionDisabled" ng-click="ok()" translate="{{options.actionButtonText}}"></button>\n' +
    '	<button ng-if="options.showCloseButton" class="btn btn-secondary modal-close" ng-click="close()" translate="{{options.closeButtonText}}"></button>\n' +
    '</footer>');
}]);
})();
