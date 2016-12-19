/**
 *
 * Licensed Materials – Property of IBM
 *
 * utils.module.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */
angular.module("x1.ui.utils", [
    "ngSanitize"
]);

/*-----------------------------------------------------------------------------/
 /                                                                             /
 / Licensed Materials – Property of IBM                                        /
 /                                                                             /
 / utils.service.js                                                        /
 /                                                                             /
 /(C) Copyright IBM Corporation 2015.                                          /
 / U.S. Government Users Restricted Rights:  Use, duplication or disclosure    /
 / restricted by GSA ADP Schedule Contract with IBM Corp.                      /
 /                                                                             /
 /*---------------------------------------------------------------------------*/

angular
	.module("x1.ui.utils")
	.service("x1Utils", ["$translate", "$timeout", "$sanitize",
		function($translate, $timeout, $sanitize) {

		/**
		 * objectLength - Used to determine how many properties are assigned to one specific object (not to its
		 * 					prototype) perhaps for cases where an object is being used as a map where this function
		 * 					will effectively return the number of keys in the map
		 * 				(example usage: objectLength(hashMapObj)
		 * @param obj - The object whose properties count is in question
		 * @returns int - The number of properties (keys) on the object
		 */
		this.objectLength = function(obj) {
			var memberCount = 0;
			var member;
			for (member in obj) {
				if (obj.hasOwnProperty(member)) {
					memberCount++;
				}
			}
			return memberCount;
		};

		/**
		 * sanitizeText - method used to take text and parse. Used to catch errors in bad parsing of text during
		 * sanitize processs and displaying error message.
 		 */
		this.sanitizeText = function(text) {
			try {
				return this.parseHTML($sanitize(text));
			} catch (error) {
				return (error.message || error);
			}
		};

		/**
		 * parseHTML - method used to take text and parse it to filter out any malicious text(scripts).
 		 * @param text - Takes in text which need to be parsed.
		 * @returns {element} - returns a unique ID for html elements.
		 */
		this.parseHTML = function(text) {
			var element = document.createElement("span");
			element.innerHTML = text;
			return element.innerHTML;
		};

			/**
		 * translateKey - Convenience method for translation cases where the path in the translation file is
		 * 					constant but the last entry in the path is dynamic. If the entry is not found in the
		 * 					translation bundle, this function will return the second argument instead. For example,
		 * 					if you have a
		 * 					translation resource bundle path like "app.modal.header.error" and another like
		 * 					"app.modal.header.info", your application would always be using "app.modal.header" but
		 * 					would be dynamically assigning either "error" or "info" based on context. If that
		 * 					context was stored in the "type" prop
		 * 				(example usage: translateKey("app.modal.header", Modal.type)
		 * @param string - The first part of the resource bundle key's path (ex. "app.modal.header")
		 * @param string - The final part of the key's path (likely provided dynamically - ex. "error")
		 * @returns string - If a match is found in the translation file, it is returned here. Otherwise, the second
		 * 						argument provided to the function is returned "as is" (i.e. - in the example, this
		 * 						function would simply return "error"
		 */
		this.translateKey = function(resourceBundlePrefix, key) {
            var concatenatedKey;
            var translation;

            if (key && typeof key === "string") {
				key = key.trim();
			}

			if (resourceBundlePrefix) {
				resourceBundlePrefix += ".";
			}

			concatenatedKey = resourceBundlePrefix + key;

            try {
                translation = $translate.instant(concatenatedKey);
            } catch (err) {
                return key;
            }

			if (translation !== concatenatedKey && translation.indexOf(resourceBundlePrefix) === -1) {
				key = translation;
			}

			return key;
		};

		/**
		 * translate - Convenience method to access "translate.instant()" from the angular-translate library with
		 * 				fewer key strokes. Will clean/trim the passed in key.
		 * 				(example usage: translate("app.modal.header.error")
		 * @param string - The full key to lookup in the resource bundle (ex. "app.modal.header.error")
		 * @param obj - The object with interpolation params (ex. {userName: "Steve"})
		 * @returns string - If a match is found in the translation file, it is returned here. Otherwise, the entire
		 * 				key is returned "as-is"
		 */
		this.translate = function(key, params) {
			if (key  && typeof key === "string") {
				key = key.trim();
			}
			return $translate.instant(key, params);
		};

		/**
		 * isDefined - Check to ensure that a deeply nested namespace exists before you act on it
		 * 				(example usage: isDefined(reportDefinitionObj, "reportSchedule.aggregationAttrs.frequency")
		 * @param obj - The top-level object you are about to dig into
		 * @param {string} namespace - a string representing the path inside the object "foo.bar.up.down"
		 * @returns {boolean}
		 */
		this.isDefined = function(obj, namespace) {
			if (!obj) {
				return false;
			}
			var parent = obj;
			var parts = namespace.split(".") || [];
			for (var i=0; i<parts.length; i++) {
				if (typeof parent[parts[i]] === "undefined") {
					return false;
				}
				parent = parent[parts[i]];
			}
			return true;
		};

		/**
		 * ensureDefined - Ensure a namespace is defined before you start accessing/changing it. Will populate each
		 * path in the namespace with an empty object if it is not already defined.
		 * (example usage: isDefined(reportDefinitionObj, "reportSchedule.aggregationAttrs.frequency")
		 * @param obj - The top-level object you are about to dig into
		 * @param {string} namespace - a string representing the path inside the object "foo.bar.up.down"
		 * @returns {*|{}}
		 */
		this.ensureDefined = function(obj, namespace) {
			obj = obj || {};
			var parent = obj;
			var parts = namespace.split(".") || [];
			for (var i=0; i<parts.length; i++) {
				if (typeof parent[parts[i]] === "undefined") {
					parent[parts[i]] = {};
				}
				parent = parent[parts[i]];
			}
			return obj;
		};

		this.accentInsensitiveSearch = function(string) {
			if (!string) {
				return "";
			}
			var characterMap = {
				"\u00e0": "a", "\u00e1": "a", "\u00e2": "a", "\u00e3": "a", "\u00e4": "ae", "\u00e5": "a",
				"\u00e7": "c",
				"\u00e8": "e", "\u00e9": "e", "\u00ea": "e", "\u00eb": "e",
				"\u00ec": "i", "\u00ed": "i", "\u00ee": "i", "\u00ef": "i",
				"\u00f1": "n",
				"\u00f2": "o", "\u00f3": "o", "\u00f4": "o", "\u00f5": "o", "\u00f6": "oe", "\u00f8": "o",
				"\u00df": "ss",
				"\u00f9": "u", "\u00fa": "u", "\u00fb": "u", "\u00fc": "ue",
				"\u00ff": "y"
			};

			string = string.toLowerCase();

			var converted = [];
			for (var i = string.length - 1; i >= 0; i--) {
				converted.unshift(characterMap[string.charAt(i)] || string.charAt(i));
			}
			return converted.join("");
		};

		/**
		 * debounce - Returns a version of the passed function, which will hold over its execution until wait period
		 * have passed since the last function invoking.
		 * @param func {Function} - The original function
		 * @param wait {Number} - The period of time in milliseconds
		 * @param immediate {Boolean} - The boolean which will cause invoking function on leading-edge if it's true
		 * @returns {Function} - The debounced function
		 */
		this.debounce = function(func, wait, immediate) {
			var timeout;
			var args;
			var context;
			var timestamp;
			var result;

			return function() {
				var callNow;

				context = this;
				args = arguments;
				timestamp = Date.now();
				callNow = immediate && !timeout;

				if (!timeout) {
					timeout = $timeout(later, wait);
				}

				if (callNow) {
					result = func.apply(context, args);
					context = args = null;
				}

				return result;
			};

			function later() {
				var last = Date.now() - timestamp;

				if (last < wait && last >= 0) {
					timeout = $timeout(later, wait - last);
				} else {
					timeout = null;

					if (!immediate) {
						result = func.apply(context, args);

						if (!timeout) {
							context = args = null;
						}
					}
				}
			}
		};

		/**
		 * throttle - Returns a version of the passed function, which will call original function at most one time per
		 * every wait period if invoked time after time.
		 * @param func {Function} - The original function
		 * @param wait {Number} - The period of time in milliseconds
		 * @param options {Object} - {leading: false} will disable the leading-edge call, {trailing: false} will disable
		 * the trailing-edge call
		 * @returns {Function} - The throttled function
		 */
		this.throttle = function(func, wait, options) {
			var context;
			var args;
			var result;
			var timeout;
			var previous = 0;

			if (!options) {
				options = {};
			}

			return function() {
				var now = Date.now();
				var remaining;

				if (!previous && options.leading === false) {
					previous = now;
				}

				remaining = wait - (now - previous);
				context = this;
				args = arguments;

				if (remaining <= 0 || remaining > wait) {
					if (timeout) {
						$timeout.cancel(timeout);
						timeout = null;
					}

					previous = now;
					result = func.apply(context, args);

					if (!timeout) {
						context = args = null;
					}
				} else if (!timeout && options.trailing !== false) {
					timeout = $timeout(later, remaining);
				}

				return result;
			};

			function later() {
				previous = options.leading === false ? 0 : Date.now();
				timeout = null;
				result = func.apply(context, args);

				if (!timeout) {
					context = args = null;
				}
			}
		};
	}]);
/**
 *
 * Licensed Materials – Property of IBM
 *
 * autofocus.directive.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */
angular
	.module("x1.ui.utils")
	.directive("autoFocus",["$timeout", function($timeout) {
		return {
			restrict: "AC",
			link: function(_scope, _element) {
				$timeout(function(){
					_element[0].focus();
				}, 0);
			}
		};
	}]);
(function(module) {
try {
  module = angular.module('x1.ui.utils');
} catch (e) {
  module = angular.module('x1.ui.utils', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('utils/dialog-message-template.html',
    '<div class="modal-content">\n' +
    '	<section class="modal-body">\n' +
    '		<p translate="{{data.description}}" translate-value-code="{{data.code}}"></p>\n' +
    '		<p>{{data.message}}</p>\n' +
    '		<p ng-if="!data.hideErrCode" translate="{{data.codeLabel}}" translate-value-code="{{data.code}}"></p>\n' +
    '	</section>\n' +
    '</div>');
}]);
})();
