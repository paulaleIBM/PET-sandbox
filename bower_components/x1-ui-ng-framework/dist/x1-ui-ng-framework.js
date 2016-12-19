/**
 *
 * Licensed Materials - Property of IBM
 *
 * framework.module.js
 *
 * (C) Copyright IBM Corporation 2016.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular.module("x1.ui.framework", [
	"ngSanitize",
	"pascalprecht.translate",
	"ui.bootstrap",
	"ui.router",
	"framework-home",
	"macro-menu",
	"x1.ui.utils",
	"x1.ui.top-navigation",
	"x1.ui.side-navigation",
	"x1.ui.loading-bee"
]);
/**
 *
 * Licensed Materials – Property of IBM
 *
 * macro-menu.module.js
 *
 * (C) Copyright IBM Corporation 2016.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular.module("macro-menu", ["x1.ui.tooltip",
    "x1.ui.popover"]);
/**
 *
 * Licensed Materials – Property of IBM
 *
 * framework-home.module.js
 *
 * (C) Copyright IBM Corporation 2016.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular.module("framework-home", ["x1.ui.tooltip", "x1.ui.popover",	"x1.ui.modal"]);
/**
 *
 * Licensed Materials - Property of IBM
 *
 * framework.config.js
 *
 * (C) Copyright IBM Corporation 2016.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular.module("x1.ui.framework")
	.config([
		"$urlRouterProvider", "$translateProvider",
		function ($urlRouterProvider, $translateProvider) {
			"use strict";

			$urlRouterProvider
				.otherwise("/");

			$translateProvider.fallbackLanguage("en_US");

			// Register a loader for the static files
			// So, the module will search missing translation tables under the specified urls.
			// Those urls are [prefix][langKey][suffix].
			$translateProvider.useStaticFilesLoader({
				prefix: "l10n/",
				suffix: ".json"
			});

			// Tell the module what language to use by default
			$translateProvider.preferredLanguage("en_US");

			//check for inserted HTML before attempting to resolve translation variables
			//to protect us from potential insertion attacks.
			$translateProvider.useSanitizeValueStrategy("escaped");

		}]);
/**
 *
 * Licensed Materials – Property of IBM
 *
 * framework.constants.js
 *
 * (C) Copyright IBM Corporation 2016.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular.module("x1.ui.framework")
	.constant("frameworkConstants", {
		"NAV_MENU": {
			"DASHBOARDS": "FW:Dashboards",
			"ANALYZE": "FW:Analyze",
			"CREATE": "FW:Create",
			"MANAGE": "FW:Manage",
			"ADMIN": "FW:Admin",
			"LIMITED_AVAILABILITY": "FW:Limited_Availability"
		},
		"NOT_ON_MENU": "FW:not_on_menu",
		"NAV_STATES": {
			"HOME": "frameworkHome",
			"DASHBOARDS": "frameworkHome.dashboards",
			"ANALYZE": "frameworkHome.analyze",
			"CREATE": "frameworkHome.create",
			"MANAGE": "frameworkHome.manage",
			"ADMIN": "frameworkHome.admin",
			"LIMITED_AVAILABILITY": "frameworkHome.limited"
		},
		"Events": {
			"TOP_MACRO_MENU_CHANGED": "framework.topMacroMenuChanged",
			"SHOW_BANNER": "framework:showBanner",
			"BANNER_CLICKED": "framework:bannerClick",
			"NAV_ITEMS_UPDATED": "framework:navItemsUpdated",
			"TOP_NAV_ITEMS_UPDATED": "framework:topNavItemsUpdated",
			"SUB_NAV_ITEMS_UPDATED": "framework:subNavItemsUpdated"
		}
	});
/**
 *
 * Licensed Materials - Property of IBM
 *
 * framework.run.js
 *
 * (C) Copyright IBM Corporation 2016.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */


angular.module("x1.ui.framework")
	.run([
		"$rootScope",
		"$state",
		function($rootScope,
				 $state
		) {
			"use strict";

			$rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
				$state.previousState = fromState;
				$state.previousParams = fromParams;
			});
		}]);
(function() {
    "use strict";
	angular
		.module("x1.ui.framework")
		.controller("BannerController", BannerController);

        BannerController.$inject = [
        	"$rootScope",
        	"$timeout",
        	"$scope",
        	"BannerService",
	        "frameworkConstants"
        ];

        function BannerController($rootScope, $timeout, $scope, BannerService, frameworkConstants) {
        	var vm = this;
        	var bannerTimeout;
			var animationTimeout;
			var nextBanner = null;

			var notificationListener = $rootScope.$on(frameworkConstants.Events.SHOW_BANNER, function(e, eData) {
				setUpBanner(eData);
			});

			vm.bannerVisible = false;
			vm.bannerClass = "bg-info";
			vm.banner = {};

			//bindable functions
			vm.toggleBanner = toggleBanner;
			vm.itemClicked = itemClicked;

			/**
			* Broadcast banner click event for child apps
			* @param Can be whatever child app needs
			*/
			function itemClicked(item){
				$rootScope.$broadcast(frameworkConstants.Events.BANNER_CLICKED, item);
				toggleBanner(false);
			}

			/**
			* Handles banner visiblity and animation timeouts
			* @param {Boolean} val Show or hide banner
			*/
			function toggleBanner(val) {
				if(val && vm.bannerVisible) {
					if(bannerTimeout) {
						$timeout.cancel(bannerTimeout);
					}
					hideBanner();
					if(animationTimeout) {
						$timeout.cancel(animationTimeout);
					}
					animationTimeout = $timeout(showBanner, 500);
				} else if(!val && vm.bannerVisible) {
					if(bannerTimeout) {
						$timeout.cancel(bannerTimeout);
					}
					hideBanner(true);
				} else if(val && !vm.bannerVisible) {
					showBanner();
				} else {
					return;
				}
			}

			/**
			* Hide banner, remove last shown item from queue, and see if another needs to be shown
			* @param {Boolean} check Optional boolean to flag whether to skip bannerCheck call
			*/
			function hideBanner(check) {
				vm.bannerVisible = false;
				BannerService.updateQueue(false);
				vm.banner = {};
				if(check) {
					bannerCheck();
				}
			}

			/**
			* Queue up notification and start process if not already started
			* @param {Array} notifications Array of notification objects
			* Sample notificationObj = {
			*	type: 'bg-info', -required-
			*	message: 'Displayed text', -not required- but nothing will be displayed
			*	linkText: 'Displayed link', -not required- but nothing will be displayed
			*								Click functionality determined by child app.
			*	optionalProperties: (anything that the child app may want passed back 
			*						property name is just an example)
			* }
			*/
			function setUpBanner(notifications) {
				BannerService.updateQueue(true, notifications);
				//if we dont want new notification to replace current one, add logic here
				bannerCheck();
			}

			/**
			* Check notification queue and show first item if queue exists
			*/
			function bannerCheck() {
				var notifications = BannerService.getQueue();
				var isCurrent = angular.equals(vm.banner, notifications[0]);
				//dont show same notification again
				if(notifications.length > 0 && !isCurrent) {
					nextBanner = angular.copy(notifications[0]);
					$timeout(function() {
						vm.toggleBanner(true);
					}, 0);
				} else if(notifications.length > 1 && isCurrent) {
					nextBanner = angular.copy(notifications[1]);
					$timeout(function() {
						vm.toggleBanner(true);
					}, 0);
				} else {
					return;
				}
			}

			/**
			* Show banner and begin timeout to hide
			*/
			function showBanner() {
				vm.banner = nextBanner;
				vm.bannerVisible = true;
				bannerTimeout = $timeout(function() {
					hideBanner(true);
				}, 10000);
			}

			$scope.$on("$destroy", function() {
				notificationListener();
				$timeout.cancel();
			});

		}
})();
(function() {
	"use strict";
	angular
		.module("x1.ui.framework")
		.directive("fwBanner", fwBanner);

		function fwBanner() {
			return {
				scope: true,
				restrict: "EA",
				replace: false,
				templateUrl: "banner/banner.html",
				controller: "BannerController",
				controllerAs: "vm"
			};
		}
})();
(function() {
    "use strict";
    angular
        .module("x1.ui.framework")
        .factory("BannerService", BannerService);

        function BannerService() {
            var notificationQueue = [];

            var service = {
                updateQueue: updateQueue,
                getQueue: getQueue
            };

            return service;

            /**
            * Simple notification tracking
            * @param {Boolean} addItem Add or remove item from queue
            * @param {Array} notificationArr Array of notifiaction objects to be added
            */
            function updateQueue(addItem, notificationArr) {
                if(addItem) {
                    for(var i = 0, len = notificationArr.length; i < len; i += 1) {
                        if(!notificationCheck(notificationArr[i])) {
                            notificationQueue.push(notificationArr[i]);
                        }
                    }
                } else {
                    if(notificationQueue.length > 0) {
                        notificationQueue.shift();
                    } else {
                        return;
                    }
                }
            }

            function getQueue() {
                return notificationQueue;
            }

            /**
            * Prevent duplication notifications
            * @param {Object} notification
            * @return {Boolean}
            */
            function notificationCheck(notification) {
                for(var i = 0, len = notificationQueue.length; i < len; i += 1) {
                    if(angular.equals(notificationQueue[i], notification)) {
                        return true;
                    }
                }

                return false;
            }
        }
})();
(function() {
	"use strict";
	angular
		.module("x1.ui.framework")
		.directive("fwBreadCrumbs", fwBreadCrumbs);

		fwBreadCrumbs.$inject = [
			"$rootScope",
			"$state",
			"BreadcrumbsService",
			"x1Utils",
			"x1.ui.side-navigation.constant"
		];

		function fwBreadCrumbs($rootScope, $state, BreadcrumbsService, x1Utils, SideNavConstants) {
			var directive = {
				scope: false,
				restrict: "EA",
				replace: false,
				templateUrl: "breadcrumbs/breadcrumbs.html",
				link: linkFunc
			};

			return directive;

			function linkFunc(scope) {
				scope.data = {};
				scope.data.breadcrumbs = BreadcrumbsService.generateCrumbs($state.current);
				//ensure breadcrumbs display correct path based on sidenav selection
				var sideNavListener = $rootScope.$on(SideNavConstants.EVENTS.sideNavItemClicked, function(e, item) {
					if(item.stateConfig && item.stateConfig.data && item.stateConfig.data.parentMenu) {
						BreadcrumbsService.resetStates(item.stateConfig.data.parentMenu);
					}
				});

				/**
				 * Best effort to return a translated string rather than a raw state name
				 *
				 * States with translated names can assign the translated string value to data.displayName
				 * States setup in a config() block can't pre-translate. They provide their translation key in data.name
				 * @param {Object} breadcrumb
				 * @returns {string} translated state name (if available) or raw state name
				 */
				scope.getDisplayName = function(breadcrumb) {
					if (breadcrumb.data && breadcrumb.data.displayName) {
						return breadcrumb.data.displayName;
					}

					if (breadcrumb.data && breadcrumb.data.name) {
						var translatedName = x1Utils.translate(breadcrumb.data.name);

						if (translatedName !== breadcrumb.data.name) {
							breadcrumb.data.displayName = translatedName;
							return breadcrumb.data.displayName;
						}
						return breadcrumb.data.name;
					}
					return breadcrumb.name;
				};

				scope.changeState = function(targetState) {
					$state.go(targetState.name, $state.params);
				};

				scope.$on("$stateChangeSuccess", function(event, toState) {
					scope.data.breadcrumbs = BreadcrumbsService.generateCrumbs(toState);
				});

				scope.$on("$destroy", function() {
					sideNavListener();
				});
			}
		}
})();
(function() {
    "use strict";

    angular
        .module("x1.ui.framework")
        .factory("BreadcrumbsService", breadcrumbsService);

        breadcrumbsService.$inject = [ "$state" ];

        function breadcrumbsService($state) {
            var stateList = [];
            var service = {
                resetStates: resetStates,
                generateCrumbs: generateCrumbs
            };

            return service;

            /**
            * Clear previous states and insert sidenav parent state.
            * This ensures that anytime an item is click in the sidenav, the
            * breadcrumbs will start with the parent state > clicked items state
            * @param {Object} targetParentState
            */
            function resetStates(targetParentState) {
                stateList = [targetParentState];
            }

            /**
            * Unshift relevant states into an array. Relevant meaning states that were
            * marked as parentStates through custom object within the state object.
            * @param {Object} currentState State object
            * @return {Array} crumbsArray Array of relevant states
            */
            function generateCrumbs(currentState) {
                storeStates(currentState);
                var crumbsArray = [currentState];
                var setState = currentState;
                do {
                    var nextObj = hasParent(setState);
                    if(nextObj.nextState) {
                        crumbsArray.unshift(nextObj.nextState);
                        setState = nextObj.nextState;
                    }
                }
                while(nextObj.getParent);

                return crumbsArray;
            }


            /**
            * Keep track of last 5(for now) visited states. If state is already
            * in array push it to end of array so that there are not duplicates.
            * @param {Object} state Current state object
            */
            function storeStates(state) {
                //check if new state is already in list
                var inArr = arrayCheck(state.name);
                if(inArr) {
                    //if so remove and push to end of array
                    stateList.splice(inArr, 1);
                }

                stateList.push(state);
                if(stateList.length > 5) {
                    stateList.shift();
                }
            }

            /**
            * Checks if the state in question has parent states and if so check if
            * the last visited parent state also has a parent state.
            * stateSettings = {
            *   "nextState": null or a state object,
            *   "getParent": Boolean
            * }
            * @param {Object} state State object
            * @return {Object} stateSettings See above
            */
            function hasParent(state) {
                var stateSettings = {
                    "nextState": null,
                    "getParent": false
                };

                if(state.hasOwnProperty("data") && state.data.parentStates) {
                    var parents = state.data.parentStates;
                    var visited = [];
                    //handle multiple possible parents
                    if(parents.length > 1) {
                        var chosenOne = null;
                        //match parents list against previous 5 states by creating array of indices
                        for(var i = 0, len = parents.length; i < len; i += 1) {
                            var matchIndex = arrayCheck(parents[i]);
                            if(matchIndex) {
                                visited.push(matchIndex);
                            }                            
                        }

                        /* if more than one parent is found in previous 5 states get/add
                         parent with highest index(i.e. most recently visited) */
                        if(visited.length > 1) {
                            chosenOne = stateList[getHighestVal(visited)];    
                        } else if(visited.length === 1) {
                            chosenOne = stateList[visited[0]];
                        } else {
                            //grab first listed parent
                            chosenOne = $state.get(parents[0]);
                            backfillStates(state.name, chosenOne);
                        }

                        if(chosenOne) {
                            stateSettings = {
                                "nextState": chosenOne,
                                "getParent": (chosenOne.hasOwnProperty("data") && chosenOne.data.parentStates)
                            };
                        }
                    } else {
                        //check for null states on items not in side menu(see framework-home.service addToMenu)
                        if(parents[0]) {
                            var statesParent = $state.get(parents[0]);
                            stateSettings = {
                                "nextState": statesParent,
                                "getParent": (statesParent.hasOwnProperty("data") && statesParent.data.parentStates)
                            };

                            //check if statesParent has been visited
                            if(!arrayCheck(parents[0])) {
                                backfillStates(state.name, statesParent);
                            }
                        }


                    }
                }

                return stateSettings;
            }

            function getHighestVal(arr) {
                return Math.max.apply(null, arr);
            }

            /**
            * Utility function to find matching object index
            * @param {String} stateName
            * @return {Int/Boolean} match Returns false if no match found or 
            * the index position of the matched name
            */
            function arrayCheck(stateName) {
                var match = false;
                for(var i = 0, len = stateList.length; i < len; i += 1) {
                    if(stateList[i].name === stateName) {
                        match = i;
                        break;
                    }
                }

                return match;
            }

            /**
            * Insert parent state into stateList right before target state
            * @param {String} targetStateName State name currently targeted by calling function
            * @param {Object} insertState State object to be inserted into visited state array
            */
            function backfillStates(targetStateName, insertState) {
                var targetIndex = arrayCheck(targetStateName);
                stateList.splice(targetIndex, 0, insertState);
                if(stateList.length > 5) {
                    stateList.shift();
                }
            }
        }
})();
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

angular
	.module("x1.ui.framework")
	.factory("logoutSrv", ["$http", "$q", "$log", function($http, $q, $log) {
		"use strict";

		return {

			"doLogout": function() {

				var deferred = $q.defer();

				$http.post("/api/journey/users/logout")
					.then(function(result) {
						$log.debug("logoutSrv call:  ", result);
						deferred.resolve();

					}, function(error) {
						deferred.reject(error);
					});
				return deferred.promise;
			}

		};
	}
	]);

(function() {
    "use strict";
	angular
		.module("x1.ui.framework")
		.controller("OrgSwitchController", OrgSwitchController);

        OrgSwitchController.$inject = [
        	"$rootScope",
        	"$scope",
        	"frameworkHomeSrv"
        ];

        function OrgSwitchController($rootScope, $scope, frameworkHomeSrv) {
        	var vm = this;
        	var originalOrgId = null;

			vm.showLoading = true;
			vm.orgArray = [];
			vm.selectedOrg = null;

			$scope.data.getOrgs().then(function(resp) {
				vm.orgArray = resp.data;
				var userData = frameworkHomeSrv.getUser();
				originalOrgId = userData.orgId;
				for(var i = 0, len = vm.orgArray.length; i < len; i += 1) {
					if(vm.orgArray[i].orgId === originalOrgId) {
						$scope.data.selectedOrg = vm.orgArray[i];
						$scope.data.selectedOrg.selected = true;
						break;
					}
				}
				vm.showLoading = false;
			});

			vm.selectOrg = function(org) {
				$scope.$parent.options.actionDisabled = (org.orgId === originalOrgId);
				if(org.orgId !== $scope.data.selectedOrg.orgId) {
					$scope.data.selectedOrg.selected = false;
					org.selected = true;
					$scope.data.selectedOrg = org;
				}
			};

		}
})();
(function() {
    "use strict";

    angular
        .module("x1.ui.framework")
        .factory("SubNavWidgetsService", subNavWidgetsService);

        subNavWidgetsService.$inject = [ "$state" ];

        function subNavWidgetsService($state) {
            var service = {
                setVisibility: setVisibility
            };

            return service;

            /**
            * Set visibility flag for directives in subnav
            * @param {Array} widgets Array of widget objs
            */
            function setVisibility(widgets) {
                for(var i = 0, len = widgets.length; i < len; i += 1) {
                    var w = widgets[i];
                    if(w.validStates) {
                        w.makeVisible = inArray(w.validStates);
                    } else {
                        w.makeVisible = w.makeVisible ? w.makeVisible : true;
                    }
                }
            }

            /**
            * Utility function to match valid states to current state
            * @param {Array} states Array state names relevant to current widget
            * @return {Boolean} exists If current state matches one of the valid states
            * for current widget
            */
            function inArray(states) {
                var exists = false;
                for(var i = 0, len = states.length; i < len; i += 1) {
                    if($state.includes(states[i])) {
                        exists = true;
                        break;
                    }
                }

                return exists;
            }
        }
})();
(function() {
	"use strict";
	angular
		.module("x1.ui.framework")
		.directive("fwTopLevel", fwTopLevel);

		fwTopLevel.$inject = [
			"$compile"
		];

		function fwTopLevel($compile) {
			var directive = {
				scope: {
					item: "="
				},
				restrict: "EA",
				template: "",
				link: linkFunc
			};

			return directive;

			function linkFunc(scope, element) {
				element.replaceWith($compile(scope.item)(scope));
			}			
		}
})();
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
/**
 *
 * Licensed Materials – Property of IBM
 *
 * framework-home.config.js
 *
 * (C) Copyright IBM Corporation 2016.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular.module("framework-home")
	.provider("frameworkCreateStates", function createStates($stateProvider) {
		this.$get = function() {
				return {
					addState: function(stateName, stateConfig) {
						$stateProvider.state(stateName, stateConfig);
					}
				};
			};
		})
	.config([
		"$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("frameworkHome", {
					url: "",
					templateUrl: "home/framework-home.html",
					controller: "frameworkHomeCtrl"
				})
				.state("frameworkHome.dashboards", {
					url: "/dashboards",
					data: {
						"name": "x1UiNgFramework.NAV.DASHBOARDS",
						"dummyLink": true
					}
				})
				.state("frameworkHome.analyze", {
					url: "/analyze",
					data: {
						"name": "x1UiNgFramework.NAV.ANALYZE",
						"dummyLink": true
					}
				})
				.state("frameworkHome.create", {
					url: "/create",
					data: {
						"name": "x1UiNgFramework.NAV.CREATE",
						"dummyLink": true
					}
				})
				.state("frameworkHome.manage", {
					url: "/manage",
					data: {
						"name": "x1UiNgFramework.NAV.MANAGE",
						"dummyLink": true
					}
				})
				.state("frameworkHome.admin", {
					url: "/admin",
					data: {
						"name": "x1UiNgFramework.NAV.ADMIN",
						"dummyLink": true
					}
				})
				.state("frameworkHome.limited", {
					url: "/limited",
					data: {
						"name": "x1UiNgFramework.NAV.LIMITED_AVAILABILITY",
						"dummyLink": true
					}
			});
		}]);
/**
 *
 * Licensed Materials - Property of IBM
 *
 * framework-home.controller.js
 *
 * (C) Copyright IBM Corporation 2016.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular.module("framework-home")
	.controller("frameworkHomeCtrl", [
		"$rootScope",
		"$scope",
		"frameworkHomeSrv",
		"SubNavWidgetsService",
		"x1Utils",
		"$state",
		"$window",
		"$log",
		"x1.ui.popover.events",
		"frameworkConstants",
		"logoutSrv",
		"x1Modal",
		function ($rootScope, $scope, frameworkHomeSrv, SubNavWidgetsService, x1Utils,$state,
				  $window,$log,popoverEvent,frameworkConstants,logoutSrv, x1Modal) {
			"use strict";

			/*if you wants to open side nav menu, just set
			 $scope.isSideNavOpen = true;
			 $scope.topMacroMenuOption= false;
			 if you wants to open top macro menu, just set
			 $scope.isSideNavOpen = false;
			 $scope.topMacroMenuOption= true ;
			*/
			$scope.isSideNavOpen = true;
			$scope.topMacroMenuOption= false;

			$scope.navItems = frameworkHomeSrv.getNavItems();
			$scope.topLevel = frameworkHomeSrv.getTopLevel();
			$scope.subNavWidgets = frameworkHomeSrv.getSecondaryLevel();

			//initial setup of subnav widgets
			initSubNav();

			//refresh subnav widgets
			var stateListener = $rootScope.$on("$stateChangeSuccess", function() {
                initSubNav();
            });

			$scope.productTitle = frameworkHomeSrv.getProductTitle();
			$scope.showBetaBadge = function() {
				if (frameworkHomeSrv.getShowBetaBadge()) {
					return  x1Utils.translate("x1UiNgFramework.BETA");
				}
				return "";
			};
			$scope.version = "";
			//$scope.user = $rootScope.user;
			$scope.user = frameworkHomeSrv.getUser();

			//HelpDocsService.setDefaultToken(constant.defaultState);

			$scope.toggleMenu = function () {
				$scope.isSideNavOpen = !$scope.isSideNavOpen;
			};


			$scope.$on("x1.ui.top-navigation.hamburger.click", function () {
				if ($scope.topMacroMenuOption){
					$scope.$emit(frameworkConstants.Events.TOP_MACRO_MENU_CHANGED);
				} else{
					$scope.toggleMenu();
				}
				$scope.hamburgerState = $scope.hamburgerState === "active" ? "" : "active";
			});


			$scope.logout = function () {
				$scope.$broadcast(popoverEvent.CANCEL_POPOVER);
				$state.go("frameworkHome");
				logoutSrv.doLogout().then(function(result){
					$window.open(result, "CSA_Logout");
				}, function(error) {
					$log.error("Unable to generate Doc Url: ", error);
				});
			};

			$scope.getHelpItems = function() {
				return frameworkHomeSrv.getHelpItems();
			};

			$scope.switchOrg = function() {
				var handler = frameworkHomeSrv.getOrgCallback();
				var orgModal = {
					options: {
						headerText: x1Utils.translate("x1UiNgFramework.ORG_MODAL.HEADER"),
						showCloseButton: false,
						actionButtonText: x1Utils.translate("x1UiNgFramework.ORG_MODAL.OK"),
						actionDisabled: true
					},
					settings: {
						size: "xl",
						contentTemplate: "org-switch/org-switch.html"
					},
					data: {
						getOrgs: handler
					}
				};
				x1Modal.show(orgModal).then(function(data) {
					//user selected an org and now the originating app needs to know about it
					var sendSelected = frameworkHomeSrv.getSelectedOrgCallback();
					sendSelected(data);
				});
			};

			function initSubNav() {
				var widgets = frameworkHomeSrv.getSecondaryLevel();
                SubNavWidgetsService.setVisibility(widgets);
			}


			//listeners
			var navListener = $rootScope.$on(
				frameworkConstants.Events.NAV_ITEMS_UPDATED,
				function(event, navItems){
					$scope.navItems = navItems;
			});

			var topNavListener = $rootScope.$on(
				frameworkConstants.Events.TOP_NAV_ITEMS_UPDATED,
				function(event, navItems){
					$scope.topnavItems = navItems;
			});

			var subNavListener = $rootScope.$on(
				frameworkConstants.Events.SUB_NAV_ITEMS_UPDATED,
				function(event, navItems){
					$scope.subnavItems = navItems;
			});

			//clean up
			$scope.$on("destroy", function() {
				stateListener();
				navListener();
				topNavListener();
				subNavListener();
			});

		}]);

