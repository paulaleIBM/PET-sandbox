angular
    .module("x1.ui.css", [
        "prism",
        "ui.router",
		"ui.bootstrap",
		"x1.ui.demo.css",
		"rb-integration"
	])
    .config(["$stateProvider", "$urlRouterProvider", "$logProvider",
        function ($stateProvider, $urlRouterProvider, $logProvider) {
            "use strict";

            $urlRouterProvider.otherwise("/css");
            $logProvider.debugEnabled(false);
        }]);
angular.module("prism", []);
angular.module("x1.ui.css")
	.constant("X1UiCssNavItems", [
		{
			"name": "CSS",
			"state": "css",
			"class": "css",
			"icon": "components",
			"items": [
				{
					"name": "Getting Started with Bootstrap",
					"state": "getting-started-bs",
					"class": "getting-started-bs"
				},
                {
                    "name": "Using Peretz",
                    "state": "getting-started-peretz",
                    "class": "getting-started-peretz"
                },
                {
                    "name": "Using This Site",
                    "state": "getting-started",
                    "class": "getting-started"
                },
                {
					"name": "Buttons",
					"state": "buttons",
					"class": "buttons"
				},
                {
                    "name": "Button alignment & placement",
                    "state": "button-align-place",
                    "class": "button-align-place"
                },
                {
					"name": "Check boxes",
					"state": "checkboxes",
					"class": "checkboxes"
				},
                {
                    "name": "Colors",
                    "state": "colors",
                    "class": "colors"
                },
                {
                    "name": "Combination boxes",
                    "state": "comboboxes",
                    "class": "comboboxes"
                },
                {
					"name": "Drop-down lists",
					"state": "dropdowns",
					"class": "dropdowns"
				},
                {
                    "name": "Iconography",
                    "state": "iconography",
                    "class": "iconography"
                },
                {
                    "name": "Layout",
                    "state": "layout",
                    "class": "layout"
                },
                {
                    "name": "Messages",
                    "state": "messages",
                    "class": "messages"
                },
                {
                    "name": "Pop-up Help",
                    "state": "popup-help",
                    "class": "popup-help"
                },
				{
					"name": "Radio buttons",
					"state": "radio-buttons",
					"class": "radio-buttons"
				},
				{
					"name": "Text fields",
					"state": "text-fields",
					"class": "text-fields"
				},
                {
                    "name": "Text in the UI",
                    "state": "text-ui",
                    "class": "text-ui"
                },
                {
                    "name": "Toggle buttons",
                    "state": "toggle-buttons",
                    "class": "toggle-buttons"
                },
                {
                    "name": "Typography",
                    "state": "typography",
                    "class": "typography"
                },
                {
                    "name": "Base text direction (Bidi)",
                    "state": "bidi",
                    "class": "bidi"
                },
			]
		}
	]);
angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {
			$stateProvider
				.state("bidi", {
					url: "/css/bidi",
					templateUrl: "bidi/bidi.html"
				});
		}]);

angular.module("x1.ui.css")
	.controller("bidiCtrl", ["$scope", function($scope) {
		"use strict";
		    angular.element(document).ready(function () {
				  $('.tooltip-bottom').tooltip({
				    placement: 'bottom',
				    textdir: 'rtl',
				    viewport: {selector: 'body', padding: 2}
				  })
				  $('.tooltip-top').tooltip({
				    placement: 'top',
				    textdir: 'contextual',					
				    viewport: {selector: 'body', padding: 2}
				  })
				  $('.tooltip-right').tooltip({
				    placement: 'right',
				    viewport: {selector: 'body', padding: 2}
				  })				  
				  $('#popover1').popover({textdir: 'rtl'})
				  $('#popover2').popover()				
		    });		
	}]);
angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {

			$stateProvider
				.state("button-align-place", {
					url: "/css/button-align-place",
					templateUrl: "button-align-place/button-align-place.demo.html"
				});
		}]);
angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("buttons", {
					url: "/css/buttons",
					templateUrl: "buttons/buttons.demo.html"
				});
		}]);
angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {

			$stateProvider
				.state("checkboxes", {
					url: "/css/checkboxes",
					templateUrl: "checkboxes/checkboxes.demo.html"
				});
		}]);
angular
	.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("colors", {
					url: "/css/colors",
					templateUrl: "colors/colors.demo.html"
				});
		}]);
angular
	.module("x1.ui.css")
	.controller("colorsCtrl", ["$scope", function($scope) {
		"use strict";

		var customs = [
			{
				variable: "$com-teal1",
				hex: "#00a6a0",
				textClass: "text-light"
			},
			{
				variable: "$com-teal2",
				hex: "#007670",
				textClass: "text-light"
			},
			{
				variable: "$com-teal1-10",
				hex: "#e5f6f5",
				textClass: "text-dark"
			},
			{
				variable: "$com-teal1-20",
				hex: "#ccedec",
				textClass: "text-dark"
			},
			{
				variable: "$link-color",
				hex: "#037bbf",
				textClass: "text-light"
			},
			{
				variable: "$gray10-25",
				hex: "#f7f7f7",
				textClass: "text-dark"
			},
			{
				variable: "$gray10-50",
				hex: "#efefef",
				textClass: "text-dark"
			}
		],
		blues = [
			{
				variable: "$blue",
				hex: "#4178BE",
				textClass: "text-light"
			},
			{
				variable: "$blue10",
				hex: "#C0E6FF",
				textClass: "text-dark"
			},
			{
				variable: "$blue20",
				hex: "#7CC7FF",
				textClass: "text-dark"
			},
			{
				variable: "$blue30",
				hex: "#5AAAFA",
				textClass: "text-dark"
			},
			{
				variable: "$blue40",
				hex: "#5596E6",
				textClass: "text-light"
			},
			{
				variable: "$blue50",
				hex: "#4178BE",
				textClass: "text-light"
			},
			{
				variable: "$blue60",
				hex: "#325C80",
				textClass: "text-light"
			},
			{
				variable: "$blue70",
				hex: "#264A60",
				textClass: "text-light"
			},
			{
				variable: "$blue80",
				hex: "#1D3649",
				textClass: "text-light"
			},
			{
				variable: "$blue90",
				hex: "#152935",
				textClass: "text-light"
			},
			{
				variable: "$blue100",
				hex: "#010205",
				textClass: "text-light"
			}
		],
		greens = [
			{
				variable: "$green",
				hex: "#4B8400",
				textClass: "text-light"
			},
			{
				variable: "$green10",
				hex: "#C8F08F",
				textClass: "text-dark"
			},
			{
				variable: "$green20",
				hex: "#B4E051",
				textClass: "text-dark"
			},
			{
				variable: "$green30",
				hex: "#8CD211",
				textClass: "text-dark"
			},
			{
				variable: "$green40",
				hex: "#5AA700",
				textClass: "text-light"
			},
			{
				variable: "$green50",
				hex: "#4B8400",
				textClass: "text-light"
			},
			{
				variable: "$green60",
				hex: "#2D660A",
				textClass: "text-light"
			},
			{
				variable: "$green70",
				hex: "#144D14",
				textClass: "text-light"
			},
			{
				variable: "$green80",
				hex: "#0A3C02",
				textClass: "text-light"
			},
			{
				variable: "$green90",
				hex: "#0C2808",
				textClass: "text-light"
			},
			{
				variable: "$green100",
				hex: "#010200",
				textClass: "text-light"
			}
		],
		teals = [
			{
				variable: "$teal",
				hex: "#008571",
				textClass: "text-light"
			},
			{
				variable: "$teal10",
				hex: "#A7FAE6",
				textClass: "text-dark"
			},
			{
				variable: "$teal20",
				hex: "#6EEDD8",
				textClass: "text-dark"
			},
			{
				variable: "$teal30",
				hex: "#41D6C3",
				textClass: "text-dark"
			},
			{
				variable: "$teal40",
				hex: "#00B4A0",
				textClass: "text-dark"
			},
			{
				variable: "$teal50",
				hex: "#008571",
				textClass: "text-light"
			},
			{
				variable: "$teal60",
				hex: "#006D5D",
				textClass: "text-light"
			},
			{
				variable: "$teal70",
				hex: "#005448",
				textClass: "text-light"
			},
			{
				variable: "$teal80",
				hex: "#003C32",
				textClass: "text-light"
			},
			{
				variable: "$teal90",
				hex: "#012B22",
				textClass: "text-light"
			},
			{
				variable: "$teal100",
				hex: "#000202",
				textClass: "text-light"
			}
		],
		purples = [
			{
				variable: "$purple",
				hex: "#9855D4",
				textClass: "text-light"
			},
			{
				variable: "$purple10",
				hex: "#EED2FF",
				textClass: "text-dark"
			},
			{
				variable: "$purple20",
				hex: "#D7AAFF",
				textClass: "text-dark"
			},
			{
				variable: "$purple30",
				hex: "#BA8FF7",
				textClass: "text-dark"
			},
			{
				variable: "$purple40",
				hex: "#AF6EE8",
				textClass: "text-dark"
			},
			{
				variable: "$purple50",
				hex: "#9855D4",
				textClass: "text-dark"
			},
			{
				variable: "$purple60",
				hex: "#734098",
				textClass: "text-light"
			},
			{
				variable: "$purple70",
				hex: "#562F72",
				textClass: "text-light"
			},
			{
				variable: "$purple80",
				hex: "#412356",
				textClass: "text-light"
			},
			{
				variable: "$purple90",
				hex: "#311A41",
				textClass: "text-light"
			},
			{
				variable: "$purple100",
				hex: "#030103",
				textClass: "text-light"
			}
		],
		magentas = [
			{
				variable: "$magenta",
				hex: "#DB2780",
				textClass: "text-light"
			},
			{
				variable: "$magenta10",
				hex: "#FFD2FF",
				textClass: "text-dark"
			},
			{
				variable: "$magenta20",
				hex: "#D7AAFF",
				textClass: "text-dark"
			},
			{
				variable: "$magenta30",
				hex: "#FF71D4",
				textClass: "text-dark"
			},
			{
				variable: "$magenta40",
				hex: "#FF3CA0",
				textClass: "text-dark"
			},
			{
				variable: "$magenta50",
				hex: "#DB2780",
				textClass: "text-light"
			},
			{
				variable: "$magenta60",
				hex: "#A6266E",
				textClass: "text-light"
			},
			{
				variable: "$magenta70",
				hex: "#7C1C58",
				textClass: "text-light"
			},
			{
				variable: "$magenta80",
				hex: "#601146",
				textClass: "text-light"
			},
			{
				variable: "$magenta90",
				hex: "#3A0B2E",
				textClass: "text-light"
			},
			{
				variable: "$magenta100",
				hex: "#040102",
				textClass: "text-light"
			}
		],
		reds = [
			{
				variable: "$red",
				hex: "#E71D32",
				textClass: "text-light"
			},
			{
				variable: "$red10",
				hex: "#FFD2DD",
				textClass: "text-dark"
			},
			{
				variable: "$red20",
				hex: "#FFA5B4",
				textClass: "text-dark"
			},
			{
				variable: "$red30",
				hex: "#FF7D87",
				textClass: "text-dark"
			},
			{
				variable: "$red40",
				hex: "#FF5050",
				textClass: "text-dark"
			},
			{
				variable: "$red50",
				hex: "#E71D32",
				textClass: "text-light"
			},
			{
				variable: "$red60",
				hex: "#AD1625",
				textClass: "text-light"
			},
			{
				variable: "$red70",
				hex: "#8C101C",
				textClass: "text-light"
			},
			{
				variable: "$red80",
				hex: "#6E0A1E",
				textClass: "text-light"
			},
			{
				variable: "$red90",
				hex: "#4C0A17",
				textClass: "text-light"
			},
			{
				variable: "$red100",
				hex: "#040001",
				textClass: "text-light"
			}
		],
		oranges = [
			{
				variable: "$orange",
				hex: "#FF7832",
				textClass: "text-light"
			},
			{
				variable: "$orange10",
				hex: "#FFD4A0",
				textClass: "text-dark"
			},
			{
				variable: "$orange20",
				hex: "#FFA573",
				textClass: "text-dark"
			},
			{
				variable: "$orange30",
				hex: "#FF7832",
				textClass: "text-dark"
			},
			{
				variable: "$orange40",
				hex: "#FF5003",
				textClass: "text-dark"
			},
			{
				variable: "$orange50",
				hex: "#D74108",
				textClass: "text-light"
			},
			{
				variable: "$orange60",
				hex: "#A53725",
				textClass: "text-light"
			},
			{
				variable: "$orange70",
				hex: "#872A0F",
				textClass: "text-light"
			},
			{
				variable: "$orange80",
				hex: "#6D120F",
				textClass: "text-light"
			},
			{
				variable: "$orange90",
				hex: "#43100B",
				textClass: "text-light"
			},
			{
				variable: "$orange100",
				hex: "#030100",
				textClass: "text-light"
			}
		],
		yellows = [
			{
				variable: "$yellow",
				hex: "#FDD600",
				textClass: "text-light"
			},
			{
				variable: "$yellow10",
				hex: "#FDE876",
				textClass: "text-dark"
			},
			{
				variable: "$yellow20",
				hex: "#FDD600",
				textClass: "text-dark"
			},
			{
				variable: "$yellow30",
				hex: "#EFC100",
				textClass: "text-dark"
			},
			{
				variable: "$yellow40",
				hex: "#BE9B00",
				textClass: "text-dark"
			},
			{
				variable: "$yellow50",
				hex: "#8C7300",
				textClass: "text-light"
			},
			{
				variable: "$yellow60",
				hex: "#735F00",
				textClass: "text-light"
			},
			{
				variable: "$yellow70",
				hex: "#574A00",
				textClass: "text-light"
			},
			{
				variable: "$yellow80",
				hex: "#3C3200",
				textClass: "text-light"
			},
			{
				variable: "$yellow90",
				hex: "#281E00",
				textClass: "text-light"
			},
			{
				variable: "$yellow100",
				hex: "#020100",
				textClass: "text-light"
			}
		],
		grays = [
			{
				variable: "$gray",
				hex: "#777677",
				textClass: "text-light"
			},
			{
				variable: "$gray10",
				hex: "#E0E0E0",
				textClass: "text-dark"
			},
			{
				variable: "$gray20",
				hex: "#C7C7C7",
				textClass: "text-dark"
			},
			{
				variable: "$gray30",
				hex: "#AEAEAE",
				textClass: "text-dark"
			},
			{
				variable: "$gray40",
				hex: "#959595",
				textClass: "text-dark"
			},
			{
				variable: "$gray50",
				hex: "#777677",
				textClass: "text-light"
			},
			{
				variable: "$gray60",
				hex: "#5A5A5A",
				textClass: "text-light"
			},
			{
				variable: "$gray70",
				hex: "#464646",
				textClass: "text-light"
			},
			{
				variable: "$gray80",
				hex: "#323232",
				textClass: "text-light"
			},
			{
				variable: "$gray90",
				hex: "#121212",
				textClass: "text-light"
			},
			{
				variable: "$gray100",
				hex: "#000000",
				textClass: "text-light"
			}
		],
		coolGrays = [
			{
				variable: "$cool-gray",
				hex: "#6D7777",
				textClass: "text-light"
			},
			{
				variable: "$cool-gray10",
				hex: "#DFE9E9",
				textClass: "text-dark"
			},
			{
				variable: "$cool-gray20",
				hex: "#C8D2D2",
				textClass: "text-dark"
			},
			{
				variable: "$cool-gray30",
				hex: "#AEB8B8",
				textClass: "text-dark"
			},
			{
				variable: "$cool-gray40",
				hex: "#959F9F",
				textClass: "text-dark"
			},
			{
				variable: "$cool-gray50",
				hex: "#6D7777",
				textClass: "text-light"
			},
			{
				variable: "$cool-gray60",
				hex: "#586262",
				textClass: "text-light"
			},
			{
				variable: "$cool-gray70",
				hex: "#3C4646",
				textClass: "text-light"
			},
			{
				variable: "$cool-gray80",
				hex: "#323C3C",
				textClass: "text-light"
			},
			{
				variable: "$cool-gray90",
				hex: "#0D1111",
				textClass: "text-light"
			},
			{
				variable: "$cool-gray100",
				hex: "#000203",
				textClass: "text-light"
			}
		],
		warmGrays = [
			{
				variable: "$warm-gray",
				hex: "#7D7373",
				textClass: "text-light"
			},
			{
				variable: "$warm-gray10",
				hex: "#E9E0E0",
				textClass: "text-dark"
			},
			{
				variable: "$warm-gray20",
				hex: "#D0C7C7",
				textClass: "text-dark"
			},
			{
				variable: "$warm-gray30",
				hex: "#B8AEAE",
				textClass: "text-dark"
			},
			{
				variable: "$warm-gray40",
				hex: "#9E9494",
				textClass: "text-dark"
			},
			{
				variable: "$warm-gray50",
				hex: "#7D7373",
				textClass: "text-light"
			},
			{
				variable: "$warm-gray60",
				hex: "#645A5A",
				textClass: "text-light"
			},
			{
				variable: "$warm-gray70",
				hex: "#504646",
				textClass: "text-light"
			},
			{
				variable: "$warm-gray80",
				hex: "#3C3232",
				textClass: "text-light"
			},
			{
				variable: "$warm-gray90",
				hex: "#1A1314",
				textClass: "text-light"
			},
			{
				variable: "$warm-gray100",
				hex: "#030000",
				textClass: "text-light"
			}
		],
		neutralWhites = [
			{
				variable: "$neutral-white",
				hex: "#FDFDFD",
				textClass: "text-dark"
			},
			{
				variable: "$neutral-white10",
				hex: "#FDFDFD",
				textClass: "text-dark"
			},
			{
				variable: "$neutral-white20",
				hex: "#F9F9F9",
				textClass: "text-dark"
			},
			{
				variable: "$neutral-white30",
				hex: "#F4F4F4",
				textClass: "text-dark"
			},
			{
				variable: "$neutral-white40",
				hex: "#ECECEC",
				textClass: "text-dark"
			}
		],
		coolWhites = [
			{
				variable: "$cool-white",
				hex: "#FBFCFC",
				textClass: "text-dark"
			},
			{
				variable: "$cool-white10",
				hex: "#FBFCFC",
				textClass: "text-dark"
			},
			{
				variable: "$cool-white20",
				hex: "#F9F9FB",
				textClass: "text-dark"
			},
			{
				variable: "$cool-white30",
				hex: "#F0F2F4",
				textClass: "text-dark"
			},
			{
				variable: "$cool-white40",
				hex: "#ECF2F2",
				textClass: "text-dark"
			}
		],
		warmWhites = [
			{
				variable: "$warm-white",
				hex: "#FDFBFB",
				textClass: "text-dark"
			},
			{
				variable: "$warm-white10",
				hex: "#FDFBFB",
				textClass: "text-dark"
			},
			{
				variable: "$warm-white20",
				hex: "#FDFBFB",
				textClass: "text-dark"
			},
			{
				variable: "$warm-white30",
				hex: "#F7F5F5",
				textClass: "text-dark"
			},
			{
				variable: "$warm-white40",
				hex: "#F2EEEE",
				textClass: "text-dark"
			}
		],
		others = [
			{
				variable: "$black",
				hex: "#000000",
				textClass: "text-light"
			},
			{
				variable: "$white",
				hex: "#FFFFFF",
				textClass: "text-dark"
			}
		];

		$scope.colorShades = [
			customs, blues, greens, teals, purples, magentas, reds, oranges, yellows,
			grays, coolGrays, warmGrays, neutralWhites, coolWhites, warmWhites,
			others
		];
	}]);
angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {

			$stateProvider
				.state("comboboxes", {
					url: "/css/comboboxes",
					templateUrl: "comboboxes/comboboxes.demo.html"
				});
		}]);
angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {

			$stateProvider
				.state("css", {
					url: "/css",
					templateUrl: "css/css.demo.html",
					controller: "CssDemoCtrl"
				});
		}]);

angular.module("x1.ui.demo.css", [])
	.controller("CssDemoCtrl", ["$scope", "X1UiCssNavItems",
		function($scope, X1UiCssNavItems) {
			"use strict";

			$scope.cssItems = X1UiCssNavItems[0].items;
		}]);
angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {

			$stateProvider
				.state("dropdowns", {
					url: "/css/dropdowns",
					templateUrl: "dropdowns/dropdowns.demo.html"
				});
		}]);
angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {

			$stateProvider
				.state("getting-started", {
					url: "/css/getting-started",
					templateUrl: "getting-started/getting-started.demo.html"
				});
		}]);
angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {

			$stateProvider
				.state("getting-started-bs", {
					url: "/css/getting-started-bs",
					templateUrl: "getting-started-bs/getting-started-bs.demo.html"
				});
		}]);
angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {

			$stateProvider
				.state("getting-started-peretz", {
					url: "/css/getting-started-peretz",
					templateUrl: "getting-started-peretz/getting-started-peretz.demo.html"
				});
		}]);
