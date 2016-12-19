angular
	.module("x1.ui.popover", [
		"pascalprecht.translate",
		"x1.ui.tooltip",
		"ui.bootstrap.popover",
		"ngSanitize"
	]);
/*-----------------------------------------------------------------------------/
 /                                                                             /
 / Licensed Materials – Property of IBM                                        /
 /                                                                             /
 / popover.constant.js                                                         /
 /                                                                             /
 /(C) Copyright IBM Corporation 2015.                                          /
 / U.S. Government Users Restricted Rights:  Use, duplication or disclosure    /
 / restricted by GSA ADP Schedule Contract with IBM Corp.                      /
 /                                                                             /
 /*---------------------------------------------------------------------------*/

angular
	.module("x1.ui.popover")
	.constant("x1.ui.popover.defaults", {
		animation: false,
		container: false,
		scrollableContainer: false,
		target: false,
		placement: "bottom",
		template: "popover/popover.html",
		contentTemplate: "popover/popover-content.html",
		trigger: "click",
		html: false,
		title: "",
		content: "",
		delay: 0,
        multiple: false,
		className: ""
	})
	.constant("x1.ui.popover.events", {
		APPLY_POPOVER: "x1.ui.apply-popover",
		CANCEL_POPOVER: "x1.ui.cancel-popover",
		APPLY_PLACEMENT: "x1.ui.apply-placement",
		POPOVER_CLOSED: "x1.ui.popover.closed",
		CLOSED_POPOVER: "x1.ui.closed.popover"
	});
angular
	.module("x1.ui.popover")
	.controller("popoverCtrl", ["$scope", "$rootScope", "x1.ui.popover.events",
		function($scope, $rootScope, popoverEvents) {
			"use strict";

			$scope.accessibleClose = function($event) {
				if ($event && $event.keyCode === 13) {
					$rootScope.$broadcast(popoverEvents.CANCEL_POPOVER, this);
				} else if ($event && $event.keyCode === 27) {
					$rootScope.$broadcast(popoverEvents.CANCEL_POPOVER, this);
				}
			};

			$scope.accessibleClick = function(item, $event) {
				if ($event && $event.keyCode === 13) {
					item.handleClick();
				} else if ($event && $event.keyCode === 27) {
					$rootScope.$broadcast(popoverEvents.CANCEL_POPOVER, this);
				}
			};
		}
	]);
/*-----------------------------------------------------------------------------/
 /                                                                             /
 / Licensed Materials – Property of IBM                                        /
 /                                                                             /
 / popover.directive.js                                                        /
 /                                                                             /
 /(C) Copyright IBM Corporation 2015.                                          /
 / U.S. Government Users Restricted Rights:  Use, duplication or disclosure    /
 / restricted by GSA ADP Schedule Contract with IBM Corp.                      /
 /                                                                             /
 /*---------------------------------------------------------------------------*/