/**
 *
 * Licensed Materials - Property of IBM
 *
 * framework-home.service.js
 *
 * (C) Copyright IBM Corporation 2016.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular.module("framework-home")
	.service("frameworkHomeSrv", [
		"x1Utils",
		"frameworkConstants",
		"frameworkCreateStates",
		"$rootScope",
		function (x1Utils, frameworkConstants, frameworkCreateStates, $rootScope) {
			"use strict";

			var navItems, dashboardsMenu, analyzeMenu, createMenu, manageMenu, adminMenu, limitedMenu,
				productTitle, helpItems;
			var showBetaBadge = false;
			var user = {firstName:""};
			var orgCallBack = null;
			var selectedCallBack = null;

			this.setTranslatedMenuHeaderLabels = function(navHeaderTranslationsPassed) {
				dashboardsMenu.name = navHeaderTranslationsPassed.dashboardsTitle;
				analyzeMenu.name = navHeaderTranslationsPassed.analyzeTitle;
				createMenu.name = navHeaderTranslationsPassed.createTitle;
				manageMenu.name = navHeaderTranslationsPassed.manageTitle;
				adminMenu.name = navHeaderTranslationsPassed.adminTitle;
				limitedMenu.name = navHeaderTranslationsPassed.limitedTitle;
			};

			dashboardsMenu = {
				"name": x1Utils.translate("x1UiNgFramework.NAV.DASHBOARDS"),
				"header": true,
				"state": frameworkConstants.NAV_STATES.DASHBOARDS,
				"id": "dashboards",
				"class": "dashboards empty-header",
				"icon": "",
				"isOpen": true,
				"active": true,
				"items": []
			};

			analyzeMenu = {
				"name": x1Utils.translate("x1UiNgFramework.NAV.ANALYZE"),
				"header": true,
				"state": frameworkConstants.NAV_STATES.ANALYZE,
				"id": "analyze",
				"class": "analyze empty-header",
				"icon": "",
				"isOpen": true,
				"items": []
			};

			createMenu = {
				"name": x1Utils.translate("x1UiNgFramework.NAV.CREATE"),
				"header": true,
				"state": frameworkConstants.NAV_STATES.CREATE,
				"id": "create",
				"class": "create empty-header",
				"icon": "",
				"isOpen": true,
				"items": []
			};

			manageMenu = {
				"name": x1Utils.translate("x1UiNgFramework.NAV.MANAGE"),
				"header": true,
				"state": frameworkConstants.NAV_STATES.MANAGE,
				"id": "manage",
				"class": "manage empty-header",
				"icon": "",
				"isOpen": true,
				"items": []
			};

			adminMenu =  {
				"name": x1Utils.translate("x1UiNgFramework.NAV.ADMIN"),
				"header": true,
				"state": frameworkConstants.NAV_STATES.ADMIN,
				"id": "admim",
				"class": "plan empty-header",
				"icon": "",
				"isOpen": true,
				"items": []
			};

			limitedMenu =  {
				"name": x1Utils.translate("x1UiNgFramework.NAV.LIMITED_AVAILABILITY"),
				"header": true,
				"state": frameworkConstants.NAV_STATES.LIMITED_AVAILABILITY,
				"id": "limited",
				"class": "limited empty-header",
				"icon": "",
				"isOpen": true,
				"items": []
			};

			navItems = [dashboardsMenu, analyzeMenu, createMenu, manageMenu, adminMenu, limitedMenu];
			helpItems = [];

			var topLevel = [];
			var secondaryLevel = [];

			function createStates(parentMenu, items) {
				var i, len=items.length;

				for (i=0; i<len; i++) {
					var item = items[i];
					x1Utils.ensureDefined(item, "stateConfig.data");
					if(!item.stateConfig.data.parentStates) {
						item.stateConfig.data.parentStates = [ parentMenu.state ];
					} else {
						//for any items that may have multiple parentsMenus - allows for correct breadcrumb population
						item.stateConfig.data.parentMenu = parentMenu.state;
					}
					item.stateConfig.data.name = item.stateConfig.data.name || item.name;
				}
				for (i=0; i<len; i++) {
					frameworkCreateStates.addState(items[i].state, items[i].stateConfig);
				}

			}

			/**
			 * Navigation Services
			 */

			this.getNavItems = function() {
				return navItems;
			};

			this.getUser = function() {
				return user;
			};

			this.setUser = function(userObject) {
				user = angular.extend(user, userObject);
			};

			this.addToFramework = function(menuGroup, items) {
				var menu;

				switch(menuGroup) {
					case frameworkConstants.NAV_MENU.DASHBOARDS:
						menu = dashboardsMenu;
						break;
					case frameworkConstants.NAV_MENU.ANALYZE:
						menu = analyzeMenu;
						break;
					case frameworkConstants.NAV_MENU.CREATE:
						menu = createMenu;
						break;
					case frameworkConstants.NAV_MENU.MANAGE:
						menu = manageMenu;
						break;
					case frameworkConstants.NAV_MENU.ADMIN:
						menu = adminMenu;
						break;
					case frameworkConstants.NAV_MENU.LIMITED_AVAILABILITY:
						menu = limitedMenu;
						break;
					case frameworkConstants.NOT_ON_MENU:
						menu = { 
							"state": null,
							"items": [] 
						};
						break;
					default:
						return;
				}

				menu.items = menu.items.concat(items);
				createStates(menu, items);
				$rootScope.$emit(frameworkConstants.Events.NAV_ITEMS_UPDATED, navItems);
			};

			this.getDashboardsMenu = function() {
				return dashboardsMenu;
			};

			this.getAnalyzeMenu = function() {
				return analyzeMenu;
			};

			this.getCreateMenu = function() {
				return createMenu;
			};

			this.getManageMenu = function() {
				return manageMenu;
			};

			this.getAdminMenu = function() {
				return adminMenu;
			};

			this.getLimitedMenu = function() {
				return limitedMenu;
			};

			// add widgets to top nav
			this.addToTopNav = function(newItems) {
				topLevel = topLevel.concat(newItems);
			};

			this.getTopLevel = function() {
				return topLevel;
			};

			//add widgets to subnav
			this.addToSubNav = function(newItems) {
				secondaryLevel = secondaryLevel.concat(newItems);
			};

			this.getSecondaryLevel = function() {
				return secondaryLevel;
			};

			/**
			 * Configuration Services
			 */

			this.setProductTitle = function(title) {
				productTitle = title;
			};

			this.getProductTitle = function() {
				return productTitle;
			};

			this.setShowBetaBadge = function(show) {
				showBetaBadge = show;
			};

			this.getShowBetaBadge = function() {
				return showBetaBadge;
			};

			this.addHelpItem = function(displayTitle, callback) {
				helpItems.push({name: displayTitle, handleClick: callback});
			};

			this.getHelpItems = function() {
				return helpItems;
			};

			this.setOrgCallback = function(callback) {
				orgCallBack = callback;
			};

			this.getOrgCallback = function() {
				return orgCallBack;
			};

			this.setSelectedOrgCallback = function(callback) {
				selectedCallBack = callback;
			};

			this.getSelectedOrgCallback = function() {
				return selectedCallBack;
			};
		}
	]);