angular
	.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("iconography", {
					url: "/css/iconography",
					templateUrl: "iconography/iconography.demo.html"
				});
		}]);
angular
	.module("x1.ui.css")
	.controller("iconographyCtrl", ["$scope", function($scope) {
		"use strict";

		$scope.glyphs = [
			{
				group: "Action Icons",
				classes: [
					"glyphicon-copy",
					"glyphicon-paste",
					"glyphicon-save",
					"glyphicon-save-as",
					"glyphicon-export",
					"glyphicon-import",
					"glyphicon-or",
					"glyphicon-and",
					"glyphicon-plus",
					"glyphicon-remove",
					"glyphicon-trash",
					"glyphicon-pushpin",
					"glyphicon-edit",
					"glyphicon-search",
					"glyphicon-share",
					"glyphicon-refresh",
					"glyphicon-filter-clear",
					"glyphicon-filter",
					"glyphicon-filter-fill",
					"glyphicon-snapshot-select",
					"glyphicon-sub-select",
					"glyphicon-category-select",
					"glyphicon-zoom-in",
					"glyphicon-zoom-out",
					"glyphicon-zoom-more",
					"glyphicon-zoom-less",
					"glyphicon-resize",
					"glyphicon-resize-full",
					"glyphicon-resize-small"
				]
			},
			{
				group: "Directional Icons",
				classes: [
					"glyphicon-chevron-up-double",
					"glyphicon-chevron-down-double",
					"glyphicon-chevron-left-double",
					"glyphicon-chevron-right-double",
					"glyphicon-chevron-up",
					"glyphicon-chevron-down",
					"glyphicon-chevron-left",
					"glyphicon-chevron-right",
					"glyphicon-arrow-up",
					"glyphicon-arrow-down",
					"glyphicon-arrow-left",
					"glyphicon-arrow-right",
					"glyphicon-fast-forward",
					"glyphicon-fast-backward",
					"glyphicon-triangle-right",
					"glyphicon-triangle-left",
					"glyphicon-chevron-up-down"
				]
			},
			{
				group: "File Icons",
				classes: [
					"glyphicon-folder-close",
					"glyphicon-folder-open",
					"glyphicon-folder-open-fill",
					"glyphicon-file",
					"glyphicon-file-csv",
					"glyphicon-file-excel",
					"glyphicon-file-pdf",
					"glyphicon-file-png",
					"glyphicon-doc-properties",
					"glyphicon-doc-new",
					"glyphicon-doc-add"
				]
			},
			{
				group: "Status Icons",
				classes: [
					"glyphicon-locked",
					"glyphicon-unlocked",
					"glyphicon-ok",
					"glyphicon-ok-circle",
					"glyphicon-warning-sign",
					"glyphicon-error-circle"
				]
			},
			{
				group: "View/Layout Icons",
				classes: [
					"glyphicon-view-full",
					"glyphicon-view-split",
					"glyphicon-view-thumb",
					"glyphicon-view-tree",
					"glyphicon-view-list",
					"glyphicon-gallery",
					"glyphicon-preview"
				]
			},
			{
				group: "Calculator Icons",
				classes: [
					"glyphicon-calc-plus",
					"glyphicon-calc-divide",
					"glyphicon-calc-equal",
					"glyphicon-calc-minus",
					"glyphicon-calc-multiply",
					"glyphicon-calc-delete"
				]
			},
			{
				group: "Calendar Icons",
				classes: [
					"glyphicon-calendar",
					"glyphicon-date-picker",
					"glyphicon-calendar-schedule"
				]
			},
			{
				group: "People Icons",
				classes: [
					"glyphicon-user",
					"glyphicon-people-one-add",
					"glyphicon-people-two",
					"glyphicon-people-group"
				]
			},
			{
				group: "Help Icons",
				classes: [
					"glyphicon-info-circle",
					"glyphicon-info-sign",
					"glyphicon-question-circle",
					"glyphicon-question-sign"
				]
			},
			{
				group: "Shape Icons",
				classes: [
					"glyphicon-shapes",
					"glyphicon-circle",
					"glyphicon-circle-empty",
					"glyphicon-diamond",
					"glyphicon-diamond-empty",
					"glyphicon-pentagon",
					"glyphicon-pentagon-empty",
					"glyphicon-square",
					"glyphicon-square-empty",
					"glyphicon-triangle",
					"glyphicon-triangle-empty",
					"glyphicon-star-empty",
					"glyphicon-star"
				]
			},
			{
				group: "Miscellaneous Icons",
				classes: [
					"glyphicon-menu-hamburger",
					"glyphicon-option-horizontal",
					"glyphicon-option-vertical",
					"glyphicon-gear",
					"glyphicon-gears",
					"glyphicon-gears-fill",
					"glyphicon-tools",
					"glyphicon-tools-fill",
					"glyphicon-analyze",
					"glyphicon-stats",
					"glyphicon-prefs",
					"glyphicon-history",
					"glyphicon-property",
					"glyphicon-grip-vertical",
					"glyphicon-envelope",
					"glyphicon-envelope-fill",
					"glyphicon-world",
					"glyphicon-payment-creditcard",
					"glyphicon-lightbulb",
					"glyphicon-forum",
					"glyphicon-tag",
					"glyphicon-components",
					"glyphicon-contribution",
					"glyphicon-versioning",
					"glyphicon-blank"
				]
			}
		];
	}]);
