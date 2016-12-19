/**
 *
 * Licensed Materials - Property of IBM
 *
 * macro-menu.controller.js
 *
 * (C) Copyright IBM Corporation 2016.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular.module("macro-menu")
	.controller("topMacroMenuCtrl", [
		"$rootScope",
		"$scope",
		"frameworkHomeSrv",
		"$state",
		"$log",
		"topMacroMenuService",
		"frameworkConstants",
		function ($rootScope, $scope, frameworkHomeSrv, $state,
				  $log,topMacroMenuService,frameworkConstants) {
			"use strict";


			$scope.topMacroMenuPopover = {};

			$scope.navItems =  getMacroMenuItems();

			$scope.toggleTopMacroMenu = function () {
				$scope.isTopMacroMenuOpen = !$scope.isTopMacroMenuOpen;
			};

			function getMacroMenuItems(){
				var macroMenuItemsResult;
				if ($scope.navItems){
					macroMenuItemsResult=[];
					for (var i=0; i< $scope.navItems.length; i++){
						if ($scope.navItems[i] && $scope.navItems[i].items &&
							$scope.navItems[i].items.length > 0){
							macroMenuItemsResult.push($scope.navItems[i]);
						}
					}
				}

				return macroMenuItemsResult;
			}


			$scope.$on(frameworkConstants.Events.TOP_MACRO_MENU_CHANGED, function () {
				doTopMacroMenu();
				$scope.hamburgerState = $scope.hamburgerState === "active" ? "" : "active";
			});

			function doTopMacroMenu() {
					$scope.toggleTopMacroMenu();
					passDataToTopMacroMenuPopover();
					showOrHideTopMacroMenu();
			}

			function passDataToTopMacroMenuPopover(){
				$scope.topMacroMenuPopover.$scope.navItems = $scope.navItems;
				$scope.topMacroMenuPopover.$scope.macroMenuColumnLimit=4;
				$scope.topMacroMenuPopover.$scope.goToUrl = function(itemState) {
					$state.go(itemState);
					$scope.isTopMacroMenuOpen=topMacroMenuService.hideTopMacroMenu($scope.topMacroMenuPopover);
				};

				$scope.topMacroMenuPopover.$scope.macroMenuColumnWidth = function(){
					var result="col-md-3";
					var popOverNavItems=$scope.topMacroMenuPopover.$scope.navItems;
					if (popOverNavItems.length && (popOverNavItems.length <=
						$scope.topMacroMenuPopover.$scope.macroMenuColumnLimit) ){
						result="col-md-" + (12/popOverNavItems.length);
					}
					return result;
				};
			}

			function showOrHideTopMacroMenu(){
				if ($scope.isTopMacroMenuOpen){
					$scope.isTopMacroMenuOpen=topMacroMenuService.showTopMacroMenu($scope.topMacroMenuPopover);
				}else{
					$scope.isTopMacroMenuOpen=topMacroMenuService.hideTopMacroMenu($scope.topMacroMenuPopover);
				}
			}

		}]);
