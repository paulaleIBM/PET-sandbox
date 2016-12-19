# Peretz Side Navigation Change Log

All notable changes to this project will be documented in this file. This project adheres to
[Semantic Versioning](http://semver.org/) and [Keep a CHANGELOG](http://keepachangelog.com/).

## [2.5.1](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F2.5.1) - 2016-06-09
### Added
- "empty-header" class to prevent app from loading state for classed menu items without affecting their styling. 
Applying the class "panel" to a header accomplishes the same functionality but adversely affects style and layout.

## [2.5.0](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F2.5.0) - 2016-05-25
### Added
- Do not unselect menu items when toggling a header
- Add support for selecting the first child of a header upon toggle open, if there is not already a current selection.

## [2.4.0](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F2.4.0) - 2016-05-17
### Added
- Add support for angular 1.5 compatibility.

## [2.3.0](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F2.3.0) - 2016-04-27
### Added
- Add support for up to 4 levels of nested navigation.

## [2.2.0](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F2.2.0) - 2016-04-26
### Added
- Add support for adding state parameters alongside the state name/id for the stateful navigation
- Allow reveal panels to have child items

## [2.1.3](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F2.1.3) - 2016-04-22
### Fixed
- RTC-50210 Checking if $event.target.firstChild exists before checking if firstChild.className has value to prevent console error when firstChild is null

## [2.1.2](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F2.1.2) - 2016-04-12
### Fixed
- Only open and set active relevant items on state change

## [2.1.1](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F2.1.1) - 2016-04-08
### Fixed
- Ensure clicking on top-level entries (headers) doesn't change state

## [2.1.0](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F2.1.0) - 2016-04-08
### Added
- Added `externalLink` and `target` properties to menu items to allow opening external URLs in a new browser window

## [2.0.3](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F2.0.3) - 2016-03-25
### Fixed
- Translation: added 9 new languages

## [2.0.2](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F2.0.2) - 2016-03-24
### Fixed
- Side nav selection updates with changes in state
- attribute `is-stateful` mistakenly shown as `stateful` in documentation page

## [2.0.1](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F2.0.1) - 2016-03-15
### Changed
- `x1-ui-ng-demo-generator` bower version

## [2.0.0](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F2.0.0) - 2016-03-11
### Added
- IBM Commerce Product Design Language 2.0
- `x1-ui-ng-demo-generator` to demo/devDependencies
### Changed
- Bower dependencies to meet new look & feel
- Demo structure
### Removed
- Demo UX specification and blueprint to meet new Showcase integration
- `side-navigation.mixins.*` because of unused variables

## [1.2.1](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F1.2.1) - 2016-03-06
### Added
- Added feature to hide top-level menu items with no children--useful for the Common UI Framework

## [1.2.0](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F1.2.0) - 2016-03-03
### Changed
- porting build environment to Node LTS 4.3.1 which requires updating dependency packages.
- Please update your build environment, remove node_modules directory, run npm install && npm update before using this version

## [1.1.0](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F1.1.0) - 2016-01-21
### Added
- Added demo class `x1-ui-side-navigation-demo`
- Bower dependencies to demo documentation
### Changed
- Updated bower dependencies
- Combined demo js files into `side-navigation.demo.js`

## [1.0.0](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F1.0.0) - 2015-11-02
### Changed
- Renamed x1-ui-ng-left-navigation to x1-ui-ng-side-navigation for RTL support

## [0.5.1](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F0.5.1) - 2015-10-22
### Fixed
- UI mirroring: the alignment of the navigation arrow

## [0.5.0](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F0.5.0) - 2015-10-20
### Added
- [RTC-202045](https://emmrtcapp03.emmlabs.ibm.com:9443/ccm/web/projects/ExperienceOne%20Peretz#action=com.ibm.team.workitem.viewWorkItem&id=202045) Accessibility support.
- Internationalization variables.
### Changed
- Constant syntax.
- Bootstrap dependency version.

## [0.4.7](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F0.4.7) - 2015-09-25
### Fixed
- Include mirroring support in vendor.css.

## [0.4.6](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F0.4.6) - 2015-09-25
### Fixed
- Proper unit-test exit code reporting for gulp task.

## [0.4.5](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F0.4.5) - 2015-09-01
### Fixed
- RTC-42836	Explore: Search box is available on left panel after login

## [0.4.4](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F0.4.4) - 2015-09-01
### Added
- UI mirroring support

## [0.4.3](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F0.4.3) - 2015-08-17
### Fixed
- RTC-42507 Fixed issue where expanding one left nav item was collapsing other items

## [0.4.2](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F0.4.2) - 2015-08-13
### Fixed
- RTC-42332 Fix for console error, "cannot find target of undefined" when pressing enter in the search bar of tree view

## [0.4.1](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F0.4.1) - 2015-08-12
### Fixed
- On click of the grey area below the content of a sub navigation, it will now not go back to the parent navigation
- Fix for the left navigation going back to the parent navigation on click of enter on the search box in the tree view

## [0.4.0](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F0.4.0) - 2015-07-10
### Added
- Added stateful property which when set to true selects the appropriate item on the left navigation based on
the state loaded

## [0.3.1](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F0.3.1) - 2015-06-29
### Fixed
- Added truncate styles and title attributes to panel items

## [0.3.0](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F0.3.0) - 2015-06-29
### Changed
- [RTC-37917](https://emmrtcapp11.emmlabs.ibm.com:9447/ccm/web/projects/ExperienceOne%20Customer%20Analytics#action=com.ibm.team.workitem.viewWorkItem&id=37917): Styles to match latest Peretz specifications.
- *Note:* new width is 260px

## [0.2.6](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F0.2.6) - 2015-05-11
### Changed
- The class of menu items is now set based on their class attribute rather than on their name attribute

## [0.2.5](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F0.2.5) - 2015-05-08
### Added
- Use translation filter on item names before displaying them. Will return the existing item name if no matching value
  is found in the locale resource file, so this change should be transparent to users not using translation keys.

## [0.2.4](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F0.2.4) - 2015-05-06
### Changed
- Changed deprecated glyphicon class names after updating to x1-ui-bootstrap v2.1.0

## [0.2.3](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F0.2.3) - 2015-04-13
### Fixed
- Ability to open navigation items programmatically on load with isOpen

## [0.2.2](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F0.2.2) - 2015-03-13
### Fixed
- New colors for the understand/plan/design/build/optimize categories to match the new blueprint
(using temporary SASS variables)

## [0.2.1](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F0.2.1) - 2015-03-12
### Fixed
- Set top to 40px since x1-ui-ng-top-navigation is now 40px tall

## [0.2.0](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F0.2.0) - 2015-03-12
### Added
- Updated to x1-ui-bootstrap v2.0.0

## [0.1.0](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-left-navigation/browse?at=refs%2Ftags%2F0.1.0) - 2015-02-27
### Added
- Created the left navigation component with ability to display an infinitely nested list of accordion style menu items.