angular.module("x1.ui.css")
    .config([
        "$stateProvider",
        function($stateProvider) {

            $stateProvider
                .state("layout", {
                    url: "/css/layout",
                    templateUrl: "layout/layout.demo.html"
                });
        }]);

angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("messages", {
					url: "/css/messages",
					templateUrl: "messages/messages.demo.html"
				});
		}]);
angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("popup-help", {
					url: "/css/popup-help",
					templateUrl: "popup-help/popup-help.demo.html"
				});
		}]);
angular
	.module("prism")
	.directive("prism", [function() {
		return {
			restrict: "A",
			link: function($scope, element) {
				element.ready(function() {
					Prism.highlightElement(element[0]);
				});
			}
		};
	}]
);
angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {

			$stateProvider
				.state("radio-buttons", {
					url: "/css/radio-buttons",
					templateUrl: "radio-buttons/radio-buttons.demo.html"
				});
		}]);
angular
	.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("text-fields", {
					url: "/css/text-fields",
					templateUrl: "text-fields/text-fields.demo.html"
				});
		}]);
angular
	.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("text-ui", {
					url: "/css/text-ui",
					templateUrl: "text-ui/text-ui.demo.html"
				});
		}]);
angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {

			$stateProvider
				.state("toggle-buttons", {
					url: "/css/toggle-buttons",
					templateUrl: "toggle-buttons/toggle-buttons.demo.html"
				});
		}]);
angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {

			$stateProvider
				.state("typography", {
					url: "/css/typography",
					templateUrl: "typography/typography.demo.html"
				});
		}]);