(function(module) {
try {
  module = angular.module('x1.ui.framework');
} catch (e) {
  module = angular.module('x1.ui.framework', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('banner/banner.html',
    '<div ng-if="vm.bannerVisible" ng-class="[vm.banner.type, { true: \'menu-open\' }[$parent.isSideNavOpen]]" class="framework-banner">\n' +
    '    <span class="glyphicon glyphicon-md" ng-class="{ \'bg-success\': \'glyphicon-ok-circle\', \'bg-info\': \'glyphicon-info-circle\' }[vm.banner.type]"></span>\n' +
    '    <span class="banner-msg">\n' +
    '        <span>{{vm.banner.message}}</span>\n' +
    '        <span class="btn-link" ng-if="vm.banner.linkText" ng-click="vm.itemClicked(vm.banner)" ng-bind="vm.banner.linkText | translate"></span>\n' +
    '    </span>\n' +
    '    <span class="glyphicon glyphicon-xs glyphicon-remove" ng-click="vm.toggleBanner(false)"></span>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.framework');
} catch (e) {
  module = angular.module('x1.ui.framework', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('breadcrumbs/breadcrumbs.html',
    '<ul class="framework-breadcrumbs" role="menu">\n' +
    '	<li role="menu-item" ng-repeat="crumb in data.breadcrumbs" ng-class="{ \'last-crumb\': $last }">\n' +
    '		<a class="crumb-dummy" ng-if="!$last && crumb.data.dummyLink">{{getDisplayName(crumb)}}</a>\n' +
    '		<a class="crumb" ng-if="!$last && !crumb.data.dummyLink" ng-click="changeState(crumb)">\n' +
    '			{{getDisplayName(crumb)}}</a>\n' +
    '		<span ng-if="!$last" class="glyphicon glyphicon-chevron-right"></span>\n' +
    '        <a class="crumb-selected" ng-if="$last">{{getDisplayName(crumb)}}</a>\n' +
    '	</li>\n' +
    '</ul>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.framework');
} catch (e) {
  module = angular.module('x1.ui.framework', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('help-menu/help-popover.html',
    '<div class="top-nav-menu list-group" role="menu">\n' +
    '    <a ng-repeat="item in getHelpItems()" class="list-group-item" name="{{item.name | translate}}" ng-class="{\'disabled\': item.disabled, \'active\': item.active}" role="menuitem" aria-label="{{item.name | translate}}" ng-click="item.handleClick()" ng-keydown="accessibleClick(item, $event)" translate="{{item.name}}"></a>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.framework');
} catch (e) {
  module = angular.module('x1.ui.framework', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('profile/profile-popover.html',
    '<ul class="top-nav-menu list-group" role="menu">\n' +
    '    <li class="list-group-item">\n' +
    '        <a ng-click="logout()" class="item-name list-item-link" translate="x1UiNgFramework.PROFILE.LOGOUT"></a>\n' +
    '    </li>\n' +
    '</ul>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.framework');
} catch (e) {
  module = angular.module('x1.ui.framework', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('org-switch/org-switch.html',
    '<div ng-controller="OrgSwitchController as vm">\n' +
    '	<div class="framework-org-switch">\n' +
    '		<div class="org-list-container">\n' +
    '			<x1-loading-bee size="60px" ng-show="vm.showLoading"></x1-loading-bee>\n' +
    '			<div ng-repeat="org in vm.orgArray" class="org-list-item" ng-click="vm.selectOrg(org)">\n' +
    '				<div class="org-list-item-selection" ng-class="{\'empty\':!org.selected, \'selected\':org.selected }"></div>\n' +
    '				<div class="item-text-wrap">\n' +
    '					<div class="org-list-item-name"><strong>{{org.orgName}}</strong></div>\n' +
    '					<div class="org-list-item-id">{{org.orgId}}</div>\n' +
    '				</div>\n' +
    '			</div>\n' +
    '		</div>\n' +
    '	</div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.framework');
} catch (e) {
  module = angular.module('x1.ui.framework', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('user-menu/user-popover.html',
    '<div class="top-nav-menu list-group" role="menu">\n' +
    '    <a class="list-group-item switch-org" ng-click="switchOrg()" translate="x1UiNgFramework.USER_MENU.SWITCH"></a>\n' +
    '    <!-- <a class="list-group-item" ng-class="logout" ng-click="logout()">Logout</a> -->\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.framework');
} catch (e) {
  module = angular.module('x1.ui.framework', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('macro-menu/macro-menu.html',
    '<div class="macro-menu-popover">\n' +
    '    <div class="row">\n' +
    '            <div ng-class="macroMenuColumnWidth()" ng-repeat="macroMenuItem in navItems | limitTo: macroMenuColumnLimit ">\n' +
    '                <span class="macro-menu-header-title">{{macroMenuItem.name | translate}}</span>\n' +
    '                <hr class="divider">\n' +
    '              <ul>\n' +
    '                <li ng-repeat="item in macroMenuItem.items">\n' +
    '                    <a ng-click="goToUrl(item.state)">\n' +
    '                        {{item.name| translate}}\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '              </ul>\n' +
    '            </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.framework');
} catch (e) {
  module = angular.module('x1.ui.framework', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/framework-home.html',
    '<div class="top-macro-menu-popover">\n' +
    '       <span top-macro-menu>\n' +
    '	   </span>\n' +
    '</div>\n' +
    '<x1-top-navigation hamburger="true" brand="{{productTitle | translate}}" brand-href="#/workspaces" brand-badge="{{showBetaBadge()}}" data-html2canvas-ignore="true" is-mobile="true" is-hamburger-active="true" is-fixed="true">\n' +
    '	<span ng-if="user" class="client-details" data-trigger="hover" data-placement="bottom" data-title="{{user.masterSubClientIds[user.clientId]}} - {{user.clientId}}" x1-tooltip>\n' +
    '		<span class="navbar-brand">{{user.masterSubClientIds[user.clientId]}}</span>\n' +
    '	</span>\n' +
    '	<span ng-if="user.orgName" class="navbar-org">\n' +
    '		<span class="glyphicon glyphicon-chevron-right"></span>\n' +
    '		<span class="org-text">{{user.orgName}}</span>\n' +
    '	</span>\n' +
    '\n' +
    '	<h2 id="x1TopNavSecondary" class="sr-only" translate="x1UiNgTopNavigationDemo.NAV2_SR_TEXT"></h2>\n' +
    '	<ul class="nav navbar-nav navbar-right framework-nav" role="menu" aria-labelledby="x1TopNavSecondary">\n' +
    '		<li role="menuitem" ng-repeat="item in topLevel">\n' +
    '			<fw-top-level item="item"></fw-top-level>\n' +
    '		</li>\n' +
    '		<li role="menuitem" class="dropdown">\n' +
    '			<a x1-popover="{placement: \'bottom-left\'}" placement="bottom-left" outside-click="true" content-template="user-menu/user-popover.html" class="main-menu-link user-menu">\n' +
    '				<span class="glyphicon glyphicon-md glyphicon-user pull-left" aria-hidden="true"></span>\n' +
    '				<span class="user-actions-nav-text">{{ user.firstName }}</span>\n' +
    '			</a>\n' +
    '		</li>\n' +
    '		<li role="menuitem">\n' +
    '			<a x1-popover="{placement: \'bottom-left\'}" placement="bottom-left" outside-click="true" content-template="help-menu/help-popover.html" class="main-menu-link">\n' +
    '			<!--<a x1-popover="helpPover" outside-click="true" class="main-menu-link">-->\n' +
    '				<span class="glyphicon glyphicon-md glyphicon-question-circle pull-left" aria-hidden="true"></span>\n' +
    '				<span translate="x1UiNgFramework.CONTROLS.HELP"></span>\n' +
    '			</a>\n' +
    '		</li>\n' +
    '		<li role="menuitem">\n' +
    '			<span class="sr-only" translate="x1UiNgFramework.IBM"></span>\n' +
    '			<span class="navbar-brand ibm-logo" title="{{\'x1UiNgFramework.IBM\' | translate}}"></span>\n' +
    '		</li>\n' +
    '	</ul>\n' +
    '</x1-top-navigation>\n' +
    '<x1-side-navigation is-open="isSideNavOpen" items="navItems" is-stateful="true" data-html2canvas-ignore="true"></x1-side-navigation>\n' +
    '<section class="banner-alerts" ng-class="{\'side-nav-open\': isSideNavOpen}" ng-if="alerts.length > 0">\n' +
    '	<alert ng-repeat="alert in alerts track by $index" type="{{alert[0].type}}" close="closeAlert($index)">\n' +
    '		<span class="glyphicon" ng-class="setIcon(alert[0])"></span>\n' +
    '		<ng-include src="\'alerts/alert-templates/\' + alert[0].localizationKey +\'.html\'"></ng-include>\n' +
    '	</alert>\n' +
    '</section>\n' +
    '<fw-banner class="banner-container"></fw-banner>\n' +
    '<div class="subnav" ng-class="{ \'menu-open\': isSideNavOpen }">\n' +
    '	<fw-bread-crumbs></fw-bread-crumbs>\n' +
    '	<ul class="nav navbar-nav navbar-right" role="menu">\n' +
    '		<li role="menuitem" ng-repeat="widg in subNavWidgets" ng-if="widg.makeVisible">\n' +
    '			<fw-top-level item="widg.widget"></fw-top-level>\n' +
    '		</li>\n' +
    '	</ul>\n' +
    '</div>\n' +
    '<section ui-view class="home-content" ng-class="{\'menu-open\': isSideNavOpen}"><p> </p>\n' +
    '</section>\n' +
    '<section class="contextual-help" ng-if="appMetadata.showContextualHelp && contextualHelpMessage" ng-mouseenter="contextualHelpMouseEnter()" ng-mouseleave="contextualHelpMouseLeave()">\n' +
    '	<div class="contextual-help-icon-container">\n' +
    '		<div class="glyphicon glyphicon-lg glyphicon-question-circle contextual-help-icon"></div>\n' +
    '	</div>\n' +
    '	<p class="contextual-help-message" translate="ibmda.contextualHelpMessages.{{contextualHelpMessage}}"></p>\n' +
    '	<span class="glyphicon glyphicon-xs glyphicon-remove contextual-help-close" ng-click="closeContextualHelpMessage()"></span>\n' +
    '	<div class="contextual-help-controls"><a ng-click="closeContextualHelpMessage()" translate="ibmda.contextualHelpMessages.okGotIt"></a> | <a ng-click="dontShowContextualHelpForever()" translate="ibmda.contextualHelpMessages.dontShowTheseAgain"></a></div>\n' +
    '</section>\n' +
    '');
}]);
})();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyYW1ld29yay5tb2R1bGUuanMiLCJtYWNyby1tZW51L21hY3JvLW1lbnUubW9kdWxlLmpzIiwiaG9tZS9mcmFtZXdvcmstaG9tZS5tb2R1bGUuanMiLCJmcmFtZXdvcmsuY29uZmlnLmpzIiwiZnJhbWV3b3JrLmNvbnN0YW50cy5qcyIsImZyYW1ld29yay5ydW4uanMiLCJiYW5uZXIvYmFubmVyLmNvbnRyb2xsZXIuanMiLCJiYW5uZXIvYmFubmVyLmRpcmVjdGl2ZS5qcyIsImJhbm5lci9iYW5uZXIuc2VydmljZS5qcyIsImJyZWFkY3J1bWJzL2JyZWFkY3J1bWJzLmRpcmVjdGl2ZS5qcyIsImJyZWFkY3J1bWJzL2JyZWFkY3J1bWJzLnNlcnZpY2UuanMiLCJwcm9maWxlL2xvZ291dC5zZXJ2aWNlLmpzIiwib3JnLXN3aXRjaC9vcmctc3dpdGNoLmNvbnRyb2xsZXIuanMiLCJzdWJuYXYtd2lkZ2V0cy9zdWJuYXYtd2lkZ2V0cy5zZXJ2aWNlLmpzIiwidG9wbGV2ZWwvdG9wbGV2ZWwuZGlyZWN0aXZlLmpzIiwibWFjcm8tbWVudS9tYWNyby1tZW51LmRpcmVjdGl2ZS5qcyIsIm1hY3JvLW1lbnUvbWFyY28tbWVudS5jb250cm9sbGVyLmpzIiwibWFjcm8tbWVudS9tYXJjcm8tbWVudS5zZXJ2aWNlLmpzIiwiaG9tZS9mcmFtZXdvcmstaG9tZS5jb25maWcuanMiLCJob21lL2ZyYW1ld29yay1ob21lLmNvbnRyb2xsZXIuanMiLCJob21lL2ZyYW1ld29yay1ob21lLnNlcnZpY2UuanMiLCJiYW5uZXIvYmFubmVyLmh0bWwiLCJicmVhZGNydW1icy9icmVhZGNydW1icy5odG1sIiwiaGVscC1tZW51L2hlbHAtcG9wb3Zlci5odG1sIiwicHJvZmlsZS9wcm9maWxlLXBvcG92ZXIuaHRtbCIsIm9yZy1zd2l0Y2gvb3JnLXN3aXRjaC5odG1sIiwidXNlci1tZW51L3VzZXItcG9wb3Zlci5odG1sIiwibWFjcm8tbWVudS9tYWNyby1tZW51Lmh0bWwiLCJob21lL2ZyYW1ld29yay1ob21lLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6IngxLXVpLW5nLWZyYW1ld29yay5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIExpY2Vuc2VkIE1hdGVyaWFscyAtIFByb3BlcnR5IG9mIElCTVxuICpcbiAqIGZyYW1ld29yay5tb2R1bGUuanNcbiAqXG4gKiAoQykgQ29weXJpZ2h0IElCTSBDb3Jwb3JhdGlvbiAyMDE2LlxuICogVS5TLiBHb3Zlcm5tZW50IFVzZXJzIFJlc3RyaWN0ZWQgUmlnaHRzOiAgVXNlLCBkdXBsaWNhdGlvbiBvciBkaXNjbG9zdXJlXG4gKiByZXN0cmljdGVkIGJ5IEdTQSBBRFAgU2NoZWR1bGUgQ29udHJhY3Qgd2l0aCBJQk0gQ29ycC5cbiAqXG4gKi9cblxuYW5ndWxhci5tb2R1bGUoXCJ4MS51aS5mcmFtZXdvcmtcIiwgW1xuXHRcIm5nU2FuaXRpemVcIixcblx0XCJwYXNjYWxwcmVjaHQudHJhbnNsYXRlXCIsXG5cdFwidWkuYm9vdHN0cmFwXCIsXG5cdFwidWkucm91dGVyXCIsXG5cdFwiZnJhbWV3b3JrLWhvbWVcIixcblx0XCJtYWNyby1tZW51XCIsXG5cdFwieDEudWkudXRpbHNcIixcblx0XCJ4MS51aS50b3AtbmF2aWdhdGlvblwiLFxuXHRcIngxLnVpLnNpZGUtbmF2aWdhdGlvblwiLFxuXHRcIngxLnVpLmxvYWRpbmctYmVlXCJcbl0pOyIsIi8qKlxuICpcbiAqIExpY2Vuc2VkIE1hdGVyaWFscyDigJMgUHJvcGVydHkgb2YgSUJNXG4gKlxuICogbWFjcm8tbWVudS5tb2R1bGUuanNcbiAqXG4gKiAoQykgQ29weXJpZ2h0IElCTSBDb3Jwb3JhdGlvbiAyMDE2LlxuICogVS5TLiBHb3Zlcm5tZW50IFVzZXJzIFJlc3RyaWN0ZWQgUmlnaHRzOiAgVXNlLCBkdXBsaWNhdGlvbiBvciBkaXNjbG9zdXJlXG4gKiByZXN0cmljdGVkIGJ5IEdTQSBBRFAgU2NoZWR1bGUgQ29udHJhY3Qgd2l0aCBJQk0gQ29ycC5cbiAqXG4gKi9cblxuYW5ndWxhci5tb2R1bGUoXCJtYWNyby1tZW51XCIsIFtcIngxLnVpLnRvb2x0aXBcIixcbiAgICBcIngxLnVpLnBvcG92ZXJcIl0pOyIsIi8qKlxuICpcbiAqIExpY2Vuc2VkIE1hdGVyaWFscyDigJMgUHJvcGVydHkgb2YgSUJNXG4gKlxuICogZnJhbWV3b3JrLWhvbWUubW9kdWxlLmpzXG4gKlxuICogKEMpIENvcHlyaWdodCBJQk0gQ29ycG9yYXRpb24gMjAxNi5cbiAqIFUuUy4gR292ZXJubWVudCBVc2VycyBSZXN0cmljdGVkIFJpZ2h0czogIFVzZSwgZHVwbGljYXRpb24gb3IgZGlzY2xvc3VyZVxuICogcmVzdHJpY3RlZCBieSBHU0EgQURQIFNjaGVkdWxlIENvbnRyYWN0IHdpdGggSUJNIENvcnAuXG4gKlxuICovXG5cbmFuZ3VsYXIubW9kdWxlKFwiZnJhbWV3b3JrLWhvbWVcIiwgW1wieDEudWkudG9vbHRpcFwiLCBcIngxLnVpLnBvcG92ZXJcIixcdFwieDEudWkubW9kYWxcIl0pOyIsIi8qKlxuICpcbiAqIExpY2Vuc2VkIE1hdGVyaWFscyAtIFByb3BlcnR5IG9mIElCTVxuICpcbiAqIGZyYW1ld29yay5jb25maWcuanNcbiAqXG4gKiAoQykgQ29weXJpZ2h0IElCTSBDb3Jwb3JhdGlvbiAyMDE2LlxuICogVS5TLiBHb3Zlcm5tZW50IFVzZXJzIFJlc3RyaWN0ZWQgUmlnaHRzOiAgVXNlLCBkdXBsaWNhdGlvbiBvciBkaXNjbG9zdXJlXG4gKiByZXN0cmljdGVkIGJ5IEdTQSBBRFAgU2NoZWR1bGUgQ29udHJhY3Qgd2l0aCBJQk0gQ29ycC5cbiAqXG4gKi9cblxuYW5ndWxhci5tb2R1bGUoXCJ4MS51aS5mcmFtZXdvcmtcIilcblx0LmNvbmZpZyhbXG5cdFx0XCIkdXJsUm91dGVyUHJvdmlkZXJcIiwgXCIkdHJhbnNsYXRlUHJvdmlkZXJcIixcblx0XHRmdW5jdGlvbiAoJHVybFJvdXRlclByb3ZpZGVyLCAkdHJhbnNsYXRlUHJvdmlkZXIpIHtcblx0XHRcdFwidXNlIHN0cmljdFwiO1xuXG5cdFx0XHQkdXJsUm91dGVyUHJvdmlkZXJcblx0XHRcdFx0Lm90aGVyd2lzZShcIi9cIik7XG5cblx0XHRcdCR0cmFuc2xhdGVQcm92aWRlci5mYWxsYmFja0xhbmd1YWdlKFwiZW5fVVNcIik7XG5cblx0XHRcdC8vIFJlZ2lzdGVyIGEgbG9hZGVyIGZvciB0aGUgc3RhdGljIGZpbGVzXG5cdFx0XHQvLyBTbywgdGhlIG1vZHVsZSB3aWxsIHNlYXJjaCBtaXNzaW5nIHRyYW5zbGF0aW9uIHRhYmxlcyB1bmRlciB0aGUgc3BlY2lmaWVkIHVybHMuXG5cdFx0XHQvLyBUaG9zZSB1cmxzIGFyZSBbcHJlZml4XVtsYW5nS2V5XVtzdWZmaXhdLlxuXHRcdFx0JHRyYW5zbGF0ZVByb3ZpZGVyLnVzZVN0YXRpY0ZpbGVzTG9hZGVyKHtcblx0XHRcdFx0cHJlZml4OiBcImwxMG4vXCIsXG5cdFx0XHRcdHN1ZmZpeDogXCIuanNvblwiXG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gVGVsbCB0aGUgbW9kdWxlIHdoYXQgbGFuZ3VhZ2UgdG8gdXNlIGJ5IGRlZmF1bHRcblx0XHRcdCR0cmFuc2xhdGVQcm92aWRlci5wcmVmZXJyZWRMYW5ndWFnZShcImVuX1VTXCIpO1xuXG5cdFx0XHQvL2NoZWNrIGZvciBpbnNlcnRlZCBIVE1MIGJlZm9yZSBhdHRlbXB0aW5nIHRvIHJlc29sdmUgdHJhbnNsYXRpb24gdmFyaWFibGVzXG5cdFx0XHQvL3RvIHByb3RlY3QgdXMgZnJvbSBwb3RlbnRpYWwgaW5zZXJ0aW9uIGF0dGFja3MuXG5cdFx0XHQkdHJhbnNsYXRlUHJvdmlkZXIudXNlU2FuaXRpemVWYWx1ZVN0cmF0ZWd5KFwiZXNjYXBlZFwiKTtcblxuXHRcdH1dKTsiLCIvKipcbiAqXG4gKiBMaWNlbnNlZCBNYXRlcmlhbHMg4oCTIFByb3BlcnR5IG9mIElCTVxuICpcbiAqIGZyYW1ld29yay5jb25zdGFudHMuanNcbiAqXG4gKiAoQykgQ29weXJpZ2h0IElCTSBDb3Jwb3JhdGlvbiAyMDE2LlxuICogVS5TLiBHb3Zlcm5tZW50IFVzZXJzIFJlc3RyaWN0ZWQgUmlnaHRzOiAgVXNlLCBkdXBsaWNhdGlvbiBvciBkaXNjbG9zdXJlXG4gKiByZXN0cmljdGVkIGJ5IEdTQSBBRFAgU2NoZWR1bGUgQ29udHJhY3Qgd2l0aCBJQk0gQ29ycC5cbiAqXG4gKi9cblxuYW5ndWxhci5tb2R1bGUoXCJ4MS51aS5mcmFtZXdvcmtcIilcblx0LmNvbnN0YW50KFwiZnJhbWV3b3JrQ29uc3RhbnRzXCIsIHtcblx0XHRcIk5BVl9NRU5VXCI6IHtcblx0XHRcdFwiREFTSEJPQVJEU1wiOiBcIkZXOkRhc2hib2FyZHNcIixcblx0XHRcdFwiQU5BTFlaRVwiOiBcIkZXOkFuYWx5emVcIixcblx0XHRcdFwiQ1JFQVRFXCI6IFwiRlc6Q3JlYXRlXCIsXG5cdFx0XHRcIk1BTkFHRVwiOiBcIkZXOk1hbmFnZVwiLFxuXHRcdFx0XCJBRE1JTlwiOiBcIkZXOkFkbWluXCIsXG5cdFx0XHRcIkxJTUlURURfQVZBSUxBQklMSVRZXCI6IFwiRlc6TGltaXRlZF9BdmFpbGFiaWxpdHlcIlxuXHRcdH0sXG5cdFx0XCJOT1RfT05fTUVOVVwiOiBcIkZXOm5vdF9vbl9tZW51XCIsXG5cdFx0XCJOQVZfU1RBVEVTXCI6IHtcblx0XHRcdFwiSE9NRVwiOiBcImZyYW1ld29ya0hvbWVcIixcblx0XHRcdFwiREFTSEJPQVJEU1wiOiBcImZyYW1ld29ya0hvbWUuZGFzaGJvYXJkc1wiLFxuXHRcdFx0XCJBTkFMWVpFXCI6IFwiZnJhbWV3b3JrSG9tZS5hbmFseXplXCIsXG5cdFx0XHRcIkNSRUFURVwiOiBcImZyYW1ld29ya0hvbWUuY3JlYXRlXCIsXG5cdFx0XHRcIk1BTkFHRVwiOiBcImZyYW1ld29ya0hvbWUubWFuYWdlXCIsXG5cdFx0XHRcIkFETUlOXCI6IFwiZnJhbWV3b3JrSG9tZS5hZG1pblwiLFxuXHRcdFx0XCJMSU1JVEVEX0FWQUlMQUJJTElUWVwiOiBcImZyYW1ld29ya0hvbWUubGltaXRlZFwiXG5cdFx0fSxcblx0XHRcIkV2ZW50c1wiOiB7XG5cdFx0XHRcIlRPUF9NQUNST19NRU5VX0NIQU5HRURcIjogXCJmcmFtZXdvcmsudG9wTWFjcm9NZW51Q2hhbmdlZFwiLFxuXHRcdFx0XCJTSE9XX0JBTk5FUlwiOiBcImZyYW1ld29yazpzaG93QmFubmVyXCIsXG5cdFx0XHRcIkJBTk5FUl9DTElDS0VEXCI6IFwiZnJhbWV3b3JrOmJhbm5lckNsaWNrXCIsXG5cdFx0XHRcIk5BVl9JVEVNU19VUERBVEVEXCI6IFwiZnJhbWV3b3JrOm5hdkl0ZW1zVXBkYXRlZFwiLFxuXHRcdFx0XCJUT1BfTkFWX0lURU1TX1VQREFURURcIjogXCJmcmFtZXdvcms6dG9wTmF2SXRlbXNVcGRhdGVkXCIsXG5cdFx0XHRcIlNVQl9OQVZfSVRFTVNfVVBEQVRFRFwiOiBcImZyYW1ld29yazpzdWJOYXZJdGVtc1VwZGF0ZWRcIlxuXHRcdH1cblx0fSk7IiwiLyoqXG4gKlxuICogTGljZW5zZWQgTWF0ZXJpYWxzIC0gUHJvcGVydHkgb2YgSUJNXG4gKlxuICogZnJhbWV3b3JrLnJ1bi5qc1xuICpcbiAqIChDKSBDb3B5cmlnaHQgSUJNIENvcnBvcmF0aW9uIDIwMTYuXG4gKiBVLlMuIEdvdmVybm1lbnQgVXNlcnMgUmVzdHJpY3RlZCBSaWdodHM6ICBVc2UsIGR1cGxpY2F0aW9uIG9yIGRpc2Nsb3N1cmVcbiAqIHJlc3RyaWN0ZWQgYnkgR1NBIEFEUCBTY2hlZHVsZSBDb250cmFjdCB3aXRoIElCTSBDb3JwLlxuICpcbiAqL1xuXG5cbmFuZ3VsYXIubW9kdWxlKFwieDEudWkuZnJhbWV3b3JrXCIpXG5cdC5ydW4oW1xuXHRcdFwiJHJvb3RTY29wZVwiLFxuXHRcdFwiJHN0YXRlXCIsXG5cdFx0ZnVuY3Rpb24oJHJvb3RTY29wZSxcblx0XHRcdFx0ICRzdGF0ZVxuXHRcdCkge1xuXHRcdFx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0XHRcdCRyb290U2NvcGUuJG9uKFwiJHN0YXRlQ2hhbmdlU3VjY2Vzc1wiLCBmdW5jdGlvbihldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcykge1xuXHRcdFx0XHQkc3RhdGUucHJldmlvdXNTdGF0ZSA9IGZyb21TdGF0ZTtcblx0XHRcdFx0JHN0YXRlLnByZXZpb3VzUGFyYW1zID0gZnJvbVBhcmFtcztcblx0XHRcdH0pO1xuXHRcdH1dKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cdGFuZ3VsYXJcblx0XHQubW9kdWxlKFwieDEudWkuZnJhbWV3b3JrXCIpXG5cdFx0LmNvbnRyb2xsZXIoXCJCYW5uZXJDb250cm9sbGVyXCIsIEJhbm5lckNvbnRyb2xsZXIpO1xuXG4gICAgICAgIEJhbm5lckNvbnRyb2xsZXIuJGluamVjdCA9IFtcbiAgICAgICAgXHRcIiRyb290U2NvcGVcIixcbiAgICAgICAgXHRcIiR0aW1lb3V0XCIsXG4gICAgICAgIFx0XCIkc2NvcGVcIixcbiAgICAgICAgXHRcIkJhbm5lclNlcnZpY2VcIixcblx0ICAgICAgICBcImZyYW1ld29ya0NvbnN0YW50c1wiXG4gICAgICAgIF07XG5cbiAgICAgICAgZnVuY3Rpb24gQmFubmVyQ29udHJvbGxlcigkcm9vdFNjb3BlLCAkdGltZW91dCwgJHNjb3BlLCBCYW5uZXJTZXJ2aWNlLCBmcmFtZXdvcmtDb25zdGFudHMpIHtcbiAgICAgICAgXHR2YXIgdm0gPSB0aGlzO1xuICAgICAgICBcdHZhciBiYW5uZXJUaW1lb3V0O1xuXHRcdFx0dmFyIGFuaW1hdGlvblRpbWVvdXQ7XG5cdFx0XHR2YXIgbmV4dEJhbm5lciA9IG51bGw7XG5cblx0XHRcdHZhciBub3RpZmljYXRpb25MaXN0ZW5lciA9ICRyb290U2NvcGUuJG9uKGZyYW1ld29ya0NvbnN0YW50cy5FdmVudHMuU0hPV19CQU5ORVIsIGZ1bmN0aW9uKGUsIGVEYXRhKSB7XG5cdFx0XHRcdHNldFVwQmFubmVyKGVEYXRhKTtcblx0XHRcdH0pO1xuXG5cdFx0XHR2bS5iYW5uZXJWaXNpYmxlID0gZmFsc2U7XG5cdFx0XHR2bS5iYW5uZXJDbGFzcyA9IFwiYmctaW5mb1wiO1xuXHRcdFx0dm0uYmFubmVyID0ge307XG5cblx0XHRcdC8vYmluZGFibGUgZnVuY3Rpb25zXG5cdFx0XHR2bS50b2dnbGVCYW5uZXIgPSB0b2dnbGVCYW5uZXI7XG5cdFx0XHR2bS5pdGVtQ2xpY2tlZCA9IGl0ZW1DbGlja2VkO1xuXG5cdFx0XHQvKipcblx0XHRcdCogQnJvYWRjYXN0IGJhbm5lciBjbGljayBldmVudCBmb3IgY2hpbGQgYXBwc1xuXHRcdFx0KiBAcGFyYW0gQ2FuIGJlIHdoYXRldmVyIGNoaWxkIGFwcCBuZWVkc1xuXHRcdFx0Ki9cblx0XHRcdGZ1bmN0aW9uIGl0ZW1DbGlja2VkKGl0ZW0pe1xuXHRcdFx0XHQkcm9vdFNjb3BlLiRicm9hZGNhc3QoZnJhbWV3b3JrQ29uc3RhbnRzLkV2ZW50cy5CQU5ORVJfQ0xJQ0tFRCwgaXRlbSk7XG5cdFx0XHRcdHRvZ2dsZUJhbm5lcihmYWxzZSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qKlxuXHRcdFx0KiBIYW5kbGVzIGJhbm5lciB2aXNpYmxpdHkgYW5kIGFuaW1hdGlvbiB0aW1lb3V0c1xuXHRcdFx0KiBAcGFyYW0ge0Jvb2xlYW59IHZhbCBTaG93IG9yIGhpZGUgYmFubmVyXG5cdFx0XHQqL1xuXHRcdFx0ZnVuY3Rpb24gdG9nZ2xlQmFubmVyKHZhbCkge1xuXHRcdFx0XHRpZih2YWwgJiYgdm0uYmFubmVyVmlzaWJsZSkge1xuXHRcdFx0XHRcdGlmKGJhbm5lclRpbWVvdXQpIHtcblx0XHRcdFx0XHRcdCR0aW1lb3V0LmNhbmNlbChiYW5uZXJUaW1lb3V0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aGlkZUJhbm5lcigpO1xuXHRcdFx0XHRcdGlmKGFuaW1hdGlvblRpbWVvdXQpIHtcblx0XHRcdFx0XHRcdCR0aW1lb3V0LmNhbmNlbChhbmltYXRpb25UaW1lb3V0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YW5pbWF0aW9uVGltZW91dCA9ICR0aW1lb3V0KHNob3dCYW5uZXIsIDUwMCk7XG5cdFx0XHRcdH0gZWxzZSBpZighdmFsICYmIHZtLmJhbm5lclZpc2libGUpIHtcblx0XHRcdFx0XHRpZihiYW5uZXJUaW1lb3V0KSB7XG5cdFx0XHRcdFx0XHQkdGltZW91dC5jYW5jZWwoYmFubmVyVGltZW91dCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGhpZGVCYW5uZXIodHJ1ZSk7XG5cdFx0XHRcdH0gZWxzZSBpZih2YWwgJiYgIXZtLmJhbm5lclZpc2libGUpIHtcblx0XHRcdFx0XHRzaG93QmFubmVyKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qKlxuXHRcdFx0KiBIaWRlIGJhbm5lciwgcmVtb3ZlIGxhc3Qgc2hvd24gaXRlbSBmcm9tIHF1ZXVlLCBhbmQgc2VlIGlmIGFub3RoZXIgbmVlZHMgdG8gYmUgc2hvd25cblx0XHRcdCogQHBhcmFtIHtCb29sZWFufSBjaGVjayBPcHRpb25hbCBib29sZWFuIHRvIGZsYWcgd2hldGhlciB0byBza2lwIGJhbm5lckNoZWNrIGNhbGxcblx0XHRcdCovXG5cdFx0XHRmdW5jdGlvbiBoaWRlQmFubmVyKGNoZWNrKSB7XG5cdFx0XHRcdHZtLmJhbm5lclZpc2libGUgPSBmYWxzZTtcblx0XHRcdFx0QmFubmVyU2VydmljZS51cGRhdGVRdWV1ZShmYWxzZSk7XG5cdFx0XHRcdHZtLmJhbm5lciA9IHt9O1xuXHRcdFx0XHRpZihjaGVjaykge1xuXHRcdFx0XHRcdGJhbm5lckNoZWNrKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyoqXG5cdFx0XHQqIFF1ZXVlIHVwIG5vdGlmaWNhdGlvbiBhbmQgc3RhcnQgcHJvY2VzcyBpZiBub3QgYWxyZWFkeSBzdGFydGVkXG5cdFx0XHQqIEBwYXJhbSB7QXJyYXl9IG5vdGlmaWNhdGlvbnMgQXJyYXkgb2Ygbm90aWZpY2F0aW9uIG9iamVjdHNcblx0XHRcdCogU2FtcGxlIG5vdGlmaWNhdGlvbk9iaiA9IHtcblx0XHRcdCpcdHR5cGU6ICdiZy1pbmZvJywgLXJlcXVpcmVkLVxuXHRcdFx0Klx0bWVzc2FnZTogJ0Rpc3BsYXllZCB0ZXh0JywgLW5vdCByZXF1aXJlZC0gYnV0IG5vdGhpbmcgd2lsbCBiZSBkaXNwbGF5ZWRcblx0XHRcdCpcdGxpbmtUZXh0OiAnRGlzcGxheWVkIGxpbmsnLCAtbm90IHJlcXVpcmVkLSBidXQgbm90aGluZyB3aWxsIGJlIGRpc3BsYXllZFxuXHRcdFx0Klx0XHRcdFx0XHRcdFx0XHRDbGljayBmdW5jdGlvbmFsaXR5IGRldGVybWluZWQgYnkgY2hpbGQgYXBwLlxuXHRcdFx0Klx0b3B0aW9uYWxQcm9wZXJ0aWVzOiAoYW55dGhpbmcgdGhhdCB0aGUgY2hpbGQgYXBwIG1heSB3YW50IHBhc3NlZCBiYWNrIFxuXHRcdFx0Klx0XHRcdFx0XHRcdHByb3BlcnR5IG5hbWUgaXMganVzdCBhbiBleGFtcGxlKVxuXHRcdFx0KiB9XG5cdFx0XHQqL1xuXHRcdFx0ZnVuY3Rpb24gc2V0VXBCYW5uZXIobm90aWZpY2F0aW9ucykge1xuXHRcdFx0XHRCYW5uZXJTZXJ2aWNlLnVwZGF0ZVF1ZXVlKHRydWUsIG5vdGlmaWNhdGlvbnMpO1xuXHRcdFx0XHQvL2lmIHdlIGRvbnQgd2FudCBuZXcgbm90aWZpY2F0aW9uIHRvIHJlcGxhY2UgY3VycmVudCBvbmUsIGFkZCBsb2dpYyBoZXJlXG5cdFx0XHRcdGJhbm5lckNoZWNrKCk7XG5cdFx0XHR9XG5cblx0XHRcdC8qKlxuXHRcdFx0KiBDaGVjayBub3RpZmljYXRpb24gcXVldWUgYW5kIHNob3cgZmlyc3QgaXRlbSBpZiBxdWV1ZSBleGlzdHNcblx0XHRcdCovXG5cdFx0XHRmdW5jdGlvbiBiYW5uZXJDaGVjaygpIHtcblx0XHRcdFx0dmFyIG5vdGlmaWNhdGlvbnMgPSBCYW5uZXJTZXJ2aWNlLmdldFF1ZXVlKCk7XG5cdFx0XHRcdHZhciBpc0N1cnJlbnQgPSBhbmd1bGFyLmVxdWFscyh2bS5iYW5uZXIsIG5vdGlmaWNhdGlvbnNbMF0pO1xuXHRcdFx0XHQvL2RvbnQgc2hvdyBzYW1lIG5vdGlmaWNhdGlvbiBhZ2FpblxuXHRcdFx0XHRpZihub3RpZmljYXRpb25zLmxlbmd0aCA+IDAgJiYgIWlzQ3VycmVudCkge1xuXHRcdFx0XHRcdG5leHRCYW5uZXIgPSBhbmd1bGFyLmNvcHkobm90aWZpY2F0aW9uc1swXSk7XG5cdFx0XHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHR2bS50b2dnbGVCYW5uZXIodHJ1ZSk7XG5cdFx0XHRcdFx0fSwgMCk7XG5cdFx0XHRcdH0gZWxzZSBpZihub3RpZmljYXRpb25zLmxlbmd0aCA+IDEgJiYgaXNDdXJyZW50KSB7XG5cdFx0XHRcdFx0bmV4dEJhbm5lciA9IGFuZ3VsYXIuY29weShub3RpZmljYXRpb25zWzFdKTtcblx0XHRcdFx0XHQkdGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHZtLnRvZ2dsZUJhbm5lcih0cnVlKTtcblx0XHRcdFx0XHR9LCAwKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyoqXG5cdFx0XHQqIFNob3cgYmFubmVyIGFuZCBiZWdpbiB0aW1lb3V0IHRvIGhpZGVcblx0XHRcdCovXG5cdFx0XHRmdW5jdGlvbiBzaG93QmFubmVyKCkge1xuXHRcdFx0XHR2bS5iYW5uZXIgPSBuZXh0QmFubmVyO1xuXHRcdFx0XHR2bS5iYW5uZXJWaXNpYmxlID0gdHJ1ZTtcblx0XHRcdFx0YmFubmVyVGltZW91dCA9ICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGhpZGVCYW5uZXIodHJ1ZSk7XG5cdFx0XHRcdH0sIDEwMDAwKTtcblx0XHRcdH1cblxuXHRcdFx0JHNjb3BlLiRvbihcIiRkZXN0cm95XCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRub3RpZmljYXRpb25MaXN0ZW5lcigpO1xuXHRcdFx0XHQkdGltZW91dC5jYW5jZWwoKTtcblx0XHRcdH0pO1xuXG5cdFx0fVxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXHRhbmd1bGFyXG5cdFx0Lm1vZHVsZShcIngxLnVpLmZyYW1ld29ya1wiKVxuXHRcdC5kaXJlY3RpdmUoXCJmd0Jhbm5lclwiLCBmd0Jhbm5lcik7XG5cblx0XHRmdW5jdGlvbiBmd0Jhbm5lcigpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHNjb3BlOiB0cnVlLFxuXHRcdFx0XHRyZXN0cmljdDogXCJFQVwiLFxuXHRcdFx0XHRyZXBsYWNlOiBmYWxzZSxcblx0XHRcdFx0dGVtcGxhdGVVcmw6IFwiYmFubmVyL2Jhbm5lci5odG1sXCIsXG5cdFx0XHRcdGNvbnRyb2xsZXI6IFwiQmFubmVyQ29udHJvbGxlclwiLFxuXHRcdFx0XHRjb250cm9sbGVyQXM6IFwidm1cIlxuXHRcdFx0fTtcblx0XHR9XG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoXCJ4MS51aS5mcmFtZXdvcmtcIilcbiAgICAgICAgLmZhY3RvcnkoXCJCYW5uZXJTZXJ2aWNlXCIsIEJhbm5lclNlcnZpY2UpO1xuXG4gICAgICAgIGZ1bmN0aW9uIEJhbm5lclNlcnZpY2UoKSB7XG4gICAgICAgICAgICB2YXIgbm90aWZpY2F0aW9uUXVldWUgPSBbXTtcblxuICAgICAgICAgICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlUXVldWU6IHVwZGF0ZVF1ZXVlLFxuICAgICAgICAgICAgICAgIGdldFF1ZXVlOiBnZXRRdWV1ZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgKiBTaW1wbGUgbm90aWZpY2F0aW9uIHRyYWNraW5nXG4gICAgICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gYWRkSXRlbSBBZGQgb3IgcmVtb3ZlIGl0ZW0gZnJvbSBxdWV1ZVxuICAgICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBub3RpZmljYXRpb25BcnIgQXJyYXkgb2Ygbm90aWZpYWN0aW9uIG9iamVjdHMgdG8gYmUgYWRkZWRcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiB1cGRhdGVRdWV1ZShhZGRJdGVtLCBub3RpZmljYXRpb25BcnIpIHtcbiAgICAgICAgICAgICAgICBpZihhZGRJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IG5vdGlmaWNhdGlvbkFyci5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIW5vdGlmaWNhdGlvbkNoZWNrKG5vdGlmaWNhdGlvbkFycltpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb25RdWV1ZS5wdXNoKG5vdGlmaWNhdGlvbkFycltpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZihub3RpZmljYXRpb25RdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb25RdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRRdWV1ZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm90aWZpY2F0aW9uUXVldWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgKiBQcmV2ZW50IGR1cGxpY2F0aW9uIG5vdGlmaWNhdGlvbnNcbiAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG5vdGlmaWNhdGlvblxuICAgICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIG5vdGlmaWNhdGlvbkNoZWNrKG5vdGlmaWNhdGlvbikge1xuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IG5vdGlmaWNhdGlvblF1ZXVlLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGFuZ3VsYXIuZXF1YWxzKG5vdGlmaWNhdGlvblF1ZXVlW2ldLCBub3RpZmljYXRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXHRhbmd1bGFyXG5cdFx0Lm1vZHVsZShcIngxLnVpLmZyYW1ld29ya1wiKVxuXHRcdC5kaXJlY3RpdmUoXCJmd0JyZWFkQ3J1bWJzXCIsIGZ3QnJlYWRDcnVtYnMpO1xuXG5cdFx0ZndCcmVhZENydW1icy4kaW5qZWN0ID0gW1xuXHRcdFx0XCIkcm9vdFNjb3BlXCIsXG5cdFx0XHRcIiRzdGF0ZVwiLFxuXHRcdFx0XCJCcmVhZGNydW1ic1NlcnZpY2VcIixcblx0XHRcdFwieDFVdGlsc1wiLFxuXHRcdFx0XCJ4MS51aS5zaWRlLW5hdmlnYXRpb24uY29uc3RhbnRcIlxuXHRcdF07XG5cblx0XHRmdW5jdGlvbiBmd0JyZWFkQ3J1bWJzKCRyb290U2NvcGUsICRzdGF0ZSwgQnJlYWRjcnVtYnNTZXJ2aWNlLCB4MVV0aWxzLCBTaWRlTmF2Q29uc3RhbnRzKSB7XG5cdFx0XHR2YXIgZGlyZWN0aXZlID0ge1xuXHRcdFx0XHRzY29wZTogZmFsc2UsXG5cdFx0XHRcdHJlc3RyaWN0OiBcIkVBXCIsXG5cdFx0XHRcdHJlcGxhY2U6IGZhbHNlLFxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogXCJicmVhZGNydW1icy9icmVhZGNydW1icy5odG1sXCIsXG5cdFx0XHRcdGxpbms6IGxpbmtGdW5jXG5cdFx0XHR9O1xuXG5cdFx0XHRyZXR1cm4gZGlyZWN0aXZlO1xuXG5cdFx0XHRmdW5jdGlvbiBsaW5rRnVuYyhzY29wZSkge1xuXHRcdFx0XHRzY29wZS5kYXRhID0ge307XG5cdFx0XHRcdHNjb3BlLmRhdGEuYnJlYWRjcnVtYnMgPSBCcmVhZGNydW1ic1NlcnZpY2UuZ2VuZXJhdGVDcnVtYnMoJHN0YXRlLmN1cnJlbnQpO1xuXHRcdFx0XHQvL2Vuc3VyZSBicmVhZGNydW1icyBkaXNwbGF5IGNvcnJlY3QgcGF0aCBiYXNlZCBvbiBzaWRlbmF2IHNlbGVjdGlvblxuXHRcdFx0XHR2YXIgc2lkZU5hdkxpc3RlbmVyID0gJHJvb3RTY29wZS4kb24oU2lkZU5hdkNvbnN0YW50cy5FVkVOVFMuc2lkZU5hdkl0ZW1DbGlja2VkLCBmdW5jdGlvbihlLCBpdGVtKSB7XG5cdFx0XHRcdFx0aWYoaXRlbS5zdGF0ZUNvbmZpZyAmJiBpdGVtLnN0YXRlQ29uZmlnLmRhdGEgJiYgaXRlbS5zdGF0ZUNvbmZpZy5kYXRhLnBhcmVudE1lbnUpIHtcblx0XHRcdFx0XHRcdEJyZWFkY3J1bWJzU2VydmljZS5yZXNldFN0YXRlcyhpdGVtLnN0YXRlQ29uZmlnLmRhdGEucGFyZW50TWVudSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogQmVzdCBlZmZvcnQgdG8gcmV0dXJuIGEgdHJhbnNsYXRlZCBzdHJpbmcgcmF0aGVyIHRoYW4gYSByYXcgc3RhdGUgbmFtZVxuXHRcdFx0XHQgKlxuXHRcdFx0XHQgKiBTdGF0ZXMgd2l0aCB0cmFuc2xhdGVkIG5hbWVzIGNhbiBhc3NpZ24gdGhlIHRyYW5zbGF0ZWQgc3RyaW5nIHZhbHVlIHRvIGRhdGEuZGlzcGxheU5hbWVcblx0XHRcdFx0ICogU3RhdGVzIHNldHVwIGluIGEgY29uZmlnKCkgYmxvY2sgY2FuJ3QgcHJlLXRyYW5zbGF0ZS4gVGhleSBwcm92aWRlIHRoZWlyIHRyYW5zbGF0aW9uIGtleSBpbiBkYXRhLm5hbWVcblx0XHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IGJyZWFkY3J1bWJcblx0XHRcdFx0ICogQHJldHVybnMge3N0cmluZ30gdHJhbnNsYXRlZCBzdGF0ZSBuYW1lIChpZiBhdmFpbGFibGUpIG9yIHJhdyBzdGF0ZSBuYW1lXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHRzY29wZS5nZXREaXNwbGF5TmFtZSA9IGZ1bmN0aW9uKGJyZWFkY3J1bWIpIHtcblx0XHRcdFx0XHRpZiAoYnJlYWRjcnVtYi5kYXRhICYmIGJyZWFkY3J1bWIuZGF0YS5kaXNwbGF5TmFtZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGJyZWFkY3J1bWIuZGF0YS5kaXNwbGF5TmFtZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoYnJlYWRjcnVtYi5kYXRhICYmIGJyZWFkY3J1bWIuZGF0YS5uYW1lKSB7XG5cdFx0XHRcdFx0XHR2YXIgdHJhbnNsYXRlZE5hbWUgPSB4MVV0aWxzLnRyYW5zbGF0ZShicmVhZGNydW1iLmRhdGEubmFtZSk7XG5cblx0XHRcdFx0XHRcdGlmICh0cmFuc2xhdGVkTmFtZSAhPT0gYnJlYWRjcnVtYi5kYXRhLm5hbWUpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWRjcnVtYi5kYXRhLmRpc3BsYXlOYW1lID0gdHJhbnNsYXRlZE5hbWU7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBicmVhZGNydW1iLmRhdGEuZGlzcGxheU5hbWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gYnJlYWRjcnVtYi5kYXRhLm5hbWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBicmVhZGNydW1iLm5hbWU7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0c2NvcGUuY2hhbmdlU3RhdGUgPSBmdW5jdGlvbih0YXJnZXRTdGF0ZSkge1xuXHRcdFx0XHRcdCRzdGF0ZS5nbyh0YXJnZXRTdGF0ZS5uYW1lLCAkc3RhdGUucGFyYW1zKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRzY29wZS4kb24oXCIkc3RhdGVDaGFuZ2VTdWNjZXNzXCIsIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlKSB7XG5cdFx0XHRcdFx0c2NvcGUuZGF0YS5icmVhZGNydW1icyA9IEJyZWFkY3J1bWJzU2VydmljZS5nZW5lcmF0ZUNydW1icyh0b1N0YXRlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0c2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0c2lkZU5hdkxpc3RlbmVyKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKFwieDEudWkuZnJhbWV3b3JrXCIpXG4gICAgICAgIC5mYWN0b3J5KFwiQnJlYWRjcnVtYnNTZXJ2aWNlXCIsIGJyZWFkY3J1bWJzU2VydmljZSk7XG5cbiAgICAgICAgYnJlYWRjcnVtYnNTZXJ2aWNlLiRpbmplY3QgPSBbIFwiJHN0YXRlXCIgXTtcblxuICAgICAgICBmdW5jdGlvbiBicmVhZGNydW1ic1NlcnZpY2UoJHN0YXRlKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGVMaXN0ID0gW107XG4gICAgICAgICAgICB2YXIgc2VydmljZSA9IHtcbiAgICAgICAgICAgICAgICByZXNldFN0YXRlczogcmVzZXRTdGF0ZXMsXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVDcnVtYnM6IGdlbmVyYXRlQ3J1bWJzXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gc2VydmljZTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAqIENsZWFyIHByZXZpb3VzIHN0YXRlcyBhbmQgaW5zZXJ0IHNpZGVuYXYgcGFyZW50IHN0YXRlLlxuICAgICAgICAgICAgKiBUaGlzIGVuc3VyZXMgdGhhdCBhbnl0aW1lIGFuIGl0ZW0gaXMgY2xpY2sgaW4gdGhlIHNpZGVuYXYsIHRoZVxuICAgICAgICAgICAgKiBicmVhZGNydW1icyB3aWxsIHN0YXJ0IHdpdGggdGhlIHBhcmVudCBzdGF0ZSA+IGNsaWNrZWQgaXRlbXMgc3RhdGVcbiAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFBhcmVudFN0YXRlXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gcmVzZXRTdGF0ZXModGFyZ2V0UGFyZW50U3RhdGUpIHtcbiAgICAgICAgICAgICAgICBzdGF0ZUxpc3QgPSBbdGFyZ2V0UGFyZW50U3RhdGVdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICogVW5zaGlmdCByZWxldmFudCBzdGF0ZXMgaW50byBhbiBhcnJheS4gUmVsZXZhbnQgbWVhbmluZyBzdGF0ZXMgdGhhdCB3ZXJlXG4gICAgICAgICAgICAqIG1hcmtlZCBhcyBwYXJlbnRTdGF0ZXMgdGhyb3VnaCBjdXN0b20gb2JqZWN0IHdpdGhpbiB0aGUgc3RhdGUgb2JqZWN0LlxuICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY3VycmVudFN0YXRlIFN0YXRlIG9iamVjdFxuICAgICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX0gY3J1bWJzQXJyYXkgQXJyYXkgb2YgcmVsZXZhbnQgc3RhdGVzXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVDcnVtYnMoY3VycmVudFN0YXRlKSB7XG4gICAgICAgICAgICAgICAgc3RvcmVTdGF0ZXMoY3VycmVudFN0YXRlKTtcbiAgICAgICAgICAgICAgICB2YXIgY3J1bWJzQXJyYXkgPSBbY3VycmVudFN0YXRlXTtcbiAgICAgICAgICAgICAgICB2YXIgc2V0U3RhdGUgPSBjdXJyZW50U3RhdGU7XG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dE9iaiA9IGhhc1BhcmVudChzZXRTdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKG5leHRPYmoubmV4dFN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcnVtYnNBcnJheS51bnNoaWZ0KG5leHRPYmoubmV4dFN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFN0YXRlID0gbmV4dE9iai5uZXh0U3RhdGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2hpbGUobmV4dE9iai5nZXRQYXJlbnQpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNydW1ic0FycmF5O1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgKiBLZWVwIHRyYWNrIG9mIGxhc3QgNShmb3Igbm93KSB2aXNpdGVkIHN0YXRlcy4gSWYgc3RhdGUgaXMgYWxyZWFkeVxuICAgICAgICAgICAgKiBpbiBhcnJheSBwdXNoIGl0IHRvIGVuZCBvZiBhcnJheSBzbyB0aGF0IHRoZXJlIGFyZSBub3QgZHVwbGljYXRlcy5cbiAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIEN1cnJlbnQgc3RhdGUgb2JqZWN0XG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gc3RvcmVTdGF0ZXMoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIG5ldyBzdGF0ZSBpcyBhbHJlYWR5IGluIGxpc3RcbiAgICAgICAgICAgICAgICB2YXIgaW5BcnIgPSBhcnJheUNoZWNrKHN0YXRlLm5hbWUpO1xuICAgICAgICAgICAgICAgIGlmKGluQXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgc28gcmVtb3ZlIGFuZCBwdXNoIHRvIGVuZCBvZiBhcnJheVxuICAgICAgICAgICAgICAgICAgICBzdGF0ZUxpc3Quc3BsaWNlKGluQXJyLCAxKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzdGF0ZUxpc3QucHVzaChzdGF0ZSk7XG4gICAgICAgICAgICAgICAgaWYoc3RhdGVMaXN0Lmxlbmd0aCA+IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVMaXN0LnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICogQ2hlY2tzIGlmIHRoZSBzdGF0ZSBpbiBxdWVzdGlvbiBoYXMgcGFyZW50IHN0YXRlcyBhbmQgaWYgc28gY2hlY2sgaWZcbiAgICAgICAgICAgICogdGhlIGxhc3QgdmlzaXRlZCBwYXJlbnQgc3RhdGUgYWxzbyBoYXMgYSBwYXJlbnQgc3RhdGUuXG4gICAgICAgICAgICAqIHN0YXRlU2V0dGluZ3MgPSB7XG4gICAgICAgICAgICAqICAgXCJuZXh0U3RhdGVcIjogbnVsbCBvciBhIHN0YXRlIG9iamVjdCxcbiAgICAgICAgICAgICogICBcImdldFBhcmVudFwiOiBCb29sZWFuXG4gICAgICAgICAgICAqIH1cbiAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIFN0YXRlIG9iamVjdFxuICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHN0YXRlU2V0dGluZ3MgU2VlIGFib3ZlXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gaGFzUGFyZW50KHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXRlU2V0dGluZ3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIFwibmV4dFN0YXRlXCI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIFwiZ2V0UGFyZW50XCI6IGZhbHNlXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmKHN0YXRlLmhhc093blByb3BlcnR5KFwiZGF0YVwiKSAmJiBzdGF0ZS5kYXRhLnBhcmVudFN0YXRlcykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50cyA9IHN0YXRlLmRhdGEucGFyZW50U3RhdGVzO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmlzaXRlZCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAvL2hhbmRsZSBtdWx0aXBsZSBwb3NzaWJsZSBwYXJlbnRzXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcmVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNob3Nlbk9uZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL21hdGNoIHBhcmVudHMgbGlzdCBhZ2FpbnN0IHByZXZpb3VzIDUgc3RhdGVzIGJ5IGNyZWF0aW5nIGFycmF5IG9mIGluZGljZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IHBhcmVudHMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2hJbmRleCA9IGFycmF5Q2hlY2socGFyZW50c1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobWF0Y2hJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpdGVkLnB1c2gobWF0Y2hJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLyogaWYgbW9yZSB0aGFuIG9uZSBwYXJlbnQgaXMgZm91bmQgaW4gcHJldmlvdXMgNSBzdGF0ZXMgZ2V0L2FkZFxuICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudCB3aXRoIGhpZ2hlc3QgaW5kZXgoaS5lLiBtb3N0IHJlY2VudGx5IHZpc2l0ZWQpICovXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih2aXNpdGVkLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaG9zZW5PbmUgPSBzdGF0ZUxpc3RbZ2V0SGlnaGVzdFZhbCh2aXNpdGVkKV07ICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHZpc2l0ZWQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hvc2VuT25lID0gc3RhdGVMaXN0W3Zpc2l0ZWRbMF1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyYWIgZmlyc3QgbGlzdGVkIHBhcmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNob3Nlbk9uZSA9ICRzdGF0ZS5nZXQocGFyZW50c1swXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2ZpbGxTdGF0ZXMoc3RhdGUubmFtZSwgY2hvc2VuT25lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hvc2VuT25lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVTZXR0aW5ncyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuZXh0U3RhdGVcIjogY2hvc2VuT25lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImdldFBhcmVudFwiOiAoY2hvc2VuT25lLmhhc093blByb3BlcnR5KFwiZGF0YVwiKSAmJiBjaG9zZW5PbmUuZGF0YS5wYXJlbnRTdGF0ZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgZm9yIG51bGwgc3RhdGVzIG9uIGl0ZW1zIG5vdCBpbiBzaWRlIG1lbnUoc2VlIGZyYW1ld29yay1ob21lLnNlcnZpY2UgYWRkVG9NZW51KVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocGFyZW50c1swXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGF0ZXNQYXJlbnQgPSAkc3RhdGUuZ2V0KHBhcmVudHNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlU2V0dGluZ3MgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmV4dFN0YXRlXCI6IHN0YXRlc1BhcmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJnZXRQYXJlbnRcIjogKHN0YXRlc1BhcmVudC5oYXNPd25Qcm9wZXJ0eShcImRhdGFcIikgJiYgc3RhdGVzUGFyZW50LmRhdGEucGFyZW50U3RhdGVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIHN0YXRlc1BhcmVudCBoYXMgYmVlbiB2aXNpdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWFycmF5Q2hlY2socGFyZW50c1swXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2ZpbGxTdGF0ZXMoc3RhdGUubmFtZSwgc3RhdGVzUGFyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlU2V0dGluZ3M7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEhpZ2hlc3RWYWwoYXJyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4LmFwcGx5KG51bGwsIGFycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgKiBVdGlsaXR5IGZ1bmN0aW9uIHRvIGZpbmQgbWF0Y2hpbmcgb2JqZWN0IGluZGV4XG4gICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdGF0ZU5hbWVcbiAgICAgICAgICAgICogQHJldHVybiB7SW50L0Jvb2xlYW59IG1hdGNoIFJldHVybnMgZmFsc2UgaWYgbm8gbWF0Y2ggZm91bmQgb3IgXG4gICAgICAgICAgICAqIHRoZSBpbmRleCBwb3NpdGlvbiBvZiB0aGUgbWF0Y2hlZCBuYW1lXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gYXJyYXlDaGVjayhzdGF0ZU5hbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSBzdGF0ZUxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoc3RhdGVMaXN0W2ldLm5hbWUgPT09IHN0YXRlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgKiBJbnNlcnQgcGFyZW50IHN0YXRlIGludG8gc3RhdGVMaXN0IHJpZ2h0IGJlZm9yZSB0YXJnZXQgc3RhdGVcbiAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHRhcmdldFN0YXRlTmFtZSBTdGF0ZSBuYW1lIGN1cnJlbnRseSB0YXJnZXRlZCBieSBjYWxsaW5nIGZ1bmN0aW9uXG4gICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnNlcnRTdGF0ZSBTdGF0ZSBvYmplY3QgdG8gYmUgaW5zZXJ0ZWQgaW50byB2aXNpdGVkIHN0YXRlIGFycmF5XG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gYmFja2ZpbGxTdGF0ZXModGFyZ2V0U3RhdGVOYW1lLCBpbnNlcnRTdGF0ZSkge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXRJbmRleCA9IGFycmF5Q2hlY2sodGFyZ2V0U3RhdGVOYW1lKTtcbiAgICAgICAgICAgICAgICBzdGF0ZUxpc3Quc3BsaWNlKHRhcmdldEluZGV4LCAwLCBpbnNlcnRTdGF0ZSk7XG4gICAgICAgICAgICAgICAgaWYoc3RhdGVMaXN0Lmxlbmd0aCA+IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVMaXN0LnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG59KSgpOyIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vXG4gLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL1xuIC8gTGljZW5zZWQgTWF0ZXJpYWxzIOKAkyBQcm9wZXJ0eSBvZiBJQk0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL1xuIC8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9cbiAvIHNlY3Rpb24tY29udGVudC1yZXF1aXJlZC5kaXJlY3RpdmUuanMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL1xuIC8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9cbiAvKEMpIENvcHlyaWdodCBJQk0gQ29ycG9yYXRpb24gMjAxNi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvXG4gLyBVLlMuIEdvdmVybm1lbnQgVXNlcnMgUmVzdHJpY3RlZCBSaWdodHM6ICBVc2UsIGR1cGxpY2F0aW9uIG9yIGRpc2Nsb3N1cmUgICAgL1xuIC8gcmVzdHJpY3RlZCBieSBHU0EgQURQIFNjaGVkdWxlIENvbnRyYWN0IHdpdGggSUJNIENvcnAuICAgICAgICAgICAgICAgICAgICAgIC9cbiAvICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvXG4gLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbmd1bGFyXG5cdC5tb2R1bGUoXCJ4MS51aS5mcmFtZXdvcmtcIilcblx0LmZhY3RvcnkoXCJsb2dvdXRTcnZcIiwgW1wiJGh0dHBcIiwgXCIkcVwiLCBcIiRsb2dcIiwgZnVuY3Rpb24oJGh0dHAsICRxLCAkbG9nKSB7XG5cdFx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0XHRyZXR1cm4ge1xuXG5cdFx0XHRcImRvTG9nb3V0XCI6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cblx0XHRcdFx0JGh0dHAucG9zdChcIi9hcGkvam91cm5leS91c2Vycy9sb2dvdXRcIilcblx0XHRcdFx0XHQudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcblx0XHRcdFx0XHRcdCRsb2cuZGVidWcoXCJsb2dvdXRTcnYgY2FsbDogIFwiLCByZXN1bHQpO1xuXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZSgpO1xuXG5cdFx0XHRcdFx0fSwgZnVuY3Rpb24oZXJyb3IpIHtcblx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXHRcdFx0fVxuXG5cdFx0fTtcblx0fVxuXHRdKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblx0YW5ndWxhclxuXHRcdC5tb2R1bGUoXCJ4MS51aS5mcmFtZXdvcmtcIilcblx0XHQuY29udHJvbGxlcihcIk9yZ1N3aXRjaENvbnRyb2xsZXJcIiwgT3JnU3dpdGNoQ29udHJvbGxlcik7XG5cbiAgICAgICAgT3JnU3dpdGNoQ29udHJvbGxlci4kaW5qZWN0ID0gW1xuICAgICAgICBcdFwiJHJvb3RTY29wZVwiLFxuICAgICAgICBcdFwiJHNjb3BlXCIsXG4gICAgICAgIFx0XCJmcmFtZXdvcmtIb21lU3J2XCJcbiAgICAgICAgXTtcblxuICAgICAgICBmdW5jdGlvbiBPcmdTd2l0Y2hDb250cm9sbGVyKCRyb290U2NvcGUsICRzY29wZSwgZnJhbWV3b3JrSG9tZVNydikge1xuICAgICAgICBcdHZhciB2bSA9IHRoaXM7XG4gICAgICAgIFx0dmFyIG9yaWdpbmFsT3JnSWQgPSBudWxsO1xuXG5cdFx0XHR2bS5zaG93TG9hZGluZyA9IHRydWU7XG5cdFx0XHR2bS5vcmdBcnJheSA9IFtdO1xuXHRcdFx0dm0uc2VsZWN0ZWRPcmcgPSBudWxsO1xuXG5cdFx0XHQkc2NvcGUuZGF0YS5nZXRPcmdzKCkudGhlbihmdW5jdGlvbihyZXNwKSB7XG5cdFx0XHRcdHZtLm9yZ0FycmF5ID0gcmVzcC5kYXRhO1xuXHRcdFx0XHR2YXIgdXNlckRhdGEgPSBmcmFtZXdvcmtIb21lU3J2LmdldFVzZXIoKTtcblx0XHRcdFx0b3JpZ2luYWxPcmdJZCA9IHVzZXJEYXRhLm9yZ0lkO1xuXHRcdFx0XHRmb3IodmFyIGkgPSAwLCBsZW4gPSB2bS5vcmdBcnJheS5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuXHRcdFx0XHRcdGlmKHZtLm9yZ0FycmF5W2ldLm9yZ0lkID09PSBvcmlnaW5hbE9yZ0lkKSB7XG5cdFx0XHRcdFx0XHQkc2NvcGUuZGF0YS5zZWxlY3RlZE9yZyA9IHZtLm9yZ0FycmF5W2ldO1xuXHRcdFx0XHRcdFx0JHNjb3BlLmRhdGEuc2VsZWN0ZWRPcmcuc2VsZWN0ZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHZtLnNob3dMb2FkaW5nID0gZmFsc2U7XG5cdFx0XHR9KTtcblxuXHRcdFx0dm0uc2VsZWN0T3JnID0gZnVuY3Rpb24ob3JnKSB7XG5cdFx0XHRcdCRzY29wZS4kcGFyZW50Lm9wdGlvbnMuYWN0aW9uRGlzYWJsZWQgPSAob3JnLm9yZ0lkID09PSBvcmlnaW5hbE9yZ0lkKTtcblx0XHRcdFx0aWYob3JnLm9yZ0lkICE9PSAkc2NvcGUuZGF0YS5zZWxlY3RlZE9yZy5vcmdJZCkge1xuXHRcdFx0XHRcdCRzY29wZS5kYXRhLnNlbGVjdGVkT3JnLnNlbGVjdGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0b3JnLnNlbGVjdGVkID0gdHJ1ZTtcblx0XHRcdFx0XHQkc2NvcGUuZGF0YS5zZWxlY3RlZE9yZyA9IG9yZztcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdH1cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKFwieDEudWkuZnJhbWV3b3JrXCIpXG4gICAgICAgIC5mYWN0b3J5KFwiU3ViTmF2V2lkZ2V0c1NlcnZpY2VcIiwgc3ViTmF2V2lkZ2V0c1NlcnZpY2UpO1xuXG4gICAgICAgIHN1Yk5hdldpZGdldHNTZXJ2aWNlLiRpbmplY3QgPSBbIFwiJHN0YXRlXCIgXTtcblxuICAgICAgICBmdW5jdGlvbiBzdWJOYXZXaWRnZXRzU2VydmljZSgkc3RhdGUpIHtcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlID0ge1xuICAgICAgICAgICAgICAgIHNldFZpc2liaWxpdHk6IHNldFZpc2liaWxpdHlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICogU2V0IHZpc2liaWxpdHkgZmxhZyBmb3IgZGlyZWN0aXZlcyBpbiBzdWJuYXZcbiAgICAgICAgICAgICogQHBhcmFtIHtBcnJheX0gd2lkZ2V0cyBBcnJheSBvZiB3aWRnZXQgb2Jqc1xuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldFZpc2liaWxpdHkod2lkZ2V0cykge1xuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IHdpZGdldHMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHcgPSB3aWRnZXRzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZih3LnZhbGlkU3RhdGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3Lm1ha2VWaXNpYmxlID0gaW5BcnJheSh3LnZhbGlkU3RhdGVzKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHcubWFrZVZpc2libGUgPSB3Lm1ha2VWaXNpYmxlID8gdy5tYWtlVmlzaWJsZSA6IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgKiBVdGlsaXR5IGZ1bmN0aW9uIHRvIG1hdGNoIHZhbGlkIHN0YXRlcyB0byBjdXJyZW50IHN0YXRlXG4gICAgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHN0YXRlcyBBcnJheSBzdGF0ZSBuYW1lcyByZWxldmFudCB0byBjdXJyZW50IHdpZGdldFxuICAgICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBleGlzdHMgSWYgY3VycmVudCBzdGF0ZSBtYXRjaGVzIG9uZSBvZiB0aGUgdmFsaWQgc3RhdGVzXG4gICAgICAgICAgICAqIGZvciBjdXJyZW50IHdpZGdldFxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIGluQXJyYXkoc3RhdGVzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGV4aXN0cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IHN0YXRlcy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZigkc3RhdGUuaW5jbHVkZXMoc3RhdGVzW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4aXN0cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXHRhbmd1bGFyXG5cdFx0Lm1vZHVsZShcIngxLnVpLmZyYW1ld29ya1wiKVxuXHRcdC5kaXJlY3RpdmUoXCJmd1RvcExldmVsXCIsIGZ3VG9wTGV2ZWwpO1xuXG5cdFx0ZndUb3BMZXZlbC4kaW5qZWN0ID0gW1xuXHRcdFx0XCIkY29tcGlsZVwiXG5cdFx0XTtcblxuXHRcdGZ1bmN0aW9uIGZ3VG9wTGV2ZWwoJGNvbXBpbGUpIHtcblx0XHRcdHZhciBkaXJlY3RpdmUgPSB7XG5cdFx0XHRcdHNjb3BlOiB7XG5cdFx0XHRcdFx0aXRlbTogXCI9XCJcblx0XHRcdFx0fSxcblx0XHRcdFx0cmVzdHJpY3Q6IFwiRUFcIixcblx0XHRcdFx0dGVtcGxhdGU6IFwiXCIsXG5cdFx0XHRcdGxpbms6IGxpbmtGdW5jXG5cdFx0XHR9O1xuXG5cdFx0XHRyZXR1cm4gZGlyZWN0aXZlO1xuXG5cdFx0XHRmdW5jdGlvbiBsaW5rRnVuYyhzY29wZSwgZWxlbWVudCkge1xuXHRcdFx0XHRlbGVtZW50LnJlcGxhY2VXaXRoKCRjb21waWxlKHNjb3BlLml0ZW0pKHNjb3BlKSk7XG5cdFx0XHR9XHRcdFx0XG5cdFx0fVxufSkoKTsiLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tL1xuIC8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9cbiAvIExpY2Vuc2VkIE1hdGVyaWFscyDigJMgUHJvcGVydHkgb2YgSUJNICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9cbiAvICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvXG4gLyBzZWN0aW9uLWNvbnRlbnQtcmVxdWlyZWQuZGlyZWN0aXZlLmpzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9cbiAvICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvXG4gLyhDKSBDb3B5cmlnaHQgSUJNIENvcnBvcmF0aW9uIDIwMTYuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL1xuIC8gVS5TLiBHb3Zlcm5tZW50IFVzZXJzIFJlc3RyaWN0ZWQgUmlnaHRzOiAgVXNlLCBkdXBsaWNhdGlvbiBvciBkaXNjbG9zdXJlICAgIC9cbiAvIHJlc3RyaWN0ZWQgYnkgR1NBIEFEUCBTY2hlZHVsZSBDb250cmFjdCB3aXRoIElCTSBDb3JwLiAgICAgICAgICAgICAgICAgICAgICAvXG4gLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL1xuIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXG5hbmd1bGFyLm1vZHVsZShcIm1hY3JvLW1lbnVcIilcblx0LmRpcmVjdGl2ZShcInRvcE1hY3JvTWVudVwiLCBbXCIkeDFwb3BvdmVyXCIsXG5cdFx0ZnVuY3Rpb24oJHgxcG9wb3Zlcikge1xuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogXCJFQVwiLFxuXHRcdFx0bGluazogZnVuY3Rpb24oJHNjb3BlLCBlbGVtZW50KSB7XG5cdFx0XHRcdCRzY29wZS50b3BNYWNyb01lbnVQb3BvdmVyID0gJHgxcG9wb3ZlcihlbGVtZW50LCB7XG5cdFx0XHRcdFx0XHRwbGFjZW1lbnQ6IFwiYm90dG9tLXJpZ2h0XCIsXG5cdFx0XHRcdFx0XHR0cmlnZ2VyOiBcIm1hbnVhbFwiLFxuXHRcdFx0XHRcdCAgICBjb250ZW50VGVtcGxhdGU6IFwibWFjcm8tbWVudS9tYWNyby1tZW51Lmh0bWxcIixcblx0XHRcdFx0XHQgICAgb3V0c2lkZUNsaWNrOiB0cnVlXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0Y29udHJvbGxlcjogXCJ0b3BNYWNyb01lbnVDdHJsXCJcblx0XHR9O1xuXHR9XSk7IiwiLyoqXG4gKlxuICogTGljZW5zZWQgTWF0ZXJpYWxzIC0gUHJvcGVydHkgb2YgSUJNXG4gKlxuICogbWFjcm8tbWVudS5jb250cm9sbGVyLmpzXG4gKlxuICogKEMpIENvcHlyaWdodCBJQk0gQ29ycG9yYXRpb24gMjAxNi5cbiAqIFUuUy4gR292ZXJubWVudCBVc2VycyBSZXN0cmljdGVkIFJpZ2h0czogIFVzZSwgZHVwbGljYXRpb24gb3IgZGlzY2xvc3VyZVxuICogcmVzdHJpY3RlZCBieSBHU0EgQURQIFNjaGVkdWxlIENvbnRyYWN0IHdpdGggSUJNIENvcnAuXG4gKlxuICovXG5cbmFuZ3VsYXIubW9kdWxlKFwibWFjcm8tbWVudVwiKVxuXHQuY29udHJvbGxlcihcInRvcE1hY3JvTWVudUN0cmxcIiwgW1xuXHRcdFwiJHJvb3RTY29wZVwiLFxuXHRcdFwiJHNjb3BlXCIsXG5cdFx0XCJmcmFtZXdvcmtIb21lU3J2XCIsXG5cdFx0XCIkc3RhdGVcIixcblx0XHRcIiRsb2dcIixcblx0XHRcInRvcE1hY3JvTWVudVNlcnZpY2VcIixcblx0XHRcImZyYW1ld29ya0NvbnN0YW50c1wiLFxuXHRcdGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkc2NvcGUsIGZyYW1ld29ya0hvbWVTcnYsICRzdGF0ZSxcblx0XHRcdFx0ICAkbG9nLHRvcE1hY3JvTWVudVNlcnZpY2UsZnJhbWV3b3JrQ29uc3RhbnRzKSB7XG5cdFx0XHRcInVzZSBzdHJpY3RcIjtcblxuXG5cdFx0XHQkc2NvcGUudG9wTWFjcm9NZW51UG9wb3ZlciA9IHt9O1xuXG5cdFx0XHQkc2NvcGUubmF2SXRlbXMgPSAgZ2V0TWFjcm9NZW51SXRlbXMoKTtcblxuXHRcdFx0JHNjb3BlLnRvZ2dsZVRvcE1hY3JvTWVudSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0JHNjb3BlLmlzVG9wTWFjcm9NZW51T3BlbiA9ICEkc2NvcGUuaXNUb3BNYWNyb01lbnVPcGVuO1xuXHRcdFx0fTtcblxuXHRcdFx0ZnVuY3Rpb24gZ2V0TWFjcm9NZW51SXRlbXMoKXtcblx0XHRcdFx0dmFyIG1hY3JvTWVudUl0ZW1zUmVzdWx0O1xuXHRcdFx0XHRpZiAoJHNjb3BlLm5hdkl0ZW1zKXtcblx0XHRcdFx0XHRtYWNyb01lbnVJdGVtc1Jlc3VsdD1bXTtcblx0XHRcdFx0XHRmb3IgKHZhciBpPTA7IGk8ICRzY29wZS5uYXZJdGVtcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdFx0XHRpZiAoJHNjb3BlLm5hdkl0ZW1zW2ldICYmICRzY29wZS5uYXZJdGVtc1tpXS5pdGVtcyAmJlxuXHRcdFx0XHRcdFx0XHQkc2NvcGUubmF2SXRlbXNbaV0uaXRlbXMubGVuZ3RoID4gMCl7XG5cdFx0XHRcdFx0XHRcdG1hY3JvTWVudUl0ZW1zUmVzdWx0LnB1c2goJHNjb3BlLm5hdkl0ZW1zW2ldKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gbWFjcm9NZW51SXRlbXNSZXN1bHQ7XG5cdFx0XHR9XG5cblxuXHRcdFx0JHNjb3BlLiRvbihmcmFtZXdvcmtDb25zdGFudHMuRXZlbnRzLlRPUF9NQUNST19NRU5VX0NIQU5HRUQsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0ZG9Ub3BNYWNyb01lbnUoKTtcblx0XHRcdFx0JHNjb3BlLmhhbWJ1cmdlclN0YXRlID0gJHNjb3BlLmhhbWJ1cmdlclN0YXRlID09PSBcImFjdGl2ZVwiID8gXCJcIiA6IFwiYWN0aXZlXCI7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZnVuY3Rpb24gZG9Ub3BNYWNyb01lbnUoKSB7XG5cdFx0XHRcdFx0JHNjb3BlLnRvZ2dsZVRvcE1hY3JvTWVudSgpO1xuXHRcdFx0XHRcdHBhc3NEYXRhVG9Ub3BNYWNyb01lbnVQb3BvdmVyKCk7XG5cdFx0XHRcdFx0c2hvd09ySGlkZVRvcE1hY3JvTWVudSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiBwYXNzRGF0YVRvVG9wTWFjcm9NZW51UG9wb3Zlcigpe1xuXHRcdFx0XHQkc2NvcGUudG9wTWFjcm9NZW51UG9wb3Zlci4kc2NvcGUubmF2SXRlbXMgPSAkc2NvcGUubmF2SXRlbXM7XG5cdFx0XHRcdCRzY29wZS50b3BNYWNyb01lbnVQb3BvdmVyLiRzY29wZS5tYWNyb01lbnVDb2x1bW5MaW1pdD00O1xuXHRcdFx0XHQkc2NvcGUudG9wTWFjcm9NZW51UG9wb3Zlci4kc2NvcGUuZ29Ub1VybCA9IGZ1bmN0aW9uKGl0ZW1TdGF0ZSkge1xuXHRcdFx0XHRcdCRzdGF0ZS5nbyhpdGVtU3RhdGUpO1xuXHRcdFx0XHRcdCRzY29wZS5pc1RvcE1hY3JvTWVudU9wZW49dG9wTWFjcm9NZW51U2VydmljZS5oaWRlVG9wTWFjcm9NZW51KCRzY29wZS50b3BNYWNyb01lbnVQb3BvdmVyKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQkc2NvcGUudG9wTWFjcm9NZW51UG9wb3Zlci4kc2NvcGUubWFjcm9NZW51Q29sdW1uV2lkdGggPSBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHZhciByZXN1bHQ9XCJjb2wtbWQtM1wiO1xuXHRcdFx0XHRcdHZhciBwb3BPdmVyTmF2SXRlbXM9JHNjb3BlLnRvcE1hY3JvTWVudVBvcG92ZXIuJHNjb3BlLm5hdkl0ZW1zO1xuXHRcdFx0XHRcdGlmIChwb3BPdmVyTmF2SXRlbXMubGVuZ3RoICYmIChwb3BPdmVyTmF2SXRlbXMubGVuZ3RoIDw9XG5cdFx0XHRcdFx0XHQkc2NvcGUudG9wTWFjcm9NZW51UG9wb3Zlci4kc2NvcGUubWFjcm9NZW51Q29sdW1uTGltaXQpICl7XG5cdFx0XHRcdFx0XHRyZXN1bHQ9XCJjb2wtbWQtXCIgKyAoMTIvcG9wT3Zlck5hdkl0ZW1zLmxlbmd0aCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdGZ1bmN0aW9uIHNob3dPckhpZGVUb3BNYWNyb01lbnUoKXtcblx0XHRcdFx0aWYgKCRzY29wZS5pc1RvcE1hY3JvTWVudU9wZW4pe1xuXHRcdFx0XHRcdCRzY29wZS5pc1RvcE1hY3JvTWVudU9wZW49dG9wTWFjcm9NZW51U2VydmljZS5zaG93VG9wTWFjcm9NZW51KCRzY29wZS50b3BNYWNyb01lbnVQb3BvdmVyKTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0JHNjb3BlLmlzVG9wTWFjcm9NZW51T3Blbj10b3BNYWNyb01lbnVTZXJ2aWNlLmhpZGVUb3BNYWNyb01lbnUoJHNjb3BlLnRvcE1hY3JvTWVudVBvcG92ZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9XSk7XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tL1xuIC8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9cbiAvIExpY2Vuc2VkIE1hdGVyaWFscyDigJMgUHJvcGVydHkgb2YgSUJNICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9cbiAvICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvXG4gLyBtYWNyby1tZW51LnNlcnZpY2UuanMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL1xuIC8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9cbiAvKEMpIENvcHlyaWdodCBJQk0gQ29ycG9yYXRpb24gMjAxNi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvXG4gLyBVLlMuIEdvdmVybm1lbnQgVXNlcnMgUmVzdHJpY3RlZCBSaWdodHM6ICBVc2UsIGR1cGxpY2F0aW9uIG9yIGRpc2Nsb3N1cmUgICAgL1xuIC8gcmVzdHJpY3RlZCBieSBHU0EgQURQIFNjaGVkdWxlIENvbnRyYWN0IHdpdGggSUJNIENvcnAuICAgICAgICAgICAgICAgICAgICAgIC9cbiAvICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvXG4gLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cbmFuZ3VsYXIubW9kdWxlKFwibWFjcm8tbWVudVwiKVxuXHQuc2VydmljZShcInRvcE1hY3JvTWVudVNlcnZpY2VcIiwgW1xuXG5cdFx0ZnVuY3Rpb24gKCkge1xuXHRcdFx0XCJ1c2Ugc3RyaWN0XCI7XG5cblxuXHRcdFx0dGhpcy5oaWRlVG9wTWFjcm9NZW51ID0gZnVuY3Rpb24odG9wTWFjcm9NZW51UG9wb3Zlcikge1xuXHRcdFx0XHR2YXIgaXNUb3BNYWNyb01lbnVPcGVuPXRydWU7XG5cdFx0XHRcdGlmKHRvcE1hY3JvTWVudVBvcG92ZXIpe1xuXHRcdFx0XHRcdHRvcE1hY3JvTWVudVBvcG92ZXIuJHNjb3BlLiRoaWRlKCk7XG5cdFx0XHRcdFx0aXNUb3BNYWNyb01lbnVPcGVuPWZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBpc1RvcE1hY3JvTWVudU9wZW47XG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLnNob3dUb3BNYWNyb01lbnUgPSBmdW5jdGlvbih0b3BNYWNyb01lbnVQb3BvdmVyKSB7XG5cdFx0XHRcdHZhciBpc1RvcE1hY3JvTWVudU9wZW49ZmFsc2U7XG5cdFx0XHRcdGlmKHRvcE1hY3JvTWVudVBvcG92ZXIpe1xuXHRcdFx0XHRcdHRvcE1hY3JvTWVudVBvcG92ZXIuJHNjb3BlLiRzaG93KCk7XG5cdFx0XHRcdFx0aXNUb3BNYWNyb01lbnVPcGVuPXRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGlzVG9wTWFjcm9NZW51T3Blbjtcblx0XHRcdH07XG5cblx0XHR9XG5cdF0pOyIsIi8qKlxuICpcbiAqIExpY2Vuc2VkIE1hdGVyaWFscyDigJMgUHJvcGVydHkgb2YgSUJNXG4gKlxuICogZnJhbWV3b3JrLWhvbWUuY29uZmlnLmpzXG4gKlxuICogKEMpIENvcHlyaWdodCBJQk0gQ29ycG9yYXRpb24gMjAxNi5cbiAqIFUuUy4gR292ZXJubWVudCBVc2VycyBSZXN0cmljdGVkIFJpZ2h0czogIFVzZSwgZHVwbGljYXRpb24gb3IgZGlzY2xvc3VyZVxuICogcmVzdHJpY3RlZCBieSBHU0EgQURQIFNjaGVkdWxlIENvbnRyYWN0IHdpdGggSUJNIENvcnAuXG4gKlxuICovXG5cbmFuZ3VsYXIubW9kdWxlKFwiZnJhbWV3b3JrLWhvbWVcIilcblx0LnByb3ZpZGVyKFwiZnJhbWV3b3JrQ3JlYXRlU3RhdGVzXCIsIGZ1bmN0aW9uIGNyZWF0ZVN0YXRlcygkc3RhdGVQcm92aWRlcikge1xuXHRcdHRoaXMuJGdldCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGFkZFN0YXRlOiBmdW5jdGlvbihzdGF0ZU5hbWUsIHN0YXRlQ29uZmlnKSB7XG5cdFx0XHRcdFx0XHQkc3RhdGVQcm92aWRlci5zdGF0ZShzdGF0ZU5hbWUsIHN0YXRlQ29uZmlnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHR9O1xuXHRcdH0pXG5cdC5jb25maWcoW1xuXHRcdFwiJHN0YXRlUHJvdmlkZXJcIixcblx0XHRmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xuXHRcdFx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0XHRcdCRzdGF0ZVByb3ZpZGVyXG5cdFx0XHRcdC5zdGF0ZShcImZyYW1ld29ya0hvbWVcIiwge1xuXHRcdFx0XHRcdHVybDogXCJcIixcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogXCJob21lL2ZyYW1ld29yay1ob21lLmh0bWxcIixcblx0XHRcdFx0XHRjb250cm9sbGVyOiBcImZyYW1ld29ya0hvbWVDdHJsXCJcblx0XHRcdFx0fSlcblx0XHRcdFx0LnN0YXRlKFwiZnJhbWV3b3JrSG9tZS5kYXNoYm9hcmRzXCIsIHtcblx0XHRcdFx0XHR1cmw6IFwiL2Rhc2hib2FyZHNcIixcblx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJ4MVVpTmdGcmFtZXdvcmsuTkFWLkRBU0hCT0FSRFNcIixcblx0XHRcdFx0XHRcdFwiZHVtbXlMaW5rXCI6IHRydWVcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5zdGF0ZShcImZyYW1ld29ya0hvbWUuYW5hbHl6ZVwiLCB7XG5cdFx0XHRcdFx0dXJsOiBcIi9hbmFseXplXCIsXG5cdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwieDFVaU5nRnJhbWV3b3JrLk5BVi5BTkFMWVpFXCIsXG5cdFx0XHRcdFx0XHRcImR1bW15TGlua1wiOiB0cnVlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQuc3RhdGUoXCJmcmFtZXdvcmtIb21lLmNyZWF0ZVwiLCB7XG5cdFx0XHRcdFx0dXJsOiBcIi9jcmVhdGVcIixcblx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJ4MVVpTmdGcmFtZXdvcmsuTkFWLkNSRUFURVwiLFxuXHRcdFx0XHRcdFx0XCJkdW1teUxpbmtcIjogdHJ1ZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdFx0LnN0YXRlKFwiZnJhbWV3b3JrSG9tZS5tYW5hZ2VcIiwge1xuXHRcdFx0XHRcdHVybDogXCIvbWFuYWdlXCIsXG5cdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwieDFVaU5nRnJhbWV3b3JrLk5BVi5NQU5BR0VcIixcblx0XHRcdFx0XHRcdFwiZHVtbXlMaW5rXCI6IHRydWVcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5zdGF0ZShcImZyYW1ld29ya0hvbWUuYWRtaW5cIiwge1xuXHRcdFx0XHRcdHVybDogXCIvYWRtaW5cIixcblx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJ4MVVpTmdGcmFtZXdvcmsuTkFWLkFETUlOXCIsXG5cdFx0XHRcdFx0XHRcImR1bW15TGlua1wiOiB0cnVlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQuc3RhdGUoXCJmcmFtZXdvcmtIb21lLmxpbWl0ZWRcIiwge1xuXHRcdFx0XHRcdHVybDogXCIvbGltaXRlZFwiLFxuXHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFwibmFtZVwiOiBcIngxVWlOZ0ZyYW1ld29yay5OQVYuTElNSVRFRF9BVkFJTEFCSUxJVFlcIixcblx0XHRcdFx0XHRcdFwiZHVtbXlMaW5rXCI6IHRydWVcblx0XHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XSk7IiwiLyoqXG4gKlxuICogTGljZW5zZWQgTWF0ZXJpYWxzIC0gUHJvcGVydHkgb2YgSUJNXG4gKlxuICogZnJhbWV3b3JrLWhvbWUuY29udHJvbGxlci5qc1xuICpcbiAqIChDKSBDb3B5cmlnaHQgSUJNIENvcnBvcmF0aW9uIDIwMTYuXG4gKiBVLlMuIEdvdmVybm1lbnQgVXNlcnMgUmVzdHJpY3RlZCBSaWdodHM6ICBVc2UsIGR1cGxpY2F0aW9uIG9yIGRpc2Nsb3N1cmVcbiAqIHJlc3RyaWN0ZWQgYnkgR1NBIEFEUCBTY2hlZHVsZSBDb250cmFjdCB3aXRoIElCTSBDb3JwLlxuICpcbiAqL1xuXG5hbmd1bGFyLm1vZHVsZShcImZyYW1ld29yay1ob21lXCIpXG5cdC5jb250cm9sbGVyKFwiZnJhbWV3b3JrSG9tZUN0cmxcIiwgW1xuXHRcdFwiJHJvb3RTY29wZVwiLFxuXHRcdFwiJHNjb3BlXCIsXG5cdFx0XCJmcmFtZXdvcmtIb21lU3J2XCIsXG5cdFx0XCJTdWJOYXZXaWRnZXRzU2VydmljZVwiLFxuXHRcdFwieDFVdGlsc1wiLFxuXHRcdFwiJHN0YXRlXCIsXG5cdFx0XCIkd2luZG93XCIsXG5cdFx0XCIkbG9nXCIsXG5cdFx0XCJ4MS51aS5wb3BvdmVyLmV2ZW50c1wiLFxuXHRcdFwiZnJhbWV3b3JrQ29uc3RhbnRzXCIsXG5cdFx0XCJsb2dvdXRTcnZcIixcblx0XHRcIngxTW9kYWxcIixcblx0XHRmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHNjb3BlLCBmcmFtZXdvcmtIb21lU3J2LCBTdWJOYXZXaWRnZXRzU2VydmljZSwgeDFVdGlscywkc3RhdGUsXG5cdFx0XHRcdCAgJHdpbmRvdywkbG9nLHBvcG92ZXJFdmVudCxmcmFtZXdvcmtDb25zdGFudHMsbG9nb3V0U3J2LCB4MU1vZGFsKSB7XG5cdFx0XHRcInVzZSBzdHJpY3RcIjtcblxuXHRcdFx0LyppZiB5b3Ugd2FudHMgdG8gb3BlbiBzaWRlIG5hdiBtZW51LCBqdXN0IHNldFxuXHRcdFx0ICRzY29wZS5pc1NpZGVOYXZPcGVuID0gdHJ1ZTtcblx0XHRcdCAkc2NvcGUudG9wTWFjcm9NZW51T3B0aW9uPSBmYWxzZTtcblx0XHRcdCBpZiB5b3Ugd2FudHMgdG8gb3BlbiB0b3AgbWFjcm8gbWVudSwganVzdCBzZXRcblx0XHRcdCAkc2NvcGUuaXNTaWRlTmF2T3BlbiA9IGZhbHNlO1xuXHRcdFx0ICRzY29wZS50b3BNYWNyb01lbnVPcHRpb249IHRydWUgO1xuXHRcdFx0Ki9cblx0XHRcdCRzY29wZS5pc1NpZGVOYXZPcGVuID0gdHJ1ZTtcblx0XHRcdCRzY29wZS50b3BNYWNyb01lbnVPcHRpb249IGZhbHNlO1xuXG5cdFx0XHQkc2NvcGUubmF2SXRlbXMgPSBmcmFtZXdvcmtIb21lU3J2LmdldE5hdkl0ZW1zKCk7XG5cdFx0XHQkc2NvcGUudG9wTGV2ZWwgPSBmcmFtZXdvcmtIb21lU3J2LmdldFRvcExldmVsKCk7XG5cdFx0XHQkc2NvcGUuc3ViTmF2V2lkZ2V0cyA9IGZyYW1ld29ya0hvbWVTcnYuZ2V0U2Vjb25kYXJ5TGV2ZWwoKTtcblxuXHRcdFx0Ly9pbml0aWFsIHNldHVwIG9mIHN1Ym5hdiB3aWRnZXRzXG5cdFx0XHRpbml0U3ViTmF2KCk7XG5cblx0XHRcdC8vcmVmcmVzaCBzdWJuYXYgd2lkZ2V0c1xuXHRcdFx0dmFyIHN0YXRlTGlzdGVuZXIgPSAkcm9vdFNjb3BlLiRvbihcIiRzdGF0ZUNoYW5nZVN1Y2Nlc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaW5pdFN1Yk5hdigpO1xuICAgICAgICAgICAgfSk7XG5cblx0XHRcdCRzY29wZS5wcm9kdWN0VGl0bGUgPSBmcmFtZXdvcmtIb21lU3J2LmdldFByb2R1Y3RUaXRsZSgpO1xuXHRcdFx0JHNjb3BlLnNob3dCZXRhQmFkZ2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKGZyYW1ld29ya0hvbWVTcnYuZ2V0U2hvd0JldGFCYWRnZSgpKSB7XG5cdFx0XHRcdFx0cmV0dXJuICB4MVV0aWxzLnRyYW5zbGF0ZShcIngxVWlOZ0ZyYW1ld29yay5CRVRBXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBcIlwiO1xuXHRcdFx0fTtcblx0XHRcdCRzY29wZS52ZXJzaW9uID0gXCJcIjtcblx0XHRcdC8vJHNjb3BlLnVzZXIgPSAkcm9vdFNjb3BlLnVzZXI7XG5cdFx0XHQkc2NvcGUudXNlciA9IGZyYW1ld29ya0hvbWVTcnYuZ2V0VXNlcigpO1xuXG5cdFx0XHQvL0hlbHBEb2NzU2VydmljZS5zZXREZWZhdWx0VG9rZW4oY29uc3RhbnQuZGVmYXVsdFN0YXRlKTtcblxuXHRcdFx0JHNjb3BlLnRvZ2dsZU1lbnUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdCRzY29wZS5pc1NpZGVOYXZPcGVuID0gISRzY29wZS5pc1NpZGVOYXZPcGVuO1xuXHRcdFx0fTtcblxuXG5cdFx0XHQkc2NvcGUuJG9uKFwieDEudWkudG9wLW5hdmlnYXRpb24uaGFtYnVyZ2VyLmNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKCRzY29wZS50b3BNYWNyb01lbnVPcHRpb24pe1xuXHRcdFx0XHRcdCRzY29wZS4kZW1pdChmcmFtZXdvcmtDb25zdGFudHMuRXZlbnRzLlRPUF9NQUNST19NRU5VX0NIQU5HRUQpO1xuXHRcdFx0XHR9IGVsc2V7XG5cdFx0XHRcdFx0JHNjb3BlLnRvZ2dsZU1lbnUoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkc2NvcGUuaGFtYnVyZ2VyU3RhdGUgPSAkc2NvcGUuaGFtYnVyZ2VyU3RhdGUgPT09IFwiYWN0aXZlXCIgPyBcIlwiIDogXCJhY3RpdmVcIjtcblx0XHRcdH0pO1xuXG5cblx0XHRcdCRzY29wZS5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdCRzY29wZS4kYnJvYWRjYXN0KHBvcG92ZXJFdmVudC5DQU5DRUxfUE9QT1ZFUik7XG5cdFx0XHRcdCRzdGF0ZS5nbyhcImZyYW1ld29ya0hvbWVcIik7XG5cdFx0XHRcdGxvZ291dFNydi5kb0xvZ291dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcblx0XHRcdFx0XHQkd2luZG93Lm9wZW4ocmVzdWx0LCBcIkNTQV9Mb2dvdXRcIik7XG5cdFx0XHRcdH0sIGZ1bmN0aW9uKGVycm9yKSB7XG5cdFx0XHRcdFx0JGxvZy5lcnJvcihcIlVuYWJsZSB0byBnZW5lcmF0ZSBEb2MgVXJsOiBcIiwgZXJyb3IpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cblx0XHRcdCRzY29wZS5nZXRIZWxwSXRlbXMgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIGZyYW1ld29ya0hvbWVTcnYuZ2V0SGVscEl0ZW1zKCk7XG5cdFx0XHR9O1xuXG5cdFx0XHQkc2NvcGUuc3dpdGNoT3JnID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBoYW5kbGVyID0gZnJhbWV3b3JrSG9tZVNydi5nZXRPcmdDYWxsYmFjaygpO1xuXHRcdFx0XHR2YXIgb3JnTW9kYWwgPSB7XG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0aGVhZGVyVGV4dDogeDFVdGlscy50cmFuc2xhdGUoXCJ4MVVpTmdGcmFtZXdvcmsuT1JHX01PREFMLkhFQURFUlwiKSxcblx0XHRcdFx0XHRcdHNob3dDbG9zZUJ1dHRvbjogZmFsc2UsXG5cdFx0XHRcdFx0XHRhY3Rpb25CdXR0b25UZXh0OiB4MVV0aWxzLnRyYW5zbGF0ZShcIngxVWlOZ0ZyYW1ld29yay5PUkdfTU9EQUwuT0tcIiksXG5cdFx0XHRcdFx0XHRhY3Rpb25EaXNhYmxlZDogdHJ1ZVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c2V0dGluZ3M6IHtcblx0XHRcdFx0XHRcdHNpemU6IFwieGxcIixcblx0XHRcdFx0XHRcdGNvbnRlbnRUZW1wbGF0ZTogXCJvcmctc3dpdGNoL29yZy1zd2l0Y2guaHRtbFwiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRnZXRPcmdzOiBoYW5kbGVyXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0XHR4MU1vZGFsLnNob3cob3JnTW9kYWwpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRcdC8vdXNlciBzZWxlY3RlZCBhbiBvcmcgYW5kIG5vdyB0aGUgb3JpZ2luYXRpbmcgYXBwIG5lZWRzIHRvIGtub3cgYWJvdXQgaXRcblx0XHRcdFx0XHR2YXIgc2VuZFNlbGVjdGVkID0gZnJhbWV3b3JrSG9tZVNydi5nZXRTZWxlY3RlZE9yZ0NhbGxiYWNrKCk7XG5cdFx0XHRcdFx0c2VuZFNlbGVjdGVkKGRhdGEpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cblx0XHRcdGZ1bmN0aW9uIGluaXRTdWJOYXYoKSB7XG5cdFx0XHRcdHZhciB3aWRnZXRzID0gZnJhbWV3b3JrSG9tZVNydi5nZXRTZWNvbmRhcnlMZXZlbCgpO1xuICAgICAgICAgICAgICAgIFN1Yk5hdldpZGdldHNTZXJ2aWNlLnNldFZpc2liaWxpdHkod2lkZ2V0cyk7XG5cdFx0XHR9XG5cblxuXHRcdFx0Ly9saXN0ZW5lcnNcblx0XHRcdHZhciBuYXZMaXN0ZW5lciA9ICRyb290U2NvcGUuJG9uKFxuXHRcdFx0XHRmcmFtZXdvcmtDb25zdGFudHMuRXZlbnRzLk5BVl9JVEVNU19VUERBVEVELFxuXHRcdFx0XHRmdW5jdGlvbihldmVudCwgbmF2SXRlbXMpe1xuXHRcdFx0XHRcdCRzY29wZS5uYXZJdGVtcyA9IG5hdkl0ZW1zO1xuXHRcdFx0fSk7XG5cblx0XHRcdHZhciB0b3BOYXZMaXN0ZW5lciA9ICRyb290U2NvcGUuJG9uKFxuXHRcdFx0XHRmcmFtZXdvcmtDb25zdGFudHMuRXZlbnRzLlRPUF9OQVZfSVRFTVNfVVBEQVRFRCxcblx0XHRcdFx0ZnVuY3Rpb24oZXZlbnQsIG5hdkl0ZW1zKXtcblx0XHRcdFx0XHQkc2NvcGUudG9wbmF2SXRlbXMgPSBuYXZJdGVtcztcblx0XHRcdH0pO1xuXG5cdFx0XHR2YXIgc3ViTmF2TGlzdGVuZXIgPSAkcm9vdFNjb3BlLiRvbihcblx0XHRcdFx0ZnJhbWV3b3JrQ29uc3RhbnRzLkV2ZW50cy5TVUJfTkFWX0lURU1TX1VQREFURUQsXG5cdFx0XHRcdGZ1bmN0aW9uKGV2ZW50LCBuYXZJdGVtcyl7XG5cdFx0XHRcdFx0JHNjb3BlLnN1Ym5hdkl0ZW1zID0gbmF2SXRlbXM7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly9jbGVhbiB1cFxuXHRcdFx0JHNjb3BlLiRvbihcImRlc3Ryb3lcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHN0YXRlTGlzdGVuZXIoKTtcblx0XHRcdFx0bmF2TGlzdGVuZXIoKTtcblx0XHRcdFx0dG9wTmF2TGlzdGVuZXIoKTtcblx0XHRcdFx0c3ViTmF2TGlzdGVuZXIoKTtcblx0XHRcdH0pO1xuXG5cdFx0fV0pO1xuIiwiLyoqXG4gKlxuICogTGljZW5zZWQgTWF0ZXJpYWxzIC0gUHJvcGVydHkgb2YgSUJNXG4gKlxuICogZnJhbWV3b3JrLWhvbWUuc2VydmljZS5qc1xuICpcbiAqIChDKSBDb3B5cmlnaHQgSUJNIENvcnBvcmF0aW9uIDIwMTYuXG4gKiBVLlMuIEdvdmVybm1lbnQgVXNlcnMgUmVzdHJpY3RlZCBSaWdodHM6ICBVc2UsIGR1cGxpY2F0aW9uIG9yIGRpc2Nsb3N1cmVcbiAqIHJlc3RyaWN0ZWQgYnkgR1NBIEFEUCBTY2hlZHVsZSBDb250cmFjdCB3aXRoIElCTSBDb3JwLlxuICpcbiAqL1xuXG5hbmd1bGFyLm1vZHVsZShcImZyYW1ld29yay1ob21lXCIpXG5cdC5zZXJ2aWNlKFwiZnJhbWV3b3JrSG9tZVNydlwiLCBbXG5cdFx0XCJ4MVV0aWxzXCIsXG5cdFx0XCJmcmFtZXdvcmtDb25zdGFudHNcIixcblx0XHRcImZyYW1ld29ya0NyZWF0ZVN0YXRlc1wiLFxuXHRcdFwiJHJvb3RTY29wZVwiLFxuXHRcdGZ1bmN0aW9uICh4MVV0aWxzLCBmcmFtZXdvcmtDb25zdGFudHMsIGZyYW1ld29ya0NyZWF0ZVN0YXRlcywgJHJvb3RTY29wZSkge1xuXHRcdFx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0XHRcdHZhciBuYXZJdGVtcywgZGFzaGJvYXJkc01lbnUsIGFuYWx5emVNZW51LCBjcmVhdGVNZW51LCBtYW5hZ2VNZW51LCBhZG1pbk1lbnUsIGxpbWl0ZWRNZW51LFxuXHRcdFx0XHRwcm9kdWN0VGl0bGUsIGhlbHBJdGVtcztcblx0XHRcdHZhciBzaG93QmV0YUJhZGdlID0gZmFsc2U7XG5cdFx0XHR2YXIgdXNlciA9IHtmaXJzdE5hbWU6XCJcIn07XG5cdFx0XHR2YXIgb3JnQ2FsbEJhY2sgPSBudWxsO1xuXHRcdFx0dmFyIHNlbGVjdGVkQ2FsbEJhY2sgPSBudWxsO1xuXG5cdFx0XHR0aGlzLnNldFRyYW5zbGF0ZWRNZW51SGVhZGVyTGFiZWxzID0gZnVuY3Rpb24obmF2SGVhZGVyVHJhbnNsYXRpb25zUGFzc2VkKSB7XG5cdFx0XHRcdGRhc2hib2FyZHNNZW51Lm5hbWUgPSBuYXZIZWFkZXJUcmFuc2xhdGlvbnNQYXNzZWQuZGFzaGJvYXJkc1RpdGxlO1xuXHRcdFx0XHRhbmFseXplTWVudS5uYW1lID0gbmF2SGVhZGVyVHJhbnNsYXRpb25zUGFzc2VkLmFuYWx5emVUaXRsZTtcblx0XHRcdFx0Y3JlYXRlTWVudS5uYW1lID0gbmF2SGVhZGVyVHJhbnNsYXRpb25zUGFzc2VkLmNyZWF0ZVRpdGxlO1xuXHRcdFx0XHRtYW5hZ2VNZW51Lm5hbWUgPSBuYXZIZWFkZXJUcmFuc2xhdGlvbnNQYXNzZWQubWFuYWdlVGl0bGU7XG5cdFx0XHRcdGFkbWluTWVudS5uYW1lID0gbmF2SGVhZGVyVHJhbnNsYXRpb25zUGFzc2VkLmFkbWluVGl0bGU7XG5cdFx0XHRcdGxpbWl0ZWRNZW51Lm5hbWUgPSBuYXZIZWFkZXJUcmFuc2xhdGlvbnNQYXNzZWQubGltaXRlZFRpdGxlO1xuXHRcdFx0fTtcblxuXHRcdFx0ZGFzaGJvYXJkc01lbnUgPSB7XG5cdFx0XHRcdFwibmFtZVwiOiB4MVV0aWxzLnRyYW5zbGF0ZShcIngxVWlOZ0ZyYW1ld29yay5OQVYuREFTSEJPQVJEU1wiKSxcblx0XHRcdFx0XCJoZWFkZXJcIjogdHJ1ZSxcblx0XHRcdFx0XCJzdGF0ZVwiOiBmcmFtZXdvcmtDb25zdGFudHMuTkFWX1NUQVRFUy5EQVNIQk9BUkRTLFxuXHRcdFx0XHRcImlkXCI6IFwiZGFzaGJvYXJkc1wiLFxuXHRcdFx0XHRcImNsYXNzXCI6IFwiZGFzaGJvYXJkcyBlbXB0eS1oZWFkZXJcIixcblx0XHRcdFx0XCJpY29uXCI6IFwiXCIsXG5cdFx0XHRcdFwiaXNPcGVuXCI6IHRydWUsXG5cdFx0XHRcdFwiYWN0aXZlXCI6IHRydWUsXG5cdFx0XHRcdFwiaXRlbXNcIjogW11cblx0XHRcdH07XG5cblx0XHRcdGFuYWx5emVNZW51ID0ge1xuXHRcdFx0XHRcIm5hbWVcIjogeDFVdGlscy50cmFuc2xhdGUoXCJ4MVVpTmdGcmFtZXdvcmsuTkFWLkFOQUxZWkVcIiksXG5cdFx0XHRcdFwiaGVhZGVyXCI6IHRydWUsXG5cdFx0XHRcdFwic3RhdGVcIjogZnJhbWV3b3JrQ29uc3RhbnRzLk5BVl9TVEFURVMuQU5BTFlaRSxcblx0XHRcdFx0XCJpZFwiOiBcImFuYWx5emVcIixcblx0XHRcdFx0XCJjbGFzc1wiOiBcImFuYWx5emUgZW1wdHktaGVhZGVyXCIsXG5cdFx0XHRcdFwiaWNvblwiOiBcIlwiLFxuXHRcdFx0XHRcImlzT3BlblwiOiB0cnVlLFxuXHRcdFx0XHRcIml0ZW1zXCI6IFtdXG5cdFx0XHR9O1xuXG5cdFx0XHRjcmVhdGVNZW51ID0ge1xuXHRcdFx0XHRcIm5hbWVcIjogeDFVdGlscy50cmFuc2xhdGUoXCJ4MVVpTmdGcmFtZXdvcmsuTkFWLkNSRUFURVwiKSxcblx0XHRcdFx0XCJoZWFkZXJcIjogdHJ1ZSxcblx0XHRcdFx0XCJzdGF0ZVwiOiBmcmFtZXdvcmtDb25zdGFudHMuTkFWX1NUQVRFUy5DUkVBVEUsXG5cdFx0XHRcdFwiaWRcIjogXCJjcmVhdGVcIixcblx0XHRcdFx0XCJjbGFzc1wiOiBcImNyZWF0ZSBlbXB0eS1oZWFkZXJcIixcblx0XHRcdFx0XCJpY29uXCI6IFwiXCIsXG5cdFx0XHRcdFwiaXNPcGVuXCI6IHRydWUsXG5cdFx0XHRcdFwiaXRlbXNcIjogW11cblx0XHRcdH07XG5cblx0XHRcdG1hbmFnZU1lbnUgPSB7XG5cdFx0XHRcdFwibmFtZVwiOiB4MVV0aWxzLnRyYW5zbGF0ZShcIngxVWlOZ0ZyYW1ld29yay5OQVYuTUFOQUdFXCIpLFxuXHRcdFx0XHRcImhlYWRlclwiOiB0cnVlLFxuXHRcdFx0XHRcInN0YXRlXCI6IGZyYW1ld29ya0NvbnN0YW50cy5OQVZfU1RBVEVTLk1BTkFHRSxcblx0XHRcdFx0XCJpZFwiOiBcIm1hbmFnZVwiLFxuXHRcdFx0XHRcImNsYXNzXCI6IFwibWFuYWdlIGVtcHR5LWhlYWRlclwiLFxuXHRcdFx0XHRcImljb25cIjogXCJcIixcblx0XHRcdFx0XCJpc09wZW5cIjogdHJ1ZSxcblx0XHRcdFx0XCJpdGVtc1wiOiBbXVxuXHRcdFx0fTtcblxuXHRcdFx0YWRtaW5NZW51ID0gIHtcblx0XHRcdFx0XCJuYW1lXCI6IHgxVXRpbHMudHJhbnNsYXRlKFwieDFVaU5nRnJhbWV3b3JrLk5BVi5BRE1JTlwiKSxcblx0XHRcdFx0XCJoZWFkZXJcIjogdHJ1ZSxcblx0XHRcdFx0XCJzdGF0ZVwiOiBmcmFtZXdvcmtDb25zdGFudHMuTkFWX1NUQVRFUy5BRE1JTixcblx0XHRcdFx0XCJpZFwiOiBcImFkbWltXCIsXG5cdFx0XHRcdFwiY2xhc3NcIjogXCJwbGFuIGVtcHR5LWhlYWRlclwiLFxuXHRcdFx0XHRcImljb25cIjogXCJcIixcblx0XHRcdFx0XCJpc09wZW5cIjogdHJ1ZSxcblx0XHRcdFx0XCJpdGVtc1wiOiBbXVxuXHRcdFx0fTtcblxuXHRcdFx0bGltaXRlZE1lbnUgPSAge1xuXHRcdFx0XHRcIm5hbWVcIjogeDFVdGlscy50cmFuc2xhdGUoXCJ4MVVpTmdGcmFtZXdvcmsuTkFWLkxJTUlURURfQVZBSUxBQklMSVRZXCIpLFxuXHRcdFx0XHRcImhlYWRlclwiOiB0cnVlLFxuXHRcdFx0XHRcInN0YXRlXCI6IGZyYW1ld29ya0NvbnN0YW50cy5OQVZfU1RBVEVTLkxJTUlURURfQVZBSUxBQklMSVRZLFxuXHRcdFx0XHRcImlkXCI6IFwibGltaXRlZFwiLFxuXHRcdFx0XHRcImNsYXNzXCI6IFwibGltaXRlZCBlbXB0eS1oZWFkZXJcIixcblx0XHRcdFx0XCJpY29uXCI6IFwiXCIsXG5cdFx0XHRcdFwiaXNPcGVuXCI6IHRydWUsXG5cdFx0XHRcdFwiaXRlbXNcIjogW11cblx0XHRcdH07XG5cblx0XHRcdG5hdkl0ZW1zID0gW2Rhc2hib2FyZHNNZW51LCBhbmFseXplTWVudSwgY3JlYXRlTWVudSwgbWFuYWdlTWVudSwgYWRtaW5NZW51LCBsaW1pdGVkTWVudV07XG5cdFx0XHRoZWxwSXRlbXMgPSBbXTtcblxuXHRcdFx0dmFyIHRvcExldmVsID0gW107XG5cdFx0XHR2YXIgc2Vjb25kYXJ5TGV2ZWwgPSBbXTtcblxuXHRcdFx0ZnVuY3Rpb24gY3JlYXRlU3RhdGVzKHBhcmVudE1lbnUsIGl0ZW1zKSB7XG5cdFx0XHRcdHZhciBpLCBsZW49aXRlbXMubGVuZ3RoO1xuXG5cdFx0XHRcdGZvciAoaT0wOyBpPGxlbjsgaSsrKSB7XG5cdFx0XHRcdFx0dmFyIGl0ZW0gPSBpdGVtc1tpXTtcblx0XHRcdFx0XHR4MVV0aWxzLmVuc3VyZURlZmluZWQoaXRlbSwgXCJzdGF0ZUNvbmZpZy5kYXRhXCIpO1xuXHRcdFx0XHRcdGlmKCFpdGVtLnN0YXRlQ29uZmlnLmRhdGEucGFyZW50U3RhdGVzKSB7XG5cdFx0XHRcdFx0XHRpdGVtLnN0YXRlQ29uZmlnLmRhdGEucGFyZW50U3RhdGVzID0gWyBwYXJlbnRNZW51LnN0YXRlIF07XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vZm9yIGFueSBpdGVtcyB0aGF0IG1heSBoYXZlIG11bHRpcGxlIHBhcmVudHNNZW51cyAtIGFsbG93cyBmb3IgY29ycmVjdCBicmVhZGNydW1iIHBvcHVsYXRpb25cblx0XHRcdFx0XHRcdGl0ZW0uc3RhdGVDb25maWcuZGF0YS5wYXJlbnRNZW51ID0gcGFyZW50TWVudS5zdGF0ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aXRlbS5zdGF0ZUNvbmZpZy5kYXRhLm5hbWUgPSBpdGVtLnN0YXRlQ29uZmlnLmRhdGEubmFtZSB8fCBpdGVtLm5hbWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0Zm9yIChpPTA7IGk8bGVuOyBpKyspIHtcblx0XHRcdFx0XHRmcmFtZXdvcmtDcmVhdGVTdGF0ZXMuYWRkU3RhdGUoaXRlbXNbaV0uc3RhdGUsIGl0ZW1zW2ldLnN0YXRlQ29uZmlnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogTmF2aWdhdGlvbiBTZXJ2aWNlc1xuXHRcdFx0ICovXG5cblx0XHRcdHRoaXMuZ2V0TmF2SXRlbXMgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG5hdkl0ZW1zO1xuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy5nZXRVc2VyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiB1c2VyO1xuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy5zZXRVc2VyID0gZnVuY3Rpb24odXNlck9iamVjdCkge1xuXHRcdFx0XHR1c2VyID0gYW5ndWxhci5leHRlbmQodXNlciwgdXNlck9iamVjdCk7XG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLmFkZFRvRnJhbWV3b3JrID0gZnVuY3Rpb24obWVudUdyb3VwLCBpdGVtcykge1xuXHRcdFx0XHR2YXIgbWVudTtcblxuXHRcdFx0XHRzd2l0Y2gobWVudUdyb3VwKSB7XG5cdFx0XHRcdFx0Y2FzZSBmcmFtZXdvcmtDb25zdGFudHMuTkFWX01FTlUuREFTSEJPQVJEUzpcblx0XHRcdFx0XHRcdG1lbnUgPSBkYXNoYm9hcmRzTWVudTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgZnJhbWV3b3JrQ29uc3RhbnRzLk5BVl9NRU5VLkFOQUxZWkU6XG5cdFx0XHRcdFx0XHRtZW51ID0gYW5hbHl6ZU1lbnU7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIGZyYW1ld29ya0NvbnN0YW50cy5OQVZfTUVOVS5DUkVBVEU6XG5cdFx0XHRcdFx0XHRtZW51ID0gY3JlYXRlTWVudTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgZnJhbWV3b3JrQ29uc3RhbnRzLk5BVl9NRU5VLk1BTkFHRTpcblx0XHRcdFx0XHRcdG1lbnUgPSBtYW5hZ2VNZW51O1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBmcmFtZXdvcmtDb25zdGFudHMuTkFWX01FTlUuQURNSU46XG5cdFx0XHRcdFx0XHRtZW51ID0gYWRtaW5NZW51O1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBmcmFtZXdvcmtDb25zdGFudHMuTkFWX01FTlUuTElNSVRFRF9BVkFJTEFCSUxJVFk6XG5cdFx0XHRcdFx0XHRtZW51ID0gbGltaXRlZE1lbnU7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIGZyYW1ld29ya0NvbnN0YW50cy5OT1RfT05fTUVOVTpcblx0XHRcdFx0XHRcdG1lbnUgPSB7IFxuXHRcdFx0XHRcdFx0XHRcInN0YXRlXCI6IG51bGwsXG5cdFx0XHRcdFx0XHRcdFwiaXRlbXNcIjogW10gXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdG1lbnUuaXRlbXMgPSBtZW51Lml0ZW1zLmNvbmNhdChpdGVtcyk7XG5cdFx0XHRcdGNyZWF0ZVN0YXRlcyhtZW51LCBpdGVtcyk7XG5cdFx0XHRcdCRyb290U2NvcGUuJGVtaXQoZnJhbWV3b3JrQ29uc3RhbnRzLkV2ZW50cy5OQVZfSVRFTVNfVVBEQVRFRCwgbmF2SXRlbXMpO1xuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy5nZXREYXNoYm9hcmRzTWVudSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gZGFzaGJvYXJkc01lbnU7XG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLmdldEFuYWx5emVNZW51ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBhbmFseXplTWVudTtcblx0XHRcdH07XG5cblx0XHRcdHRoaXMuZ2V0Q3JlYXRlTWVudSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gY3JlYXRlTWVudTtcblx0XHRcdH07XG5cblx0XHRcdHRoaXMuZ2V0TWFuYWdlTWVudSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbWFuYWdlTWVudTtcblx0XHRcdH07XG5cblx0XHRcdHRoaXMuZ2V0QWRtaW5NZW51ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBhZG1pbk1lbnU7XG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLmdldExpbWl0ZWRNZW51ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBsaW1pdGVkTWVudTtcblx0XHRcdH07XG5cblx0XHRcdC8vIGFkZCB3aWRnZXRzIHRvIHRvcCBuYXZcblx0XHRcdHRoaXMuYWRkVG9Ub3BOYXYgPSBmdW5jdGlvbihuZXdJdGVtcykge1xuXHRcdFx0XHR0b3BMZXZlbCA9IHRvcExldmVsLmNvbmNhdChuZXdJdGVtcyk7XG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLmdldFRvcExldmVsID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiB0b3BMZXZlbDtcblx0XHRcdH07XG5cblx0XHRcdC8vYWRkIHdpZGdldHMgdG8gc3VibmF2XG5cdFx0XHR0aGlzLmFkZFRvU3ViTmF2ID0gZnVuY3Rpb24obmV3SXRlbXMpIHtcblx0XHRcdFx0c2Vjb25kYXJ5TGV2ZWwgPSBzZWNvbmRhcnlMZXZlbC5jb25jYXQobmV3SXRlbXMpO1xuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy5nZXRTZWNvbmRhcnlMZXZlbCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gc2Vjb25kYXJ5TGV2ZWw7XG5cdFx0XHR9O1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIENvbmZpZ3VyYXRpb24gU2VydmljZXNcblx0XHRcdCAqL1xuXG5cdFx0XHR0aGlzLnNldFByb2R1Y3RUaXRsZSA9IGZ1bmN0aW9uKHRpdGxlKSB7XG5cdFx0XHRcdHByb2R1Y3RUaXRsZSA9IHRpdGxlO1xuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy5nZXRQcm9kdWN0VGl0bGUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIHByb2R1Y3RUaXRsZTtcblx0XHRcdH07XG5cblx0XHRcdHRoaXMuc2V0U2hvd0JldGFCYWRnZSA9IGZ1bmN0aW9uKHNob3cpIHtcblx0XHRcdFx0c2hvd0JldGFCYWRnZSA9IHNob3c7XG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLmdldFNob3dCZXRhQmFkZ2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIHNob3dCZXRhQmFkZ2U7XG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLmFkZEhlbHBJdGVtID0gZnVuY3Rpb24oZGlzcGxheVRpdGxlLCBjYWxsYmFjaykge1xuXHRcdFx0XHRoZWxwSXRlbXMucHVzaCh7bmFtZTogZGlzcGxheVRpdGxlLCBoYW5kbGVDbGljazogY2FsbGJhY2t9KTtcblx0XHRcdH07XG5cblx0XHRcdHRoaXMuZ2V0SGVscEl0ZW1zID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBoZWxwSXRlbXM7XG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLnNldE9yZ0NhbGxiYWNrID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblx0XHRcdFx0b3JnQ2FsbEJhY2sgPSBjYWxsYmFjaztcblx0XHRcdH07XG5cblx0XHRcdHRoaXMuZ2V0T3JnQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG9yZ0NhbGxCYWNrO1xuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy5zZXRTZWxlY3RlZE9yZ0NhbGxiYWNrID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblx0XHRcdFx0c2VsZWN0ZWRDYWxsQmFjayA9IGNhbGxiYWNrO1xuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy5nZXRTZWxlY3RlZE9yZ0NhbGxiYWNrID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBzZWxlY3RlZENhbGxCYWNrO1xuXHRcdFx0fTtcblx0XHR9XG5cdF0pOyIsIjxkaXYgbmctaWY9XCJ2bS5iYW5uZXJWaXNpYmxlXCIgbmctY2xhc3M9XCJbdm0uYmFubmVyLnR5cGUsIHsgdHJ1ZTogJ21lbnUtb3BlbicgfVskcGFyZW50LmlzU2lkZU5hdk9wZW5dXVwiIFxuICAgIGNsYXNzPVwiZnJhbWV3b3JrLWJhbm5lclwiPlxuICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1tZFwiIG5nLWNsYXNzPVwieyAnYmctc3VjY2Vzcyc6ICdnbHlwaGljb24tb2stY2lyY2xlJywgJ2JnLWluZm8nOiAnZ2x5cGhpY29uLWluZm8tY2lyY2xlJyB9W3ZtLmJhbm5lci50eXBlXVwiPjwvc3Bhbj5cbiAgICA8c3BhbiBjbGFzcz1cImJhbm5lci1tc2dcIj5cbiAgICAgICAgPHNwYW4+e3t2bS5iYW5uZXIubWVzc2FnZX19PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImJ0bi1saW5rXCIgbmctaWY9XCJ2bS5iYW5uZXIubGlua1RleHRcIiBuZy1jbGljaz1cInZtLml0ZW1DbGlja2VkKHZtLmJhbm5lcilcIiBuZy1iaW5kPVwidm0uYmFubmVyLmxpbmtUZXh0IHwgdHJhbnNsYXRlXCI+PC9zcGFuPlxuICAgIDwvc3Bhbj5cbiAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24teHMgZ2x5cGhpY29uLXJlbW92ZVwiIG5nLWNsaWNrPVwidm0udG9nZ2xlQmFubmVyKGZhbHNlKVwiPjwvc3Bhbj5cbjwvZGl2PiIsIjx1bCBjbGFzcz1cImZyYW1ld29yay1icmVhZGNydW1ic1wiIHJvbGU9XCJtZW51XCI+XG5cdDxsaSByb2xlPVwibWVudS1pdGVtXCIgbmctcmVwZWF0PVwiY3J1bWIgaW4gZGF0YS5icmVhZGNydW1ic1wiIG5nLWNsYXNzPVwieyAnbGFzdC1jcnVtYic6ICRsYXN0IH1cIj5cblx0XHQ8YSBjbGFzcz1cImNydW1iLWR1bW15XCIgbmctaWY9XCIhJGxhc3QgJiYgY3J1bWIuZGF0YS5kdW1teUxpbmtcIj57e2dldERpc3BsYXlOYW1lKGNydW1iKX19PC9hPlxuXHRcdDxhIGNsYXNzPVwiY3J1bWJcIiBuZy1pZj1cIiEkbGFzdCAmJiAhY3J1bWIuZGF0YS5kdW1teUxpbmtcIiBuZy1jbGljaz1cImNoYW5nZVN0YXRlKGNydW1iKVwiPlxuXHRcdFx0e3tnZXREaXNwbGF5TmFtZShjcnVtYil9fTwvYT5cblx0XHQ8c3BhbiBuZy1pZj1cIiEkbGFzdFwiIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgICA8YSBjbGFzcz1cImNydW1iLXNlbGVjdGVkXCIgbmctaWY9XCIkbGFzdFwiPnt7Z2V0RGlzcGxheU5hbWUoY3J1bWIpfX08L2E+XG5cdDwvbGk+XG48L3VsPiIsIjxkaXYgY2xhc3M9XCJ0b3AtbmF2LW1lbnUgbGlzdC1ncm91cFwiIHJvbGU9XCJtZW51XCI+XG4gICAgPGEgbmctcmVwZWF0PVwiaXRlbSBpbiBnZXRIZWxwSXRlbXMoKVwiIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCIgbmFtZT1cInt7aXRlbS5uYW1lIHwgdHJhbnNsYXRlfX1cIlxuICAgICAgICAgICAgbmctY2xhc3M9XCJ7J2Rpc2FibGVkJzogaXRlbS5kaXNhYmxlZCwgJ2FjdGl2ZSc6IGl0ZW0uYWN0aXZlfVwiXG4gICAgICAgICAgICByb2xlPVwibWVudWl0ZW1cIiBhcmlhLWxhYmVsPVwie3tpdGVtLm5hbWUgfCB0cmFuc2xhdGV9fVwiXG4gICAgICAgICAgICBuZy1jbGljaz1cIml0ZW0uaGFuZGxlQ2xpY2soKVwiIG5nLWtleWRvd249XCJhY2Nlc3NpYmxlQ2xpY2soaXRlbSwgJGV2ZW50KVwiIHRyYW5zbGF0ZT1cInt7aXRlbS5uYW1lfX1cIj48L2E+XG48L2Rpdj4iLCI8dWwgY2xhc3M9XCJ0b3AtbmF2LW1lbnUgbGlzdC1ncm91cFwiIHJvbGU9XCJtZW51XCI+XG4gICAgPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxhIG5nLWNsaWNrPVwibG9nb3V0KClcIiBjbGFzcz1cIml0ZW0tbmFtZSBsaXN0LWl0ZW0tbGlua1wiIHRyYW5zbGF0ZT1cIngxVWlOZ0ZyYW1ld29yay5QUk9GSUxFLkxPR09VVFwiPjwvYT5cbiAgICA8L2xpPlxuPC91bD4iLCI8ZGl2IG5nLWNvbnRyb2xsZXI9XCJPcmdTd2l0Y2hDb250cm9sbGVyIGFzIHZtXCI+XG5cdDxkaXYgY2xhc3M9XCJmcmFtZXdvcmstb3JnLXN3aXRjaFwiPlxuXHRcdDxkaXYgY2xhc3M9XCJvcmctbGlzdC1jb250YWluZXJcIj5cblx0XHRcdDx4MS1sb2FkaW5nLWJlZSBzaXplPVwiNjBweFwiIG5nLXNob3c9XCJ2bS5zaG93TG9hZGluZ1wiPjwveDEtbG9hZGluZy1iZWU+XG5cdFx0XHQ8ZGl2IG5nLXJlcGVhdD1cIm9yZyBpbiB2bS5vcmdBcnJheVwiIGNsYXNzPVwib3JnLWxpc3QtaXRlbVwiIG5nLWNsaWNrPVwidm0uc2VsZWN0T3JnKG9yZylcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cIm9yZy1saXN0LWl0ZW0tc2VsZWN0aW9uXCIgbmctY2xhc3M9XCJ7J2VtcHR5Jzohb3JnLnNlbGVjdGVkLCAnc2VsZWN0ZWQnOm9yZy5zZWxlY3RlZCB9XCI+PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJpdGVtLXRleHQtd3JhcFwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJvcmctbGlzdC1pdGVtLW5hbWVcIj48c3Ryb25nPnt7b3JnLm9yZ05hbWV9fTwvc3Ryb25nPjwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJvcmctbGlzdC1pdGVtLWlkXCI+e3tvcmcub3JnSWR9fTwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHQ8L2Rpdj5cbjwvZGl2PiIsIjxkaXYgY2xhc3M9XCJ0b3AtbmF2LW1lbnUgbGlzdC1ncm91cFwiIHJvbGU9XCJtZW51XCI+XG4gICAgPGEgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0gc3dpdGNoLW9yZ1wiIG5nLWNsaWNrPVwic3dpdGNoT3JnKClcIiB0cmFuc2xhdGU9XCJ4MVVpTmdGcmFtZXdvcmsuVVNFUl9NRU5VLlNXSVRDSFwiPjwvYT5cbiAgICA8IS0tIDxhIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCIgbmctY2xhc3M9XCJsb2dvdXRcIiBuZy1jbGljaz1cImxvZ291dCgpXCI+TG9nb3V0PC9hPiAtLT5cbjwvZGl2PiIsIjxkaXYgY2xhc3M9XCJtYWNyby1tZW51LXBvcG92ZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICA8ZGl2IG5nLWNsYXNzPVwibWFjcm9NZW51Q29sdW1uV2lkdGgoKVwiXG4gICAgICAgICAgICAgICAgICAgICBuZy1yZXBlYXQ9XCJtYWNyb01lbnVJdGVtIGluIG5hdkl0ZW1zIHwgbGltaXRUbzogbWFjcm9NZW51Q29sdW1uTGltaXQgXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYWNyby1tZW51LWhlYWRlci10aXRsZVwiPnt7bWFjcm9NZW51SXRlbS5uYW1lIHwgdHJhbnNsYXRlfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPGhyIGNsYXNzPVwiZGl2aWRlclwiPlxuICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgPGxpIG5nLXJlcGVhdD1cIml0ZW0gaW4gbWFjcm9NZW51SXRlbS5pdGVtc1wiPlxuICAgICAgICAgICAgICAgICAgICA8YSBuZy1jbGljaz1cImdvVG9VcmwoaXRlbS5zdGF0ZSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7aXRlbS5uYW1lfCB0cmFuc2xhdGV9fVxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG4iLCI8ZGl2ICBjbGFzcz1cInRvcC1tYWNyby1tZW51LXBvcG92ZXJcIj5cbiAgICAgICA8c3BhbiB0b3AtbWFjcm8tbWVudT5cblx0ICAgPC9zcGFuPlxuPC9kaXY+XG48eDEtdG9wLW5hdmlnYXRpb24gaGFtYnVyZ2VyPVwidHJ1ZVwiIGJyYW5kPVwie3twcm9kdWN0VGl0bGUgfCB0cmFuc2xhdGV9fVwiIGJyYW5kLWhyZWY9XCIjL3dvcmtzcGFjZXNcIlxuXHRcdGJyYW5kLWJhZGdlPVwie3tzaG93QmV0YUJhZGdlKCl9fVwiIGRhdGEtaHRtbDJjYW52YXMtaWdub3JlPVwidHJ1ZVwiIGlzLW1vYmlsZT1cInRydWVcIlxuXHRcdGlzLWhhbWJ1cmdlci1hY3RpdmU9XCJ0cnVlXCIgaXMtZml4ZWQ9XCJ0cnVlXCI+XG5cdDxzcGFuIG5nLWlmPVwidXNlclwiIGNsYXNzPVwiY2xpZW50LWRldGFpbHNcIlxuXHRcdFx0ZGF0YS10cmlnZ2VyPVwiaG92ZXJcIlxuXHRcdFx0ZGF0YS1wbGFjZW1lbnQ9XCJib3R0b21cIlxuXHRcdFx0ZGF0YS10aXRsZT1cInt7dXNlci5tYXN0ZXJTdWJDbGllbnRJZHNbdXNlci5jbGllbnRJZF19fSAtIHt7dXNlci5jbGllbnRJZH19XCJcblx0XHRcdHgxLXRvb2x0aXA+XG5cdFx0PHNwYW4gY2xhc3M9XCJuYXZiYXItYnJhbmRcIj57e3VzZXIubWFzdGVyU3ViQ2xpZW50SWRzW3VzZXIuY2xpZW50SWRdfX08L3NwYW4+XG5cdDwvc3Bhbj5cblx0PHNwYW4gbmctaWY9XCJ1c2VyLm9yZ05hbWVcIiBjbGFzcz1cIm5hdmJhci1vcmdcIj5cblx0XHQ8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1yaWdodFwiPjwvc3Bhbj5cblx0XHQ8c3BhbiBjbGFzcz1cIm9yZy10ZXh0XCI+e3t1c2VyLm9yZ05hbWV9fTwvc3Bhbj5cblx0PC9zcGFuPlxuXG5cdDxoMiBpZD1cIngxVG9wTmF2U2Vjb25kYXJ5XCIgY2xhc3M9XCJzci1vbmx5XCIgdHJhbnNsYXRlPVwieDFVaU5nVG9wTmF2aWdhdGlvbkRlbW8uTkFWMl9TUl9URVhUXCI+PC9oMj5cblx0PHVsIGNsYXNzPVwibmF2IG5hdmJhci1uYXYgbmF2YmFyLXJpZ2h0IGZyYW1ld29yay1uYXZcIiByb2xlPVwibWVudVwiIGFyaWEtbGFiZWxsZWRieT1cIngxVG9wTmF2U2Vjb25kYXJ5XCI+XG5cdFx0PGxpIHJvbGU9XCJtZW51aXRlbVwiIG5nLXJlcGVhdD1cIml0ZW0gaW4gdG9wTGV2ZWxcIj5cblx0XHRcdDxmdy10b3AtbGV2ZWwgaXRlbT1cIml0ZW1cIj48L2Z3LXRvcC1sZXZlbD5cblx0XHQ8L2xpPlxuXHRcdDxsaSByb2xlPVwibWVudWl0ZW1cIiBjbGFzcz1cImRyb3Bkb3duXCI+XG5cdFx0XHQ8YSB4MS1wb3BvdmVyPVwie3BsYWNlbWVudDogJ2JvdHRvbS1sZWZ0J31cIiBwbGFjZW1lbnQ9XCJib3R0b20tbGVmdFwiIG91dHNpZGUtY2xpY2s9XCJ0cnVlXCJcblx0XHRcdFx0XHRjb250ZW50LXRlbXBsYXRlPVwidXNlci1tZW51L3VzZXItcG9wb3Zlci5odG1sXCIgY2xhc3M9XCJtYWluLW1lbnUtbGluayB1c2VyLW1lbnVcIj5cblx0XHRcdFx0PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLW1kIGdseXBoaWNvbi11c2VyIHB1bGwtbGVmdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cblx0XHRcdFx0PHNwYW4gY2xhc3M9XCJ1c2VyLWFjdGlvbnMtbmF2LXRleHRcIj57eyB1c2VyLmZpcnN0TmFtZSB9fTwvc3Bhbj5cblx0XHRcdDwvYT5cblx0XHQ8L2xpPlxuXHRcdDxsaSByb2xlPVwibWVudWl0ZW1cIj5cblx0XHRcdDxhIHgxLXBvcG92ZXI9XCJ7cGxhY2VtZW50OiAnYm90dG9tLWxlZnQnfVwiIHBsYWNlbWVudD1cImJvdHRvbS1sZWZ0XCIgb3V0c2lkZS1jbGljaz1cInRydWVcIlxuXHRcdFx0XHRcdGNvbnRlbnQtdGVtcGxhdGU9XCJoZWxwLW1lbnUvaGVscC1wb3BvdmVyLmh0bWxcIiBjbGFzcz1cIm1haW4tbWVudS1saW5rXCI+XG5cdFx0XHQ8IS0tPGEgeDEtcG9wb3Zlcj1cImhlbHBQb3ZlclwiIG91dHNpZGUtY2xpY2s9XCJ0cnVlXCIgY2xhc3M9XCJtYWluLW1lbnUtbGlua1wiPi0tPlxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tbWQgZ2x5cGhpY29uLXF1ZXN0aW9uLWNpcmNsZSBwdWxsLWxlZnRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG5cdFx0XHRcdDxzcGFuIHRyYW5zbGF0ZT1cIngxVWlOZ0ZyYW1ld29yay5DT05UUk9MUy5IRUxQXCI+PC9zcGFuPlxuXHRcdFx0PC9hPlxuXHRcdDwvbGk+XG5cdFx0PGxpIHJvbGU9XCJtZW51aXRlbVwiPlxuXHRcdFx0PHNwYW4gY2xhc3M9XCJzci1vbmx5XCIgdHJhbnNsYXRlPVwieDFVaU5nRnJhbWV3b3JrLklCTVwiPjwvc3Bhbj5cblx0XHRcdDxzcGFuIGNsYXNzPVwibmF2YmFyLWJyYW5kIGlibS1sb2dvXCJcblx0XHRcdFx0XHR0aXRsZT1cInt7J3gxVWlOZ0ZyYW1ld29yay5JQk0nIHwgdHJhbnNsYXRlfX1cIj48L3NwYW4+XG5cdFx0PC9saT5cblx0PC91bD5cbjwveDEtdG9wLW5hdmlnYXRpb24+XG48eDEtc2lkZS1uYXZpZ2F0aW9uIGlzLW9wZW49XCJpc1NpZGVOYXZPcGVuXCIgaXRlbXM9XCJuYXZJdGVtc1wiIGlzLXN0YXRlZnVsPVwidHJ1ZVwiXG5cdFx0ZGF0YS1odG1sMmNhbnZhcy1pZ25vcmU9XCJ0cnVlXCI+PC94MS1zaWRlLW5hdmlnYXRpb24+XG48c2VjdGlvbiBjbGFzcz1cImJhbm5lci1hbGVydHNcIiBuZy1jbGFzcz1cInsnc2lkZS1uYXYtb3Blbic6IGlzU2lkZU5hdk9wZW59XCIgbmctaWY9XCJhbGVydHMubGVuZ3RoID4gMFwiPlxuXHQ8YWxlcnQgbmctcmVwZWF0PVwiYWxlcnQgaW4gYWxlcnRzIHRyYWNrIGJ5ICRpbmRleFwiIHR5cGU9XCJ7e2FsZXJ0WzBdLnR5cGV9fVwiIGNsb3NlPVwiY2xvc2VBbGVydCgkaW5kZXgpXCI+XG5cdFx0PHNwYW4gY2xhc3M9XCJnbHlwaGljb25cIiBuZy1jbGFzcz1cInNldEljb24oYWxlcnRbMF0pXCI+PC9zcGFuPlxuXHRcdDxuZy1pbmNsdWRlIHNyYz1cIidhbGVydHMvYWxlcnQtdGVtcGxhdGVzLycgKyBhbGVydFswXS5sb2NhbGl6YXRpb25LZXkgKycuaHRtbCdcIj48L25nLWluY2x1ZGU+XG5cdDwvYWxlcnQ+XG48L3NlY3Rpb24+XG48ZnctYmFubmVyIGNsYXNzPVwiYmFubmVyLWNvbnRhaW5lclwiPjwvZnctYmFubmVyPlxuPGRpdiBjbGFzcz1cInN1Ym5hdlwiIG5nLWNsYXNzPVwieyAnbWVudS1vcGVuJzogaXNTaWRlTmF2T3BlbiB9XCI+XG5cdDxmdy1icmVhZC1jcnVtYnM+PC9mdy1icmVhZC1jcnVtYnM+XG5cdDx1bCBjbGFzcz1cIm5hdiBuYXZiYXItbmF2IG5hdmJhci1yaWdodFwiIHJvbGU9XCJtZW51XCI+XG5cdFx0PGxpIHJvbGU9J21lbnVpdGVtJyBuZy1yZXBlYXQ9J3dpZGcgaW4gc3ViTmF2V2lkZ2V0cycgbmctaWY9J3dpZGcubWFrZVZpc2libGUnPlxuXHRcdFx0PGZ3LXRvcC1sZXZlbCBpdGVtPVwid2lkZy53aWRnZXRcIj48L2Z3LXRvcC1sZXZlbD5cblx0XHQ8L2xpPlxuXHQ8L3VsPlxuPC9kaXY+XG48c2VjdGlvbiB1aS12aWV3IGNsYXNzPVwiaG9tZS1jb250ZW50XCIgbmctY2xhc3M9XCJ7J21lbnUtb3Blbic6IGlzU2lkZU5hdk9wZW59XCI+PHA+IDwvcD5cbjwvc2VjdGlvbj5cbjxzZWN0aW9uIGNsYXNzPVwiY29udGV4dHVhbC1oZWxwXCIgbmctaWY9XCJhcHBNZXRhZGF0YS5zaG93Q29udGV4dHVhbEhlbHAgJiYgY29udGV4dHVhbEhlbHBNZXNzYWdlXCIgbmctbW91c2VlbnRlcj1cImNvbnRleHR1YWxIZWxwTW91c2VFbnRlcigpXCIgbmctbW91c2VsZWF2ZT1cImNvbnRleHR1YWxIZWxwTW91c2VMZWF2ZSgpXCI+XG5cdDxkaXYgY2xhc3M9XCJjb250ZXh0dWFsLWhlbHAtaWNvbi1jb250YWluZXJcIj5cblx0XHQ8ZGl2IGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1sZyBnbHlwaGljb24tcXVlc3Rpb24tY2lyY2xlIGNvbnRleHR1YWwtaGVscC1pY29uXCI+PC9kaXY+XG5cdDwvZGl2PlxuXHQ8cCBjbGFzcz1cImNvbnRleHR1YWwtaGVscC1tZXNzYWdlXCIgdHJhbnNsYXRlPVwiaWJtZGEuY29udGV4dHVhbEhlbHBNZXNzYWdlcy57e2NvbnRleHR1YWxIZWxwTWVzc2FnZX19XCI+PC9wPlxuXHQ8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24teHMgZ2x5cGhpY29uLXJlbW92ZSBjb250ZXh0dWFsLWhlbHAtY2xvc2VcIiBuZy1jbGljaz1cImNsb3NlQ29udGV4dHVhbEhlbHBNZXNzYWdlKClcIj48L3NwYW4+XG5cdDxkaXYgY2xhc3M9XCJjb250ZXh0dWFsLWhlbHAtY29udHJvbHNcIj48YSBuZy1jbGljaz1cImNsb3NlQ29udGV4dHVhbEhlbHBNZXNzYWdlKClcIiB0cmFuc2xhdGU9XCJpYm1kYS5jb250ZXh0dWFsSGVscE1lc3NhZ2VzLm9rR290SXRcIj48L2E+IHwgPGEgbmctY2xpY2s9XCJkb250U2hvd0NvbnRleHR1YWxIZWxwRm9yZXZlcigpXCIgdHJhbnNsYXRlPVwiaWJtZGEuY29udGV4dHVhbEhlbHBNZXNzYWdlcy5kb250U2hvd1RoZXNlQWdhaW5cIj48L2E+PC9kaXY+XG48L3NlY3Rpb24+XG4iXX0=
