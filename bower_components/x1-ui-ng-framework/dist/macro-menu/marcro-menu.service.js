/*-----------------------------------------------------------------------------/
 /                                                                             /
 / Licensed Materials – Property of IBM                                        /
 /                                                                             /
 / macro-menu.service.js                                                 /
 /                                                                             /
 /(C) Copyright IBM Corporation 2016.                                          /
 / U.S. Government Users Restricted Rights:  Use, duplication or disclosure    /
 / restricted by GSA ADP Schedule Contract with IBM Corp.                      /
 /                                                                             /
 /*---------------------------------------------------------------------------*/


angular.module("macro-menu")
	.service("topMacroMenuService", [

		function () {
			"use strict";


			this.hideTopMacroMenu = function(topMacroMenuPopover) {
				var isTopMacroMenuOpen=true;
				if(topMacroMenuPopover){
					topMacroMenuPopover.$scope.$hide();
					isTopMacroMenuOpen=false;
				}
				return isTopMacroMenuOpen;
			};

			this.showTopMacroMenu = function(topMacroMenuPopover) {
				var isTopMacroMenuOpen=false;
				if(topMacroMenuPopover){
					topMacroMenuPopover.$scope.$show();
					isTopMacroMenuOpen=true;
				}
				return isTopMacroMenuOpen;
			};

		}
	]);