angular
	.module("x1.ui.popover")
	.directive("x1Popover", [
		"$window", "$document", "$sce", "$x1popover", "$rootScope", "x1.ui.popover.events",
		function($window, $document, $sce, $x1popover, $rootScope, popoverEvents) {
			"use strict";

			var requestAnimationFrame = $window.requestAnimationFrame || $window.setTimeout;

			return {
				restrict: "EAC",
				scope: true,
				controller: "popoverCtrl",
				link: function postLink($scope, element, attr) {

                    var options;
                    var popover;
                    var window;
                    var handlers;
                    var elementOffsetWatcher;
                    var scrollTargetsList = [];

					/**
					 * finding closest parent element with specific class
					 * @param element
					 * @param selector
					 **/
					function closest(element, selector) {
						//wrap element
						element = angular.element(element);

						//exit if we don't have it
						if (!element.length) {
							return;
						}
						//check if we have parent with needed class
						//we could skip current element and look for it's parent
						if (element.hasClass(selector)) {
							return element;
						}

						//get parent
						element = element.parent();
						return closest(element, selector);
					}

					// Indicates if the widget is mirrored.
					$scope.isRTL = ($document[0].dir === "rtl" || $document[0].body.dir === "rtl");

					// Directive options
					options = {scope: $scope};
					angular.forEach(["template", "contentTemplate", "placement", "container",
						"target", "delay", "trigger", "keyboard", "html", "animation",
						"outsideClick"], function(key) {
						if (angular.isDefined(attr[key])) {
							options[key] = attr[key];
						}
					});
					angular.forEach(["keyboard", "outsideClick"], function(item) {
						options[item] = angular.isDefined(options[item]) && options[item] === "true";
					});

                    angular.forEach(["placement", "multiple", "className"], function(item) {
                        if ($scope.$eval(attr.x1Popover) && $scope.$eval(attr.x1Popover)[item]) {
                            options[item] = $scope.$eval(attr.x1Popover)[item];
                        } else {
                            if (angular.isDefined(attr[item])) {
                                $scope[item] = attr[item];
                            }
                        }
                    });

					// simple html content from property
					if (angular.isDefined(attr["contentHtml"])) {
						options["content"] = $sce.trustAsHtml(attr["contentHtml"]);
						options["contentTemplate"] = false;
						options["html"] = true;
					}

					// simple text content from property
					if (angular.isDefined(attr["content"])) {
						options["content"] = attr["content"];
						options["contentTemplate"] = false;
					}

					// Initialize popover
					popover = $x1popover(element, options);

                    // Support of windows resizing
                    // TODO support of parent element resizing
                    window = angular.element($window);

                    //make sure only one popover is open at once
                    element.bind("click", function() {
                        if (!popover.$isShown) {
                            $rootScope.$broadcast(popoverEvents.CANCEL_POPOVER, element);
                            setBindings();
                        } else {
                            removeBindings();
                        }
                    });

                    function setBindings() {
                        bindListeners();
                        setElementOffsetWatcher();
                        bindHandlers();
                    }

                    function removeBindings() {
                        removeListeners();
                        removeElementOffsetWatcher();
                        removeHandlers();
                    }

                    function bindListeners() {
                        if (options.outsideClick) {
                            document.addEventListener("click", handleClick, true);
                        }

                        if (options.keyboard) {
                            document.addEventListener("keyup", handleKeyUp, true);
                        }

                        window.bind("resize", applyPlacement);

                        if (attr.scrollableContainer) {
                            var i;
                            var elem;
                            var scrollableContainers = attr.scrollableContainer.split(" ");

                            for (i = 0; i < scrollableContainers.length; i++){
                                elem = closest(element, scrollableContainers[i]);

                                if (elem) {
                                    elem.bind("scroll", applyPlacement);
                                    scrollTargetsList.push(elem);
                                }
                            }
                        }
                    }

                    function removeListeners() {
                        removeListenersForHiding();

                        window.unbind("resize", applyPlacement);

                        if (scrollTargetsList.length) {
                            angular.forEach(scrollTargetsList, function(key) {
                                key.unbind("scroll", applyPlacement);
                            });

                            scrollTargetsList = [];
                        }
                    }

					function setElementOffsetWatcher() {
						elementOffsetWatcher = $scope.$watch(function() {
							var elementCoords = element[0].getBoundingClientRect();
							return {
								left: elementCoords.left,
								top: elementCoords.top
							};
						}, applyPlacement, true);
					}

                    function removeElementOffsetWatcher() {
                        if (elementOffsetWatcher) {
                            elementOffsetWatcher();
                        }
                    }

                    function bindHandlers() {
                        handlers = {};

                        handlers.applyPopover = $scope.$on(popoverEvents.APPLY_POPOVER, function() {
                            popover.$scope.$hide();
                            popover.$scope.data = $scope;

                            removeBindings();
                        });

                        handlers.cancelPopover = $scope.$on(popoverEvents.CANCEL_POPOVER, function(event, elem) {
							if (elem !== element && !popover.$options.multiple) {
								popover.$scope.$hide();
								removeBindings();
                            }
                        });

                        handlers.applyPlacement = $scope.$on(popoverEvents.APPLY_PLACEMENT, applyPlacement);
                    }

                    function removeHandlers() {
                        if (handlers) {
                            for (var handler in handlers) {
                                handlers[handler]();
                            }

                            handlers = null;
                        }
                    }

                    function applyPlacement() {
                        if (popover && popover.$isShown) {
                            popover.$applyPlacement();
                        }
                    }

					// Support $scope as data-attrs
					angular.forEach(["title", "content"], function(key) {
						if (attr[key]) {
							attr.$observe(key, function(newValue, oldValue) {
								$scope[key] = $sce.trustAsHtml(newValue);
								if (angular.isDefined(oldValue)) {
									requestAnimationFrame(function() {
										if (popover) {
											popover.$applyPlacement();
										}
									});
								}
							});
						}
					});

					// Support $scope as an object
					if (attr.x1Popover) {
						$scope.$watch(attr.x1Popover, function(newValue, oldValue) {
							if (angular.isObject(newValue)) {
								angular.extend($scope, newValue);
							} else {
								$scope.content = newValue;
							}
							if (angular.isDefined(oldValue)) {
								requestAnimationFrame(function() {
									if (popover) {
										popover.$applyPlacement();
									}
								});
							}
						}, true);
					}

					// Garbage collection
					$scope.$on("$destroy", function() {
						if (popover) {
							popover.destroy();
						}

						options = null;
						popover = null;

                        removeBindings();
                        element.unbind("click");
					});

					$scope.changeLabel = function(label) {
						element.html(label);
					};

					$scope.close = function() {
						popover.$scope.$hide();
						$scope.$broadcast(popoverEvents.POPOVER_CLOSED);
                        removeBindings();
						$scope.$emit(popoverEvents.CLOSED_POPOVER);
					};

					/**
					 * check if click was made outside popover
					 * @param event
					 * @returns {boolean|*}
					 */
					function isTargetInsidePopover(event) {
						var popoverElement = popover.$element[0];
						return !element[0].contains(event.target) && document.body.contains(event.target) &&
							popoverElement && !popoverElement.contains(event.target);
					}

					function handleClick(event) {
						if (popover && isTargetInsidePopover(event)) {
							hidePopover();
						}
					}

					function handleKeyUp(event) {
						if (popover && event.keyCode === 27) {
							hidePopover();
						}
					}

					function hidePopover() {
						$scope.close();
						if (!$rootScope.$$phase) {
							$scope.$digest();
						}
					}

					function removeListenersForHiding() {
						document.removeEventListener("click", handleClick);
						document.removeEventListener("keyup", handleKeyUp);
					}
				}
			};
		}
	]);
