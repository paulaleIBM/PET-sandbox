/*-----------------------------------------------------------------------------/
 /                                                                             /
 / Licensed Materials – Property of IBM                                        /
 /                                                                             /
 / section-content-required.directive.js                                                 /
 /                                                                             /
 /(C) Copyright IBM Corporation 2016.                                          /
 / U.S. Government Users Restricted Rights:  Use, duplication or disclosure    /
 / restricted by GSA ADP Schedule Contract with IBM Corp.                      /
 /                                                                             /
 /*---------------------------------------------------------------------------*/


angular.module("macro-menu")
	.directive("topMacroMenu", ["$x1popover",
		function($x1popover) {
		return {
			restrict: "EA",
			link: function($scope, element) {
				$scope.topMacroMenuPopover = $x1popover(element, {
						placement: "bottom-right",
						trigger: "manual",
					    contentTemplate: "macro-menu/macro-menu.html",
					    outsideClick: true
					});
			},
			controller: "topMacroMenuCtrl"
		};
	}]);