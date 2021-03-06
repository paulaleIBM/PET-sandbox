/**
 *
 * Licensed Materials – Property of IBM
 *
 * loading-bee.module.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.loading-bee", []);
/**
 *
 * Licensed Materials – Property of IBM
 *
 * loading-bee.directive.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.loading-bee")
	.directive("x1LoadingBee", function() {
		"use strict";

		return {
			restrict: "EA",
			templateUrl: "loading-bee/loading-bee.html",
			scope: {
				size: "@?",
				color: "@?",
				animation: "@?"
			},
			link: function(scope, element) {
				/*
				 * init variables
				 * */
				var svgBee = element.children(),
					beePaths = svgBee.children().children(),
					size = scope.size,
					color = scope.color,
					animation = scope.animation || "still";

				/*
				* set size if diff from default
				* @default: 32px
				* */
				if (size !== "32px") {
					svgBee.css({height: size, width: size});
				}

				/*
				 * set color if diff from default
				 * @default: #4178BE // $brand-primary // $blue50
				 * */
				if (color !== "#4178BE") {
					beePaths.css({fill: color});
				}

				/*
				 * add animation class
				 * */
				if (animation === "busy") {
					svgBee.addClass("busy-bee");
				}
			}
		};
	});
(function(module) {
try {
  module = angular.module('x1.ui.loading-bee');
} catch (e) {
  module = angular.module('x1.ui.loading-bee', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('loading-bee/loading-bee.html',
    '<svg version="1.1" class="x1-loading-bee" x="0px" y="0px" viewbox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve"><g><circle class="loading-bee-fill" cx="12.5" cy="6.5" r="2.5"></circle><circle class="loading-bee-fill" cx="19.5" cy="6.5" r="2.5"></circle></g><g><path class="loading-bee-fill" d="M20.67,13c-0.701-1.842-2.479-3-4.67-3s-3.969,1.158-4.669,3H20.67z"></path><rect class="loading-bee-fill" x="11" y="15" width="10" height="3"></rect><path class="loading-bee-fill" d="M11,20v2.827c0,0.06,0.015,0.114,0.017,0.173h9.967C20.985,22.941,21,22.886,21,22.827V20H11z"></path><path class="loading-bee-fill" d="M11.465,25c0.778,1.768,2.474,3,4.535,3s3.757-1.232,4.535-3H11.465z"></path></g><g class="bee-wings-1"><path class="loading-bee-fill" d="M21.316,11.614c1.803,0.865,6.514,3.056,8.531,4.023c1.248,0.687,2.094,2.014,2.094,3.539 c0,2.229-1.807,4.036-4.035,4.036c-0.49,0-2.924,0-3.833-2.268c-0.218-0.542-2.866-8.743-3.056-9.33H21.316z"></path><path class="loading-bee-fill" d="M10.684,11.614c-1.803,0.865-6.514,3.056-8.531,4.023c-1.248,0.687-2.094,2.014-2.094,3.539 c0,2.229,1.807,4.036,4.035,4.036c0.49,0,2.924,0,3.833-2.268c0.218-0.542,2.866-8.743,3.056-9.33H10.684z"></path></g><g class="bee-wings-2"><path class="loading-bee-fill" d="M10.982,11.614h-0.229c-1.382,0.865-4.99,3.055-6.535,4.024c-0.957,0.686-1.604,2.013-1.604,3.539 c0,2.229,1.383,4.035,3.09,4.035c0.377,0,2.24,0,2.937-2.268C8.809,20.4,10.838,12.2,10.982,11.614"></path><path class="loading-bee-fill" d="M21.018,11.614c0.145,0.586,2.174,8.787,2.341,9.33c0.696,2.268,2.56,2.268,2.937,2.268 c1.707,0,3.091-1.807,3.091-4.035c0-1.525-0.647-2.853-1.604-3.539c-1.545-0.969-5.153-3.159-6.535-4.024H21.018"></path></g><g class="bee-wings-3"><path class="loading-bee-fill" d="M10.982,11.614h-0.149c-0.901,0.865-3.257,3.055-4.265,4.024c-0.625,0.686-1.047,2.013-1.047,3.539 c0,2.229,0.902,4.035,2.018,4.035c0.244,0,1.461,0,1.916-2.268C9.563,20.4,10.889,12.2,10.982,11.614"></path><path class="loading-bee-fill" d="M21.018,11.614c0.094,0.586,1.419,8.787,1.527,9.33c0.455,2.268,1.672,2.268,1.916,2.268 c1.115,0,2.018-1.807,2.018-4.035c0-1.525-0.422-2.853-1.047-3.539c-1.008-0.969-3.363-3.159-4.265-4.024H21.018"></path></g></svg>');
}]);
})();