/*-----------------------------------------------------------------------------/
 /                                                                             /
 / Licensed Materials – Property of IBM                                        /
 /                                                                             /
 / popover.provider.js                                                         /
 /                                                                             /
 /(C) Copyright IBM Corporation 2015.                                          /
 / U.S. Government Users Restricted Rights:  Use, duplication or disclosure    /
 / restricted by GSA ADP Schedule Contract with IBM Corp.                      /
 /                                                                             /
 /*---------------------------------------------------------------------------*/

angular
	.module("x1.ui.popover")
	.provider("$x1popover", ["x1.ui.popover.defaults",
		function(popoverDefaults) {
			"use strict";

			var defaults = this.defaults = popoverDefaults;

			this.$get = ["$x1tooltip", function($x1tooltip) {
				function popoverFactory(element, config) {
					// Common vars
					var options = angular.extend({}, defaults, config);
					var $x1popover = $x1tooltip(element, options);

					// Support scope as string options [/*title, */content]
					if (options.content) {
						$x1popover.$scope.content = options.content;
					}

					if (!config.placement) {
						$x1popover.$scope.placement = options.placement;
					}

					return $x1popover;
				}

				return popoverFactory;
			}];
		}
	]);
(function(module) {
try {
  module = angular.module('x1.ui.popover');
} catch (e) {
  module = angular.module('x1.ui.popover', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('popover/popover-content.html',
    '<div role="menu" class="list-group" aria-label="{{title}} {{\'x1UiNgPopover.ARIA.MENU\' | translate}}"><a ng-repeat="item in items" class="list-group-item" name="{{item.name}}" ng-class="{\'disabled\': item.disabled, \'active\': item.active}" role="menuitem" aria-label="{{item.name}}" ng-click="item.handleClick()" ng-keydown="accessibleClick(item, $event)"><span class="menu-icon glyphicon glyphicon-{{item.icon}}" aria-hidden="true"></span> <span class="item-name">{{item.name}}</span> <span ng-if="item.rarr" aria-hidden="true" class="next-icon glyphicon glyphicon-chevron-right"></span></a></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.popover');
} catch (e) {
  module = angular.module('x1.ui.popover', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('popover/popover.html',
    '<div role="tooltip" class="x1-ui-popover popover {{::placement + \' \' + className}}" ng-class="{\'custom-template\': contentTemplate, \'popover-menu\': items}"><div class="arrow" ng-class="{\'has-title\':title || customTitle}" aria-hidden="true"></div><header ng-show="title" class="popover-header" role="banner" aria-labelledby="x1PopoverTitle" ng-class="{\'is-rtl\': isRTL}"><h3 id="x1PopoverTitle" class="popover-title" ng-class="{\'text-right\': isRTL}" ng-bind="title"></h3><button type="button" class="close" ng-click="close()" aria-label="{{\'x1UiNgPopover.ARIA.CLOSE\' | translate}}" title="{{\'x1UiNgPopover.ARIA.CLOSE\' | translate}}" ng-keydown="accessibleClose($event)"><span class="sr-only" translate="x1UiNgModal.ARIA.modalClose"></span> <span class="glyphicon glyphicon-xs glyphicon-remove" aria-hidden="true"></span></button></header><section role="region" aria-label="{{title}} {{\'x1UiNgPopover.ARIA.CONTENT\' | translate}}" class="popover-content" ng-bind="content"></section></div>');
}]);
})();
