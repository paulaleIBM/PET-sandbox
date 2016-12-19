/**
 *
 * Licensed Materials – Property of IBM
 *
 * tooltip.module.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.tooltip", [
		"pascalprecht.translate",
		"ui.bootstrap.tooltip"
	]);
/**
 *
 * Licensed Materials – Property of IBM
 *
 * tooltip.constant.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.tooltip")
	.constant("tooltipDefaults", {
		animation: false,
		prefixClass: "tooltip",
		prefixEvent: "tooltip",
		container: false,
		target: false,
		placement: "top",
		template: "tooltip/tooltip.html",
		contentTemplate: false,
		trigger: "hover focus",
		keyboard: false,
		html: false,
		show: false,
		title: "",
		type: "",
		delay: 0,
		closeIcon: "true"
	});
/**
 *
 * Licensed Materials – Property of IBM
 *
 * tooltip.directive.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.tooltip")
	.directive("x1Tooltip", ["$window", "$location", "$sce", "$x1tooltip", "$$rAF",
		function($window, $location, $sce, $x1tooltip, $$rAF) {
			"use strict";

			return {
				restrict: "EAC",
				scope: true,
				link: function postLink(scope, element, attr) {

					// Directive options
					var options = {scope: scope};
					angular.forEach(["template", "contentTemplate", "placement", "container",
							"target", "delay", "trigger", "keyboard", "html", "animation", "type",
							"closeIcon", "prefixClass", "outsideClick"],
						function(key) {
							if (angular.isDefined(attr[key])) {
								options[key] = attr[key];
							}
						});

					// Initialize tooltip
					var tooltip = $x1tooltip(element, options);

					// Observe scope attributes for change
					angular.forEach(["title"], function(key) {
						if (attr[key]) {
							attr.$observe(key, function(newValue, oldValue) {
								scope[key] = $sce.trustAsHtml(newValue);
								if (angular.isDefined(oldValue)) {
									$$rAF(function() {
										if (tooltip) {
											tooltip.$applyPlacement();
										}
									});
								}
							});
						}
					});

					// Support scope as an object
					if (attr.x1Tooltip) {
						scope.$watch(attr.x1Tooltip, function(newValue, oldValue) {
							if (angular.isObject(newValue)) {
								angular.extend(scope, newValue);
							} else {
								scope.title = newValue;
							}
							if (angular.isDefined(oldValue)) {
								$$rAF(function() {
									if (tooltip) {
										tooltip.$applyPlacement();
									}
								});
							}
						}, true);
					}

					if (attr.toggle) {
						scope.$on(attr.toggle, function(event, toggle) {
							if (toggle) {
								tooltip.$scope.$show();
							}
							else {
								tooltip.$scope.$hide();
							}
						});
					}

					scope.close = function() {
						tooltip.$scope.$hide();
					};

					// Garbage collection
					scope.$on("$destroy", function() {
						tooltip.destroy();
						options = null;
						tooltip = null;
					});
				}
			};
		}
	]);
/**
 *
 * Licensed Materials – Property of IBM
 *
 * tooltip.provider.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
  .module("x1.ui.tooltip")
  .provider("$x1tooltip", ["tooltipDefaults",
    function(tooltipDefaults) {
      "use strict";

      var defaults = this.defaults = tooltipDefaults;

      this.$get = ["$window", "$document", "$rootScope", "$compile", "$q", "$templateCache", "$http", "$animate",
        "tooltipDimensions", "$$rAF",
        function($window, $document, $rootScope, $compile, $q, $templateCache,
          $http, $animate, tooltipDimensions, $$rAF){

        var trim = String.prototype.trim;
        var isTouch = "createTouch" in $window.document;
        var htmlReplaceRegExp = /ng-bind="/ig;
        var SCROLL_WIDTH = 15;
        var ARROW_WIDTH = 22;

        function tooltipFactory(element, config) {
          var $tooltip = {},
            nodeName,
            options,
            scope,
            timeout,
            hoverState,
            tipLinker,
            tipElement,
            tipTemplate,
            tipContainer,
            containerInitialPositions = {
              initialized: false
            };

          nodeName = getTooltipNodeName();
          options = getTooltipOptions();
          scope = getTooltipScope();

          $tooltip.$promise = fetchTemplate(options.template);

          if (options.delay && angular.isString(options.delay)) {
            options.delay = parseFloat(options.delay);
          }

          // Support scope as string options
          if (options.title) {
            $tooltip.$scope.title = options.title;
          }

          if (options.closeIcon) {
            $tooltip.$scope.closeIcon = ($tooltip.$options.closeIcon === "true");
          }

          // Provide scope helpers
          scope.$hide = function() {
            scope.$$postDigest(function() {
              $tooltip.hide();
            });
          };
          scope.$show = function() {
            scope.$$postDigest(function() {
              $tooltip.show();
            });
          };
          scope.$toggle = function() {
            scope.$$postDigest(function() {
              $tooltip.toggle();
            });
          };
          $tooltip.$isShown = scope.$isShown = false;

          // Support contentTemplate option
          if (options.contentTemplate) {
            $tooltip.$promise = $tooltip.$promise.then(function(template) {
              var templateEl = angular.element(template);
              return fetchTemplate(options.contentTemplate)
                .then(function(contentTemplate) {
                  var contentEl = findElement("[ng-bind='content'], [ng-bind-html='content']", templateEl[0]);
                  if (!contentEl.length) {
                    contentEl = findElement("[ng-bind='title'], [ng-bind-html='title']", templateEl[0]);
                  }
                   if (contentEl[0]) {
                     contentEl[0].removeAttribute("ng-bind-html");
                     contentEl[0].removeAttribute("ng-bind");
                   }
                  angular.element(contentEl).html(contentTemplate);
                  return templateEl[0].outerHTML;
                });
            });
          }

          // Fetch, compile then initialize tooltip
          $tooltip.$promise.then(function(template) {
            if (angular.isObject(template)) {
              template = template.data;
            }
            if (options.html) {
              template = template.replace(htmlReplaceRegExp, "ng-bind-html=\"");
            }
            template = trim.apply(template);
            tipTemplate = template;
            tipLinker = $compile(template);
            $tooltip.init();
          });

          $tooltip.init = function() {
            // Options: delay
            if (options.delay && angular.isNumber(options.delay)) {
              options.delay = {
                show: options.delay,
                hide: options.delay
              };
            }

            // Options : container
            if (options.container === "self") {
              tipContainer = element;
            } else if (options.container) {
              tipContainer = angular.isElement(options.container) ? options.container :
                findElement(options.container);
            }

            // Options: trigger
            var triggers = options.trigger.split(" ");
            angular.forEach(triggers, function(trigger) {
              if (typeof element !== "string") {
                var wrElement = angular.element(element);

                if (trigger === "click") {
                  wrElement.on("click", $tooltip.toggle);
                } else if (trigger !== "manual") {
                  wrElement.on(trigger === "hover" ? "mouseenter" : "focus",
                    $tooltip.enter);
                  wrElement.on(trigger === "hover" ? "mouseleave" : "blur",
                    $tooltip.leave);
                  if (nodeName === "button" && trigger !== "hover") {
                    wrElement.on(isTouch ? "touchstart" : "mousedown",
                      $tooltip.$onFocusElementMouseDown);
                  }
                  //hide close icon
                  $tooltip.$scope.closeIcon = false;
                }
              }
            });

            // Options: target
            if (options.target) {
              options.target = angular.isElement(options.target) ?
                options.target : findElement(options.target)[0];
            }

            // Options: show
            if (options.show) {
              scope.$$postDigest(function() {
                if (options.trigger === "focus") {
                  element[0].focus();
                } else {
                  $tooltip.show();
                }
              });
            }
          };

          $tooltip.destroy = function() {
            // Unbind events
            var triggers = options.trigger.split(" ");
            for (var i = triggers.length; i--;) {
              var trigger = triggers[i];

              if (trigger === "click") {
                element.off("click", $tooltip.toggle);
              } else if (trigger !== "manual") {
                element.off(trigger === "hover" ? "mouseenter" : "focus",
                  $tooltip.enter);
                element.off(trigger === "hover" ? "mouseleave" : "blur",
                  $tooltip.leave);
                if (nodeName === "button" && trigger !== "hover") {
                  element.off(isTouch ? "touchstart" : "mousedown",
                    $tooltip.$onFocusElementMouseDown);
                }
              }
            }

            // Remove element
            if (tipElement) {
              tipElement.remove();
              tipElement = null;
            }

            // Cancel pending callbacks
            clearTimeout(timeout);

            // Destroy scope
            scope.$destroy();
          };

          $tooltip.enter = function() {
            clearTimeout(timeout);
            hoverState = "in";

            if (!options.delay || !options.delay.show) {
              return $tooltip.show();
            }

            timeout = setTimeout(function() {
              if (hoverState === "in") {
                $tooltip.show();
              }
            }, options.delay.show);
          };

          var bindEvents = function() {
            if (options.keyboard) {
              if (options.trigger !== "focus") {
                $tooltip.focus();
                tipElement.on("keyup", $tooltip.$onKeyUp);
              } else {
                element.on("keyup", $tooltip.$onFocusKeyUp);
              }
            }
            if (options.outsideClick) {
              $document[0].addEventListener("click", handleClick, true);
            }
          };

          $tooltip.show = function() {
            scope.$emit(options.prefixEvent + ".show.before", $tooltip);
            var parent = options.container ? tipContainer : null;
            var after = options.container ? null : element;

            // Hide any existing tipElement
            if (tipElement) {
              tipElement.remove();
            }
            // Fetch a cloned element linked from template
            tipElement = $tooltip.$element = tipLinker(scope, function() {
            });

            // Set the initial positioning.
            tipElement
              .css({top: "-9999px", left: "-9999px", display: "block"})
              .addClass(options.placement);

            // Options: animation
            if (options.animation) {
              tipElement.addClass(options.animation);
            }
            // Options: type
            if (options.type) {
              tipElement.addClass(options.prefixClass + "-" + options.type);
            }

            $animate.enter(tipElement, angular.element(parent), after, function() {
              scope.$emit(options.prefixEvent + ".show", $tooltip);
            });
            $tooltip.$isShown = scope.$isShown = true;
            if (!(scope.$$phase || (scope.$root && scope.$root.$$phase))) {
              scope.$digest();
            }
            $$rAF($tooltip.$applyPlacement);

            bindEvents();
          };

          $tooltip.leave = function() {
            clearTimeout(timeout);
            hoverState = "out";

            if (!options.delay || !options.delay.hide) {
              return $tooltip.hide();
            }
            timeout = setTimeout(function() {
              if (hoverState === "out") {
                $tooltip.hide();
              }
            }, options.delay.hide);
          };

          var unbindEvents = function() {
            if (options.keyboard && tipElement !== null) {
              tipElement.off("keyup", $tooltip.$onKeyUp);
            }
            $document[0].removeEventListener("click", handleClick, true);
          };

          $tooltip.hide = function(blur) {
            if (!$tooltip.$isShown) {
              return;
            }
            scope.$emit(options.prefixEvent + ".hide.before", $tooltip);

            if (tipElement) {
              $animate.leave(tipElement, function() {
                scope.$emit(options.prefixEvent + ".hide", $tooltip);
              });
            } else {
              $tooltip.destroy();
            }

            $tooltip.$isShown = scope.$isShown = false;
            if (!(scope.$$phase || (scope.$root && scope.$root.$$phase))) {
              scope.$digest();
            }

            unbindEvents();

            // Allow to blur the input when hidden, like when pressing enter key
            if (blur && options.trigger === "focus") {
              return element[0].blur();
            }
          };

          $tooltip.toggle = function() {
            if ($tooltip.$isShown) {
              $tooltip.leave();
            } else {
              $tooltip.enter();
            }
          };

          $tooltip.focus = function() {
            tipElement[0].focus();
          };

          // Protected methods
          // @todo: fix left arrow position (currently off by 4px)
          $tooltip.$applyPlacement = function() {
            if (!tipElement) {
              return;
            }
            var arrow = angular.element(tipElement.children()[0]);
            // Get the position of the tooltip element.
            var elementPosition = getPosition();

            // @todo: make it configurable, check possibility for caching
            var tipContent = tipElement.find(".popover-content");
            var tipHeader = tipElement.find(".popover-header");
            tipContent.css("height", "auto");

            // Get the height and width of the tooltip so we can center it.
            var tipWidth = tipElement.prop("offsetWidth"),
              tipHeight = tipElement.prop("offsetHeight");

            var navTop = element[0].offsetHeight + element[0].offsetTop;

            // Get the tooltip's top and left coordinates to center it with this directive.
            var tipPosition = geOffset(options.placement,
              elementPosition, tipWidth, tipHeight, arrow[0].offsetWidth);

            if (options.placement.split("-")[0] === "bottom" && tipPosition.top < 0) {
              tipPosition.top = navTop;
            }

            var position = options.placement.split("-")[0];
            var tipArrowLeftPosition = getTipArrowLeftPosition(elementPosition, tipPosition, position);

            checkElOffScreenY(tipElement, tipPosition, tipHeight, tipHeader, tipContent);

            if (window.innerWidth < (tipPosition.left + tipWidth + SCROLL_WIDTH)) {
              tipPosition.left -= SCROLL_WIDTH;
              tipArrowLeftPosition += SCROLL_WIDTH;
            }

            // Now set the calculated positioning.
            tipPosition.top += "px";
            tipPosition.left += "px";
            tipElement.css(tipPosition);

            // if container is body we should move tooltip accordingly
            if (options.container === "body" && options.placement.split("-")[0] === "bottom") {

              tipElement.css("top", (elementPosition.top + elementPosition.height) + "px");
            }

            angular.element(arrow).css({"left": tipArrowLeftPosition + "px"});

            checkTipOffScreenX(tipPosition, elementPosition, position, arrow);
          };

          $tooltip.$onKeyUp = function(evt) {
            if (evt.which === 27) {
              $tooltip.hide();
            }
          };

          $tooltip.$onFocusKeyUp = function(evt) {
            if (evt.which === 27) {
              element[0].blur();
            }
          };

          $tooltip.$onFocusElementMouseDown = function(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            // Some browsers do not auto-focus buttons (eg. Safari)
            if ($tooltip.$isShown) {
              element[0].blur();
            } else {
              element[0].focus();
            }
          };

          // Private methods
          function isTargetOutsideTooltip(event) {
            var tooltipElement = tipElement[0];
            var isInDOM = $document[0].body.contains(event.target);
            var isOutside = tooltipElement && !tooltipElement.contains(event.target);
            return isOutside && isInDOM;
          }

          function checkTrigger(event) {
            return options.trigger === "manual" || !element[0].contains(event.target);
          }

          function handleClick(event) {
            if (tipElement && isTargetOutsideTooltip(event) && checkTrigger(event)) {
              $tooltip.leave();
            }
          }

          function setTooltipPosition(tipPosition, elementPosition, position, arrow, rightPosition) {
            tipElement.css(tipPosition);
            var arrowStyles;
            var tipOffsetPosition = {
              top: tipElement[0].offsetTop,
              left: tipElement[0].offsetLeft
            };

            if (rightPosition) {
              arrowStyles = {
                "right": getTipArrowRightPosition(elementPosition) + "px",
                "left": "auto"
              };
            } else {
              arrowStyles = {
                "left": getTipArrowLeftPosition(elementPosition,
                  tipOffsetPosition, position) + "px"
              };
            }

            angular.element(arrow).css(arrowStyles);
          }

          function getTooltipNodeName() {
            var nodeElement;
            nodeElement = element[0] || element;
            return typeof nodeElement !== "string" ? nodeElement.nodeName.toLowerCase() :
              element.toLowerCase();
          }

          function getTooltipOptions() {
            var options;
            options = $tooltip.$options = angular.extend({}, defaults, config);
            return options;
          }

          function getTooltipScope() {
            var scope;
            scope = $tooltip.$scope = options.scope && options.scope.$new() ||
              $rootScope.$new();
            return scope;
          }

          function getPosition() {
            var target = options.target || element[0];
            var targetOffset = tooltipDimensions.offset(target);
            // tooltip appended to "<body>" element
            if (options.container === "body") {
              return targetOffset;
            }

            var targetPosition = tooltipDimensions.position(target);
            // container not specified, tooltip appended to target's parent
            if (!options.container) {
              return targetPosition;
            }

            // tooltip appended to a specified element that's neither "<body>", nor target's parent
            var containerOffset = tooltipDimensions.offset(tipContainer[0]);
            return {
              height: targetPosition.height,
              width: targetPosition.width,
              top: targetOffset.top - containerOffset.top,
              left: targetOffset.left - containerOffset.left
            };
          }

          function calcPositions(split, position, actualHeight, actualWidth, documentWidth) {
            var offset;
            switch (split[0]) {
              case "right":
                offset = {
                  top: position.top + position.height / 2 - actualHeight / 2,
                  left: position.left + position.width
                };
                break;
              case "bottom":
                var leftPosition = position.left + position.width / 2 -
                  actualWidth / 2;
                var totalWidth = leftPosition + actualWidth;
                if (totalWidth > documentWidth) {
                  leftPosition -= totalWidth - documentWidth + 5;
                }

                offset = {
                  top: position.top + position.height,
                  left: leftPosition >= 0 ? leftPosition : 5
                };
                break;
              case "left":
                offset = {
                  top: position.top + position.height / 2 - actualHeight / 2,
                  left: position.left - actualWidth
                };
                break;
              default:
                offset = {
                  top: position.top - actualHeight,
                  left: position.left + position.width / 2 - actualWidth / 2
                };
                break;
            }
            return offset;
          }

          function calcSpecificPositions(split, offset, position, actualWidth, actualHeight,
                                         arrowWidth) {
            function calcTopBottom() {
              switch (split[1]) {
                case "left":
                  if (position.width < arrowWidth) {
                    offset.left = position.left - actualWidth + arrowWidth +
                      position.width;
                  } else {
                    offset.left = position.left + position.width - actualWidth;
                  }
                  break;
                case "right":
                  if (position.width < arrowWidth) {
                    offset.left = position.left - position.width;
                  } else {
                    offset.left = position.left;
                  }
                  break;
                default:
                // nothing to do
              }
            }

            function calcLeftRight() {
              switch (split[1]) {
                case "top":
                  offset.top = position.top - actualHeight;
                  break;
                case "bottom":
                  offset.top = position.top + position.height;
                  break;
                default:
                // nothing to do
              }
            }

            if (split[0] === "top" || split[0] === "bottom") {
              calcTopBottom();
            } else if (split[0] === "left" || split[0] === "right") {
              calcLeftRight();
            }
          }

          function geOffset(placement, position, actualWidth, actualHeight, arrowWidth) {
            var split = placement.split("-");
            var documentWidth = document.body.offsetWidth;

            var offset = calcPositions(split, position, actualHeight, actualWidth,
              documentWidth);

            if (!split[1]) {
              return offset;
            }

            calcSpecificPositions(split, offset, position, actualWidth, actualHeight,
              arrowWidth);

            return offset;
          }

          function getTipArrowLeftPosition(elementPosition, tipPosition, position) {
            var tipArrowLeftPosition;
		    var borderLeftWidth;
            if (position === "left") {
			  borderLeftWidth = parseFloat(tooltipDimensions.css(tipElement[0], "borderLeftWidth"));
			  // subtract left border width of tipElement from the arrow position
			  // because absolute positioned element doesn't consider border
              tipArrowLeftPosition = elementPosition.left - tipPosition.left - (borderLeftWidth ? borderLeftWidth : 0);
            } else if (position === "bottom" || position === "top") {
              tipArrowLeftPosition = elementPosition.left + elementPosition.width / 2 -
                tipPosition.left;
            }
            return tipArrowLeftPosition;
          }

          function getTipArrowRightPosition(elementPosition) {
            return window.innerWidth - elementPosition.left - elementPosition.width / 2 - ARROW_WIDTH;
          }

          function checkElOffScreenY(tipElement, tipPosition, tipHeight, tipHeader, tipContent) {
            var wrapperHeight;
            var calculatedHeight;
            var top;
            var marginTop;
            var PADDING_BOTTOM_FROM_EDGE; // Min space between tooltip and bottom of the window

            PADDING_BOTTOM_FROM_EDGE = 10;
            marginTop = parseFloat(tipElement.css("margin-top")) || 0; // tooltip's margin-top prop
            top = tipPosition.top + marginTop + PADDING_BOTTOM_FROM_EDGE;
            wrapperHeight = window.innerHeight;

            if (options.container === "body") {
              top -= window.pageYOffset;
            }

            if (top + tipHeight > wrapperHeight) {
              calculatedHeight = wrapperHeight - top - tipHeader.prop("offsetHeight");
              tipContent.css("height", calculatedHeight + "px");
            } else {
              tipContent.css("height", "auto");
            }
          }

          function checkTipOffScreenX(tipPosition, elementPosition, position, arrow) {
            var canProceed = tipElement[0].getClientRects()[0] && (position === "bottom" || position === "top");
            if (!canProceed) {
              return;
            }
            tipElement[0].style.right = null;
            var tipIndentFromEdge = 5;
            var margin = SCROLL_WIDTH + tipIndentFromEdge;
            var offsetLeft = parseInt(tipElement[0].style.left);
            var tipElementRects = tipElement[0].getClientRects()[0];
            var tipWidth = Math.floor(window.innerWidth - tipElementRects.width - offsetLeft);
            var rightPosition = false;

            function setupTooltipBoundaries() {
              if (tipElementRects.left <= 0) {
                tipPosition.left = tipIndentFromEdge + "px";
              }

              if (tipElementRects.right >= window.innerWidth) {
                tipPosition.left = "";
                tipPosition.right = margin + "px";
              }

              if (!isNaN(offsetLeft) && tipWidth <= margin) {
                tipPosition.left = "auto";
                tipPosition.right = margin + "px";
                rightPosition = true;
              } else {
                tipPosition.right = "auto";
                rightPosition = false;
              }
            }

            function checkBackToFullScreen() {
              if (!containerInitialPositions.initialized) {
                containerInitialPositions.left = tipPosition.left;
                containerInitialPositions.right = tipPosition.right ? tipPosition.right : "";
                containerInitialPositions.initialized = true;
              }

            }

            setupTooltipBoundaries();
            checkBackToFullScreen();

            setTooltipPosition(tipPosition, elementPosition, position, arrow, rightPosition);
          }

          return $tooltip;
        }

        // Helper functions
        function findElement(query, element) {
          return angular.element((element || document).querySelectorAll(query));
        }

        function fetchTemplate(template) {
          return $q.when($templateCache.get(template) || $http.get(template))
            .then(function(res) {
              if (angular.isObject(res)) {
                $templateCache.put(template, res.data);
                return res.data;
              }
              return res;
            });
        }

        return tooltipFactory;
      }];
    }
  ]);
/**
 *
 * Licensed Materials – Property of IBM
 *
 * dimensions.service.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.tooltip")
	.factory("tooltipDimensions", [function() {
		"use strict";

		var fn = {};

		/**
		 * Test the element nodeName
		 * @param element
		 * @param name
		 */
		var nodeName = fn.nodeName = function(element, name) {
			return element.nodeName && element.nodeName.toLowerCase() === name.toLowerCase();
		};

		/**
		 * Returns the element computed style
		 * @param element
		 * @param prop
		 * @param extra
		 */
		fn.css = function(element, prop, extra) {
			var value;

			if (element.currentStyle) { //IE
				value = element.currentStyle[prop];
			} else if (window.getComputedStyle) {
				value = window.getComputedStyle(element)[prop];
			} else {
				value = element.style[prop];
			}

			return extra ? parseFloat(value) || 0 : value;
		};

		/**
		 * Provides read-only equivalent of jQuery's offset function:
		 * @required-by bootstrap-tooltip, bootstrap-affix
		 * @url http://api.jquery.com/offset/
		 * @param element
		 */
		fn.offset = function(element) {
			var boxRect = element.getBoundingClientRect();
			var docElement = element.ownerDocument;
			var calcWidth = boxRect.width || element.offsetWidth;
			var calcHeight = boxRect.height || element.offsetHeight;
			var calcTop = boxRect.top + (window.pageYOffset || docElement.documentElement.scrollTop) -
                (docElement.documentElement.clientTop || 0);
			var calcLeft = boxRect.left + (window.pageXOffset || docElement.documentElement.scrollLeft) -
                (docElement.documentElement.clientLeft || 0);

			return {
				width: calcWidth,
				height: calcHeight,
				top: calcTop,
				left: calcLeft
			};
		};

		/**
		 * Returns the closest, non-statically positioned offsetParent of a given element
		 * @required-by fn.position
		 * @param element
		 */
		var offsetParent = function offsetParentElement(element) {
			var docElement = element.ownerDocument;
			var offsetParent = element.offsetParent || docElement;

			if (nodeName(offsetParent, "#document")) {
				return docElement.documentElement;
			}
			while (offsetParent && !nodeName(offsetParent, "html") &&
					fn.css(offsetParent, "position") === "static") {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElement.documentElement;
		};

		/**
		 * Provides read-only equivalent of jQuery's position function
		 * @required-by bootstrap-tooltip, bootstrap-affix
		 * @url http://api.jquery.com/offset/
		 * @param element
		 */
		fn.position = function(element) {
			var offsetParentRect = {top: 0, left: 0},
				offsetParentElement,
				offset;

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is it's only offset parent
			if (fn.css(element, "position") === "fixed") {
				// We assume that getBoundingClientRect is available when computed position is fixed
				offset = element.getBoundingClientRect();
			} else {
				// Get *real* offsetParentElement
				offsetParentElement = offsetParent(element);

				// Get correct offsets
				offset = fn.offset(element);
				if (!nodeName(offsetParentElement, "html")) {
					offsetParentRect = fn.offset(offsetParentElement);
				}

				// Add offsetParent borders
				offsetParentRect.top += fn.css(offsetParentElement, "borderTopWidth", true);
				offsetParentRect.left += fn.css(offsetParentElement, "borderLeftWidth", true);
			}

			// Subtract parent offsets and element margins
			return {
				width: element.offsetWidth,
				height: element.offsetHeight,
				top: offset.top - offsetParentRect.top,
				left: offset.left - offsetParentRect.left
			};
		};

		/**
		 * Provides equivalent of jQuery's height function
		 * @required-by bootstrap-affix
		 * @url http://api.jquery.com/height/
		 * @param element
		 * @param outer
		 */
		fn.height = function(element, outer) {
			var value = element.offsetHeight;

			if (outer) {
				value += fn.css(element, "marginTop", true) + fn.css(element, "marginBottom", true);
			} else {
				value -= fn.css(element, "paddingTop", true) +
				fn.css(element, "paddingBottom", true) +
				fn.css(element, "borderTopWidth", true) +
				fn.css(element, "borderBottomWidth", true);
			}

			return value;
		};

		/**
		 * Provides equivalent of jQuery's width function
		 * @required-by bootstrap-affix
		 * @url http://api.jquery.com/width/
		 * @param element
		 * @param outer
		 */
		fn.width = function(element, outer) {
			var value = element.offsetWidth;

			if (outer) {
				value += fn.css(element, "marginLeft", true) + fn.css(element, "marginRight", true);
			} else {
				value -= fn.css(element, "paddingLeft", true) +
				fn.css(element, "paddingRight", true) +
				fn.css(element, "borderLeftWidth", true) +
				fn.css(element, "borderRightWidth", true);
			}

			return value;
		};

		return fn;
	}]);
(function(module) {
try {
  module = angular.module('x1.ui.tooltip');
} catch (e) {
  module = angular.module('x1.ui.tooltip', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tooltip/tooltip.html',
    '<div ng-show="title" role="tooltip" class="x1-ui-tooltip tooltip in"><div class="tooltip-arrow" aria-hidden="true"></div><div class="tooltip-inner" ng-class="{\'closable\': closeIcon}" ng-bind-html="title"></div><button ng-if="closeIcon" type="button" class="close" ng-click="close()" tabindex="0" name="tooltipCloseIcon" aria-label="{\'x1UiNgTooltip.CLOSE\' | translate}"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></div>');
}]);
})();
